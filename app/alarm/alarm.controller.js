import Alarm from './alarm.model'
import logger from '../logger'

function listAll(req, res, next) {
  Alarm
    .find({}, { time: 1, active: 1, timeSinceLastChange: 1 })
    .exec()
    .then(alarms => res.status(200).json(alarms))
    .catch(e => next(e))
}

function create(req, res, next) {
  Alarm
    .create(req.body)
    .then(alarm => res.status(200).json(alarm))
    .catch(e => next(e))
}

function errorHandler(err, req, res, next) {  // eslint-disable-line no-unused-vars
  const error = { code: err.name, message: err.message, details: err.errors }
  logger.error(error)
  res.status(500).json(error)
}

export default { listAll, create, errorHandler }
