import { Injectable } from '@nestjs/common';
import { api } from '../../../api/api';
import { AbstractRequestService } from '../../../core/request/abstract-request.service';
import { JoinPlanetInput, PlanetResponse } from '../../../dto';
import { PlanetResponseMapper } from '../../../planet/response/planet.response.mapper';

@Injectable()
export class JoinPlanetRequestService extends AbstractRequestService {
  constructor(private readonly planetResponseMapper: PlanetResponseMapper) {
    super();
  }

  async execute({
    accessCode,
    members,
    planetId,
  }: JoinPlanetInput): Promise<PlanetResponse> {
    const requestHandler = this.requestHandlerFactory.createPatchRequest(
      api.handler.JOIN_PLANET
    );

    const parameterHandler = this.createParameterHandler();
    parameterHandler.append('planetId', planetId);

    const response = await this.handlePatchRequest(
      requestHandler,
      { members, accessCode },
      parameterHandler
    );

    const error = {
      status: response.status ?? false,
      message: response.errorMessage || response.message,
    };

    if ('message' in response) return { error };
    else if ('errorMessage' in response) return { error };
    else
      return {
        data: { planet: this.planetResponseMapper.mapItem(response) },
      };
  }
}
