import { Module } from '@nestjs/common';
import { ApiModule } from '../api/api.module';
import { CoreModule } from '../core/core.module';
import { CloudinaryUploadRequestService } from '../upload/request/cloudinary-upload-request.service';
import { UserResponseMapper } from '../user/response/user-response.mapper';
import { PlanetRequestMapper } from './request/mappers/planet-request.mapper';
import { CreatePlanetRequestService } from './request/service/create-planet.request.service';
import { DeletePlanetRequestService } from './request/service/delete-planet.request.service';
import { JoinPlanetRequestService } from './request/service/join-planet-request.service';
import { LeavePlanetRequestService } from './request/service/leave-planet.request.service';
import { PlanetGetRequestService } from './request/service/planet-get-request.service';
import { PlanetsRequestService } from './request/service/planets.request.service';
import { UpdatePlanetRequestService } from './request/service/update-planet.request.service';
import { UploadMediaPlanetRequestService } from './request/service/upload-media-planet.request.service';
import { PlanetResponseResolver } from './resolver/planet-response.resolver';
import { PlanetResolver } from './resolver/planet.resolver';
import { PlanetResponseMapper } from './response/planet.response.mapper';

@Module({
  imports: [CoreModule, ApiModule],
  providers: [
    // Request Mapper
    PlanetRequestMapper,

    // Request Services
    CreatePlanetRequestService,
    PlanetGetRequestService,
    PlanetsRequestService,
    DeletePlanetRequestService,
    JoinPlanetRequestService,
    LeavePlanetRequestService,
    UpdatePlanetRequestService,
    UploadMediaPlanetRequestService,
    CloudinaryUploadRequestService,
    UserResponseMapper,

    // Resolver
    PlanetResolver,
    PlanetResponseResolver,

    // Response Mapper
    PlanetResponseMapper,
  ],
  exports: [],
})
export class PlanetModule {}
