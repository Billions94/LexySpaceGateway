import { AbstractRequestService } from '../../../core/request/abstract-request.service';
import { api } from '../../../api/api';
import { Injectable } from '@nestjs/common';
import { User } from '../../../dto';

@Injectable()
export class UserRequestService extends AbstractRequestService {
  async execute(userId: string): Promise<User> {
    const requestHandler = this.requestHandlerFactory.createGetRequest(
      api.handler.USER
    );

    const parameterHandler = this.createParameterHandler();
    parameterHandler.append('userId', userId);

    const response = await this.handleGetRequest(requestHandler, parameterHandler);
    return '' as unknown as User;
  }
}
