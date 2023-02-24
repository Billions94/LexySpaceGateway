import { RequestInit } from 'apollo-server-env';
import { PatchRequestHandlerInterface } from '../../../core/request/patch-request-handler.interface';
import { AbstractRequestHandler } from './abstract-request.handler';

export class PostUpdateRequestHandler
  extends AbstractRequestHandler
  implements PatchRequestHandlerInterface
{
  protected path = 'posts/{postId}';

  async patch(body: any, params?: URLSearchParams, init?: RequestInit) {
    init = this.forwardAuthHeader(init);

    return await this.executePatchRequest(body, params, init);
  }
}
