import { Injectable } from '@nestjs/common';
import { AuthResponseMapper } from 'src/auth/response/auth-response.mapper';
import { api } from '../../../api/api';
import { AbstractRequestService } from '../../../core/request/abstract-request.service';
import { AuthResponse, AuthUserInput } from '../../../dto';
import { AuthRequestMapper } from '../mapper/auth-request.mapper';

@Injectable()
export class AuthLoginRequestService extends AbstractRequestService {
  constructor(
    private authRequestMapper: AuthRequestMapper,
    private authResponseMapper: AuthResponseMapper
  ) {
    super();
  }

  async execute(input: AuthUserInput): Promise<AuthResponse> {
    const requestHandler = this.requestHandlerFactory.createPostRequest(
      api.handler.LOGIN
    );

    const requestBody = this.authRequestMapper.map(input);

    const response = await this.handlePostRequest(requestHandler, requestBody);

    return this.authResponseMapper.map(response);
  }
}
