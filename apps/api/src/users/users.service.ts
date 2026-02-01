import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserProfileArgs } from './users.models';

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
        profile: { create: {} },
      },
    });
  }

  async updateProfile(userId: string, input: UpdateUserProfileArgs) {
    const { profile, measurements } = input;

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        profile: profile
          ? { upsert: { create: profile, update: profile } }
          : undefined,
      },
      include: { profile: { include: { bodyMeasurements: true } } },
    });

    if (measurements && updatedUser.profile) {
      await this.prisma.bodyMeasurements.create({
        data: {
          ...measurements,
          profileId: updatedUser.profile.id,
        },
      });

      return this.prisma.user.findUnique({
        where: { id: userId },
        include: { profile: { include: { bodyMeasurements: true } } },
      });
    }

    return updatedUser;
  }
}
