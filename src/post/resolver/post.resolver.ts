import { Injectable } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';
import { CacheControl } from 'nestjs-gql-cache-control';
import { Post, PostInput, PostResponse } from '../../dto';
import { PostCreateRequestService } from '../request/service/post-create-request.service';
import { PostDeleteRequestService } from '../request/service/post-delete-request.service';
import { PostGetRequestService } from '../request/service/post-get-request.service';
import { PostLikeRequestService } from '../request/service/post-like-request.service';
import { PostUpdateRequestService } from '../request/service/post-update-request.service';
import { PostsRequestService } from '../request/service/posts-request.service';

enum SUBSCRIPTION_EVENTS {
  newPost = 'newPost',
}

@Resolver(() => Post)
@Injectable()
export class PostResolver {
  constructor(
    private postCreateRequestService: PostCreateRequestService,
    private postsRequestService: PostsRequestService,
    private postGetRequestService: PostGetRequestService,
    private postUpdateRequestService: PostUpdateRequestService,
    private postLikesRequestService: PostLikeRequestService,
    private postDeleteRequestService: PostDeleteRequestService // @Inject(PUB_SUB) private pubSub: RedisPubSub
  ) {}

  @Query(() => [Post])
  @CacheControl({ maxAge: 360 })
  async posts(): Promise<Post[]> {
    return this.postsRequestService.execute();
  }

  @Query(() => PostResponse)
  @CacheControl({ inheritMaxAge: true })
  async getPostById(@Args('postId') postId: string): Promise<PostResponse> {
    return this.postGetRequestService.execute(postId);
  }

  @Mutation(() => PostResponse)
  async addPost(
    @Args('input') input: PostInput,
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: FileUpload
  ): Promise<PostResponse> {
    // this.pubSub.publish(SUBSCRIPTION_EVENTS.newPost, { newPost: Post });
    return this.postCreateRequestService.execute(input, file);
  }

  // @Subscription()
  // newPost() {
  //   return this.pubSub.asyncIterator(SUBSCRIPTION_EVENTS.newPost);
  // }

  @Mutation(() => PostResponse)
  async updatePost(
    @Args('postId') postId: string,
    @Args('input') input: PostInput,
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: FileUpload
  ): Promise<PostResponse> {
    return this.postUpdateRequestService.execute(postId, input, file);
  }

  @Mutation(() => Boolean)
  async addPostLike(@Args('postId') postId: string): Promise<boolean> {
    return this.postLikesRequestService.execute(postId);
  }

  @Mutation(() => Boolean)
  async deletePost(@Args('postId') postId: string): Promise<boolean> {
    return this.postDeleteRequestService.execute(postId);
  }
}
