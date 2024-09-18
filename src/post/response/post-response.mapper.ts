import { Injectable } from '@nestjs/common';
import { CommentResponseMapper } from '../../comment/response/comment-response-mapper';
import { MapperUtil } from '../../core/util';
import { Post, PostResponse, User } from '../../dto';
import { UserResponseMapper } from '../../user/response/user-response.mapper';

@Injectable()
export class PostResponseMapper {
  constructor(
    private userResponseMapper: UserResponseMapper,
    private commentResponseMapper: CommentResponseMapper
  ) {}

  map(data: any): Post[] {
    const postData = MapperUtil.getData(data).posts;

    return Array.isArray(postData)
      ? postData
          .map((post) => this.mapPostData(post, 'array') as Post)
          .filter((post) => post !== undefined)
      : [];
  }

  mapPostData(post: any, flag: 'array' | 'object'): PostResponse | Post {
    const postResponse: Post = {
      id: post.id || post._id,
      content: post.text,
      media: post.media,
      sharedPost: post.sharedPost,
      user: this.userResponseMapper.map(post.user),
      comments: this.commentResponseMapper.map(post.comments),
      likes: this.mapLikes(post.likes),
      createdAt: post.createdAt ?? new Date(),
      updatedAt: post.updatedAt,
    };

    if (flag === 'array') return postResponse;
    else if ('success' in post)
      return {
        status: post.success,
        post: postResponse,
      };
    else
      return {
        post: postResponse,
      };
  }

  mapNewPost(data: any): PostResponse {
    return {
      id: data.id,
      status: data.success,
    };
  }

  private mapLikes(data: any): User[] {
    return Array.isArray(data)
      ? data.map((item: any) => this.userResponseMapper.map(item))
      : [];
  }
}
