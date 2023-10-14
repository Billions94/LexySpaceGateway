import { Module } from '@nestjs/common';
import { ApiModule } from '../api/api.module';
import { CoreModule } from '../core/core.module';
import { UserRequestMapper } from './request/mapper/user-request.mapper';
import { UserByUsernameRequestService } from './request/service/user-by-username-request.service';
import { UserDeleteRequestService } from './request/service/user-delete.request.service';
import { UserGetRequestService } from './request/service/user-get-request.service';
import { UserUpdateRequestService } from './request/service/user-update-request.service';
import { UsersRequestService } from './request/service/users-request.service';
import { UserResolver } from './resolver/user.resolver';
import { UserResponseMapper } from './response/user-response.mapper';
import { UserGetFollowersRequestService } from './request/service/user-get-followers-request.service';
import { CloudinaryUploadModule } from '../upload/cloudinaryUpload.module';
import { UserAddCoverRequestService } from './request/service/user-add-cover-request.service';
import { UserGetFollowingRequestService } from './request/service/user-get-following-request.service';
import { UserFollowRequestService } from './request/service/user-follow-request.service';
import { UserResponseResolver } from './resolver/userResponse.resolver';

@Module({
  imports: [CoreModule, ApiModule, CloudinaryUploadModule],
  providers: [
    // Resolver
    UserResolver,
    UserResponseResolver,

    // Request mapper
    UserRequestMapper,

    // Request service
    UsersRequestService,
    UserGetRequestService,
    UserByUsernameRequestService,
    UserFollowRequestService,
    UserGetFollowersRequestService,
    UserGetFollowingRequestService,
    UserAddCoverRequestService,
    UserUpdateRequestService,
    UserDeleteRequestService,

    // Response mapper
    UserResponseMapper,
  ],
  exports: [UserGetRequestService, UserResponseMapper],
})
export class UserModule {}
