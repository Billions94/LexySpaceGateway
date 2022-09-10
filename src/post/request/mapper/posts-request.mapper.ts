import { Injectable } from "@nestjs/common";


@Injectable()
export class PostsRequestMapper {
  map(data: any) {
    return {
      id: data.id,
      title: data.title,
    }
  }
}