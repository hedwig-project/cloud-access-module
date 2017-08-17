import { Router } from 'express'
import Alarm from './alarm/alarm.routes'
import Gate from './gate/gate.routes'
import Humidity from './humidity/humidity.routes'
import LocalController from './localController/localController.routes'
import Presence from './presence/presence.routes'
import Relay from './relay/relay.routes'
import Temperature from './temperature/temperature.routes'

const router = Router()

// Health check endpoint
router.get('/health', (req, res) => res.status(200).send('OK'))

// Entities
router.use('/alarm', Alarm)
router.use('/controller', LocalController)
router.use('/gate', Gate)
router.use('/humidity', Humidity)
router.use('/presence', Presence)
router.use('/relay', Relay)
router.use('/temperature', Temperature)

export default router
