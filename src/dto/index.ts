
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

export class JoinPlanetInput {
    members: string[];
    planetId?: Nullable<string>;
    accessCode?: Nullable<string>;
}

export class LeavePlanetInput {
    members: string[];
    planetId?: Nullable<string>;
}

export class PlanetInput {
    name: string;
    description: string;
    accessCode?: Nullable<string>;
    owner?: Nullable<string>;
    members?: Nullable<Nullable<string>[]>;
    posts?: Nullable<Nullable<string>[]>;
    media?: Nullable<Nullable<string>[]>;
    image?: Nullable<string>;
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
    createPlanet: string;
    joinPlanet: PlanetResponse;
    leavePlanet: Planet;
    updatePlanet: PlanetResponse;
    uploadMedias: boolean;
    deletePlanet: PlanetResponse;
    addPost: PostResponse;
    updatePost: PostResponse;
    addPostLike: boolean;
    deletePost: boolean;
    addReply: Reply;
    updateReply: Reply;
    deleteReply: boolean;
    deleteSession?: Nullable<boolean>;
    uploadFile?: Nullable<boolean>;
    addCover: User;
    followUser: boolean;
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
    planets: Planet[];
    planetById: Planet;
    posts: Post[];
    getPostById: PostResponse;
    replies: Reply[];
    getReplyById: Post;
    sessions?: Nullable<Session[]>;
    users: User[];
    user: User;
    userByUsername: UserResponse;
    getFollowers?: Nullable<Nullable<User>[]>;
    getFollowing?: Nullable<Nullable<User>[]>;
}

export class Comment {
    __typename?: 'Comment';
    id: string;
    content: string;
    media?: Nullable<string>;
    user?: Nullable<User>;
    postId: string;
    replies?: Nullable<Nullable<Reply>[]>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
}

export class Planet {
    __typename?: 'Planet';
    id?: Nullable<string>;
    name?: Nullable<string>;
    description?: Nullable<string>;
    owner?: Nullable<User>;
    members?: Nullable<User[]>;
    posts?: Nullable<Post[]>;
    media?: Nullable<Nullable<string>[]>;
    image?: Nullable<string>;
}

export abstract class ISubscription {
    __typename?: 'ISubscription';
    newPost?: Nullable<Post>;
}

export class PostResponse {
    __typename?: 'PostResponse';
    id?: Nullable<string>;
    status?: Nullable<boolean>;
    post?: Nullable<Post>;
}

export class Post {
    __typename?: 'Post';
    id: string;
    content: string;
    media?: Nullable<string>;
    sharedPost?: Nullable<Post>;
    user: User;
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
    user?: Nullable<User>;
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

export class Success {
    __typename?: 'Success';
    data?: Nullable<Data>;
}

export class Data {
    __typename?: 'Data';
    user?: Nullable<User>;
    planet?: Nullable<Planet>;
    status?: Nullable<boolean>;
}

export class Error {
    __typename?: 'Error';
    error: ErrorMessage;
}

export class ErrorMessage {
    __typename?: 'ErrorMessage';
    status?: Nullable<boolean>;
    message: string;
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
export type PlanetResponse = Success | Error;
export type UserResponse = Success | Error;
type Nullable<T> = T | null;
