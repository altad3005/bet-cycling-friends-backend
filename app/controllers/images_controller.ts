import { HttpContext } from '@adonisjs/core/http'
import ImageService from '#services/image_service'
import { uploadImageValidator } from '#validators/image'
import { inject } from '@adonisjs/core'

@inject()
export default class ImagesController {
  constructor(protected imageService: ImageService) {}

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(uploadImageValidator)
    
    const {fileName, url} = await this.imageService.upload(payload.image)
    
    return response.ok({
      message: 'Upload successful',
      url: url,
      fileName: fileName
    })
  }
}