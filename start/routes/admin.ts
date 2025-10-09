import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const AdminController = () => import('#controllers/admin_controller')

router
  .group(() => {
    router.delete('/leagues/:leagueId/members/:userId', [AdminController, 'removeMember'])
    router.post('/leagues/:leagueId/members/:userId/promote', [AdminController, 'promoteMember'])
  })
  .prefix('admin')
  .use(middleware.auth())
