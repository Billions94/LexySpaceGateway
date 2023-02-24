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
import { UserModule } from '../user/user.module';
import { ReplyModule } from '../reply/reply.module';

@Module({
  imports: [CoreModule, ApiModule, UserModule, ReplyModule],
  providers: [
    // Resolver
    CommentResolver,

    // Request mapper
    CommentRequestMapper,

    // Request service
    CommentCreateRequestService,
    CommentsRequestService,
    CommentGetRequestService,
    CommentUpdateRequestService,
    CommentDeleteRequestService,

    // Response mapper
    CommentResponseMapper,
  ],
  exports: [CommentResponseMapper],
})
export class CommentModule {}
