import { Injectable } from '@nestjs/common';
import { UserResponseMapper } from '../../../user/response/user-response.mapper';
import { AbstractRequestService } from '../../../core/request/abstract-request.service';
import { User } from '../../../dto';
import { api } from '../../../api/api';

@Injectable()
export class UsersRequestService extends AbstractRequestService {
  constructor(private userResponseMapper: UserResponseMapper) {
    super();
  }

  async execute(): Promise<User[]> {
    const requestHandler = this.requestHandlerFactory.createGetRequest(
      api.handler.USERS
    );

    const response = await this.handleGetRequest(requestHandler);

    return this.userResponseMapper.mapUsers(response);
  }
}
