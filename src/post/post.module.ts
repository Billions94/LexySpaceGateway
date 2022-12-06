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
import { PostCreateRequestService } from './request/service/post-create-request.service';
import { UserModule } from '../user/user.module';
import { PostLikeRequestService } from './request/service/post-like-request.service';
import { CommentModule } from '../comment/comment.module';

@Module({
  imports: [CoreModule, ApiModule, UserModule, CommentModule],
  providers: [
    // Resolvers
    PostResolver,

    // Request mapper
    PostsRequestMapper,

    // Request service
    PostCreateRequestService,
    PostsRequestService,
    PostGetRequestService,
    PostUpdateRequestService,
    PostLikeRequestService,
    PostDeleteRequestService,

    // Response mapper
    PostResponseMapper,
  ],
})
export class PostModule {}
