import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Throttle } from '@nestjs/throttler';
import { Role } from '@repo/database';
import { Auth } from 'src/auth/auth.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { GqlThrottlerGuard } from 'src/common/guards/gql-throttler.guard';
import { CommentCreateInput, CommentUpdateInput } from './feedback.input';
import { Comment, ToggleLikeResponse } from './feedback.models';
import { FeedbackService } from './feedback.service';

@Resolver()
@UseGuards(GqlThrottlerGuard)
@Throttle({ default: { ttl: 60000, limit: 20 } })
export class FeedbackResolver {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Mutation(() => ToggleLikeResponse, {
    description: 'Toggle like on a recipe',
  })
  @Auth()
  toggleLike(
    @CurrentUser('id') userId: string,
    @Args('recipeId') recipeId: string,
  ) {
    return this.feedbackService.toggleLike(userId, recipeId);
  }

  @Mutation(() => Comment, {
    description: 'Create a comment on a recipe',
  })
  @Auth()
  createComment(
    @CurrentUser('id') userId: string,
    @Args('input') input: CommentCreateInput,
  ) {
    return this.feedbackService.createComment(userId, input);
  }

  @Mutation(() => Comment, {
    description: 'Update a comment (own comments or admin)',
  })
  @Auth()
  updateComment(
    @CurrentUser('id') userId: string,
    @CurrentUser('role') userRole: Role,
    @Args('commentId') commentId: string,
    @Args('input') input: CommentUpdateInput,
  ) {
    return this.feedbackService.updateComment(
      userId,
      userRole,
      commentId,
      input,
    );
  }

  @Mutation(() => Comment, {
    description: 'Delete a comment (own comments or admin)',
  })
  @Auth()
  deleteComment(
    @CurrentUser('id') userId: string,
    @CurrentUser('role') userRole: Role,
    @Args('commentId') commentId: string,
  ) {
    return this.feedbackService.removeComment(userId, userRole, commentId);
  }
}
