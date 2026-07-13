import { v2 as cloudinary } from 'cloudinary';
import { env } from '../env.js';
import { ApiError } from './errors.js';

export const imageStorageConfigured = Boolean(
  env.CLOUDINARY_CLOUD_NAME && env.CLOUDINARY_API_KEY && env.CLOUDINARY_API_SECRET,
);

if (imageStorageConfigured)
  cloudinary.config({ cloud_name: env.CLOUDINARY_CLOUD_NAME, api_key: env.CLOUDINARY_API_KEY, api_secret: env.CLOUDINARY_API_SECRET });

export function isSupportedImage(buffer: Buffer): boolean {
  const hex = buffer.subarray(0, 12).toString('hex');
  const ascii = buffer.subarray(0, 12).toString('ascii');
  return hex.startsWith('89504e470d0a1a0a') ||
    hex.startsWith('ffd8ff') ||
    ascii.startsWith('GIF87a') ||
    ascii.startsWith('GIF89a') ||
    (ascii.startsWith('RIFF') && ascii.slice(8, 12) === 'WEBP');
}

export async function uploadImage(buffer: Buffer, filename: string): Promise<string> {
  if (!imageStorageConfigured) throw new ApiError(503, 'Image storage is not configured');
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'buddyscript', public_id: `${Date.now()}-${filename}`, resource_type: 'image' },
      (error, result) => { if (error || !result) return reject(error ?? new Error('Upload failed')); resolve(result.secure_url); },
    );
    stream.end(buffer);
  });
}
