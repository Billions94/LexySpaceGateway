import { AbstractRequestService } from '../../../core/request/abstract-request.service';
import { api } from '../../../api/api';
import { Injectable } from '@nestjs/common';
import { User } from '../../../dto';
import { UserResponseMapper } from '../../response/user-response.mapper';

@Injectable()
export class UserGetFollowersRequestService extends AbstractRequestService {
  constructor(private userResponseMapper: UserResponseMapper) {
    super();
  }

  async execute(): Promise<User[]> {
    const requestHandler = this.requestHandlerFactory.createGetRequest(
      api.handler.FOLLOWERS
    );

    const response = await this.handleGetRequest(requestHandler);
    return this.userResponseMapper.mapUsers(response);
  }
}
