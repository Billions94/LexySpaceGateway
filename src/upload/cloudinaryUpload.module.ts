import { Module } from '@nestjs/common';
import { CoreModule } from '../core/core.module';
import { ApiModule } from '../api/api.module';
import { CloudinaryUploadResolver } from './resolver/cloundinaryUpload.resolver';
import { CloudinaryUploadRequestService } from './request/cloudinary-upload-request.service';

@Module({
  imports: [CoreModule, ApiModule],

  providers: [
    // Resolver
    CloudinaryUploadResolver,

    // Request Service
    CloudinaryUploadRequestService,
  ],
  exports: [CloudinaryUploadRequestService],
})
export class CloudinaryUploadModule {}
