import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { User } from '@shared/database/entities/user.entity';
import { DeleteUserDto, GetUsersDto, LoginDto, SignUpDto } from '@shared/common';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ role: 'user', cmd: 'signup' })
  async signUp(data: SignUpDto): Promise<User> {
    return this.userService.signUp(data);
  }

  @MessagePattern({ role: 'user', cmd: 'login' })
  login(dto: LoginDto) {
    return this.userService.login(dto);
  }

  @MessagePattern({ role: 'user', cmd: 'get-all' })
  async getAllUsers(@Payload() dto: GetUsersDto): Promise<User[]> {
    return this.userService.getAllUsers(dto);
  }

  @MessagePattern({ role: 'user', cmd: 'delete' })
  async deleteUser(@Payload() dto: DeleteUserDto): Promise<void> {
    return this.userService.deleteUser(dto);
  }

  @MessagePattern({ role: 'user', cmd: 'update-activity' })
  async updateActivity(@Payload() userId: string) {
    await this.userService.updateUserActivity(userId);
  }

  @MessagePattern({ role: 'user', cmd: 'toggle-ban' })
  async toggleBan(@Payload() data: { userId: string; isBanned: boolean }) {
    await this.userService.toggleBanStatus(data.userId, data.isBanned);
  }
}
