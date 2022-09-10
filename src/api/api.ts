import { LoginRequestHandler } from "./request/handlers/login-request.handler";
import { RegisterRequestHandler } from "./request/handlers/register-request.handler";


const requestHandler: { [key: string]: any } = {
  REGISTER: RegisterRequestHandler,
  LOGIN: LoginRequestHandler,
};

export const api: { [key: string]: any } = {
  handler: requestHandler,
};
