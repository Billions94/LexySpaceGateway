import { AbstractRequestService } from '../../../core/request/abstract-request.service';
import { api } from '../../../api/api';
import { Injectable, Logger } from '@nestjs/common';
import { User } from '../../../dto';
import { UserResponseMapper } from '../../response/user-response.mapper';

@Injectable()
export class UserFollowersRequestService extends AbstractRequestService {
  constructor(private userResponseMapper: UserResponseMapper) {
    super();
  }

  async execute(userId: string): Promise<User[]> {
    const requestHandler = this.requestHandlerFactory.createGetRequest(
      api.handler.AUDIENCE
    );

    const parameterHandler = this.createParameterHandler();
    parameterHandler.append('userId', userId);

    const response = await this.handleGetRequest(
      requestHandler,
      parameterHandler
    );

    Logger.debug(response);

    return this.userResponseMapper.mapUsers(response.followers);
  }
}
