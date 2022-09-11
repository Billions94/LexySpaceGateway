import { Injectable } from '@nestjs/common';
import { api } from '../../../api/api';
import { AbstractRequestService } from '../../../core/request/abstract-request.service';
import { Post, PostInput } from '../../../dto';
import { PostResponseMapper } from '../../response/post-response.mapper';
import { PostsRequestMapper } from '../mapper/post-request.mapper';

@Injectable()
export class PostUpdateRequestService extends AbstractRequestService {
  constructor(
    private postResponseMapper: PostResponseMapper,
    private postRequestMapper: PostsRequestMapper
  ) {
    super();
  }

  async execute(postId: string, input: PostInput): Promise<Post> {
    const requestHandler = this.requestHandlerFactory.createPatchRequest(
      api.handler.UPDATE_POST
    );

    const parameterHandler = this.createParameterHandler();
    parameterHandler.append('postId', postId);

    const requestBody = this.postRequestMapper.map(input);

    const response = await this.handlePatchRequest(
      requestHandler,
      requestBody,
      parameterHandler
    );

    return this.postResponseMapper.mapPostData(response);
  }
}
