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
        router.delete('/:leagueId/members/:userId', [LeaguesController, 'removeMember'])
        router.post('/:leagueId/members/:userId/promote', [LeaguesController, 'promoteMember'])
      })
      .use(middleware.auth())
  })
  .prefix('leagues')
