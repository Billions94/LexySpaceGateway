import { Module } from '@nestjs/common';
import { AuthResolver } from './resolver/auth.resolver';
import { AuthRegisterRequestService } from './request/service/auth-register-request.service';
import { AuthLoginRequestService } from './request/service/auth-login-request.service';
import { AuthRequestMapper } from './request/mapper/auth-request.mapper';
import { AuthResponseMapper } from './response/auth-response.mapper';
import { CoreModule } from '../core/core.module';
import { ApiModule } from '../api/api.module';
import { SessionModule } from '../session/session.module';

@Module({
  imports: [CoreModule, ApiModule, SessionModule],
  providers: [
    // Resolver
    AuthResolver,

    // Request mapper
    AuthRequestMapper,

    // Request service
    AuthRegisterRequestService,
    AuthLoginRequestService,

    // Response mapper
    AuthResponseMapper,
  ],
})
export class AuthModule {}
