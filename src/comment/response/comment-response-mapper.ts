import { Injectable } from '@nestjs/common';
import { MapperUtil } from 'src/core/util';
import { Comment, Reply, User } from '../../dto';

@Injectable()
export class CommentResponseMapper {
  map(data: any): Comment[] {
    const commentData = MapperUtil.getData(data).comments;

    return Array.isArray(commentData)
      ? commentData.map((comment) => this.mapCommentData(comment))
      : [];
  }

  mapCommentData(comment: any): Comment {
    return {
      id: comment._id,
      content: comment.content,
      media: comment.media,
      author: this.mapAuthor(comment.user),
      replies: this.mapReplies(comment.replies),
      postId: comment.postId,
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

  private mapReplies(replyData: any): Reply[] {
    return Array.isArray(replyData)
      ? replyData.map((reply: any) => {
          return {
            id: reply.id,
            content: reply.content,
            media: reply.media,
            author: reply.author,
            commentId: reply.commentId,
          };
        })
      : [];
  }
}
