import { Injectable } from '@nestjs/common';
import { Role } from '@repo/database';
import { handlePrismaError } from 'src/common/utils';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentCreateInput, CommentUpdateInput } from './feedback.input';

@Injectable()
export class FeedbackService {
  constructor(private readonly prisma: PrismaService) {}

  async toggleLike(userId: string, recipeId: string) {
    try {
      const existingLike = await this.prisma.like.findUnique({
        where: { recipeId_userId: { recipeId, userId } },
      });

      if (existingLike) {
        await this.prisma.like.delete({
          where: { id: existingLike.id },
        });
        return { liked: false };
      } else {
        await this.prisma.like.create({
          data: {
            user: { connect: { id: userId } },
            recipe: { connect: { id: recipeId } },
          },
        });
        return { liked: true };
      }
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async createComment(userId: string, input: CommentCreateInput) {
    try {
      return await this.prisma.comment.create({
        data: {
          content: input.content,
          author: {
            connect: { id: userId },
          },
          recipe: {
            connect: { id: input.recipeId },
          },
        },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async updateComment(
    userId: string,
    userRole: Role,
    commentId: string,
    input: CommentUpdateInput,
  ) {
    try {
      return await this.prisma.comment.update({
        where:
          userRole === Role.ADMIN
            ? { id: commentId }
            : { id: commentId, authorId: userId },
        data: {
          content: input.content,
        },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async removeComment(userId: string, userRole: Role, commentId: string) {
    try {
      return await this.prisma.comment.delete({
        where:
          userRole === Role.ADMIN
            ? { id: commentId }
            : { id: commentId, authorId: userId },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }
}
