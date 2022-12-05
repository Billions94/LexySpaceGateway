import { AbstractRequestService } from '../../../core/request/abstract-request.service';
import { api } from '../../../api/api';
import { Injectable } from '@nestjs/common';
import { User } from '../../../dto';
import { UserResponseMapper } from '../../../user/response/user-response.mapper';

@Injectable()
export class UserByIdRequestService extends AbstractRequestService {
  constructor(private userResponseMapper: UserResponseMapper) {
    super();
  }

  async execute(userId: string): Promise<User> {
    const requestHandler = this.requestHandlerFactory.createGetRequest(
      api.handler.USER_BY_ID
    );

    const parameterHandler = this.createParameterHandler();
    parameterHandler.append('userId', userId);

    const response = await this.handleGetRequest(
      requestHandler,
      parameterHandler
    );

    return this.userResponseMapper.map(response);
  }
}
