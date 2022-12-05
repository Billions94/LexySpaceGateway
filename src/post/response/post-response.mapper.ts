import { Injectable } from '@nestjs/common';
import { MapperUtil } from '../..//core/util';
import { UserResponseMapper } from '../../user/response/user-response.mapper';
import { Comment, Post, User } from '../../dto';

@Injectable()
export class PostResponseMapper {
  constructor(private userResponseMapper: UserResponseMapper) {}

  map(data: any): Post[] {
    const postData = MapperUtil.getData(data).posts;

    return Array.isArray(postData)
      ? postData.reverse().map((post) => this.mapPostData(post))
      : [];
  }

  mapPostData(post: any): Post {
    return {
      id: post._id,
      content: post.text,
      media: post.media,
      sharedPost: post.sharedPost,
      author: this.userResponseMapper.map(post.user),
      comments: this.mapComment(post.comments),
      likes: this.mapLikes(post.likes),
      createdAt: post.createdAt ?? new Date(),
    };
  }

  private mapComment(data: any): Comment[] {
    return Array.isArray(data)
      ? data.map((comment: any) => {
          return {
            id: comment._id,
            author: this.userResponseMapper.map(comment.user),
            content: comment.content,
            media: comment.media,
            postId: comment.postId,
          } as Comment;
        })
      : [];
  }

  private mapLikes(data: any): User[] {
    return Array.isArray(data)
      ? data.map((item: any) => this.userResponseMapper.map(item))
      : [];
  }
}
