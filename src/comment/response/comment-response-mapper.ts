import { Injectable } from '@nestjs/common';
import { MapperUtil } from '../../core/util';
import { UserResponseMapper } from '../../user/response/user-response.mapper';
import { Comment, Reply } from '../../dto';

@Injectable()
export class CommentResponseMapper {
  constructor(private userResponseMapper: UserResponseMapper) {}

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
      author: this.userResponseMapper.map(comment.user),
      replies: this.mapReplies(comment.replies),
      postId: comment.postId,
      createdAt: comment.createdAt,
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
