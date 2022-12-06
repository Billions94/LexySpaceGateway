import { Injectable } from '@nestjs/common';
import { api } from '../../../api/api';
import { AbstractRequestService } from '../../../core/request/abstract-request.service';

@Injectable()
export class SessionDeleteRequestService extends AbstractRequestService {
  async execute(): Promise<boolean> {
    const requestHandler = this.requestHandlerFactory.createDeleteRequest(
      api.handler.DELETE_SESSION
    );

    const result = await this.handleDeleteRequest(requestHandler);

    if (result.accessToken === null && result.refreshToken === null) {
      return true;
    }

    return false;
  }
}
