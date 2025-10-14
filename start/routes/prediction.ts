import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const PredictionsController = () => import('#controllers/predictions_controller')

router
  .group(() => {
    router.post('/races/:raceId/predictions', [PredictionsController, 'store'])
    router.get('/predictions/:id', [PredictionsController, 'show'])
    router.put('/predictions/:id', [PredictionsController, 'update'])
    router.delete('/predictions/:id', [PredictionsController, 'destroy'])
  })
  .use(middleware.auth())
