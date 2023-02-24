import { Injectable } from '@nestjs/common';
import { ReplyResponseMapper } from '../../../reply/response/reply-response-mapper';
import { api } from '../../../api/api';
import { AbstractRequestService } from '../../../core/request/abstract-request.service';
import { Reply, ReplyInput } from '../../../dto';
import { ReplyRequestMapper } from '../mapper/reply-request.mapper';

@Injectable()
export class ReplyUpdateRequestService extends AbstractRequestService {
  constructor(
    private replyRequestMapper: ReplyRequestMapper,
    private replyResponseMapper: ReplyResponseMapper
  ) {
    super();
  }

  async execute(replyId: string, input: ReplyInput): Promise<Reply> {
    const requestHandler = this.requestHandlerFactory.createPatchRequest(
      api.handler.UPDATE_REPLY
    );

    const parameterHandler = this.createParameterHandler();
    parameterHandler.append('replyId', replyId);

    const requestBody = this.replyRequestMapper.map(input);

    const response = await this.handlePatchRequest(
      requestHandler,
      requestBody,
      parameterHandler
    );

    return this.replyResponseMapper.mapReplyData(response);
  }
}
