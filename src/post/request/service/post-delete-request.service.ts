import { Injectable } from '@nestjs/common';
import { api } from '../../../api/api';
import { AbstractRequestService } from '../../../core/request/abstract-request.service';

@Injectable()
export class PostDeleteRequestService extends AbstractRequestService {
  async execute(postId: string): Promise<boolean> {
    const requestHandler = this.requestHandlerFactory.createDeleteRequest(
      api.handler.DELETE_POST
    );

    const parameterHandler = this.createParameterHandler();
    parameterHandler.append('postId', postId);

    await this.handleDeleteRequest(requestHandler, parameterHandler);

    return true;
  }
}
