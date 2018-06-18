import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthResolvers } from './auth.resolvers';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AuthResolvers],
})
export class AuthModule {}
