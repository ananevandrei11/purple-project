import Fastify from 'fastify';
import cors from '@fastify/cors';
import { fastifyCookie } from '@fastify/cookie';
import fastifyEnv from '@fastify/env';
import rateLimit from '@fastify/rate-limit';

import { products } from './routes/products';
import { user } from './routes/user';
import { order } from './routes/order';

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      ACCESS_TOKEN_SECRET: string;
      SALT_SESSION: string;
      NODE_ENV: string;
    };
  }
  interface FastifyRequest {
    user?: { id: string };
  }
}

const fastify = Fastify({
  logger: true
});

await fastify.register(fastifyEnv, {
  schema: {
    type: 'object',
    required: ['ACCESS_TOKEN_SECRET', 'SALT_SESSION'],
    properties: {
      ACCESS_TOKEN_SECRET: { type: 'string' },
      SALT_SESSION: { type: 'string' },
      NODE_ENV: { type: 'string', default: 'development' }
    }
  },
  dotenv: true
});

fastify.register(fastifyCookie);
fastify.register(cors, {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  credentials: true
});
fastify.register(rateLimit, { global: false });

fastify.get('/health', async () => ({ status: 'ok' }));
fastify.register(products);
fastify.register(user);
fastify.register(order);

fastify.listen({ port: 4000, host: 'localhost' }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server started at address: ${address}`);
});
