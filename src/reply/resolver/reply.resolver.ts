import { Injectable } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Reply, ReplyInput } from '../../dto';
import { RepliessRequestService } from '../request/service/replies-request.service';
import { ReplyCreateRequestService } from '../request/service/reply-create-request.service';
import { ReplyDeleteRequestService } from '../request/service/reply-delete-request.service';
import { ReplyGetRequestService } from '../request/service/reply-get-request.service';
import { ReplyUpdateRequestService } from '../request/service/reply-update-request.service';

@Resolver(() => Reply)
@Injectable()
export class ReplyResolver {
  constructor(
    private replyCreateRequestService: ReplyCreateRequestService,
    private repliesRequestService: RepliessRequestService,
    private replyGetRequestService: ReplyGetRequestService,
    private replyUpdateRequestService: ReplyUpdateRequestService,
    private replyDeleteRequestService: ReplyDeleteRequestService
  ) {}

  @Query(() => [Reply])
  async replies(): Promise<Reply[]> {
    return this.repliesRequestService.execute();
  }

  @Query(() => Reply)
  async getReplyById(@Args('replyId') replyId: string): Promise<Reply> {
    return this.replyGetRequestService.execute(replyId);
  }

  @Mutation(() => Reply)
  async addReply(
    @Args('commentId') commentId: string,
    @Args('input') input: ReplyInput
  ): Promise<Reply> {
    return this.replyCreateRequestService.execute(commentId, input);
  }

  @Mutation(() => Reply)
  async updateReply(
    @Args('replyId') replyId: string,
    @Args('input') input: ReplyInput
  ): Promise<Reply> {
    return this.replyUpdateRequestService.execute(replyId, input);
  }

  @Mutation(() => Boolean)
  async deleteReply(@Args('replyId') replyId: string): Promise<boolean> {
    return this.replyDeleteRequestService.execute(replyId);
  }
}
