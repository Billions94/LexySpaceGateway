import { Module } from '@nestjs/common';
import { ApiModule } from '../api/api.module';
import { CoreModule } from '../core/core.module';
import { UserRequestMapper } from './request/mapper/user-request.mapper';
import { UserByIdRequestService } from './request/service/user-by-id-request.service';
import { UserDeleteRequestService } from './request/service/user-delete.request.service';
import { UserGetRequestService } from './request/service/user-get-request.service';
import { UserUpdateRequestService } from './request/service/user-update-request.service';
import { UsersRequestService } from './request/service/users-request.service';
import { UserResolver } from './resolver/user.resolver';
import { UserResponseMapper } from './response/user-response.mapper';

@Module({
  imports: [CoreModule, ApiModule],
  providers: [
    // Resolver
    UserResolver,

    // Request mapper
    UserRequestMapper,

    // Request service
    UsersRequestService,
    UserGetRequestService,
    UserByIdRequestService,
    UserUpdateRequestService,
    UserDeleteRequestService,

    // Response mapper
    UserResponseMapper,
  ],
  exports: [UserGetRequestService, UserResponseMapper],
})
export class UserModule {}
