import { Injectable } from '@nestjs/common';
import { MapperUtil } from '../../core/util';
import { UserResponseMapper } from '../../user/response/user-response.mapper';
import { Comment } from '../../dto';
import { ReplyResponseMapper } from '../../reply/response/reply-response-mapper';

@Injectable()
export class CommentResponseMapper {
  constructor(
    private userResponseMapper: UserResponseMapper,
    private replyResponseMapper: ReplyResponseMapper
  ) {}

  map(data: any): Comment[] {
    if (Array.isArray(data)) {
      return Array.isArray(data)
        ? data.map((comment) => this.mapCommentData(comment))
        : [];
    }

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
      replies: this.replyResponseMapper.map(comment.replies),
      postId: comment.postId,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    };
  }
}
