import { Injectable } from '@nestjs/common';
import { api } from '../../../api/api';
import { AbstractRequestService } from '../../../core/request/abstract-request.service';
import { CommentResponseMapper } from '../../../comment/response/comment-response-mapper';
import { Comment } from '../../../dto';

@Injectable()
export class CommentDeleteRequestService extends AbstractRequestService {
  constructor(private commentResponseMapper: CommentResponseMapper) {
    super();
  }

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
