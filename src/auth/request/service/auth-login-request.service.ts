import { Injectable } from '@nestjs/common';
import { AuthResponseMapper } from '../../../auth/response/auth-response.mapper';
import { SessionRequestMapper } from '../../../session/request/mapper/session-request.mapper';
import { AbstractRequestService } from '../../../core/request/abstract-request.service';
import { AuthResponse, SessionInput } from '../../../dto';
import { api } from '../../../api/api';

@Injectable()
export class AuthLoginRequestService extends AbstractRequestService {
  constructor(
    private sessionRequestMapper: SessionRequestMapper,
    private authResponseMapper: AuthResponseMapper
  ) {
    super();
  }

  async execute(input: SessionInput): Promise<AuthResponse> {
    const requestHandler = this.requestHandlerFactory.createPostRequest(
      api.handler.LOGIN
    );

    const requestBody = this.sessionRequestMapper.map(input);

    const response = await this.handlePostRequest(requestHandler, requestBody);

    return this.authResponseMapper.map(response);
  }
}
