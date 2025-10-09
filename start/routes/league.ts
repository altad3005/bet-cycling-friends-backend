import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const LeaguesController = () => import('#controllers/leagues_controller')

router
  .group(() => {
    router.get('/:id', [LeaguesController, 'show'])
    router
      .group(() => {
        router.post('/', [LeaguesController, 'store'])
        router.post('/join', [LeaguesController, 'joinByCode'])
        router.delete('/:id', [LeaguesController, 'destroy'])
        })
      .use(middleware.auth())
  })
  .prefix('leagues')
