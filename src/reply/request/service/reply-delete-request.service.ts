import { Injectable } from '@nestjs/common';
import { api } from '../../../api/api';
import { AbstractRequestService } from '../../../core/request/abstract-request.service';
import { ReplyResponseMapper } from '../../../reply/response/reply-response-mapper';

@Injectable()
export class ReplyDeleteRequestService extends AbstractRequestService {
  async execute(replyId: string): Promise<boolean> {
    const requestHandler = this.requestHandlerFactory.createDeleteRequest(
      api.handler.DELETE_REPLY
    );

    const parameterHandler = this.createParameterHandler();
    parameterHandler.append('replyId', replyId);

    const isDeleted = await this.handleDeleteRequest(
      requestHandler,
      parameterHandler
    );

    if (isDeleted === true) {
      return true;
    }

    return false;
  }
}
