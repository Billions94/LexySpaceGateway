import { Injectable } from '@nestjs/common';
import { api } from '../../../api/api';
import { AbstractRequestService } from '../../../core/request/abstract-request.service';
import { Post } from '../../../dto';
import { GetPostRequestHandler } from '../../../api/request/handlers/get-post-request.handler';
import { PostResponseMapper } from '../../../post/response/post-response.mapper';

@Injectable()
export class PostByIdRequestService extends AbstractRequestService {
  constructor(private postResponseMapper: PostResponseMapper) {
    super();
  }

  async execute(postId: string): Promise<Post> {
    console.log('the postId is', postId);
    const requestHandler = this.requestHandlerFactory.createGetRequest(
      api.handler.POST_BY_ID
    );

    const parameterHandler = this.createParameterHandler();
    parameterHandler.append('postId', postId);

    // GetPostRequestHandler.forwardParams(postId);

    const response = await this.handleGetRequest(
      requestHandler,
      parameterHandler
    );

    return this.postResponseMapper.mapPostData(response);
  }
}
