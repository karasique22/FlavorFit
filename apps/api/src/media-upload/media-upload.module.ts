import { Module } from '@nestjs/common'

import { MediaUploadController } from './media-upload.controller'
import { MediaUploadService } from './media-upload.service'

@Module({
	providers: [MediaUploadService],
	controllers: [MediaUploadController]
})
export class MediaUploadModule {}
