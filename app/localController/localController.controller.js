import Alarm from '../alarm/alarm.model'
import Gate from '../gate/gate.model'
import Humidity from '../humidity/humidity.model'
import Presence from '../presence/presence.model'
import Relay from '../relay/relay.model'
import Temperature from '../temperature/temperature.model'
import logger from '../logger'

function listAllAlarm(req, res, next) {
  Alarm
    .find({ controllerId: req.params.controllerId }, { __v: 0 })
    .sort({ time: 'desc' })
    .limit(50)
    .exec()
    .then(alarms => res.status(200).json(alarms))
    .catch(e => next(e))
}

function listAllGate(req, res, next) {
  Gate
    .find({ controllerId: req.params.controllerId }, { __v: 0 })
    .sort({ time: 'desc' })
    .limit(50)
    .exec()
    .then(alarms => res.status(200).json(alarms))
    .catch(e => next(e))
}

function listAllHumidity(req, res, next) {
  Humidity
    .find({ controllerId: req.params.controllerId }, { __v: 0 })
    .sort({ time: 'desc' })
    .limit(50)
    .exec()
    .then(alarms => res.status(200).json(alarms))
    .catch(e => next(e))
}

function listAllPresence(req, res, next) {
  Presence
    .find({ controllerId: req.params.controllerId }, { __v: 0 })
    .sort({ time: 'desc' })
    .limit(50)
    .exec()
    .then(alarms => res.status(200).json(alarms))
    .catch(e => next(e))
}

function listAllRelay(req, res, next) {
  Relay
    .find({ controllerId: req.params.controllerId }, { __v: 0 })
    .sort({ time: 'desc' })
    .limit(50)
    .exec()
    .then(alarms => res.status(200).json(alarms))
    .catch(e => next(e))
}

function listAllTemperature(req, res, next) {
  Temperature
    .find({ controllerId: req.params.controllerId }, { __v: 0 })
    .sort({ time: 'desc' })
    .limit(50)
    .exec()
    .then(alarms => res.status(200).json(alarms))
    .catch(e => next(e))
}

function errorHandler(err, req, res, next) {  // eslint-disable-line no-unused-vars
  const error = { code: err.name, message: err.message, details: err.errors }
  logger.error(error)
  res.status(500).json(error)
}

export default {
  listAllAlarm,
  listAllGate,
  listAllHumidity,
  listAllPresence,
  listAllRelay,
  listAllTemperature,
  errorHandler,
}
