import { Module } from '@nestjs/common';
import { CommentResolver } from './resolver/comment.resolver';
import { CommentCreateRequestService } from './request/service/comment-create-request.service';
import { CommentRequestMapper } from './request/mapper/comment-request.mapper';
import { CoreModule } from '../core/core.module';
import { ApiModule } from '../api/api.module';
import { CommentResponseMapper } from './response/comment-response-mapper';
import { CommentsRequestService } from './request/service/comments-request.service';
import { CommentGetRequestService } from './request/service/comment-get-request.service';
import { CommentUpdateRequestService } from './request/service/comment-update-request.service';
import { CommentDeleteRequestService } from './request/service/comment-delete-request.service';

@Module({
  imports: [CoreModule, ApiModule],
  providers: [
    // Resolver
    CommentResolver,

    // Request Mapper
    CommentRequestMapper,

    // Request Service
    CommentCreateRequestService,
    CommentsRequestService,
    CommentGetRequestService,
    CommentUpdateRequestService,
    CommentDeleteRequestService,

    // Response Mapper
    CommentResponseMapper,
  ],
})
export class CommentModule {}
