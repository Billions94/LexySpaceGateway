import { Injectable } from '@nestjs/common';
import { api } from '../../../api/api';
import { AbstractRequestService } from '../../../core/request/abstract-request.service';

@Injectable()
export class SessionDeleteRequestService extends AbstractRequestService {
  async execute(): Promise<boolean> {
    const requestHandler = this.requestHandlerFactory.createDeleteRequest(
      api.handler.DELETE_SESSION
    );

    const { accessToken, refreshToken } = await this.handleDeleteRequest(
      requestHandler
    );

    if (!accessToken && !refreshToken) {
      return true;
    }

    return false;
  }
}
