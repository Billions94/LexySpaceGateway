import { Module } from '@nestjs/common';
import { ReplyResolver } from './reply.resolver';
import { ReplyService } from './reply.service';

@Module({
  providers: [ReplyResolver, ReplyService]
})
export class ReplyModule {}
