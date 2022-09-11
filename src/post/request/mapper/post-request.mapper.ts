import { Injectable } from "@nestjs/common";
import { PostInput } from "src/dto";

@Injectable()
export class PostsRequestMapper {
  map(input: PostInput) {
    return {
      text: input.content,
      media: input.media,
    };
  }
}