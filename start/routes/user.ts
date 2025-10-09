import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const UsersController = () => import('#controllers/users_controller')

router
  .group(() => {
    router.get('/leagues', [UsersController, 'leagues'])
  })
  .use(middleware.auth())
  .prefix('users')
