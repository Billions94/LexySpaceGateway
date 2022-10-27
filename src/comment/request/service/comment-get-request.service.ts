import { Injectable } from '@nestjs/common';
import { api } from '../../../api/api';
import { AbstractRequestService } from '../../../core/request/abstract-request.service';
import { CommentResponseMapper } from '../../../comment/response/comment-response-mapper';
import { Comment } from '../../../dto';

@Injectable()
export class CommentGetRequestService extends AbstractRequestService {
  constructor(private commentResponseMapper: CommentResponseMapper) {
    super();
  }

  async execute(commentId: string): Promise<Comment> {
    const requestHandler = this.requestHandlerFactory.createGetRequest(
      api.handler.GET_COMMENT
    );

    const parameterHandler = this.createParameterHandler();
    parameterHandler.append('commentId', commentId);

    const response = await this.handleGetRequest(
      requestHandler,
      parameterHandler
    );

    return this.commentResponseMapper.mapCommentData(response);
  }
}
