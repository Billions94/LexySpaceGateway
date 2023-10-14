import { Injectable } from '@nestjs/common';
import { AbstractRequestService } from '../../../core/request/abstract-request.service';
import { api } from '../../../api/api';

@Injectable()
export class UserFollowRequestService extends AbstractRequestService {
  async execute(username: string): Promise<boolean> {
    const requestHandler = this.requestHandlerFactory.createPostRequest(
      api.handler.FOLLOW
    );

    const requestBody = {
      'userToFollow': username,
    };

    return await this.handlePostRequest(requestHandler, requestBody);
  }
}
