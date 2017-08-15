import { Router } from 'express'
import Controller from './humidity.controller'

const router = Router()

router
  .route('/')
  .get(Controller.listAll)
  .post(Controller.create)

router.use(Controller.errorHandler)

export default router
