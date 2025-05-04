import { Controller, Post, Body, Get } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { LoginDto, SignUpDto } from '@shared/common';
import { CurrentUser } from '../decorators';
import { User } from '@shared/database/entities/user.entity';
import { ApiTags, ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(@Inject('USER_SERVICE') private readonly userClient: ClientProxy) {}

  @Post('signup')
  @ApiOperation({ summary: 'Реєстрація нового користувача' })
  @ApiBody({ type: SignUpDto })
  @ApiResponse({ status: 201, description: 'Користувач успішно зареєстрований' })
  async signUp(@Body() dto: SignUpDto) {
    return this.userClient.send({ role: 'user', cmd: 'signup' }, dto).toPromise();
  }

  @Post('login')
  @ApiOperation({ summary: 'Вхід користувача' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Успішна авторизація' })
  async login(@Body() dto: LoginDto) {
    return this.userClient.send({ role: 'user', cmd: 'login' }, dto).toPromise();
  }

  @Get('current')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Отримати поточного користувача' })
  @ApiResponse({ status: 200, description: 'Інформація про поточного користувача' })
  getCurrentUser(@CurrentUser() user: User) {
    return user;
  }
}
