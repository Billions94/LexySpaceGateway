import { Module } from '@nestjs/common';
import { ApiModule } from '../api/api.module';
import { CoreModule } from '../core/core.module';
import { PostsRequestMapper } from './request/mapper/post-request.mapper';
import { PostGetRequestService } from './request/service/post-get-request.service';
import { PostsRequestService } from './request/service/posts-request.service';
import { PostUpdateRequestService } from './request/service/post-update-request.service';
import { PostResolver } from './resolver/post.resolver';
import { PostResponseMapper } from './response/post-response.mapper';
import { PostDeleteRequestService } from './request/service/post-delete-request.service';


@Module({
  imports: [CoreModule, ApiModule],
  providers: [
    // Resolvers
    PostResolver,

    // Request mapper
    PostsRequestMapper,

    // Request service
    PostsRequestService,
    PostGetRequestService,
    PostUpdateRequestService,
    PostDeleteRequestService,

    // Response mapper
    PostResponseMapper,
  ],
})
export class PostModule {}
