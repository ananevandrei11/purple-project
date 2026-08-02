import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';
import { Pool } from 'pg';
import { readFileSync } from 'node:fs';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const CATEGORIES = [
  { id: 1, name: 'Заколки' },
  { id: 2, name: 'Серьги' },
  { id: 3, name: 'Колье' }
];

const productsJson = readFileSync(new URL('../seed-data/products.json', import.meta.url), 'utf-8');
const productsData = JSON.parse(productsJson);

async function main() {
  for (const category of CATEGORIES) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: { name: category.name },
      create: { id: category.id, name: category.name }
    });
  }

  for (const product of productsData.products) {
    const created = await prisma.product.upsert({
      where: { sku: product.sku },
      update: {
        name: product.name,
        price: product.price,
        discount: product.discount ?? null,
        description: product.description,
        images: product.images,
        categoryId: product.categoryId
      },
      create: {
        sku: product.sku,
        name: product.name,
        price: product.price,
        discount: product.discount ?? null,
        description: product.description,
        images: product.images,
        categoryId: product.categoryId
      }
    });

    await prisma.review.deleteMany({ where: { productId: created.id } });

    if (product.reviews.length > 0) {
      await prisma.review.createMany({
        data: product.reviews.map(
          (review: { name: string; rating: number; date: string; description: string }) => ({
            productId: created.id,
            name: review.name,
            rating: review.rating,
            date: new Date(review.date),
            description: review.description
          })
        )
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
