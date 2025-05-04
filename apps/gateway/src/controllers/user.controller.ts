import { Body, Controller, Delete, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { GetUsersDto, ToggleBanDto, UserRole } from '@shared/common';
import { AuthGuard } from '../guard';
import { Roles } from '../decorators';

@Controller('users')
export class GatewayUserController {
  constructor(@Inject('USER_SERVICE') private readonly userClient: ClientProxy) {}

  @Get()
  async getAllUsers(@Query() query: GetUsersDto) {
    return this.userClient.send({ role: 'user', cmd: 'get-all' }, query).toPromise();
  }

  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string) {
    return this.userClient.send({ role: 'user', cmd: 'delete' }, { userId }).toPromise();
  }

  @Patch(':userId/update-activity')
  @UseGuards(AuthGuard)
  updateActivity(@Param('userId') userId: string) {
    return this.userClient.send({ role: 'user', cmd: 'update-activity' }, { userId }).toPromise();
  }

  @Patch(':userId/toggle-ban')
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN)
  toggleBan(@Param('userId') userId: string, @Body() dto: ToggleBanDto) {
    return this.userClient
      .send({ role: 'user', cmd: 'toggle-ban' }, { userId, isBanned: dto.isBanned })
      .toPromise();
  }
}
