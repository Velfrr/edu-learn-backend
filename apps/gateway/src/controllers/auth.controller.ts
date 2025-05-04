import { Controller, Post, Body, Get } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { LoginDto, SignUpDto } from '@shared/common';
import { CurrentUser } from '../decorators';
import { User } from '@shared/database/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(@Inject('USER_SERVICE') private readonly userClient: ClientProxy) {}

  @Post('signup')
  async signUp(@Body() dto: SignUpDto) {
    return this.userClient.send({ role: 'user', cmd: 'signup' }, dto).toPromise();
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.userClient.send({ role: 'user', cmd: 'login' }, dto).toPromise();
  }

  @Get('current')
  getCurrentUser(@CurrentUser() user: User) {
    return user;
  }
}
