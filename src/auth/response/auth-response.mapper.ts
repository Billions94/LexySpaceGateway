import { Injectable } from '@nestjs/common';
import { AuthResponse } from 'src/dto';

@Injectable()
export class AuthResponseMapper {
  map(data: any): AuthResponse {
    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
  }
}
