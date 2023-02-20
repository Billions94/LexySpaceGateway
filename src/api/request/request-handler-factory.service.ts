import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  REST_DATASOURCE,
  RestDatasourceInterface,
} from '../../core/rest/rest-datasource.interface';
import { CONTEXT } from '@nestjs/graphql';
import { GetRequestHandlerInterface } from '../../core/request/get-request-handler.interface';
import { PostRequestHandlerInterface } from '../../core/request/post-request-handler.interface';
import { PatchRequestHandlerInterface } from '../../core/request/patch-request-handler.interface';
import { DeleteRequestHandlerInterface } from '../../core/request/delete-request-handler.interface';

@Injectable()
export class RequestHandlerFactoryService {
  constructor(
    @Inject(REST_DATASOURCE)
    private api: RestDatasourceInterface,
    @Inject(CONTEXT) protected context: any
  ) {
    Logger.debug(
      'Initiate request handler factory.',
      'RequestHandlerFactoryService'
    );
  }

  protected repository: { [key: string]: any } = [];

  createGetRequest(handler: any): GetRequestHandlerInterface {
    if (!(handler in this.repository)) {
      Logger.debug(
        'Create get request handler: ' + handler.name,
        'RequestHandlerFactoryService'
      );

      this.repository[handler] = new handler(this.api, this.context);
    }

    // @todo check if service implements given return type interface
    return this.repository[handler];
  }

  createPostRequest(handler: any): PostRequestHandlerInterface {
    if (!(handler in this.repository)) {
      Logger.debug(
        'Create post request handler: ' + handler.name,
        'RequestHandlerFactoryService'
      );
      this.repository[handler] = new handler(this.api, this.context);
    }

    // @todo check if service implements given return type interface
    return this.repository[handler];
  }

  createPatchRequest(handler: any): PatchRequestHandlerInterface {
    if (!(handler in this.repository)) {
      Logger.debug(
        'Create patch request handler: ' + handler.name,
        'RequestHandlerFactoryService'
      );
      this.repository[handler] = new handler(this.api, this.context);
    }

    // @todo check if service implements given return type interface
    return this.repository[handler];
  }

  createDeleteRequest(handler: any): DeleteRequestHandlerInterface {
    if (!(handler in this.repository)) {
      Logger.debug(
        'Create delete request handler: ' + handler.name,
        'RequestHandlerFactoryService'
      );
      this.repository[handler] = new handler(this.api, this.context);
    }

    // @todo check if service implements given return type interface
    return this.repository[handler];
  }
}
