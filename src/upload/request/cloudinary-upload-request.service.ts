import { Injectable, Logger } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { FileUpload } from 'graphql-upload-ts';

@Injectable()
export class CloudinaryUploadRequestService {
  private readonly cloudinary;

  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
    this.cloudinary = cloudinary.uploader;
  }

  async execute(files: any, field?: string): Promise<boolean | string> {
    const base64String = await this.getFileAsBase64String(files[0].file);

    try {
      const { secure_url } = await this.cloudinary.upload(base64String, {
        resource_type: 'auto',
        format: 'auto',
        upload_preset: 'lexyspace-uploads',
        public_id: `${files[0].file.filename}`,
      });

      return field ? secure_url : true;
    } catch (error) {
      Logger.error(error);
      return false;
    }
  }

  private async getFileAsBase64String(file: FileUpload): Promise<string> {
    return new Promise((resolve, reject) => {
      const chunks: any[] = [];

      file
        .createReadStream()
        .on('data', (chunk) => chunks.push(chunk))
        .on('end', () => {
          const binaryData = Buffer.concat(chunks).toString('base64');
          const base64String = `data:${file.mimetype};base64,${binaryData}`;
          resolve(base64String);
        })
        .on('error', (error) => reject(error));
    });
  }
}
