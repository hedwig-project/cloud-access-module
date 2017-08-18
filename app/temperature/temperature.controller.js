import Temperature from './temperature.model'
import logger from '../logger'

function listAll(req, res, next) {
  Temperature
    .find({}, { __v: 0 })
    .sort({ time: 'desc' })
    .limit(50)
    .exec()
    .then(temperatures => res.status(200).json(temperatures))
    .catch(e => next(e))
}

function create(req, res, next) {
  Temperature
    .create(req.body)
    .then(temperature => res.status(200).json(temperature))
    .catch(e => next(e))
}

function errorHandler(err, req, res, next) {  // eslint-disable-line no-unused-vars
  const error = { code: err.name, message: err.message, details: err.errors }
  logger.error(error)
  res.status(500).json(error)
}

export default { listAll, create, errorHandler }
