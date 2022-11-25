import { Injectable } from '@nestjs/common';
import { Post, User } from '../../dto';

@Injectable()
export class UserResponseMapper {
  mapUsers(data: any): User[] {
    return Array.isArray(data)
      ? data.map((userData: any) => this.map(userData))
      : [];
  }

  map(userData: any): User {
    return {
      id: userData._id ?? '',
      firstName: userData.firstName,
      lastName: userData.lastName,
      userName: userData.userName,
      email: userData.email,
      bio: userData.bio,
      refreshToken: userData.refreshToken,
      location: userData.location,
      image: userData.image,
      cover: userData.cover,
      followers: this.mapFollowers(userData.followers),
      following: this.mapFollowers(userData.following),
      activities: this.mapActivities(userData.activities),
      session: userData.session,
      isVerified: userData.isVerified,
    };
  }

  private mapFollowers(data: any): User[] {
    return Array.isArray(data)
      ? data.map((userID: any) => {
          return {
            id: userID ?? '',
          } as User;
        })
      : [];
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
