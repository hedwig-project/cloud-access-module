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
  .route('/:controllerId/humidity/average')
  .get(Controller.getHumidityAverage)

router
  .route('/:controllerId/humidity/minimum')
  .get(Controller.getHumidityMinimum)

router
  .route('/:controllerId/humidity/maximum')
  .get(Controller.getHumidityMaximum)

router
  .route('/:controllerId/presence')
  .get(Controller.listPresence)

router
  .route('/:controllerId/relay')
  .get(Controller.listRelay)

router
  .route('/:controllerId/temperature')
  .get(Controller.listTemperature)

router
  .route('/:controllerId/temperature/average')
  .get(Controller.getTemperatureAverage)

router
  .route('/:controllerId/temperature/minimum')
  .get(Controller.getTemperatureMinimum)

router
  .route('/:controllerId/temperature/maximum')
  .get(Controller.getTemperatureMaximum)

router.use(Controller.errorHandler)

export default router
