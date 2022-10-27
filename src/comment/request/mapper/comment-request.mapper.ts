import { Injectable } from '@nestjs/common';
import { PostInput } from 'src/dto';

@Injectable()
export class CommentRequestMapper {
  map(input: PostInput) {
    return {
      text: input.content,
      media: input.media,
    };
  }
}
