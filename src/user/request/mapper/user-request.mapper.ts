import { Injectable } from '@nestjs/common';
import { UserInput } from 'src/dto';

@Injectable()
export class UserRequestMapper {
  map(input: UserInput) {
    return {
      firstName: input.firstName,
      lastName: input.lastName,
      userName: input.userName,
      email: input.email,
      bio: input.bio,
      location: input.location,
      image: input.image,
      cover: input.cover,
    };
  }
}
