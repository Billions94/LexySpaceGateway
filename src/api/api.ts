import { GetPostRequestHandler } from "./request/handlers/get-post-request.handler";
import { LoginRequestHandler } from "./request/handlers/login-request.handler";
import { PostsRequestHandler } from "./request/handlers/posts-request.handler";
import { RegisterRequestHandler } from "./request/handlers/register-request.handler";


const requestHandler: { [key: string]: any } = {
  REGISTER: RegisterRequestHandler,
  LOGIN: LoginRequestHandler,
  POSTS: PostsRequestHandler,
  POST_BY_ID: GetPostRequestHandler
};

export const api: { [key: string]: any } = {
  handler: requestHandler,
};
