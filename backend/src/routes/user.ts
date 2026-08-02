import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { prisma } from '../db';
import type { User } from '../generated/prisma/client';
import type { CookieSerializeOptions } from '@fastify/cookie';

const REFRESH_TTL_DAYS = 30;

const getRefreshTokenData = () => {
  const refreshToken = crypto.randomBytes(64).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(refreshToken).digest('hex');
  const expiresAt = new Date(Date.now() + REFRESH_TTL_DAYS * 24 * 60 * 60 * 1000);

  return {
    refreshToken,
    hashedToken,
    expiresAt
  };
};

const getRefreshTokenCookie = (nodeenv: string, expiresAt: Date): CookieSerializeOptions => {
  return {
    httpOnly: true,
    expires: expiresAt,
    secure: nodeenv === 'production',
    sameSite: 'lax'
  };
};

const getAccessTokenData = ({ secret, user }: { secret: string; user: User }) => {
  const accessToken = jwt.sign({ sub: user.id }, secret, {
    expiresIn: '15m'
  });
  return accessToken;
};

const checkAccessToken = (request: FastifyRequest, reply: FastifyReply): jwt.JwtPayload => {
  const headers = request.headers;
  const token = headers.authorization?.split(' ')[1];
  if (!token) {
    return reply.status(401).send({ message: 'Authentication required' });
  }
  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || '');
  if (typeof decodedToken === 'string') {
    return reply.status(401).send({ message: 'Authentication required' });
  }

  return decodedToken;
};

export async function user(app: FastifyInstance) {
  app.post<{ Body: { email: string; password: string } }>(
    '/auth/register',
    async (request, reply) => {
      const { password, email } = request.body;
      const user = await prisma.user.findUnique({ where: { email: email } });

      if (user) {
        return reply
          .code(409)
          .send({ success: false, error: 'User already exists with this email' });
      }

      try {
        const hash = await bcrypt.hash(password, Number(app.config.SALT_SESSION));
        const { refreshToken, hashedToken, expiresAt } = getRefreshTokenData();

        const result = await prisma.$transaction(async (tx) => {
          const user = await tx.user.create({ data: { email, passwordHash: hash } });
          await tx.refreshToken.create({
            data: {
              hashedToken,
              expiresAt,
              userId: user.id
            }
          });
          return user;
        });

        const accessToken = getAccessTokenData({
          secret: app.config.ACCESS_TOKEN_SECRET,
          user: result
        });
        const refreshCookieOptions = getRefreshTokenCookie(app.config.NODE_ENV, expiresAt);

        return reply
          .setCookie('refreshToken', refreshToken, refreshCookieOptions)
          .code(200)
          .send({ success: true, accessToken });
      } catch (e) {
        return reply.code(500).send({ success: false, error: 'Something went wrong' });
      }
    }
  );

  app.post<{ Body: { email: string; password: string } }>('/auth/login', async (request, reply) => {
    const { password, email } = request.body;
    const user = await prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      return reply.code(401).send({ success: false, error: 'Invalid email or password' });
    }

    const isPasswordTrue = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordTrue) {
      return reply.code(401).send({ success: false, error: 'Invalid email or password' });
    }

    try {
      const { refreshToken, hashedToken, expiresAt } = getRefreshTokenData();

      await prisma.refreshToken.create({
        data: {
          hashedToken,
          expiresAt,
          userId: user.id
        }
      });

      const accessToken = getAccessTokenData({
        secret: app.config.ACCESS_TOKEN_SECRET,
        user
      });
      const refreshCookieOptions = getRefreshTokenCookie(app.config.NODE_ENV, expiresAt);

      return reply
        .setCookie('refreshToken', refreshToken, refreshCookieOptions)
        .code(200)
        .send({ success: true, accessToken });
    } catch (e) {
      return reply.code(500).send({ success: false, error: 'Something went wrong' });
    }
  });

  app.get('/user/profile', async (request, reply) => {
    const decodedToken = checkAccessToken(request, reply);
    if (!decodedToken.sub) {
      return reply.status(401).send({ message: 'Authentication required' });
    }
    const user = await prisma.user.findUnique({ where: { id: decodedToken.sub } });

    if (!user) {
      return reply.status(404).send({ message: 'User is not found' });
    }

    return reply.status(200).send(user);
  });

  app.patch<{ Body: { address?: string; name?: string; phone?: string } }>(
    '/user/profile',
    async (request, reply) => {
      const decodedToken = checkAccessToken(request, reply);
      if (!decodedToken.sub) {
        return reply.status(401).send({ message: 'Authentication required' });
      }
      const user = await prisma.user.findUnique({ where: { id: decodedToken.sub } });
      if (!user) {
        return reply.status(404).send({ message: 'User is not found' });
      }

      const { address, name, phone } = request.body;
      const updatedUser = await prisma.user.update({
        where: { id: decodedToken.sub },
        data: {
          ...(address && { address }),
          ...(name && { name }),
          ...(phone && { phone })
        }
      });

      return reply.status(200).send(updatedUser);
    }
  );
}
