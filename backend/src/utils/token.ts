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

export const requireAuth = async (request: FastifyRequest, reply: FastifyReply) => {
  const token = request.headers.authorization?.split(' ')[1];
  if (!token) {
    return reply.code(401).send({ code: 'NO_TOKEN' });
  }
  try {
    const decoded = jwt.verify(token, request.server.config.ACCESS_TOKEN_SECRET);
    if (typeof decoded === 'string' || !decoded.sub) {
      return reply.code(401).send({ code: 'INVALID_TOKEN' });
    }
    request.user = { id: decoded.sub };
  } catch (e) {
    const code = e instanceof jwt.TokenExpiredError ? 'TOKEN_EXPIRED' : 'INVALID_TOKEN';
    return reply.code(401).send({ code });
  }
};
