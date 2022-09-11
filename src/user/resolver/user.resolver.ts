import { Injectable } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User, UserInput } from '../../dto';
import { UserDeleteRequestService } from '../request/service/user-delete.request.service';
import { UserGetRequestService } from '../request/service/user-get-request.service';
import { UserUpdateRequestService } from '../request/service/user-update-request.service';

@Resolver(() => User)
@Injectable()
export class UserResolver {
  constructor(
    private userGetRequestService: UserGetRequestService,
    private userUpdateRequestService: UserUpdateRequestService,
    private userDeleteRequestService: UserDeleteRequestService
  ) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return '' as unknown as User[];
  }
  @Query(() => User)
  async user(): Promise<User> {
    return this.userGetRequestService.execute();
  }

  @Mutation(() => User)
  async updateUser(@Args('userId') userId: string, @Args('input') input: UserInput): Promise<User> {
    return this.userUpdateRequestService.execute(userId, input);
  }

  @Mutation(() => User)
  async deleteUser(@Args('userId') userId: string): Promise<boolean> {
    return this.userDeleteRequestService.execute(userId);
  }
}
