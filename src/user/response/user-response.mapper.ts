import { Injectable } from '@nestjs/common';
import { Post, User } from '../../dto';

@Injectable()
export class UserResponseMapper {
  mapUsers(data: any): User[] {
    return Array.isArray(data)
      ? data.map((item) => this.map(item)).filter((item) => item !== undefined)
      : [];
  }

  map(data: any): User {
    if (!data) {
      return {
        id: '',
      } as any;
    }

    return {
      id: data.id ?? '',
      firstName: data.firstName ?? '',
      lastName: data.lastName ?? '',
      userName: data.userName ? data.userName : '',
      email: data.email ?? '',
      bio: data.bio ?? '',
      refreshToken: data.refreshToken,
      location: data.location,
      image: data.image,
      cover: data.cover,
      followers: data.followers ? this.mapFollowers(data.followers) : [],
      following: data.following ? this.mapFollowers(data.following) : [],
      activities: this.mapActivities(data.activities) ?? [],
      session: data.session,
      isVerified: data.isVerified,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  private mapFollowers(data: any): User[] {
    return Array.isArray(data)
      ? data.map((item) => this.map(item)).filter((item) => item !== undefined)
      : [];
  }

  private mapActivities(activityData: any): Post[] {
    return Array.isArray(activityData)
      ? activityData.map((activity) => ({
          id: activity.id ?? '',
          user: activity.user ?? {},
          content: activity.text ?? '',
          media: activity.media ?? '',
          comments: activity.comments ?? [],
          sharedPost: activity.sharedPost ?? {},
          likes: this.mapLikes(activity.likes) ?? [],
        }))
      : [];
  }

  private mapLikes(likesData: any): User[] {
    return Array.isArray(likesData)
      ? likesData.map(
          (like) =>
            ({
              id: like.id ?? '',
              firstName: like.firstName ?? '',
              lastName: like.lastName ?? '',
              email: like.email ?? '',
            } as User)
        )
      : [];
  }
}
