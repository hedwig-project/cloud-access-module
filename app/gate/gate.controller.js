import Gate from './gate.model'
import logger from '../logger'

function listAll(req, res, next) {
  Gate
    .find({}, { __v: 0 })
    .sort({ time: 'desc' })
    .limit(50)
    .exec()
    .then(gates => res.status(200).json(gates))
    .catch(e => next(e))
}

function create(req, res, next) {
  Gate
    .create(req.body)
    .then(gate => res.status(200).json(gate))
    .catch(e => next(e))
}

function errorHandler(err, req, res, next) {  // eslint-disable-line no-unused-vars
  const error = { code: err.name, message: err.message, details: err.errors }
  logger.error(error)
  res.status(500).json(error)
}

export default { listAll, create, errorHandler }
