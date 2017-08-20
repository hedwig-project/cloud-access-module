import { Router } from 'express'
import Controller from './temperature.controller'

const router = Router()

router
  .route('/')
  .get(Controller.list)
  .post(Controller.create)

router
  .route('/average')
  .get(Controller.average)

router
  .route('/minimum')
  .get(Controller.minimum)

router
  .route('/maximum')
  .get(Controller.maximum)

router.use(Controller.errorHandler)

export default router
