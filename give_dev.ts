import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Get the user ID from command-line arguments
  const userId = parseInt(process.argv[2], 10); // First argument after script path

  if (isNaN(userId)) {
    console.log('Please provide a valid user ID.');
    return;
  }

  // Make sure the user exists before trying to add roles
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (user) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        roles: {
          create: [{ name: 'USER' }, { name: 'DEVELOPER' }],
        },
      },
    });
    console.log(`Roles added to user with ID: ${userId}`);
  } else {
    console.log(`User with ID ${userId} does not exist.`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
