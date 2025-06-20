import { IsNumber, IsPositive } from 'class-validator';

export class TransactionDto {
  @IsNumber()
  @IsPositive()
  amount: number;
}
