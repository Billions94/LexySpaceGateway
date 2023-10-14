import { Injectable } from '@nestjs/common';
import { ResolveField, Resolver } from '@nestjs/graphql';

@Resolver('UserResponse')
@Injectable()
export class UserResponseResolver {
  @ResolveField()
  __resolveType(value: any) {
    if (typeof value === 'object') {
      if ('data' in value) {
        return 'Success';
      }

      if ('error' in value) {
        return 'Error';
      }
    }

    return null;
  }
}
