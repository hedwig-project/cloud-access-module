import { Router } from 'express'
import Controller from './localController.controller'

const router = Router()

router
  .route('/:controllerId/alarm')
  .get(Controller.listAlarm)

router
  .route('/:controllerId/gate')
  .get(Controller.listGate)

router
  .route('/:controllerId/humidity')
  .get(Controller.listHumidity)

router
  .route('/:controllerId/presence')
  .get(Controller.listPresence)

router
  .route('/:controllerId/relay')
  .get(Controller.listRelay)

router
  .route('/:controllerId/temperature')
  .get(Controller.listTemperature)

router.use(Controller.errorHandler)

export default router
