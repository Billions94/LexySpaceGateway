import { Injectable } from '@nestjs/common';
import { api } from '../../../api/api';
import { AbstractRequestService } from '../../../core/request/abstract-request.service';
import { CloudinaryUploadRequestService } from '../../../upload/request/cloudinary-upload-request.service';

@Injectable()
export class UploadMediaPlanetRequestService extends AbstractRequestService {
  constructor(private readonly uploadService: CloudinaryUploadRequestService) {
    super();
  }

  async execute(planetId: string, file: any) {
    const requestHandler = this.requestHandlerFactory.createPatchRequest(
      api.handler.PLANETS_UPLOAD_MEDIAS
    );

    const parameterHandler = this.createParameterHandler();
    parameterHandler.append('planetId', planetId);

    const requestBody: { media?: string } = {};
    if (file)
      requestBody.media = <string>(
        await this.uploadService.execute(file, 'getUrl')
      );

    return await this.handlePatchRequest(
      requestHandler,
      requestBody,
      parameterHandler
    );
  }
}
