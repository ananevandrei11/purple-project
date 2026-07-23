import type { FastifyInstance } from 'fastify';
import { prisma } from '../db';
import type { ProductWhereInput } from '../generated/prisma/models';

export async function products(fastify: FastifyInstance) {
  fastify.get<{
    Querystring: {
      limit: string;
      offset: string;
      name?: string;
      categoryId?: string;
      priceMin?: string;
      priceMax?: string;
      discounted?: 'true';
    };
  }>('/products', async (request, reply) => {
    const { limit, offset, categoryId, discounted, name, priceMax, priceMin } = request.query;
    const take = limit !== undefined ? Number(limit) : 1000;
    const skip = offset !== undefined ? Number(offset) : 0;
    const filters: ProductWhereInput = {
      ...(categoryId && { categoryId: Number(categoryId) }),
      price: {
        ...(priceMin && { gte: Number(priceMin) }),
        ...(priceMax && { lte: Number(priceMax) })
      },
      ...(name && {
        name: {
          contains: name,
          mode: 'insensitive'
        }
      }),
      ...(discounted && {
        discount: {
          gt: 0
        }
      })
    };

    const products = await prisma.product.findMany({
      where: filters,
      skip,
      take
    });
    const productTotal = await prisma.product.count({
      where: filters
    });

    return reply.code(200).send({
      limit: take,
      offset: skip,
      totalProducts: productTotal,
      products
    });
  });

  fastify.get<{ Params: { sku: string } }>('/products/sku/:sku', async (request, reply) => {
    const sku = request.params.sku;
    const product = await prisma.product.findFirst({ where: { sku: Number(sku) } });
    if (!product) {
      return reply.code(404).send('Product not found');
    }
    const review = await prisma.review.findMany({ where: { productId: product?.id } });
    return reply.code(200).send({ ...product, reviews: review ?? [] });
  });

  fastify.get('/products/get-filter', async (request, reply) => {
    const category = await prisma.category.findMany();
    const aggregations = await prisma.product.aggregate({
      _max: {
        price: true
      },
      _min: {
        price: true
      }
    });
    return reply.code(200).send({
      categories: category,
      maxPrice: aggregations._max.price,
      minPrice: aggregations._min.price
    });
  });

  fastify.post<{
    Params: { sku: string };
    Body: { name: string; rating: number; email: string; review: string };
  }>('/products/sku/:sku/review', async (request, reply) => {
    const sku = request.params.sku;
    const { name, rating, review } = request.body;

    const reviewData = await prisma.review.create({
      data: {
        productId: Number(sku),
        description: review,
        rating,
        name,
        date: new Date()
      }
    });

    const isNewReview = !!reviewData;

    return reply.code(200).send({
      success: isNewReview,
      message: isNewReview ? 'succes' : 'error'
    });
  });
}
