import { Injectable } from '@nestjs/common';
import { AbstractRequestService } from '../../../core/request/abstract-request.service';
import { PostResponseMapper } from '../../response/post-response.mapper';
import { Post } from '../../../dto';
import { api } from '../../../api/api';

@Injectable()
export class PostGetRequestService extends AbstractRequestService {
  constructor(private postResponseMapper: PostResponseMapper) {
    super();
  }

  async execute(postId: string): Promise<Post> {
    const requestHandler = this.requestHandlerFactory.createGetRequest(
      api.handler.GET_POST
    );

    const parameterHandler = this.createParameterHandler();
    parameterHandler.append('postId', postId);

    const response = await this.handleGetRequest(
      requestHandler,
      parameterHandler
    );

    return this.postResponseMapper.mapPostData(response?.post);
  }
}
