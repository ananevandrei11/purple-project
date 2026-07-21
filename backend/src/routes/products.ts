import type { FastifyInstance } from 'fastify';
import { prisma } from '../db';

export async function products(fastify: FastifyInstance) {
  fastify.get<{ Querystring: { limit?: string; offset?: string } }>(
    '/products',
    async (request, reply) => {
      const { limit, offset } = request.query;
      const take = limit !== undefined ? Number(limit) : 1000;
      const skip = offset !== undefined ? Number(offset) : 0;
      const products = await prisma.product.findMany({ skip, take });
      const productTotal = await prisma.product.count();

      return reply.code(200).send({
        limit: take,
        offset: skip,
        totalProducts: productTotal,
        products
      });
    }
  );

  fastify.get<{ Params: { sku: string } }>('/products/sku/:sku', async (request, reply) => {
    const sku = request.params.sku;
    const product = await prisma.product.findFirst({ where: { sku: Number(sku) } });
    if (!product) {
      return reply.code(404).send('Product not found');
    }
    const review = await prisma.review.findMany({ where: { productId: product?.id } });
    return reply.code(200).send({ ...product, review: review ?? [] });
  });
}
