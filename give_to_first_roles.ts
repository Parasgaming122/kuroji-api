import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

await prisma.user.update({
  where: { id: 1 },
  data: {
    roles: {
      create: [{ name: 'USER' }, { name: 'DEVELOPER' }],
    },
  },
});
