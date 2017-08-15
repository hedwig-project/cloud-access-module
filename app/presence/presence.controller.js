import Presence from './presence.model'
import logger from '../logger'

function listAll(req, res, next) {
  Presence
    .find({}, { time: 1, presence: 1 })
    .exec()
    .then(presences => res.status(200).json(presences))
    .catch(e => next(e))
}

function create(req, res, next) {
  Presence
    .create(req.body)
    .then(presence => res.status(200).json(presence))
    .catch(e => next(e))
}

function errorHandler(err, req, res, next) {  // eslint-disable-line no-unused-vars
  const error = { code: err.name, message: err.message, details: err.errors }
  logger.error(error)
  res.status(500).json(error)
}

export default { listAll, create, errorHandler }
