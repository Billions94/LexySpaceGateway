import { Injectable } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Post, PostInput } from '../../dto';
import { PostGetRequestService } from '../request/service/post-get-request.service';
import { PostsRequestService } from '../request/service/posts-request.service';
import { PostUpdateRequestService } from '../request/service/post-update-request.service';
import { PostDeleteRequestService } from '../request/service/post-delete-request.service';
import { PostCreateRequestService } from '../request/service/post-create-request.service';
import { UserGetRequestService } from '../../user/request/service/user-get-request.service';

@Resolver(() => Post)
@Injectable()
export class PostResolver {
  constructor(
    private postCreateRequestService: PostCreateRequestService,
    private postsRequestService: PostsRequestService,
    private postGetRequestService: PostGetRequestService,
    private postUpdateRequestService: PostUpdateRequestService,
    private postDeleteRequestService: PostDeleteRequestService,
    private userGetRequestService: UserGetRequestService
  ) {}

  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    return this.postsRequestService.execute();
  }

  @Query(() => Post)
  async getPostById(@Args('postId') postId: string): Promise<Post> {
    return this.postGetRequestService.execute(postId);
  }

  @Mutation(() => Post)
  async addPost(@Args('input') input: PostInput): Promise<Post> {
    const user = await this.userGetRequestService.execute();

    return this.postCreateRequestService.execute(user.userName, input);
  }

  @Mutation(() => Post)
  async updatePost(
    @Args('postId') postId: string,
    @Args('input') input: PostInput
  ): Promise<Post> {
    return this.postUpdateRequestService.execute(postId, input);
  }

  @Mutation(() => Boolean)
  async deletePost(@Args('postId') postId: string): Promise<boolean> {
    return this.postDeleteRequestService.execute(postId);
  }
}
