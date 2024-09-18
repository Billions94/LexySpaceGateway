import { Injectable, Logger } from '@nestjs/common';
import { Args, Mutation, Query } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';
import {
  JoinPlanetInput,
  LeavePlanetInput,
  Planet,
  PlanetInput,
  PlanetResponse,
} from '../../dto';
import { CreatePlanetRequestService } from '../request/service/create-planet.request.service';
import { DeletePlanetRequestService } from '../request/service/delete-planet.request.service';
import { JoinPlanetRequestService } from '../request/service/join-planet-request.service';
import { LeavePlanetRequestService } from '../request/service/leave-planet.request.service';
import { PlanetGetRequestService } from '../request/service/planet-get-request.service';
import { PlanetsRequestService } from '../request/service/planets.request.service';
import { UpdatePlanetRequestService } from '../request/service/update-planet.request.service';
import { UploadMediaPlanetRequestService } from '../request/service/upload-media-planet.request.service';

@Injectable()
export class PlanetResolver {
  constructor(
    private readonly planetsRequestService: PlanetsRequestService,
    private readonly createPlanetRequestService: CreatePlanetRequestService,
    private readonly planetGetRequestService: PlanetGetRequestService,
    private readonly planetJoinRequestService: JoinPlanetRequestService,
    private readonly planetLeaveRequestService: LeavePlanetRequestService,
    private readonly planetUpdateRequestService: UpdatePlanetRequestService,
    private readonly planetUploadMediaRequestService: UploadMediaPlanetRequestService,
    private readonly planetDeleteRequestService: DeletePlanetRequestService
  ) {}

  @Query(() => [Planet])
  async planets(): Promise<Planet[]> {
    return this.planetsRequestService.execute();
  }

  @Query(() => Planet)
  async planetById(@Args('planetId') planetId: string): Promise<Planet> {
    return this.planetGetRequestService.execute(planetId);
  }

  @Mutation(() => Planet)
  async createPlanet(@Args('input') input: PlanetInput): Promise<string> {
    console.log(input);
    return this.createPlanetRequestService.execute(input);
  }

  @Mutation(() => Planet)
  async joinPlanet(
    @Args('input') input: JoinPlanetInput
  ): Promise<PlanetResponse> {
    return this.planetJoinRequestService.execute(input);
  }

  @Mutation(() => Planet)
  async leavePlanet(@Args('input') input: LeavePlanetInput): Promise<Planet> {
    return this.planetLeaveRequestService.execute(input);
  }

  @Mutation(() => Planet)
  async updatePlanet(
    @Args('input') input: PlanetInput,
    @Args('planetId') planetId: string,
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: FileUpload
  ): Promise<PlanetResponse> {
    Logger.debug(file);
    return this.planetUpdateRequestService.execute(input, planetId, file);
  }

  @Mutation(() => Boolean)
  async uploadMedias(
    @Args('planetId') planetId: string,
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: FileUpload[]
  ): Promise<boolean> {
    return this.planetUploadMediaRequestService.execute(planetId, file);
  }

  @Mutation(() => Boolean)
  async deletePlanet(
    @Args('planetId') planetId: string
  ): Promise<PlanetResponse> {
    return this.planetDeleteRequestService.execute(planetId);
  }
}
