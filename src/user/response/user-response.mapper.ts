import { Injectable } from '@nestjs/common';
import { Post, User } from '../../dto';

@Injectable()
export class UserResponseMapper {
  map(data: any): User {
    return {
      id: data._id ?? '',
      firstName: data.firstName,
      lastName: data.lastName,
      userName: data.userName,
      email: data.email,
      bio: data.bio,
      refreshToken: data.refreshToken,
      location: data.location,
      image: data.image,
      cover: data.cover,
      followers: data.followers,
      following: data.following,
      activities: this.mapActivities(data.activities),
      session: data.session,
      isVerified: data.isVerified,
    };
  }

  private mapActivities(activityData: any): Post[] {
    return Array.isArray(activityData)
      ? activityData.map((activity: any) => {
          return {
            id: activity._id,
            author: activity.user,
            content: activity.text,
            media: activity.media,
            comments: activity.comments,
            sharedPost: activity.sharedPost,
            likes: this.mapLikes(activity.likes),
          };
        })
      : [];
  }

  private mapLikes(likesData: any): User[] {
    return Array.isArray(likesData)
      ? likesData.map((like: any) => {
          return {
            id: like._id,
            firstName: like.firstName,
            lastName: like.lastName,
            email: like.email,
          } as User;
        })
      : [];
  }
}
