import type { FastifyInstance } from 'fastify';
import { prisma } from '../db';
import { checkAccessToken } from '../utils/token';

export async function order(app: FastifyInstance) {
  app.get('/order/my', async (request, reply) => {
    const decodedToken = checkAccessToken(request, reply);
    if (!decodedToken.sub) {
      return reply.status(401).send({ message: 'Authentication required' });
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: decodedToken.sub
      },
      include: { items: true }
    });
    const data = orders.map((item) => ({ ...item, data: item.items }));
    return reply.status(200).send(data);
  });

  app.post<{ Body: { items: { name: string; count: number; price: number }[] } }>(
    '/order',
    async (request, reply) => {
      const decodedToken = checkAccessToken(request, reply);
      if (!decodedToken.sub) {
        return reply.status(401).send({ message: 'Authentication required' });
      }
      const { items } = request.body;
      const orderItem = await prisma.order.create({
        data: {
          status: 'created',
          userId: decodedToken.sub,
          items: { create: items }
        },
        include: { items: true }
      });

      return reply.status(200).send({ ...orderItem, data: orderItem.items });
    }
  );
}
