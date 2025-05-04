import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@shared/database';
import { compare, hash } from 'bcrypt';
import { User } from '@shared/database/entities/user.entity';
import { DeleteUserDto, GetUsersDto, LoginDto, SignUpDto, UserRole } from '@shared/common';
import { sign } from 'jsonwebtoken';
import { In, Not } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private readonly db: DatabaseService) {}

  async signUp(dto: SignUpDto): Promise<User> {
    const existing = await this.db.findOne(User, { where: { email: dto.email } });

    if (existing) {
      throw new Error('Email already in use');
    }

    const hashed = await hash(dto.password, 10);

    const user = this.db.create(User, {
      email: dto.email,
      password: hashed,
      fullName: dto.fullName,
      role: dto.role,
    });

    return this.db.save(user);
  }

  async login(dto: LoginDto): Promise<{ token: string; user: Partial<User> }> {
    const user = await this.db.findOne(User, { where: { email: dto.email } });

    if (!user || !(await compare(dto.password, user.password))) {
      throw new Error('Invalid credentials');
    }

    user.lastActive = new Date();

    await this.db.save(user);

    const token = sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    });

    return {
      token,
      user,
    };
  }

  async getAllUsers(dto: GetUsersDto): Promise<User[]> {
    const whereClause = dto.roles?.length ? { role: In(dto.roles) } : { role: Not(UserRole.ADMIN) };

    return this.db.find(User, {
      where: whereClause,
      order: { createdAt: 'DESC' },
    });
  }

  async deleteUser(dto: DeleteUserDto): Promise<void> {
    await this.db.delete(User, { id: dto.userId });
  }

  async updateUserActivity(userId: string): Promise<void> {
    await this.db.update(User, userId, { lastActive: new Date() });
  }

  async toggleBanStatus(userId: string, isBanned: boolean): Promise<void> {
    await this.db.update(User, userId, { isBanned });
  }
}
