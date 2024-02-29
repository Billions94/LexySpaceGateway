import { Injectable } from '@nestjs/common';
import { api } from '../../../api/api';
import { AbstractRequestService } from '../../../core/request/abstract-request.service';
import { CommentResponseMapper } from '../../response/comment-response-mapper';
import { Comment } from '../../../dto';

@Injectable()
export class CommentsRequestService extends AbstractRequestService {
  constructor(private commentResponseMapper: CommentResponseMapper) {
    super();
  }

  async execute(): Promise<Comment[]> {
    const requestHandler = this.requestHandlerFactory.createGetRequest(
      api.handler.COMMENTS
    );

    const response = await this.handleGetRequest(requestHandler);

    return this.commentResponseMapper.map(response);
  }
}
