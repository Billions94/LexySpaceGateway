import { Injectable } from '@nestjs/common';
import { api } from '../../../api/api';
import { AbstractRequestService } from '../../../core/request/abstract-request.service';
import { CommentRequestMapper } from '../mapper/comment-request.mapper';
import { CommentResponseMapper } from '../../response/comment-response-mapper';
import { CommentInput, Comment } from '../../../dto';

@Injectable()
export class CommentCreateRequestService extends AbstractRequestService {
  constructor(
    private commentRequestMapper: CommentRequestMapper,
    private commentResponseMapper: CommentResponseMapper
  ) {
    super();
  }

  async execute(postId: string, input: CommentInput): Promise<Comment> {
    const requestHandler = this.requestHandlerFactory.createPostRequest(
      api.handler.CREATE_COMMENT
    );

    const parameterHandler = this.createParameterHandler();
    parameterHandler.append('postId', postId);

    const requestBody = this.commentRequestMapper.map(input);

    const response = await this.handlePostRequest(
      requestHandler,
      requestBody,
      parameterHandler
    );

    return this.commentResponseMapper.mapCommentData(response);
  }
}
