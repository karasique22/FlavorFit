import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserProfileArgs } from './users.input';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly userWithProfileInclude = {
    profile: { include: { bodyMeasurements: true } },
  };

  findAll() {
    return this.prisma.user.findMany({
      include: this.userWithProfileInclude,
    });
  }

  findUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: this.userWithProfileInclude,
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  create(email: string, hashedPassword: string) {
    return this.prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        profile: { create: {} },
      },
    });
  }

  async update(userId: string, input: UpdateUserProfileArgs) {
    await this.findOne(userId);

    const { profile, measurements } = input;

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        profile: {
          upsert: {
            create: {
              ...profile,
              ...(measurements && {
                bodyMeasurements: { create: measurements },
              }),
            },
            update: {
              ...profile,
              ...(measurements && {
                bodyMeasurements: { create: measurements },
              }),
            },
          },
        },
      },
      include: this.userWithProfileInclude,
    });
  }
}
