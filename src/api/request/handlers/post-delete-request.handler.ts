import { RequestInit } from 'apollo-server-env';
import { DeleteRequestHandlerInterface } from 'src/core/request/delete-request-handler.interface';
import { AbstractRequestHandler } from './abstract-request.handler';

export class PostDeleteRequestHandler
  extends AbstractRequestHandler
  implements DeleteRequestHandlerInterface
{
  protected path = 'posts/{postId}';

  async delete(params?: URLSearchParams, init?: RequestInit) {
    init = this.forwardAuthHeader(init);
    
    return await this.executeDeleteRequest(params, init);
  }
}
