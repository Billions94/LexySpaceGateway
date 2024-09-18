import { RequestInit } from 'apollo-server-env';
import { DeleteRequestHandlerInterface } from '../../../core/request/delete-request-handler.interface';
import { AbstractRequestHandler } from './abstract-request.handler';

export class PlanetDeleteRequestHandler
  extends AbstractRequestHandler
  implements DeleteRequestHandlerInterface
{
  protected path = 'planets/{planetId}';

  async delete(params?: URLSearchParams, init?: RequestInit): Promise<any> {
    init = this.forwardAuthHeader(init);

    return await this.executeDeleteRequest(params, init);
  }
}
