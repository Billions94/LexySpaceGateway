import { AbstractRequestService } from '../../../core/request/abstract-request.service';
import { api } from '../../../api/api';
import { Injectable } from '@nestjs/common';
import { User } from '../../../dto';
import { UserResponseMapper } from '../../../user/response/user-response.mapper';

@Injectable()
export class UserGetRequestService extends AbstractRequestService {
  constructor(private userResponseMapper: UserResponseMapper) {
    super();
  }

  async execute(): Promise<User> {
    const requestHandler = this.requestHandlerFactory.createGetRequest(
      api.handler.USER
    );

    const response = await this.handleGetRequest(requestHandler);

    return this.userResponseMapper.map(response);
  }
}
