import router from '@adonisjs/core/services/router'
const RacesController = () => import('#controllers/races_controller')

router
  .group(() => {
    router.get('/', [RacesController, 'index'])
    router.get('/:slug/:year/startlist', [RacesController, 'startList'])
    router.get('/:slug/:year/info', [RacesController, 'raceInfo'])
  })
  .prefix('races')
