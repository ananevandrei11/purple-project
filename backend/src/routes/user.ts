import type { FastifyInstance } from 'fastify';
import * as bcrypt from 'bcrypt';
import crypto from 'crypto';

import { prisma } from '../db';
import { getAccessTokenData, getRefreshTokenData, requireAuth } from '../utils/token';

export async function user(app: FastifyInstance) {
  app.post<{ Body: { email: string; password: string } }>(
    '/auth/register',
    {
      config: {
        rateLimit: {
          max: 5,
          timeWindow: '1 minute'
        }
      }
    },
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

        return reply.code(200).send({ success: true, accessToken, refreshToken });
      } catch (e) {
        return reply.code(500).send({ success: false, error: 'Something went wrong' });
      }
    }
  );

  app.post<{ Body: { email: string; password: string } }>(
    '/auth/login',
    {
      config: {
        rateLimit: {
          max: 5,
          timeWindow: '1 minute'
        }
      }
    },
    async (request, reply) => {
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
        await prisma.refreshToken.deleteMany({
          where: { userId: user.id, expiresAt: { lt: new Date() } }
        });
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

        return reply.code(200).send({ success: true, accessToken, refreshToken });
      } catch (e) {
        return reply.code(500).send({ success: false, error: 'Something went wrong' });
      }
    }
  );

  app.post<{ Body: { refreshToken: string } }>(
    '/auth/refresh',
    {
      config: {
        rateLimit: {
          max: 5,
          timeWindow: '1 minute'
        }
      }
    },
    async (request, reply) => {
      const { refreshToken: refreshCurrent } = request.body;
      if (!refreshCurrent) {
        return reply.code(401).send({ code: 'UNDEFINED_TOKEN' });
      }
      const hashed = crypto.createHash('sha256').update(refreshCurrent).digest('hex');
      const refreshTokenData = await prisma.refreshToken.findUnique({
        where: {
          hashedToken: hashed
        }
      });

      if (!refreshTokenData) {
        return reply.code(401).send({ code: 'INVALID_TOKEN' });
      }

      if (refreshTokenData.revoked) {
        await prisma.refreshToken.updateMany({
          where: {
            userId: refreshTokenData.userId
          },
          data: {
            revoked: true
          }
        });
        return reply.code(401).send({ code: 'TOKEN_REUSE' });
      }

      const now = new Date();
      if (refreshTokenData.expiresAt < now) {
        return reply.code(401).send({ code: 'REFRESH_EXPIRED' });
      }

      const { refreshToken, hashedToken, expiresAt } = getRefreshTokenData();

      const result = await prisma.$transaction(async (tx) => {
        await tx.refreshToken.update({
          where: {
            hashedToken: hashed,
            revoked: false
          },
          data: {
            revoked: true
          }
        });
        const newRefreshToken = await tx.refreshToken.create({
          data: {
            hashedToken,
            expiresAt,
            userId: refreshTokenData.userId
          },
          include: {
            user: true
          }
        });
        return newRefreshToken.user;
      });

      const accessToken = getAccessTokenData({
        secret: app.config.ACCESS_TOKEN_SECRET,
        user: result
      });

      return reply.code(200).send({ success: true, accessToken, refreshToken });
    }
  );

  app.post<{ Body: { refreshToken: string } }>('/auth/logout', async (request, reply) => {
    const { refreshToken: refreshCurrent } = request.body;
    if (!refreshCurrent) {
      return reply.code(401).send({ code: 'UNDEFINED_TOKEN' });
    }
    const hashed = crypto.createHash('sha256').update(refreshCurrent).digest('hex');
    const refreshTokenData = await prisma.refreshToken.findUnique({
      where: {
        hashedToken: hashed
      }
    });

    if (!refreshTokenData) {
      return reply.code(401).send({ code: 'INVALID_TOKEN' });
    }

    if (refreshTokenData.revoked) {
      await prisma.refreshToken.updateMany({
        where: {
          userId: refreshTokenData.userId
        },
        data: {
          revoked: true
        }
      });
      return reply.code(401).send({ code: 'TOKEN_REUSE' });
    }

    const now = new Date();
    if (refreshTokenData.expiresAt < now) {
      return reply.code(401).send({ code: 'REFRESH_EXPIRED' });
    }

    await prisma.refreshToken.update({
      where: {
        hashedToken: hashed,
        revoked: false
      },
      data: {
        revoked: true
      }
    });

    return reply.code(204).send({ success: true });
  });

  app.post<{ Body: { email: string } }>('/auth/restore', async (request, reply) => {
    const { email } = request.body;
    if (!email) {
      return reply.code(404).send({ code: 'Email is required' });
    }

    return reply.code(200).send({ success: true });
  });

  app.get('/user/profile', { preHandler: requireAuth }, async (request, reply) => {
    const userId = request.user?.id;
    if (!userId) {
      return reply.code(401).send({ code: 'NO_TOKEN' });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      omit: {
        passwordHash: true
      }
    });

    if (!user) {
      return reply.status(404).send({ message: 'User is not found' });
    }

    return reply.status(200).send(user);
  });

  app.patch<{ Body: { address?: string; name?: string; phone?: string } }>(
    '/user/profile',
    { preHandler: requireAuth },
    async (request, reply) => {
      const userId = request.user?.id;
      if (!userId) {
        return reply.code(401).send({ code: 'NO_TOKEN' });
      }

      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        return reply.status(404).send({ message: 'User is not found' });
      }

      const { address, name, phone } = request.body;
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        omit: {
          passwordHash: true
        },
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
