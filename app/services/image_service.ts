import { MultipartFile } from '@adonisjs/core/bodyparser'
import drive from '@adonisjs/drive/services/main'
import { cuid } from '@adonisjs/core/helpers'

export default class ImageService {
  async upload(file: MultipartFile) {
    const fileName = `${cuid()}.${file.extname}`
    await file.moveToDisk('', 'fs', { name: fileName })
    const url = await drive.use('fs').getUrl(fileName)
    
    return {
      fileName,
      url
    }
  }
}