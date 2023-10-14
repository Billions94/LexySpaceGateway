import { AbstractRequestService } from '../../../core/request/abstract-request.service';
import { api } from '../../../api/api';
import { Injectable } from '@nestjs/common';
import { Error, Success, UserResponse } from '../../../dto';
import { UserResponseMapper } from '../../response/user-response.mapper';

@Injectable()
export class UserByUsernameRequestService extends AbstractRequestService {
  constructor(private userResponseMapper: UserResponseMapper) {
    super();
  }

  async execute(username: string): Promise<UserResponse> {
    const requestHandler = this.requestHandlerFactory.createGetRequest(
      api.handler.USER_BY_USERNAME
    );

    const parameterHandler = this.createParameterHandler();
    parameterHandler.append('username', username);

    const response = await this.handleGetRequest(
      requestHandler,
      parameterHandler
    );

    if (response === 'User not found!') {
      return {
        error: {
          message: response,
        },
      } as Error;
    }

    return {
      data: {
        user: this.userResponseMapper.map(response),
      },
    } as Success;
  }
}
