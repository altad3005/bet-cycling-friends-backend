import router from '@adonisjs/core/services/router'
const RacesController = () => import('#controllers/races_controller')

router
  .group(() => {
    router.get('/:slug/:year/startlist', [RacesController, 'startList'])
    router.get('/:slug/:year/results', [RacesController, 'resultsGc'])
    router.get('/:slug/:year/stage/:stageNumber/results', [RacesController, 'resultsStages'])
  })
  .prefix('races')
