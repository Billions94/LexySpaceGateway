import { Injectable } from '@nestjs/common';
import { Planet } from '../../dto';
import { UserResponseMapper } from '../../user/response/user-response.mapper';

@Injectable()
export class PlanetResponseMapper {
  constructor(private userResponseMapper: UserResponseMapper) {}

  map(data: any): Planet[] {
    return Array.isArray(data)
      ? data
          .map((item) => this.mapItem(item))
          .filter((item) => item !== undefined)
      : [];
  }

  mapItem(data: any): Planet {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      image: data.image,
      media: data.media,
      posts: data.posts,
      owner: this.userResponseMapper.map(data.owner),
      members: this.userResponseMapper.mapUsers(data.members),
    };
  }
}
