/// <reference types="multer" />
import { Injectable } from '@nestjs/common'
import { ensureDir, writeFile } from 'fs-extra'
import * as iconv from 'iconv-lite'
import { join } from 'path'
import { PrismaService } from 'src/prisma/prisma.service'
import { v4 as uuidv4 } from 'uuid'

import { UploadResponse } from './upload-response.types'

const UPLOADS_ROOT = join(__dirname, '..', '..', 'uploads')

@Injectable()
export class MediaUploadService {
	constructor(private readonly prisma: PrismaService) {}

	async saveAvatar(
		file: Express.Multer.File,
		userId: string
	): Promise<UploadResponse> {
		const folder = 'avatars'
		const uploadFolder = join(UPLOADS_ROOT, folder)
		await ensureDir(uploadFolder)

		const original = iconv.decode(
			Buffer.from(file.originalname, 'binary'),
			'utf-8'
		)
		const safeName = original.replace(/[^\w.-]+/g, '-').toLowerCase()
		const name = `${uuidv4().slice(0, 8)}-${safeName}`

		await writeFile(`${uploadFolder}/${name}`, file.buffer)

		const url = `/uploads/${folder}/${name}`

		await this.prisma.user.update({
			where: { id: userId },
			data: {
				profile: {
					upsert: {
						create: { avatarUrl: url },
						update: { avatarUrl: url }
					}
				}
			}
		})
		return { url, name }
	}
}
