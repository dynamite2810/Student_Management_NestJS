import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
// import { APP_GUARD } from '@nestjs/core';
// import { AuthGuard } from './auth.guard';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
// import { AuthGuard } from './auth.guard';
import { LocalStrategy } from './strategy/local.strategy';
import { jwtConstants } from './constants';
import { AdminStrategy } from './strategy/admin.strategy';
import { UserStrategy } from './strategy/user.strategy';
@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '4h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, AdminStrategy, UserStrategy],
  exports: [AuthService],
})
export class AuthModule {}
