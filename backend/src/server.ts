import Fastify from 'fastify';
import cors from '@fastify/cors';
import { fastifyCookie } from '@fastify/cookie';
import fastifyEnv from '@fastify/env';

import { products } from './routes/products';
import { user } from './routes/user';

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      ACCESS_TOKEN_SECRET: string;
      SALT_SESSION: string;
      NODE_ENV: string;
    };
  }
}

const fastify = Fastify({
  logger: true
});

fastify.register(fastifyEnv, {
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
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
});
fastify.get('/health', async () => ({ status: 'ok' }));
fastify.register(products);
fastify.register(user);

fastify.listen({ port: 4000, host: 'localhost' }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server started at address: ${address}`);
});

/*
export const API = {
  products: '/products',
  productsFilter: '/products/get-filter',
  productSku: '/products/sku',
  productReview: (sku: number) => `/products/sku/${sku}/review`,

  order: {
    create: '/order',
    getById: (id: string) => `/order/${id}`,
    my: '/order/my'
  },

  auth: {
    register: '/auth/register',
    login: '/auth/login',
    restore: '/auth/restore'
  },

  user: {
    update: '/user/profile',
    profile: '/user/profile'
  }
};
*/
