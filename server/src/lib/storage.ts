import { v2 as cloudinary } from 'cloudinary';
import { env } from '../env.js';

cloudinary.config({ cloud_name: env.CLOUDINARY_CLOUD_NAME, api_key: env.CLOUDINARY_API_KEY, api_secret: env.CLOUDINARY_API_SECRET });

export function uploadImage(buffer: Buffer, filename: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'buddyscript', public_id: `${Date.now()}-${filename}`, resource_type: 'image' },
      (error, result) => { if (error || !result) return reject(error ?? new Error('Upload failed')); resolve(result.secure_url); },
    );
    stream.end(buffer);
  });
}
