import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.user.findMany({
      include: { profile: { include: { bodyMeasurements: true } } },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { profile: { include: { bodyMeasurements: true } } },
    });
  }

  async createUser(email: string, hashedPassword: string) {
    return this.prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
      },
    });
  }
}
