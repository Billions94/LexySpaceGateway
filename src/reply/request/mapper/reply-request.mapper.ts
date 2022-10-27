import { Injectable } from '@nestjs/common';
import { ReplyInput } from '../../../dto';

@Injectable()
export class ReplyRequestMapper {
  map(input: ReplyInput) {
    return {
      text: input.content,
      media: input.media,
    };
  }
}
