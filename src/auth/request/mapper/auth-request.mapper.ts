import { Injectable } from '@nestjs/common';
import { RegisterUserInput } from '../../../dto';

@Injectable()
export class AuthRequestMapper {
  map(input: RegisterUserInput) {
    return {
      userName: input.userName,
      email: input.email,
      password: input.password,
      confirmPassword: input.confirmPassword,
    };
  }
}
