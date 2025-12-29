import router from '@adonisjs/core/services/router'
const ImagesController = () => import('#controllers/images_controller')

router.post('/upload', [ImagesController, 'store'])