import { Injectable, Logger } from '@nestjs/common';
import { api } from '../../../api/api';
import { AbstractRequestService } from '../../../core/request/abstract-request.service';
import { PostInput, PostResponse } from '../../../dto';
import { CloudinaryUploadRequestService } from '../../../upload/request/cloudinary-upload-request.service';
import { PostResponseMapper } from '../../response/post-response.mapper';
import { PostsRequestMapper } from '../mapper/post-request.mapper';

@Injectable()
export class PostUpdateRequestService extends AbstractRequestService {
  constructor(
    private postResponseMapper: PostResponseMapper,
    private postRequestMapper: PostsRequestMapper,
    private readonly uploadService: CloudinaryUploadRequestService
  ) {
    super();
  }

  async execute(
    postId: string,
    input: PostInput,
    file: any
  ): Promise<PostResponse> {
    const requestHandler = this.requestHandlerFactory.createPatchRequest(
      api.handler.UPDATE_POST
    );

    const parameterHandler = this.createParameterHandler();
    parameterHandler.append('postId', postId);

    const requestBody = this.postRequestMapper.map(input);

    if (file)
      requestBody.media = (await this.uploadService.execute(
        file,
        'getUrl'
      )) as string;

    Logger.debug(requestBody);

    const response = await this.handlePatchRequest(
      requestHandler,
      requestBody,
      parameterHandler
    );

    return this.postResponseMapper.mapPostData(
      response?.post,
      'object'
    ) as PostResponse;
  }
}
