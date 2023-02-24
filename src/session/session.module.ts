import { Module } from '@nestjs/common';
import { SessionResolver } from './resolver/session.resolver';
import { SessionGetRequestService } from './request/service/session-get-request.service';
import { SessionRequestMapper } from './request/mapper/session-request.mapper';
import { CoreModule } from '../core/core.module';
import { ApiModule } from '../api/api.module';
import { SessionResponseMapper } from './response/session-response.mapper';
import { SessionDeleteRequestService } from './request/service/session-delete-request.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [CoreModule, ApiModule, UserModule],
  providers: [
    // Resolver
    SessionResolver,

    // Request mapper
    SessionRequestMapper,

    // Request service
    SessionGetRequestService,
    SessionDeleteRequestService,

    // Response mapper
    SessionResponseMapper,
  ],
  exports: [SessionRequestMapper],
})
export class SessionModule {}
