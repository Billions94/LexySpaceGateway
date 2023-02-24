import { AbstractRequestService } from '../../../core/request/abstract-request.service';
import { api } from '../../../api/api';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserDeleteRequestService extends AbstractRequestService {
  async execute(userId: string): Promise<boolean> {
    const requestHandler = this.requestHandlerFactory.createDeleteRequest(
      api.handler.DELETE_USER
    );

    const parameterHandler = this.createParameterHandler();
    parameterHandler.append('userId', userId);

    await this.handleDeleteRequest(requestHandler, parameterHandler);
    
    return true;
  }
}
