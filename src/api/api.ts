import { PostGetRequestHandler } from './request/handlers/post-get-request.handler';
import { UserLoginRequestHandler } from './request/handlers/user-login-request.handler';
import { PostsRequestHandler } from './request/handlers/posts-request.handler';
import { UserRegisterRequestHandler } from './request/handlers/user-register-request.handler';
import { PostUpdateRequestHandler } from './request/handlers/post-update-request.handler';
import { PostDeleteRequestHandler } from './request/handlers/post-delete-request.handler';
import { UserGetRequestHandler } from './request/handlers/user-get-request.handler';
import { UserUpdateRequestHandler } from './request/handlers/user-update-request.handler';
import { UserDeleteRequestHandler } from './request/handlers/user-delete-request.handler';
import { PostCreateRequestHandler } from './request/handlers/post-create-request.handler';
import { CommentCreateRequestHandler } from './request/handlers/comment-create-request.handler';
import { CommentsRequestHandler } from './request/handlers/comments-request.handler';
import { CommentGetRequestHandler } from './request/handlers/comment-get-request.handler';
import { CommentUpdateRequestHandler } from './request/handlers/comment-update-request.handler';
import { CommentDeleteRequestHandler } from './request/handlers/comment-delete-request.handler';
import { ReplyCreateRequestHandler } from './request/handlers/reply-create-request.handler';
import { RepliesRequestHandler } from './request/handlers/replies-request.handler';
import { ReplyGetRequestHandler } from './request/handlers/reply-get-request.handler';
import { ReplyUpdateRequestHandler } from './request/handlers/reply-update-request.handler';
import { ReplyDeleteRequestHandler } from './request/handlers/reply-delete-request.handler';
import { PostLikeRequestHandler } from './request/handlers/post-like-request.handler';
import { UsersRequestHandler } from './request/handlers/users-request.handler';

const requestHandler: { [key: string]: any } = {
  REGISTER: UserRegisterRequestHandler,
  LOGIN: UserLoginRequestHandler,
  USER: UserGetRequestHandler,
  USERS: UsersRequestHandler,
  UPDATE_USER: UserUpdateRequestHandler,
  DELETE_USER: UserDeleteRequestHandler,
  CREATE_POST: PostCreateRequestHandler,
  POSTS: PostsRequestHandler,
  GET_POST: PostGetRequestHandler,
  UPDATE_POST: PostUpdateRequestHandler,
  POST_LIKE: PostLikeRequestHandler,
  DELETE_POST: PostDeleteRequestHandler,
  CREATE_COMMENT: CommentCreateRequestHandler,
  COMMENTS: CommentsRequestHandler,
  GET_COMMENT: CommentGetRequestHandler,
  UPDATE_COMMENT: CommentUpdateRequestHandler,
  DELETE_COMMENT: CommentDeleteRequestHandler,
  CREATE_REPLY: ReplyCreateRequestHandler,
  REPLIES: RepliesRequestHandler,
  GET_REPLY: ReplyGetRequestHandler,
  UPDATE_REPLY: ReplyUpdateRequestHandler,
  DELETE_REPLY: ReplyDeleteRequestHandler,
};

export const api: { [key: string]: any } = {
  handler: requestHandler,
};
