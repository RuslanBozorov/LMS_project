import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key:    process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'lms/courses' },
        (error, result) => {
          if (error) return reject(error)
          if (!result) return reject(new Error('Upload failed'))
          resolve(result.secure_url)
        }
      ).end(file.buffer)
    })
  }

  async uploadVideo(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { 
          folder: 'lms/courses/videos',
          resource_type: 'video'
        },
        (error, result) => {
          if (error) return reject(error)
          if (!result) return reject(new Error('Upload failed'))
          resolve(result.secure_url)
        }
      ).end(file.buffer)
    })
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'lms/files' },
        (error, result) => {
          if (error) return reject(error)
          if (!result) return reject(new Error('Upload failed'))
          resolve(result.secure_url)
        }
      ).end(file.buffer)
    })
  }
}