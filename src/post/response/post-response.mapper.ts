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
      likes: this.mapLikes(post.likes),
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

  private mapLikes(data: any): User[] {
    return Array.isArray(data)
      ? data.map((item: any) => {
          return {
            id: item._id ?? '',
            firstName: item.firstName,
            lastName: item.lastName
          } as User;
        })
      : [];
  }
}
