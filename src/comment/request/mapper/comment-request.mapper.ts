import { Injectable } from '@nestjs/common';
import { PostInput } from '../../../dto';

@Injectable()
export class CommentRequestMapper {
  map(input: PostInput) {
    return {
      content: input.content,
      media: input.media,
    };
  }
}
