import { Injectable } from '@nestjs/common';
import { MapperUtil } from 'src/core/util';
import { Post, User } from '../../dto';

@Injectable()
export class PostResponseMapper {
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
      author: this.mapAuthor(post.user),
      comments: post.comments,
    };
  }

  private mapAuthor(author: any): User {
    return {
      id: author._id,
      userName: author.userName,
    }
  }
}
