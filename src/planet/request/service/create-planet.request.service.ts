import { Injectable } from '@nestjs/common';
import { PlanetInput } from 'src/dto';
import { CloudinaryUploadRequestService } from 'src/upload/request/cloudinary-upload-request.service';
import { api } from '../../../api/api';
import { AbstractRequestService } from '../../../core/request/abstract-request.service';
import { PlanetRequestMapper } from '../mappers/planet-request.mapper';

@Injectable()
export class CreatePlanetRequestService extends AbstractRequestService {
  constructor(
    private readonly uploadService: CloudinaryUploadRequestService,
    private readonly planetRequestMapper: PlanetRequestMapper
  ) {
    super();
  }

  async execute(input: PlanetInput, file?: any) {
    const requestHandler = this.requestHandlerFactory.createPostRequest(
      api.handler.CREATE_PLANET
    );

    const requestBody = this.planetRequestMapper.map(input);
    if (file)
      requestBody.image = <string>(
        await this.uploadService.execute(file, 'getUrl')
      );

    return await this.handlePostRequest(requestHandler, requestBody);
  }
}
