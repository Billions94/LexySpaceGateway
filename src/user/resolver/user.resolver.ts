import { Injectable } from '@nestjs/common';
import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User, UserInput } from '../../dto';
import { UserByIdRequestService } from '../request/service/user-by-id-request.service';
import { UserDeleteRequestService } from '../request/service/user-delete.request.service';
import { UserGetRequestService } from '../request/service/user-get-request.service';
import { UserUpdateRequestService } from '../request/service/user-update-request.service';
import { UsersRequestService } from '../request/service/users-request.service';
import { CacheControl } from 'nestjs-gql-cache-control';

@Resolver(() => User)
@Injectable()
export class UserResolver {
  constructor(
    private usersRequestService: UsersRequestService,
    private userGetRequestService: UserGetRequestService,
    private userByIdRequestService: UserByIdRequestService,
    private userUpdateRequestService: UserUpdateRequestService,
    private userDeleteRequestService: UserDeleteRequestService
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

  @Query(() => User)
  @CacheControl({ inheritMaxAge: true })
  async userById(@Args('userId') userId: string): Promise<User> {
    return this.userByIdRequestService.execute(userId);
  }

  @Mutation(() => User)
  async updateUser(@Args('input') input: UserInput): Promise<User> {
    const user = await this.userGetRequestService.execute();

    return this.userUpdateRequestService.execute(user.id, input);
  }

  @Mutation(() => User)
  async deleteUser(@Args('userId') userId: string): Promise<boolean> {
    return this.userDeleteRequestService.execute(userId);
  }
}
