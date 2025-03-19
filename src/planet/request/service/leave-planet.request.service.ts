import { Injectable } from '@nestjs/common';
import { api } from '../../../api/api';
import { AbstractRequestService } from '../../../core/request/abstract-request.service';
import { LeavePlanetInput, Planet } from '../../../dto';
import { PlanetResponseMapper } from '../../response/planet.response.mapper';

@Injectable()
export class LeavePlanetRequestService extends AbstractRequestService {
  constructor(private readonly planetResponseMapper: PlanetResponseMapper) {
    super();
  }

  async execute({ members, planetId }: LeavePlanetInput): Promise<Planet> {
    const requestHandler = this.requestHandlerFactory.createPatchRequest(
      api.handler.LEAVE_PLANET
    );

    const parameterHandler = this.createParameterHandler();
    parameterHandler.append('planetId', planetId);

    const requestBody = {
      members,
    };

    const response = await this.handlePatchRequest(
      requestHandler,
      requestBody,
      parameterHandler
    );

    return this.planetResponseMapper.mapItem(response);
  }
}
