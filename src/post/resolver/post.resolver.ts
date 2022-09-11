import { Injectable } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Post, PostInput } from '../../dto';
import { PostByIdRequestService } from '../request/service/post-by-id-request.service';
import { PostsRequestService } from '../request/service/posts-request.service';

@Resolver(() => Post)
@Injectable()
export class PostResolver {
  constructor(
    private postsRequestService: PostsRequestService,
    private postByIdRequestService: PostByIdRequestService
  ) {}

  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    return this.postsRequestService.execute();
  }

  @Query(() => Post)
  async getPostById(@Args('postId') postId: string): Promise<Post> {
    return this.postByIdRequestService.execute(postId);
  }
}
