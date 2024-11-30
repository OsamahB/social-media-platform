import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '../.env' }),
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET, // mandatory value
      signOptions: { expiresIn: `${process.env.JWT_EXPIRATION_TIME ?? 24}h` },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
