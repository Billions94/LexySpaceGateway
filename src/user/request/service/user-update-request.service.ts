import { AbstractRequestService } from '../../../core/request/abstract-request.service';
import { api } from '../../../api/api';
import { Injectable } from '@nestjs/common';
import { User, UserInput } from '../../../dto';
import { UserResponseMapper } from '../../response/user-response.mapper';
import { UserRequestMapper } from '../mapper/user-request.mapper';
import { CloudinaryUploadRequestService } from '../../../upload/request/cloudinary-upload-request.service';

@Injectable()
export class UserUpdateRequestService extends AbstractRequestService {
  constructor(
    private readonly uploadRequestService: CloudinaryUploadRequestService,
    private userRequestMapper: UserRequestMapper,
    private userResponseMapper: UserResponseMapper
  ) {
    super();
  }

  async execute(input: UserInput, files?: any): Promise<User> {
    const requestHandler = this.requestHandlerFactory.createPatchRequest(
      api.handler.UPDATE_USER
    );

    const requestBody = this.userRequestMapper.map(input);
    requestBody.image = (await this.uploadRequestService.execute(
      files,
      'image'
    )) as string;

    const { user } = await this.handlePatchRequest(requestHandler, requestBody);
    return this.userResponseMapper.map(user);
  }
}
