import { Module } from '@nestjs/common';
import { ApiModule } from '../api/api.module';
import { CoreModule } from '../core/core.module';
import { PostResolver } from './resolver/post.resolver';
import { PostService } from './service/post.service';

@Module({
  imports: [CoreModule, ApiModule],
  providers: [PostResolver, PostService]
})
export class PostModule {}
