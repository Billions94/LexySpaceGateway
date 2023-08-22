import { Injectable } from '@nestjs/common';
import { api } from '../../../api/api';
import { AbstractRequestService } from '../../../core/request/abstract-request.service';
import { ReplyRequestMapper } from '../mapper/reply-request.mapper';
import { Reply, ReplyInput } from '../../../dto';
import { ReplyResponseMapper } from '../../response/reply-response-mapper';

@Injectable()
export class ReplyCreateRequestService extends AbstractRequestService {
  constructor(
    private replyRequestMapper: ReplyRequestMapper,
    private replyResponseMapper: ReplyResponseMapper
  ) {
    super();
  }

  async execute(commentId: string, input: ReplyInput): Promise<Reply> {
    const requestHandler = this.requestHandlerFactory.createPostRequest(
      api.handler.CREATE_REPLY
    );

    const parameterHandler = this.createParameterHandler();
    parameterHandler.append('commentId', commentId);

    const requestBody = this.replyRequestMapper.map(input);

    const response = await this.handlePostRequest(
      requestHandler,
      requestBody,
      parameterHandler
    );

    return this.replyResponseMapper.mapReply(response);
  }
}
