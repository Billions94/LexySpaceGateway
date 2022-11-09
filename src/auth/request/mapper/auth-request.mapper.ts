import { Injectable } from "@nestjs/common";
import { AuthUserInput } from '../../../dto';


@Injectable()
export class AuthRequestMapper {
  map(input: AuthUserInput) {
    return {
      userName: input.userName,
      email: input.email,
      password: input.password,
      confirmPassword: input.confirmPassword
    };
  }
}