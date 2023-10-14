import { Injectable } from '@nestjs/common';
import { AbstractRequestService } from '../../../core/request/abstract-request.service';
import { UserResponseMapper } from '../../response/user-response.mapper';
import { api } from '../../../api/api';
import { User } from '../../../dto';

@Injectable()
export class UserGetFollowingRequestService extends AbstractRequestService {
  constructor(private userResponseMapper: UserResponseMapper) {
    super();
  }

  async execute(): Promise<User[]> {
    const requestHandler = this.requestHandlerFactory.createGetRequest(
      api.handler.FOLLOWING
    );

    const response = await this.handleGetRequest(requestHandler);
    return this.userResponseMapper.mapUsers(response);
  }
}
