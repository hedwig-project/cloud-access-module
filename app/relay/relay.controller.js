import Relay from './relay.model'
import logger from '../logger'

function listAll(req, res, next) {
  Relay
    .find({}, { time: 1, name: 1, open: 1 })
    .exec()
    .then(relays => res.status(200).json(relays))
    .catch(e => next(e))
}

function create(req, res, next) {
  Relay
    .create(req.body)
    .then(relay => res.status(200).json(relay))
    .catch(e => next(e))
}

function errorHandler(err, req, res, next) {  // eslint-disable-line no-unused-vars
  const error = { code: err.name, message: err.message, details: err.errors }
  logger.error(error)
  res.status(500).json(error)
}

export default { listAll, create, errorHandler }
