import { Injectable } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User, UserInput, UserResponse } from '../../dto';
import { UserByUsernameRequestService } from '../request/service/user-by-username-request.service';
import { UserDeleteRequestService } from '../request/service/user-delete.request.service';
import { UserGetRequestService } from '../request/service/user-get-request.service';
import { UserUpdateRequestService } from '../request/service/user-update-request.service';
import { UsersRequestService } from '../request/service/users-request.service';
import { CacheControl } from 'nestjs-gql-cache-control';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';
import { UserAddCoverRequestService } from '../request/service/user-add-cover-request.service';
import { UserGetFollowersRequestService } from '../request/service/user-get-followers-request.service';
import { UserGetFollowingRequestService } from '../request/service/user-get-following-request.service';
import { UserFollowRequestService } from '../request/service/user-follow-request.service';

@Resolver(() => User)
@Injectable()
export class UserResolver {
  constructor(
    private readonly usersRequestService: UsersRequestService,
    private readonly userGetRequestService: UserGetRequestService,
    private readonly userByIdRequestService: UserByUsernameRequestService,
    private readonly userAddCoverRequestService: UserAddCoverRequestService,
    private readonly userFollowRequestService: UserFollowRequestService,
    private readonly userFollowersRequestService: UserGetFollowersRequestService,
    private readonly userFollowingRequestService: UserGetFollowingRequestService,
    private readonly userUpdateRequestService: UserUpdateRequestService,
    private readonly userDeleteRequestService: UserDeleteRequestService
  ) {}

  @Query(() => [User])
  @CacheControl({ maxAge: 360 })
  async users(): Promise<User[]> {
    return this.usersRequestService.execute();
  }
  @Query(() => User)
  @CacheControl({ inheritMaxAge: true })
  async user(): Promise<User> {
    return this.userGetRequestService.execute();
  }

  @Query(() => Object)
  @CacheControl({ inheritMaxAge: true })
  async userByUsername(
    @Args('username') username: string
  ): Promise<UserResponse> {
    return this.userByIdRequestService.execute(username);
  }

  @Query(() => [User])
  @CacheControl({ inheritMaxAge: true })
  async getFollowers(): Promise<User[]> {
    return this.userFollowersRequestService.execute();
  }

  @Query(() => [User])
  @CacheControl({ inheritMaxAge: true })
  async getFollowing(): Promise<User[]> {
    return this.userFollowingRequestService.execute();
  }

  @Mutation(() => User)
  async addCover(
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: FileUpload
  ) {
    return this.userAddCoverRequestService.execute(file);
  }

  @Mutation(() => Boolean)
  async followUser(@Args('username') username: string) {
    return this.userFollowRequestService.execute(username);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('input') input: UserInput,
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: FileUpload
  ): Promise<User> {
    return this.userUpdateRequestService.execute(input, file);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('userId') userId: string): Promise<boolean> {
    return this.userDeleteRequestService.execute(userId);
  }
}
