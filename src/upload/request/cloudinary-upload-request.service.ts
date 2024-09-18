import { Injectable, Logger } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { ReadStream } from 'fs';
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

  async execute(
    files: any,
    field?: 'getUrl' | 'ignore'
  ): Promise<boolean | string | string[]> {
    const urls = Array.isArray(files)
      ? await this.uploadMultiple(files)
      : await this.uploadSingle(files[0]);

    return field === 'getUrl' ? [urls as any] : urls ? true : false;
  }

  private async uploadSingle(file: FileUpload): Promise<string> {
    return this.streamer(file.createReadStream(), file.mimetype, file.filename);
  }

  private async uploadMultiple(files: any[]): Promise<string[]> {
    return await Promise.all(
      files.map(
        async (file: Promise<{ file: FileUpload }>): Promise<string> => {
          const { mimetype, filename, createReadStream } = (await file)?.file;
          return this.streamer(createReadStream(), mimetype, filename);
        }
      )
    );
  }

  private async uploadFile(
    base64String: string,
    fileName: string
  ): Promise<string> {
    let url = '';

    try {
      const { secure_url } = await this.cloudinary.upload(base64String, {
        resource_type: 'auto',
        format: 'auto',
        upload_preset: 'lexyspace-uploads',
        public_id: `${fileName}`,
      });
      url = secure_url;

      return url;
    } catch (error) {
      Logger.error(error);
    }

    return url;
  }

  private async streamer(
    stream: ReadStream,
    mimetype: string,
    filename: string
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const chunks: any[] = [];

      stream
        .on('data', (chunk) => chunks.push(chunk))
        .on('end', () => {
          const binaryData = Buffer.concat(chunks).toString('base64');
          const base64String = `data:${mimetype};base64,${binaryData}`;

          resolve(this.uploadFile(base64String, filename));
        })
        .on('error', (error) => reject(error));
    });
  }
}
