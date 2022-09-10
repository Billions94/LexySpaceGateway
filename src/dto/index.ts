
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

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

export abstract class IQuery {
    __typename?: 'IQuery';
    comments: Comment[];
    getCommentById: Comment;
    posts: Post[];
    getPostById: Post;
    replies: Reply[];
    getReplyById: Post;
    users: User[];
    getUserById: User;
}

export abstract class IMutation {
    __typename?: 'IMutation';
    addComment: Comment;
    updateComment: Comment;
    deleteComment: boolean;
    addPost: Post;
    updatePost: Post;
    deletePost: boolean;
    addReply: Reply;
    updateReply: Reply;
    deleteReply: boolean;
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
    content: string;
    media?: Nullable<string>;
    sharedPost?: Nullable<string>;
    author?: Nullable<string>;
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
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    followers?: Nullable<Nullable<User>[]>;
    tokens?: Nullable<Token>;
    bio?: Nullable<string>;
    location?: Nullable<string>;
    image?: Nullable<string>;
    cover?: Nullable<string>;
    isVerified?: Nullable<boolean>;
}

export class Token {
    __typename?: 'Token';
    accessToken: string;
    refreshToken: string;
}

type Nullable<T> = T | null;
