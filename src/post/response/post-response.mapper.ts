import { Injectable } from '@nestjs/common';
import { MapperUtil } from '../..//core/util';
import { UserResponseMapper } from '../../user/response/user-response.mapper';
import { Post, User } from '../../dto';
import { CommentResponseMapper } from '../../comment/response/comment-response-mapper';

@Injectable()
export class PostResponseMapper {
  constructor(
    private userResponseMapper: UserResponseMapper,
    private commentResponseMapper: CommentResponseMapper
  ) {}

  map(data: any): Post[] {
    const postData = MapperUtil.getData(data).posts;

    return Array.isArray(postData)
      ? postData.map((post) => this.mapPostData(post))
      : [];
  }

  mapPostData(post: any): Post {
    return {
      id: post._id,
      content: post.text,
      media: post.media,
      sharedPost: post.sharedPost,
      author: this.userResponseMapper.map(post.user),
      comments: this.commentResponseMapper.map(post.comments),
      likes: this.mapLikes(post.likes),
      createdAt: post.createdAt ?? new Date(),
    };
  }

  private mapLikes(data: any): User[] {
    return Array.isArray(data)
      ? data.map((item: any) => this.userResponseMapper.map(item))
      : [];
  }
}
