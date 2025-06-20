import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create a password salt
  const saltRounds = 10;
  const password = 'testtest';
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // create two dummy users
  const user1 = await prisma.user.upsert({
    where: { username: 'testuser' },
    update: {
      password: hashedPassword,
    },
    create: {
      username: 'testuser',
      password: hashedPassword,
      balance: 1000.0,
    },
  });

  console.log({ user1 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
