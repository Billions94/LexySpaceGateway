
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class RegisterUserInput {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export class CommentInput {
    content: string;
    media?: Nullable<string>;
}

export class PostInput {
    content: string;
    media?: Nullable<string>;
    sharedPost?: Nullable<string>;
}

export class ReplyInput {
    content: string;
    media?: Nullable<string>;
}

export class SessionInput {
    email: string;
    password: string;
}

export class UserInput {
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    userName?: Nullable<string>;
    email?: Nullable<string>;
    bio?: Nullable<string>;
    location?: Nullable<string>;
    image?: Nullable<string>;
    cover?: Nullable<string>;
}

export abstract class IMutation {
    __typename?: 'IMutation';
    register?: Nullable<AuthResponse>;
    login?: Nullable<AuthResponse>;
    addComment: Comment;
    updateComment: Comment;
    deleteComment: boolean;
    addPost: Post;
    updatePost: Post;
    addPostLike: boolean;
    deletePost: boolean;
    addReply: Reply;
    updateReply: Reply;
    deleteReply: boolean;
    deleteSession?: Nullable<boolean>;
    uploadFile?: Nullable<boolean>;
    addCover: User;
    updateUser: User;
    deleteUser: boolean;
}

export class AuthResponse {
    __typename?: 'AuthResponse';
    accessToken: string;
    refreshToken: string;
}

export abstract class IQuery {
    __typename?: 'IQuery';
    comments: Comment[];
    getCommentById: Comment;
    posts: Post[];
    getPostById: Post;
    replies: Reply[];
    getReplyById: Post;
    sessions?: Nullable<Session[]>;
    users: User[];
    user: User;
    userByUsername: User;
    followersById?: Nullable<Nullable<User>[]>;
}

export class Comment {
    __typename?: 'Comment';
    id: string;
    content: string;
    media?: Nullable<string>;
    author?: Nullable<User>;
    postId: string;
    replies?: Nullable<Nullable<Reply>[]>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
}

export abstract class ISubscription {
    __typename?: 'ISubscription';
    newPost?: Nullable<Post>;
}

export class Post {
    __typename?: 'Post';
    id: string;
    content: string;
    media?: Nullable<string>;
    sharedPost?: Nullable<Post>;
    author: User;
    comments?: Nullable<Nullable<Comment>[]>;
    likes?: Nullable<Nullable<User>[]>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
}

export class Reply {
    __typename?: 'Reply';
    id: string;
    content: string;
    media?: Nullable<string>;
    author?: Nullable<User>;
    commentId: string;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
}

export class Session {
    __typename?: 'Session';
    user: User;
    isValid: boolean;
    userAgent?: Nullable<string>;
}

export class File {
    __typename?: 'File';
    url: string;
}

export class User {
    __typename?: 'User';
    id: string;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    userName: string;
    email?: Nullable<string>;
    followers?: Nullable<Nullable<User>[]>;
    following?: Nullable<Nullable<User>[]>;
    refreshToken?: Nullable<string>;
    bio?: Nullable<string>;
    location?: Nullable<string>;
    image?: Nullable<string>;
    cover?: Nullable<string>;
    session?: Nullable<string>;
    activities?: Nullable<Nullable<Post>[]>;
    isVerified?: Nullable<boolean>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
}

export type DateTime = any;
export type DateRegister = any;
export type Upload = any;
type Nullable<T> = T | null;
