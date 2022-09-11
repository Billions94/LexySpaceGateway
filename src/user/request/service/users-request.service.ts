import { AbstractRequestService } from '../../../core/request/abstract-request.service';
import { api } from '../../../api/api';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRequestService extends AbstractRequestService {
  async execute(userId: string): Promise<boolean> {
    const requestHandler = this.requestHandlerFactory.createDeleteRequest(
      api.handler
    );

    const parameterHandler = this.createParameterHandler();
    parameterHandler.append('userId', userId);

    const response = await this.handleDeleteRequest(requestHandler, parameterHandler);
    return true;
  }
}
