import { Injectable } from '@nestjs/common';
import { api } from '../../../api/api';
import { AbstractRequestService } from '../../../core/request/abstract-request.service';
import { Reply } from '../../../dto';
import { ReplyResponseMapper } from '../../response/reply-response-mapper';

@Injectable()
export class RepliesRequestService extends AbstractRequestService {
  constructor(private replyResponseMapper: ReplyResponseMapper) {
    super();
  }

  async execute(): Promise<Reply[]> {
    const requestHandler = this.requestHandlerFactory.createGetRequest(
      api.handler.REPLIES
    );

    const response = await this.handleGetRequest(requestHandler);

    return this.replyResponseMapper.map(response);
  }
}
