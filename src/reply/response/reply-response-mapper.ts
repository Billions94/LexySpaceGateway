import { Injectable } from '@nestjs/common';
import { UserResponseMapper } from '../../user/response/user-response.mapper';
import { Reply } from '../../dto';

@Injectable()
export class ReplyResponseMapper {
  constructor(private userResponseMapper: UserResponseMapper) {}

  map(data: any): Reply[] {
    return Array.isArray(data)
      ? data.map((reply) => this.mapReplyData(reply))
      : [];
  }

  mapReplyData(replyData: any): Reply {
    if (typeof replyData === 'string') {
      return {
        id: replyData,
      } as Reply;
    }

    return {
      id: replyData._id,
      content: replyData.text,
      media: replyData.media,
      author: this.userResponseMapper.map(replyData.user),
      commentId: replyData.commentId,
      createdAt: replyData.createdAt,
      updatedAt: replyData.updatedAt
    };
  }
}
