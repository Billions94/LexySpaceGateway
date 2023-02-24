import { Injectable } from '@nestjs/common';
import { api } from '../../../api/api';
import { AbstractRequestService } from '../../../core/request/abstract-request.service';

@Injectable()
export class CommentDeleteRequestService extends AbstractRequestService {
  async execute(commentId: string): Promise<boolean> {
    const requestHandler = this.requestHandlerFactory.createDeleteRequest(
      api.handler.DELETE_COMMENT
    );

    const parameterHandler = this.createParameterHandler();
    parameterHandler.append('commentId', commentId);

    const isDeleted = await this.handleDeleteRequest(
      requestHandler,
      parameterHandler
    );

    if (isDeleted) {
      return true;
    }

    return false;
  }
}
