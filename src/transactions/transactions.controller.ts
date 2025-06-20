import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IsNumber, IsPositive } from 'class-validator';

// We define the DTO directly here for simplicity
export class TransactionDto {
  @IsNumber()
  @IsPositive()
  amount: number;
}

@Controller('transactions')
@UseGuards(JwtAuthGuard) // Protect all routes in this controller
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('deposit')
  deposit(@Request() req, @Body() transactionDto: TransactionDto) {
    const userId = req.user.userId;
    return this.transactionsService.deposit(userId, transactionDto.amount);
  }

  @Post('withdraw')
  withdraw(@Request() req, @Body() transactionDto: TransactionDto) {
    const userId = req.user.userId;
    return this.transactionsService.withdraw(userId, transactionDto.amount);
  }

  @Get('history')
  getHistory(@Request() req) {
    const userId = req.user.userId;
    return this.transactionsService.getHistory(userId);
  }
}
