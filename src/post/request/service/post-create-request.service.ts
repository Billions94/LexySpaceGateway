import { Injectable } from '@nestjs/common';
import { api } from '../../../api/api';
import { AbstractRequestService } from '../../../core/request/abstract-request.service';
import { PostInput, PostResponse } from '../../../dto';
import { CloudinaryUploadRequestService } from '../../../upload/request/cloudinary-upload-request.service';
import { PostResponseMapper } from '../../response/post-response.mapper';
import { PostsRequestMapper } from '../mapper/post-request.mapper';

@Injectable()
export class PostCreateRequestService extends AbstractRequestService {
  constructor(
    private postResponseMapper: PostResponseMapper,
    private postRequestMapper: PostsRequestMapper,
    private readonly uploadService: CloudinaryUploadRequestService
  ) {
    super();
  }
  async execute(input: PostInput, file: any): Promise<PostResponse> {
    const requestHandler = this.requestHandlerFactory.createPostRequest(
      api.handler.CREATE_POST
    );

    const requestBody = this.postRequestMapper.map(input);

    if (file)
      requestBody.media = (await this.uploadService.execute(
        file,
        'getUrl'
      )) as string;

    const response = await this.handlePostRequest(requestHandler, requestBody);
    return this.postResponseMapper.mapNewPost(response);
  }
}
