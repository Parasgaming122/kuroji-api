import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.update({
    where: { id: 1 },
    data: {
      roles: {
        create: [{ name: 'USER' }, { name: 'DEVELOPER' }],
      },
    },
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
