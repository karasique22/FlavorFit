import {
	Controller,
	HttpCode,
	Post,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'

import { MediaUploadService } from './media-upload.service'

@Controller('media-upload')
export class MediaUploadController {
	constructor(private readonly mediaUploadService: MediaUploadService) {}

	@HttpCode(200)
	@Post('avatar')
	@Auth()
	@UseInterceptors(
		FileInterceptor('file', { limits: { fileSize: 5 * 1024 * 1024 } })
	)
	async uploadAvatar(
		@UploadedFile() file: Express.Multer.File,
		@CurrentUser('id') userId: string
	) {
		const uploaded = await this.mediaUploadService.saveAvatar(file, userId)
		return uploaded
	}
}
