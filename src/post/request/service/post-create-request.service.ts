import { Injectable } from '@nestjs/common';
import { Post, PostInput } from '../../../dto';
import { api } from '../../../api/api';
import { AbstractRequestService } from '../../../core/request/abstract-request.service';
import { PostResponseMapper } from '../../../post/response/post-response.mapper';
import { PostsRequestMapper } from '../mapper/post-request.mapper';

@Injectable()
export class PostCreateRequestService extends AbstractRequestService {
  constructor(
    private postResponseMapper: PostResponseMapper,
    private postRequestMapper: PostsRequestMapper
  ) {
    super();
  }
  async execute(userName: string, input: PostInput): Promise<Post> {
    const requestHandler = this.requestHandlerFactory.createPostRequest(
      api.handler.CREATE_POST
    );

    const parameterHandler = this.createParameterHandler();
    parameterHandler.append('userName', userName);

    const requestBody = this.postRequestMapper.map(input);

    const response = await this.handlePostRequest(
      requestHandler,
      requestBody,
      parameterHandler
    );

    return this.postResponseMapper.mapPostData(response);
  }
}
