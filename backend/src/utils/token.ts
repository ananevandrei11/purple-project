import type { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import type { User } from '../generated/prisma/client';
import type { CookieSerializeOptions } from '@fastify/cookie';

const REFRESH_TTL_DAYS = 30;

export const getRefreshTokenData = () => {
  const refreshToken = crypto.randomBytes(64).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(refreshToken).digest('hex');
  const expiresAt = new Date(Date.now() + REFRESH_TTL_DAYS * 24 * 60 * 60 * 1000);

  return {
    refreshToken,
    hashedToken,
    expiresAt
  };
};

export const getRefreshTokenCookie = (nodeenv: string, expiresAt: Date): CookieSerializeOptions => {
  return {
    httpOnly: true,
    expires: expiresAt,
    secure: nodeenv === 'production',
    sameSite: 'lax'
  };
};

export const getAccessTokenData = ({ secret, user }: { secret: string; user: User }) => {
  const accessToken = jwt.sign({ sub: user.id }, secret, {
    expiresIn: '15m'
  });
  return accessToken;
};

export const checkAccessToken = (request: FastifyRequest, reply: FastifyReply): jwt.JwtPayload => {
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
