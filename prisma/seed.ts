import { PrismaClient } from '@prisma/client'
import { lorem } from 'faker'

const prisma = new PrismaClient()

async function main() {
  await Promise.all([
    await prisma.category.createMany({
      data: [
        {
          title: 'Food',
          slug: 'food',
          description: lorem.text(10),
          imageUrl: 'https://picsum.photos/200/300',
        },
        {
          title: 'Sports',
          slug: 'sport',
          description: lorem.text(10),
          imageUrl: 'https://picsum.photos/200/300',
        },
        {
          title: 'Music',
          slug: 'music',
          description: lorem.text(10),
          imageUrl: 'https://picsum.photos/200/300',
        },
        {
          title: 'Party',
          slug: 'party',
          description: lorem.text(10),
          imageUrl: 'https://picsum.photos/200/300',
        },
      ],
    }),
  ])

  await prisma.$disconnect()
}

main().catch((e) => {
  process.exit(1)
})
