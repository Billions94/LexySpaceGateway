import { Inject, Injectable } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Post, PostInput } from '../../dto';
import { PostGetRequestService } from '../request/service/post-get-request.service';
import { PostsRequestService } from '../request/service/posts-request.service';
import { PostUpdateRequestService } from '../request/service/post-update-request.service';
import { PostDeleteRequestService } from '../request/service/post-delete-request.service';
import { PostCreateRequestService } from '../request/service/post-create-request.service';
import { PostLikeRequestService } from '../request/service/post-like-request.service';
import { PUB_SUB } from '../../pubsub/pubsub.module';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { CacheControl } from 'nestjs-gql-cache-control';

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

  @Query(() => Post)
  @CacheControl({ inheritMaxAge: true })
  async getPostById(@Args('postId') postId: string): Promise<Post> {
    return this.postGetRequestService.execute(postId);
  }

  @Mutation(() => Post)
  async addPost(@Args('input') input: PostInput): Promise<Post> {
    // this.pubSub.publish(SUBSCRIPTION_EVENTS.newPost, { newPost: Post });
    return this.postCreateRequestService.execute(input);
  }

  // @Subscription()
  // newPost() {
  //   return this.pubSub.asyncIterator(SUBSCRIPTION_EVENTS.newPost);
  // }

  @Mutation(() => Post)
  async updatePost(
    @Args('postId') postId: string,
    @Args('input') input: PostInput
  ): Promise<Post> {
    return this.postUpdateRequestService.execute(postId, input);
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
