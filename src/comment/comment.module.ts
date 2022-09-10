import { Module } from '@nestjs/common';
import { CommentResolver } from './resolver/comment.resolver';
import { CommentService } from './service/comment.service';

@Module({
  providers: [CommentResolver, CommentService]
})
export class CommentModule {}
