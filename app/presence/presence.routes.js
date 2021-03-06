import { Router } from 'express'
import Controller from './presence.controller'

const router = Router()

router
  .route('/')
  .get(Controller.list)
  .post(Controller.create)

router.use(Controller.errorHandler)

export default router
