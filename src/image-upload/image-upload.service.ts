import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class ImageUploadService {
  constructor() {
    cloudinary.config({
      cloud_name: 'ankur786',
      api_key: '342834472745212',
      api_secret: 'U2aqWr7cs7YCwZOo-qXfWo34u58',
    });
  }

  async uploadImage(imgBuffer: Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto', 
        },
        (error, result) => {
          if (error) {
            console.error('Error uploading image to Cloudinary:', error);
            return reject(new Error('Image upload failed'));
          }
          if (!result) {
            return reject(new Error('Something went wrong, no result returned'));
          }
          resolve(result.secure_url); 
        }
      );

     
      stream.end(imgBuffer); 
    });
  }
}