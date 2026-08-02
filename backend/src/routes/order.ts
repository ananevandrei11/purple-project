import type { FastifyInstance } from 'fastify';
import { prisma } from '../db';
import { requireAuth } from '../utils/token';

export async function order(app: FastifyInstance) {
  app.get('/order/my', { preHandler: requireAuth }, async (request, reply) => {
    const userId = request.user?.id;
    if (!userId) {
      return reply.code(401).send({ code: 'NO_TOKEN' });
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: userId
      },
      include: { items: true }
    });
    const data = orders.map((item) => ({ ...item, data: item.items }));
    return reply.status(200).send(data);
  });

  app.post<{ Body: { items: { name: string; count: number; price: number }[] } }>(
    '/order',
    { preHandler: requireAuth },
    async (request, reply) => {
      const userId = request.user?.id;
      if (!userId) {
        return reply.code(401).send({ code: 'NO_TOKEN' });
      }

      const { items } = request.body;
      const orderItem = await prisma.order.create({
        data: {
          status: 'created',
          userId: userId,
          items: { create: items }
        },
        include: { items: true }
      });

      return reply.status(200).send({ ...orderItem, data: orderItem.items });
    }
  );
}
