import { PostGetRequestHandler } from './request/handlers/post-get-request.handler';
import { UserLoginRequestHandler } from './request/handlers/user-login-request.handler';
import { PostsRequestHandler } from './request/handlers/posts-request.handler';
import { UserRegisterRequestHandler } from './request/handlers/user-register-request.handler';
import { PostUpdateRequestHandler } from './request/handlers/post-update-request.handler';
import { PostDeleteRequestHandler } from './request/handlers/post-delete-request.handler';
import { UserRequestHandler } from './request/handlers/user-request.handler';
import { UserUpdateRequestHandler } from './request/handlers/user-update-request.handler';
import { UserDeleteRequestHandler } from './request/handlers/user-delete-request.handler';

const requestHandler: { [key: string]: any } = {
  REGISTER: UserRegisterRequestHandler,
  LOGIN: UserLoginRequestHandler,
  USER: UserRequestHandler,
  UPDATE_USER: UserUpdateRequestHandler,
  DELETE_USER: UserDeleteRequestHandler,
  POSTS: PostsRequestHandler,
  GET_POST: PostGetRequestHandler,
  UPDATE_POST: PostUpdateRequestHandler,
  DELETE_POST: PostDeleteRequestHandler,
};

export const api: { [key: string]: any } = {
  handler: requestHandler,
};
