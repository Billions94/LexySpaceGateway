import { Injectable } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CacheControl } from 'nestjs-gql-cache-control';
import { Comment, CommentInput } from '../../dto';
import { CommentCreateRequestService } from '../request/service/comment-create-request.service';
import { CommentDeleteRequestService } from '../request/service/comment-delete-request.service';
import { CommentGetRequestService } from '../request/service/comment-get-request.service';
import { CommentUpdateRequestService } from '../request/service/comment-update-request.service';
import { CommentsRequestService } from '../request/service/comments-request.service';

@Resolver(() => Comment)
@Injectable()
export class CommentResolver {
  constructor(
    private commentCreateRequestService: CommentCreateRequestService,
    private commentsRequestService: CommentsRequestService,
    private commentGetRequestService: CommentGetRequestService,
    private commentUpdateRequestService: CommentUpdateRequestService,
    private commentDeleteRequestService: CommentDeleteRequestService
  ) {}

  @Query(() => [Comment])
  @CacheControl({ maxAge: 360 })
  async comments(): Promise<Comment[]> {
    return this.commentsRequestService.execute();
  }

  @Query(() => Comment)
  @CacheControl({ inheritMaxAge: true })
  async getCommentById(@Args('commentId') commentId: string) {
    return this.commentGetRequestService.execute(commentId);
  }

  @Mutation(() => Comment)
  async addComment(
    @Args('postId') postId: string,
    @Args('input') input: CommentInput
  ): Promise<Comment> {
    return this.commentCreateRequestService.execute(postId, input);
  }

  @Mutation(() => Comment)
  async updateComment(
    @Args('commentId') commentId: string,
    @Args('input') input: CommentInput
  ): Promise<Comment> {
    return this.commentUpdateRequestService.execute(commentId, input);
  }

  @Mutation(() => Boolean)
  async deleteComment(@Args('commentId') commentId: string): Promise<boolean> {
    return this.commentDeleteRequestService.execute(commentId);
  }
}
