import { Module } from '@nestjs/common';
import { ApiModule } from '../api/api.module';
import { CommentModule } from '../comment/comment.module';
import { CoreModule } from '../core/core.module';
import { CloudinaryUploadRequestService } from '../upload/request/cloudinary-upload-request.service';
import { UserModule } from '../user/user.module';
import { PostsRequestMapper } from './request/mapper/post-request.mapper';
import { PostCreateRequestService } from './request/service/post-create-request.service';
import { PostDeleteRequestService } from './request/service/post-delete-request.service';
import { PostGetRequestService } from './request/service/post-get-request.service';
import { PostLikeRequestService } from './request/service/post-like-request.service';
import { PostUpdateRequestService } from './request/service/post-update-request.service';
import { PostsRequestService } from './request/service/posts-request.service';
import { PostResolver } from './resolver/post.resolver';
import { PostResponseMapper } from './response/post-response.mapper';

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
    CloudinaryUploadRequestService,

    // Response mapper
    PostResponseMapper,
  ],
})
export class PostModule {}
