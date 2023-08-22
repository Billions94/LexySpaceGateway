import { Injectable } from '@nestjs/common';
import { UserResponseMapper } from '../../user/response/user-response.mapper';
import { Reply } from '../../dto';

@Injectable()
export class ReplyResponseMapper {
  constructor(private userResponseMapper: UserResponseMapper) {}

  map(data: any): Reply[] {
    return Array.isArray(data)
      ? data
          .map((reply) => this.mapReply(reply))
          .filter((reply) => reply !== undefined)
      : [];
  }

  mapReply(data: any): Reply {
    if (typeof data === 'string') {
      return {
        id: data,
      } as Reply;
    }

    return {
      id: data.id,
      content: data.content,
      media: data.media,
      author: this.userResponseMapper.map(data.user),
      commentId: data.commentId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}
