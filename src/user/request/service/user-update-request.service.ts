import { AbstractRequestService } from '../../../core/request/abstract-request.service';
import { api } from '../../../api/api';
import { Injectable } from '@nestjs/common';
import { User, UserInput } from '../../../dto';
import { UserResponseMapper } from '../../../user/response/user-response.mapper';
import { UserRequestMapper } from '../mapper/user-request.mapper';

@Injectable()
export class UserUpdateRequestService extends AbstractRequestService {
  constructor(
    private userRequestMapper: UserRequestMapper,
    private userResponseMapper: UserResponseMapper
  ) {
    super();
  }

  async execute(userId: string, input: UserInput): Promise<User> {
    const requestHandler = this.requestHandlerFactory.createPatchRequest(
      api.handler.UPDATE_USER
    );

    const parameterHandler = this.createParameterHandler();
    parameterHandler.append('userId', userId);

    const requestBody = this.userRequestMapper.map(input);

    const response = await this.handlePatchRequest(
      requestHandler,
      requestBody,
      parameterHandler
    );
    
    return this.userResponseMapper.map(response);
  }
}
