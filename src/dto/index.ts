
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class AuthUserInput {
    userName?: Nullable<string>;
    email: string;
    password: string;
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
    deletePost: boolean;
    addReply: Reply;
    updateReply: Reply;
    deleteReply: boolean;
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
    users: User[];
    user: User;
}

export class Comment {
    __typename?: 'Comment';
    id: string;
    content: string;
    media?: Nullable<string>;
    user?: Nullable<User>;
    post?: Nullable<Post>;
    replies?: Nullable<Nullable<Reply>[]>;
}

export class Post {
    __typename?: 'Post';
    id: string;
    content: string;
    media?: Nullable<string>;
    sharedPost?: Nullable<string>;
    author: User;
    comments?: Nullable<Nullable<Comment>[]>;
    likes?: Nullable<Nullable<User>[]>;
}

export class Reply {
    __typename?: 'Reply';
    id: string;
    content: string;
    media?: Nullable<string>;
    user?: Nullable<User>;
    comment?: Nullable<Comment>;
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
    refreshToken: string;
    bio?: Nullable<string>;
    location?: Nullable<string>;
    image?: Nullable<string>;
    cover?: Nullable<string>;
    session?: Nullable<string>;
    activities?: Nullable<Nullable<Post>[]>;
    isVerified?: Nullable<boolean>;
}

type Nullable<T> = T | null;
