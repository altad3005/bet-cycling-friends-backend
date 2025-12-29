import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const UsersController = () => import('#controllers/users_controller')

router
  .group(() => {
    router.get('/leagues', [UsersController, 'leagues']),
    router.get('/update', [UsersController, 'update']),
    router.get('/get', [UsersController, 'get']),
    router.get('/delete', [UsersController, 'delete'])
  })
  .use(middleware.auth())
  .prefix('users')
