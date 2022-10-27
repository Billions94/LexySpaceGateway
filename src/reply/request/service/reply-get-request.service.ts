import { Injectable } from '@nestjs/common';
import { api } from '../../../api/api';
import { AbstractRequestService } from '../../../core/request/abstract-request.service';
import { Reply } from '../../../dto';
import { ReplyResponseMapper } from '../../../reply/response/reply-response-mapper';

@Injectable()
export class ReplyGetRequestService extends AbstractRequestService {
  constructor(private replyResponseMapper: ReplyResponseMapper) {
    super();
  }

  async execute(replyId: string): Promise<Reply> {
    const requestHandler = this.requestHandlerFactory.createGetRequest(
      api.handler.GET_REPLY
    );

    const parameterHandler = this.createParameterHandler();
    parameterHandler.append('replyId', replyId);

    const response = await this.handleGetRequest(
      requestHandler,
      parameterHandler
    );

    return this.replyResponseMapper.mapReplyData(response);
  }
}
