import { Injectable } from '@nestjs/common';
import { PlanetInput } from '../../../dto';

@Injectable()
export class PlanetRequestMapper {
  map(input: PlanetInput) {
    return {
      name: input.name,
      description: input.description,
      accessCode: input.accessCode,
      owner: input.owner,
      members: input.members,
      posts: input.posts,
      media: input.media,
      image: input.image,
    };
  }
}
