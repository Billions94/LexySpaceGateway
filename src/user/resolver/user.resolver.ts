import { Injectable } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User, UserInput } from '../../dto';

@Resolver(() => User)
@Injectable()
export class UserResolver {
  constructor() {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return '' as unknown as User[];
  }
  @Query(() => User)
  async getUserById(): Promise<User> {
    return '' as unknown as User;
  }

  @Mutation(() => User)
  async updateUser(@Args('userId') userId: string, @Args('input') input: UserInput): Promise<User> {
    return '' as unknown as User;
  }

  @Mutation(() => User)
  async deleteUser(@Args('userId') userId: string): Promise<boolean> {
    return true;
  }
}
