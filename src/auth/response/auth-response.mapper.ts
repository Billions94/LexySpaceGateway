import { Injectable } from "@nestjs/common";
import { AuthResponse } from 'src/dto';


@Injectable()
export class AuthResponseMapper {
  map(data: any): AuthResponse {
    return {
      id: data.id,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    }
  }
}