import { Injectable } from '@nestjs/common';
import { AbstractRequestService } from '../../../core/request/abstract-request.service';
import { CloudinaryUploadRequestService } from '../../../upload/request/cloudinary-upload-request.service';
import { api } from '../../../api/api';
import { UserResponseMapper } from '../../response/user-response.mapper';

@Injectable()
export class UserAddCoverRequestService extends AbstractRequestService {
  constructor(
    private readonly uploadRequestService: CloudinaryUploadRequestService,
    private readonly userResponseMapper: UserResponseMapper
  ) {
    super();
  }
  async execute(files: any) {
    const requestHandler = this.requestHandlerFactory.createPatchRequest(
      api.handler.UPDATE_USER
    );

    const reqBody = {
      cover: (await this.uploadRequestService.execute(
        files,
        'image'
      )) as string,
    };

    const { user } = await this.handlePatchRequest(requestHandler, reqBody);
    return this.userResponseMapper.map(user);
  }
}
