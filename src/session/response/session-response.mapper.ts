import { Injectable } from '@nestjs/common';
import { UserResponseMapper } from '../../user/response/user-response.mapper';
import { Session } from '../../dto';

@Injectable()
export class SessionResponseMapper {
  constructor(private userResponseMapper: UserResponseMapper) {}

  map(data: any): Session[] {
    return Array.isArray(data)
      ? data.map((data: any) => this.mapSession(data))
      : [];
  }

  private mapSession(session: any): Session {
    return {
      user: this.userResponseMapper.map(session.user),
      isValid: session.isValid,
      userAgent: session.userAgent,
    };
  }
}
