import { Body, Controller, Delete, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { GetUsersDto, ToggleBanDto, UserRole } from '@shared/common';
import { AuthGuard } from '../guard';
import { Roles } from '../decorators';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class GatewayUserController {
  constructor(@Inject('USER_SERVICE') private readonly userClient: ClientProxy) {}

  @Get()
  @ApiOperation({ summary: 'Отримати всіх користувачів' })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'role', required: false })
  async getAllUsers(@Query() query: GetUsersDto) {
    return this.userClient.send({ role: 'user', cmd: 'get-all' }, query).toPromise();
  }

  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':userId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Видалити користувача' })
  @ApiParam({ name: 'userId', type: String })
  async deleteUser(@Param('userId') userId: string) {
    return this.userClient.send({ role: 'user', cmd: 'delete' }, { userId }).toPromise();
  }

  @Patch(':userId/update-activity')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Оновити активність користувача' })
  @ApiParam({ name: 'userId', type: String })
  updateActivity(@Param('userId') userId: string) {
    return this.userClient.send({ role: 'user', cmd: 'update-activity' }, { userId }).toPromise();
  }

  @Patch(':userId/toggle-ban')
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Заблокувати або розблокувати користувача' })
  @ApiParam({ name: 'userId', type: String })
  toggleBan(@Param('userId') userId: string, @Body() dto: ToggleBanDto) {
    return this.userClient
      .send({ role: 'user', cmd: 'toggle-ban' }, { userId, isBanned: dto.isBanned })
      .toPromise();
  }
}
