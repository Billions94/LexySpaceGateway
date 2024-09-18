import { Injectable } from '@nestjs/common';
import { PlanetResponse } from 'src/dto';
import { api } from '../../../api/api';
import { AbstractRequestService } from '../../../core/request/abstract-request.service';

@Injectable()
export class DeletePlanetRequestService extends AbstractRequestService {
  constructor() {
    super();
  }

  async execute(planetId: string): Promise<PlanetResponse> {
    const requestHandler = this.requestHandlerFactory.createDeleteRequest(
      api.handler.DELETE_PLANET
    );

    const parameterHandler = this.createParameterHandler();
    parameterHandler.append('planetId', planetId);

    const response = await this.handleDeleteRequest(
      requestHandler,
      parameterHandler
    );

    if (response === true) {
      return { data: { status: response } };
    } else if (typeof response === 'object') {
      return {
        error: {
          status: response.status,
          message: response.errorMessage,
        },
      };
    }

    return {
      error: {
        status: false,
        message: response.message,
      },
    };
  }
}
