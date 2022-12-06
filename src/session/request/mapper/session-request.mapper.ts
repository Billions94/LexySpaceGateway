import { Injectable } from "@nestjs/common";
import { SessionInput } from "../../../dto";

@Injectable()
export class SessionRequestMapper {
  map(input: SessionInput) {
    return {
      'email': input.email,
      'password': input.password,
    };
  }
}