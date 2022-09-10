import { Injectable } from "@nestjs/common";
import { AbstractRequestService } from "../../core/request/abstract-request.service";

@Injectable()
export class PostsRequestService extends AbstractRequestService {
  constructor() {
    super();
  }
}
