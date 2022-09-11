import { Injectable } from "@nestjs/common";
import { Post } from "../../../dto";
import { AbstractRequestService } from "../../../core/request/abstract-request.service";
import { api } from "../../../api/api";
import { PostResponseMapper } from "../../response/post-response.mapper";

@Injectable()
export class PostsRequestService extends AbstractRequestService {
  constructor(private postResponseMapper: PostResponseMapper) {
    super();
  }

  async execute(): Promise<Post[]> {
    const requestHandler = this.requestHandlerFactory.createGetRequest(
      api.handler.POSTS
    );

    const response = await this.handleGetRequest(requestHandler);

    return this.postResponseMapper.map(response);
  }
}
