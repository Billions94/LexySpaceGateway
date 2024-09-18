import { Injectable } from '@nestjs/common';
import { api } from '../../../api/api';
import { AbstractRequestService } from '../../../core/request/abstract-request.service';
import { Planet } from '../../../dto';
import { PlanetResponseMapper } from '../../../planet/response/planet.response.mapper';

@Injectable()
export class PlanetsRequestService extends AbstractRequestService {
  constructor(private readonly planetResponseMapper: PlanetResponseMapper) {
    super();
  }

  async execute(): Promise<Planet[]> {
    const requestHandler = this.requestHandlerFactory.createGetRequest(
      api.handler.PLANETS
    );

    const response = await this.handleGetRequest(requestHandler);
    return this.planetResponseMapper.map(response);
  }
}
