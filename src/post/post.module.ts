import { Module } from '@nestjs/common';
import { ApiModule } from '../api/api.module';
import { CoreModule } from '../core/core.module';
import { PostByIdRequestService } from './request/service/post-by-id-request.service';
import { PostsRequestService } from './request/service/posts-request.service';
import { PostResolver } from './resolver/post.resolver';
import { PostResponseMapper } from './response/post-response.mapper';


@Module({
  imports: [CoreModule, ApiModule],
  providers: [
    // Resolvers
    PostResolver,

    // Request service
    PostsRequestService,
    PostByIdRequestService,

    // Response mapper
    PostResponseMapper,
  ],
})
export class PostModule {}
