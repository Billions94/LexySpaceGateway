import { RequestInit, URLSearchParams } from 'apollo-server-env';
import { RestDatasourceInterface } from '../../../core/rest/rest-datasource.interface';
import { Logger } from '@nestjs/common';

export abstract class AbstractRequestHandler {
  constructor(protected api: RestDatasourceInterface, protected context: any) {}

  protected abstract path: string;

  async executeGetRequest(params?: URLSearchParams, init?: RequestInit) {
    let path = this.generatePath(params);

    if (params?.toString()) {
      path += '?' + params.toString();
    }

    return await this.api.get(path, params, init);
  }

  async executePostRequest(
    body?: any,
    params?: URLSearchParams,
    init?: RequestInit
  ) {
    let path = this.generatePath(params);

    if (params?.toString()) {
      path += '?' + params.toString();
    }

    return await this.api.post(path, body, init);
  }

  async executePatchRequest(
    body?: any,
    params?: URLSearchParams,
    init?: RequestInit
  ) {
    let path = this.generatePath(params);

    if (params?.toString()) {
      path += '?' + params.toString();
    }

    return await this.api.patch(path, body, init);
  }

  async executeDeleteRequest(params?: URLSearchParams, init?: RequestInit) {
    const path = this.generatePath(params);

    return await this.api.delete(path, params, init);
  }

  /**
   * Forwards ReCAPTCHA requests header from client to rest datasource
   */
  forwardReCaptchaHeader(init?: RequestInit) {
    const reCaptchaHeaders: any = {};

    // Google ReCAPTCHA token to verify
    if (this.context?.req?.headers['recaptcha-token']) {
      reCaptchaHeaders['recaptcha-token'] =
        this.context.req.headers['recaptcha-token'];
      Logger.debug(
        `Forward header 'ReCAPTCHA': '${this.context.req.headers[
          'recaptcha-token'
        ].substring(0, 10)}...'`,
        'AbstractRequestHandler'
      );
    }

    // Force origin header for testing purpose
    if (this.context?.req?.headers['recaptcha-origin']) {
      reCaptchaHeaders['origin'] = this.context.req.headers['recaptcha-origin'];
      Logger.debug(
        `Forward header 'origin': '${this.context.req.headers['recaptcha-origin']}'`,
        'AbstractRequestHandler'
      );

      // Forward origin header
    } else if (this.context?.req?.headers['origin']) {
      reCaptchaHeaders['origin'] = this.context.req.headers['origin'];
      Logger.debug(
        `Forward header 'origin': '${this.context.req.headers['origin']}'`,
        'AbstractRequestHandler'
      );
    }

    return this.mergeHeader(reCaptchaHeaders, init);
  }

  /**
   * Forwards authentication/identification requests header from client to rest datasource
   */
  forwardAuthHeader(init?: RequestInit) {
    const authHeaders: any = {};

    // Bearer token
    if (this.context?.req?.headers['authorization']) {
      authHeaders['Authorization'] = this.context.req.headers['authorization'];
      Logger.debug(
        `Forward header 'Authorization': '${this.context.req.headers[
          'authorization'
        ].substring(0, 10)}...'`,
        'AbstractRequestHandler'
      );
    }

    if (this.context?.req.headers) {
      authHeaders['x-refresh'] = this.context.req.headers['x-refresh'];
      Logger.debug(
        `Forward header 'x-refresh': '${this.context.req.headers[
          'x-refresh'
        ].substring(0, 10)}...'`,
        'AbstractRequestHandler'
      );
    }

    return this.mergeHeader(authHeaders, init);
  }

  private mergeHeader(headers: [], init?: RequestInit) {
    if (Object.keys(headers).length) {
      if (init?.headers) {
        init.headers = { ...init?.headers, ...headers };
      } else {
        if (init !== undefined) {
          init.headers = headers;
        } else {
          init = {
            headers: headers,
          };
        }
      }
    }

    return init;
  }

  /**
   * Substitutes potentials url parameter that are used in the url path as variables
   *
   * Example:
   *   Path: /some-url/{objectId}
   *   Parameter: objectId = 1
   *   Result: /some-url/1
   */
  private generatePath(params?: URLSearchParams): string {
    const deleteParams: string[] = [];
    let path = this.path;

    if (params instanceof URLSearchParams) {
      params.forEach(function (v, k) {
        const regex = new RegExp('{' + k + '}', 'g');

        if (path.search(regex) !== -1) {
          // Replace parameter in path if exists
          path = path.replace(regex, v);

          // Remove parameter from param handler
          deleteParams.push(k);
        }
      });
    }

    // Remove params
    deleteParams.forEach(function (v) {
      params?.delete(v);
    });

    return path;
  }
}
