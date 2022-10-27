import { Injectable } from '@nestjs/common';
import { MapperUtil } from 'src/core/util';
import { Comment, Reply, User } from '../../dto';

@Injectable()
export class ReplyResponseMapper {
  map(data: any): Reply[] {
    return Array.isArray(data)
      ? data.map((reply) => this.mapReplyData(reply))
      : [];
  }

  mapReplyData(replyData: any): Reply {
    return {
      id: replyData._id,
      content: replyData.text,
      media: replyData.media,
      author: this.mapAuthor(replyData.user),
      commentId: replyData.commentId,
    };
  }

  private mapAuthor(author: any): User {
    return {
      id: author._id ?? '',
      userName: author.userName,
      firstName: author.firstName,
      lastName: author.lastName,
      email: author.email,
      location: author.location,
      bio: author.bio,
      image: author.image,
      cover: author.cover,
      followers: author.followers,
      following: author.following,
      activities: author.activities,
      session: author.session,
      refreshToken: author.refreshToken,
      isVerified: author.isVerified,
    };
  }
}
