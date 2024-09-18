import { Injectable } from '@nestjs/common';
import { api } from '../../../api/api';
import { AbstractRequestService } from '../../../core/request/abstract-request.service';
import { PlanetInput, PlanetResponse } from '../../../dto';
import { PlanetResponseMapper } from '../../../planet/response/planet.response.mapper';
import { CloudinaryUploadRequestService } from '../../../upload/request/cloudinary-upload-request.service';
import { PlanetRequestMapper } from '../mappers/planet-request.mapper';

@Injectable()
export class UpdatePlanetRequestService extends AbstractRequestService {
  constructor(
    private readonly planetRequestMapper: PlanetRequestMapper,
    private readonly planetResponseMapper: PlanetResponseMapper,
    private readonly uploadRequestService: CloudinaryUploadRequestService
  ) {
    super();
  }

  async execute(
    update: PlanetInput,
    planetId: string,
    file: any
  ): Promise<PlanetResponse> {
    const requestHandler = this.requestHandlerFactory.createPatchRequest(
      api.handler.UPDATE_PLANET
    );

    const reqBody = this.planetRequestMapper.map(update);
    const parameterHandler = this.createParameterHandler();
    parameterHandler.append('planetId', planetId);

    if (file) {
      reqBody.image = (await this.uploadRequestService.execute(
        file,
        'getUrl'
      )) as string;
      reqBody.media = [
        (await this.uploadRequestService.execute(file, 'getUrl')) as string,
      ];
    }

    const response = await this.handlePatchRequest(
      requestHandler,
      reqBody,
      parameterHandler
    );

    if (!response.message) {
      return {
        data: {
          planet: this.planetResponseMapper.mapItem(response),
        },
      };
    }

    return {
      error: {
        message: response.message,
      },
    };
  }
}
