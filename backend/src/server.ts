import Fastify from 'fastify';
import { products } from './routes/products';

const fastify = Fastify({
  logger: true
});

fastify.get('/health', async () => ({ status: 'ok' }));
fastify.register(products);

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
