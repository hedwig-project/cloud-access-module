import { Router } from 'express'
import Controller from './localController.controller'

const router = Router()

router
  .route('/:controllerId/alarm')
  .get(Controller.listAllAlarm)

router
  .route('/:controllerId/gate')
  .get(Controller.listAllGate)

router
  .route('/:controllerId/humidity')
  .get(Controller.listAllHumidity)

router
  .route('/:controllerId/presence')
  .get(Controller.listAllPresence)

router
  .route('/:controllerId/relay')
  .get(Controller.listAllRelay)

router
  .route('/:controllerId/temperature')
  .get(Controller.listAllTemperature)

router.use(Controller.errorHandler)

export default router
