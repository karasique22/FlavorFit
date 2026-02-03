import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@repo/database';

interface PrismaError {
  code: string;
}

export function handlePrismaError(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const prismaError = error as PrismaError;

    switch (prismaError.code) {
      case 'P2002':
        throw new ConflictException('A record with this value already exists');
      case 'P2025':
        throw new NotFoundException('Record not found');
      case 'P2003':
        throw new ConflictException(
          'Cannot delete record because it is referenced by other records',
        );
    }
  }

  throw new InternalServerErrorException('Database operation failed');
}
