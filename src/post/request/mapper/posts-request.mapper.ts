import { Injectable } from "@nestjs/common";

@Injectable()
export class PostsRequestMapper {
  map(data: any) {
    return {
      content: data.text,
    }
  }
}