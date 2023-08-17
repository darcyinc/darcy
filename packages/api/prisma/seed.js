const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function run() {
  await prisma.post.deleteMany({});
  await prisma.user.deleteMany({});

  /**
   * Create users
   */
  await Promise.all([
    prisma.user.create({
      data: {
        auth: {
          create: {
            email: 'alicesmith@example.com'
          }
        },
        handle: 'alicesmith',
        displayName: 'Alice Smith'
      },
      include: {
        auth: true
      }
    }),

    prisma.user.create({
      data: {
        auth: {
          create: {
            email: 'johndoe@example.com'
          }
        },
        handle: 'johndoe',
        displayName: 'John Doe'
      },
      include: {
        auth: true
      }
    })
  ]);
}

run()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    await prisma.$disconnect();
    throw error;
  });
