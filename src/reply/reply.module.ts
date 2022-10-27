import { Module } from '@nestjs/common';
import { ApiModule } from '../api/api.module';
import { CoreModule } from '../core/core.module';
import { ReplyResolver } from './resolver/reply.resolver';
import { ReplyRequestMapper } from './request/mapper/reply-request.mapper';
import { ReplyCreateRequestService } from './request/service/reply-create-request.service';
import { ReplyResponseMapper } from './response/reply-response-mapper';
import { RepliessRequestService } from './request/service/replies-request.service';
import { ReplyGetRequestService } from './request/service/reply-get-request.service';
import { ReplyUpdateRequestService } from './request/service/reply-update-request.service';
import { ReplyDeleteRequestService } from './request/service/reply-delete-request.service';

@Module({
  imports: [CoreModule, ApiModule],
  providers: [
    // Resolver
    ReplyResolver,

    // Request mapper
    ReplyRequestMapper,

    // Request service
    ReplyCreateRequestService,
    RepliessRequestService,
    ReplyGetRequestService,
    ReplyUpdateRequestService,
    ReplyDeleteRequestService,

    // Response mapper
    ReplyResponseMapper,
  ],
})
export class ReplyModule {}
