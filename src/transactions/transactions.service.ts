import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async deposit(userId: number, amount: number) {
    // Use Prisma's interactive transaction
    return this.prisma.$transaction(async (tx) => {
      const prismaTx = tx as PrismaClient; // Cast the transaction client

      // 1. Find the user
      const user = await prismaTx.user.findUnique({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      // 2. Increment user's balance
      const updatedUser = await prismaTx.user.update({
        where: { id: userId },
        data: {
          balance: {
            increment: amount,
          },
        },
      });

      // 3. Create a transaction record
      await prismaTx.transaction.create({
        data: {
          amount: amount,
          type: 'DEPOSIT',
          userId: userId,
        },
      });

      return { message: 'Deposit successful', newBalance: updatedUser.balance };
    });
  }

  async withdraw(userId: number, amount: number) {
    return this.prisma.$transaction(async (tx) => {
      const prismaTx = tx as PrismaClient; // Cast the transaction client

      // 1. Find the user and check balance
      const user = await prismaTx.user.findUnique({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (user.balance < amount) {
        throw new BadRequestException('Insufficient funds');
      }

      // 2. Decrement user's balance
      const updatedUser = await prismaTx.user.update({
        where: { id: userId },
        data: {
          balance: {
            decrement: amount,
          },
        },
      });

      // 3. Create a transaction record
      await prismaTx.transaction.create({
        data: {
          amount: amount,
          type: 'WITHDRAWAL',
          userId: userId,
        },
      });

      return {
        message: 'Withdrawal successful',
        newBalance: updatedUser.balance,
      };
    });
  }

  async getHistory(userId: number) {
    return this.prisma.transaction.findMany({
      where: { userId: userId },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
