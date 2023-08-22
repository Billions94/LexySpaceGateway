import { Inject, Injectable } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { RESTDataSource } from 'apollo-datasource-rest';
import { RequestInit, URLSearchParamsInit } from 'apollo-server-env';
import { Body } from 'apollo-datasource-rest/dist/RESTDataSource';
import { RestDatasourceInterface } from '../core/rest/rest-datasource.interface';
import { RestCache } from '../core/rest/rest-cache';
import process from 'process';

/**
 * Decorator for apollo server RESTDataSource to make any implementing
 * service decoupled and testable.
 */

@Injectable()
export class ApiDatasourceDecorator
  extends RESTDataSource
  implements RestDatasourceInterface
{
  constructor(
    @Inject(CONTEXT) context: any,
    @Inject(RestCache) cache: RestCache
  ) {
    super();
    super.initialize({ context, cache });
    this.baseURL =
      process.env.NODE_ENV === 'production'
        ? process.env.API_BASE_URL
        : process.env.API_LOCAL_HOST;
  }

  public get<TResult = any>(
    path: string,
    params?: URLSearchParamsInit,
    init?: RequestInit
  ): Promise<TResult> {
    return super.get(path, params, init);
  }

  public post<TResult = any>(
    path: string,
    body?: Body,
    init?: RequestInit
  ): Promise<TResult> {
    return super.post(path, body, init);
  }

  public delete<TResult = any>(
    path: string,
    params?: URLSearchParamsInit,
    init?: RequestInit
  ): Promise<TResult> {
    return super.delete(path, params, init);
  }

  public patch<TResult = any>(
    path: string,
    body?: Body,
    init?: RequestInit
  ): Promise<TResult> {
    return super.patch(path, body, init);
  }
}
