import { Injectable } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';
import { CloudinaryUploadRequestService } from '../request/cloudinary-upload-request.service';

@Resolver()
@Injectable()
export class CloudinaryUploadResolver {
  constructor(
    private readonly cloudinaryUploadRequestService: CloudinaryUploadRequestService
  ) {}

  @Mutation(() => Boolean)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: FileUpload
  ) {
    return this.cloudinaryUploadRequestService.execute(file);
  }
}
