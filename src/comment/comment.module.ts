import { Module } from '@nestjs/common';
import { CommentResolver } from './resolver/comment.resolver';
import { CommentService } from './request/service/comment-create-request.service';

@Module({
  providers: [CommentResolver, CommentService]
})
export class CommentModule {}
