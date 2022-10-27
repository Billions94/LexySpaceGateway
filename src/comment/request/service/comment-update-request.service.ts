import { Injectable } from '@nestjs/common';
import { api } from '../../../api/api';
import { AbstractRequestService } from '../../../core/request/abstract-request.service';
import { CommentRequestMapper } from '../mapper/comment-request.mapper';
import { CommentResponseMapper } from '../../../comment/response/comment-response-mapper';
import { CommentInput, Comment } from '../../../dto';

@Injectable()
export class CommentUpdateRequestService extends AbstractRequestService {
  constructor(
    private commentRequestMapper: CommentRequestMapper,
    private commentResponseMapper: CommentResponseMapper
  ) {
    super();
  }

  async execute(commentId: string, input: CommentInput): Promise<Comment> {
    const requestHandler = this.requestHandlerFactory.createPatchRequest(
      api.handler.UPDATE_COMMENT
    );

    const parameterHandler = this.createParameterHandler();
    parameterHandler.append('commentId', commentId);

    const requestBody = this.commentRequestMapper.map(input);

    const response = await this.handlePatchRequest(
      requestHandler,
      requestBody,
      parameterHandler
    );

    return this.commentResponseMapper.mapCommentData(response);
  }
}
