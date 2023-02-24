import { Injectable } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthResponse, RegisterUserInput, SessionInput } from '../../dto';
import { AuthLoginRequestService } from '../request/service/auth-login-request.service';
import { AuthRegisterRequestService } from '../request/service/auth-register-request.service';

@Resolver()
@Injectable()
export class AuthResolver {
  constructor(
    private authRegisterRequestService: AuthRegisterRequestService,
    private authLoginRequestService: AuthLoginRequestService
  ) {}

  @Mutation()
  async register(
    @Args('input') input: RegisterUserInput
  ): Promise<AuthResponse> {
    return this.authRegisterRequestService.execute(input);
  }

  @Mutation()
  async login(@Args('input') input: SessionInput): Promise<AuthResponse> {
    return this.authLoginRequestService.execute(input);
  }
}
