import { Injectable } from '@nestjs/common';
import { api } from '../../../api/api';
import { AbstractRequestService } from '../../../core/request/abstract-request.service';
import { Planet } from '../../../dto';
import { PlanetResponseMapper } from '../../../planet/response/planet.response.mapper';

@Injectable()
export class PlanetGetRequestService extends AbstractRequestService {
  constructor(private readonly planetResponseMapper: PlanetResponseMapper) {
    super();
  }

  async execute(planetId: string): Promise<Planet> {
    const requestHandler = this.requestHandlerFactory.createGetRequest(
      api.handler.GET_PLANET
    );

    const parameterHandler = this.createParameterHandler();
    parameterHandler.append('planetId', planetId);

    const response = await this.handleGetRequest(
      requestHandler,
      parameterHandler
    );

    return this.planetResponseMapper.mapItem(response);
  }
}
