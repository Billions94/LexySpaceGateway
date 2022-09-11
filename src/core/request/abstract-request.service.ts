import { Inject } from '@nestjs/common';

import { CONTEXT } from '@nestjs/graphql';
import * as Sentry from '@sentry/node';
import { RequestInit } from 'apollo-server-env';
import { Transaction } from '@sentry/tracing';
import '@sentry/tracing';
import { UnprocessableEntityError } from '../error/unprocessable-entity.error';
import { ParameterHandlerInterface } from '../rest/parameter-handler.interface';
import { GetRequestHandlerInterface } from './get-request-handler.interface';
import { PostRequestHandlerInterface } from './post-request-handler.interface';
import { PatchRequestHandlerInterface } from './patch-request-handler.interface';
import { DeleteRequestHandlerInterface } from './delete-request-handler.interface';
import { ErrorResponseHandler } from '../../api/response/error-response.handler';
import { RequestHandlerFactoryService } from '../../api/request/request-handler-factory.service';
import { ParameterHandlerFactoryService } from '../rest/factory/parameter-handler-factory.service';
import { Scope } from '@sentry/node';


export abstract class AbstractRequestService {
  @Inject(RequestHandlerFactoryService)
  protected requestHandlerFactory: RequestHandlerFactoryService;

  @Inject(ParameterHandlerFactoryService)
  protected parameterHandlerFactory: ParameterHandlerFactoryService;

  @Inject(CONTEXT)
  protected context: any;

  protected createParameterHandler(): ParameterHandlerInterface {
    return this.parameterHandlerFactory.createParameterHandler();
  }

  protected async handleGetRequest(
    requestHandler: GetRequestHandlerInterface,
    parameterHandler?: ParameterHandlerInterface,
    init?: RequestInit
  ) {
    let responseBody: any;

    const transaction = this.startSentryTransaction('Api GET Request');

    try {
      responseBody = await requestHandler.get(
        parameterHandler ? parameterHandler.getParams() : undefined,
        init
      );
    } catch (e) {
      console.error(e);
      this.handleApiError(e);
    }

    transaction.finish();

    return responseBody;
  }

  protected async handlePostRequest(
    requestHandler: PostRequestHandlerInterface,
    body?: any,
    parameterHandler?: ParameterHandlerInterface,
    init?: RequestInit
  ) {
    let responseBody;

    const transaction = this.startSentryTransaction('Api POST Request');

    try {
      responseBody = await requestHandler.post(
        body,
        parameterHandler ? parameterHandler.getParams() : undefined,
        init
      );
    } catch (e) {
      this.handleApiError(e, body);
    }

    transaction.finish();

    return responseBody;
  }

  protected async handlePatchRequest(
    requestHandler: PatchRequestHandlerInterface,
    body?: any,
    parameterHandler?: ParameterHandlerInterface,
    init?: RequestInit
  ) {
    let responseBody;

    const transaction = this.startSentryTransaction('Api PATCH Request');

    try {
      responseBody = await requestHandler.patch(
        body,
        parameterHandler ? parameterHandler.getParams() : undefined,
        init
      );
    } catch (e) {
      this.handleApiError(e, body);
    }

    transaction.finish();

    return responseBody;
  }

  protected async handleDeleteRequest(
    requestHandler: DeleteRequestHandlerInterface,
    parameterHandler?: ParameterHandlerInterface,
    init?: RequestInit
  ) {
    let responseBody;

    const transaction = this.startSentryTransaction('Api DELETE Request');

    try {
      responseBody = await requestHandler.delete(
        parameterHandler ? parameterHandler.getParams() : undefined,
        init
      );
    } catch (e) {
      this.handleApiError(e);
    }

    transaction.finish();

    return responseBody;
  }

  protected handleApiError(e: any, requestBody?: any): never {
    const errorResponseHandler = new ErrorResponseHandler(e);
    const unprocessableEntityError = new UnprocessableEntityError(
      errorResponseHandler.getErrorMessage(),
      errorResponseHandler.getErrorExtension()
    );

    Sentry.captureException(
      unprocessableEntityError,
      this.getScope(requestBody)
    );

    throw unprocessableEntityError;
  }

  protected isLoggedIn(): boolean {
    const authorizationHeader = this.context?.req?.headers['authorization'];
    let jwt;

    try {
      jwt = this.parseJwt(authorizationHeader);
    } catch (e) {
      return false;
    }

    if (Array.isArray(jwt?.scopes) && jwt?.scopes.indexOf('customer') > -1) {
      return true;
    }

    return false;
  }

  private parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }

  private startSentryTransaction(name: string): Transaction {
    const transaction = Sentry.startTransaction({
      op: 'transaction',
      name: name,
    });

    // Note that we set the transaction as the span on the scope.
    // This step makes sure that if an error happens during the lifetime of the transaction
    // the transaction context will be attached to the error event
    Sentry.configureScope((scope) => {
      scope.setSpan(transaction);
    });

    return <Transaction>transaction;
  }

  private getScope(requestBody?: any): Scope {
    const scope = new Sentry.Scope();
    const originRequestContext: any = {};
    const ApiRequestContext: any = {};

    if (requestBody) {
      ApiRequestContext.body = JSON.stringify(requestBody, null, 4);
    }

    originRequestContext.host = this.context?.req?.headers['host'];
    originRequestContext.origin = this.context?.req?.headers['origin'];

    if (this.isLoggedIn()) {
      const jwt = this.parseJwt(this.context?.req?.headers['authorization']);
      scope.setUser(JSON.parse(jwt.sub));
    }

    scope.setContext('Api-Request', ApiRequestContext);
    scope.setContext('Origin-Request', originRequestContext);

    return scope;
  }
}
