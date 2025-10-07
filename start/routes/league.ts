import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const LeaguesController = () => import('#controllers/leagues_controller')

router
  .group(() => {
    router.get('/', [LeaguesController, 'index'])
    router.post('/', [LeaguesController, 'store']).middleware([middleware.auth()])
    router.get('/:id', [LeaguesController, 'show'])
    router.delete('/:id', [LeaguesController, 'destroy']).middleware([middleware.auth()])
  })
  .prefix('leagues')
