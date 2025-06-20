import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // <--- ดึงค่า secret มาจาก .env
      signOptions: { expiresIn: '60m' }, // <--- ตั้งค่าให้ token หมดอายุใน 60 นาที
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy], // <--- ยังไม่ต้องเพิ่ม Strategy ในตอนนี้
})
export class AuthModule {}
