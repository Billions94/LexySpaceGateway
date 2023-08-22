import { Injectable } from '@nestjs/common';
import { Session } from '../../../dto';
import { AbstractRequestService } from '../../../core/request/abstract-request.service';
import { SessionResponseMapper } from '../../response/session-response.mapper';
import { api } from '../../../api/api';

@Injectable()
export class SessionGetRequestService extends AbstractRequestService {
  constructor(private sessionResponseMapper: SessionResponseMapper) {
    super();
  }

  async execute(): Promise<Session[]> {
    const requestHandler = this.requestHandlerFactory.createGetRequest(
      api.handler.SESSIONS
    );

    const response = await this.handleGetRequest(requestHandler);

    return this.sessionResponseMapper.map(response);
  }
}
