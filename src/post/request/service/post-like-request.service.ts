import { Injectable } from '@nestjs/common';
import { api } from '../../../api/api';
import { AbstractRequestService } from '../../../core/request/abstract-request.service';

@Injectable()
export class PostLikeRequestService extends AbstractRequestService {
  async execute(postId: string): Promise<boolean> {
    const requestHandler = this.requestHandlerFactory.createPatchRequest(
      api.handler.POST_LIKE
    );

    const parameterHandler = this.createParameterHandler();
    parameterHandler.append('postId', postId);

    const result = await this.handlePatchRequest(
      requestHandler,
      '',
      parameterHandler
    );

    if (result === true) {
      return true;
    }

    return false;
  }
}
