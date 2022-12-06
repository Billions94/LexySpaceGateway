import { Injectable } from '@nestjs/common';
import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { Session } from '../../dto';
import { SessionDeleteRequestService } from '../request/service/session-delete-request.service';
import { SessionGetRequestService } from '../request/service/session-get-request.service';

@Resolver(() => Session)
@Injectable()
export class SessionResolver {
  constructor(
    private sessionGetRequestService: SessionGetRequestService,
    private sessionDeleteRequestService: SessionDeleteRequestService
  ) {}

  @Query(() => [Session])
  async sessions(): Promise<Session[]> {
    return this.sessionGetRequestService.execute();
  }

  @Mutation(() => Boolean)
  async deleteSession(): Promise<boolean> {
    return this.sessionDeleteRequestService.execute();
  }
}
