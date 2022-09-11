import { Injectable } from '@nestjs/common';
import { Token, User } from '../../dto';

@Injectable()
export class UserResponseMapper {
  map(data: any): User {
    return {
      id: data._id,
      firstName: data.firstName,
      lastName: data.lastName,
      userName: data.userName,
      email: data.email,
      bio: data.bio,
      tokens: this.mapTokens(data),
      location: data.location,
      image: data.image,
      cover: data.cover,
      isVerified: data.isVerified
    };
  }

  private mapTokens(data: any): Token {
    return {
      refreshToken: data.refreshToken,
    }
  }
}
