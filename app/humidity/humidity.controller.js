import Humidity from './humidity.model'
import logger from '../logger'

function listAll(req, res, next) {
  Humidity
    .find({}, { __v: 0 })
    .exec()
    .then(humidities => res.status(200).json(humidities))
    .catch(e => next(e))
}

function create(req, res, next) {
  Humidity
    .create(req.body)
    .then(humidity => res.status(200).json(humidity))
    .catch(e => next(e))
}

function errorHandler(err, req, res, next) {  // eslint-disable-line no-unused-vars
  const error = { code: err.name, message: err.message, details: err.errors }
  logger.error(error)
  res.status(500).json(error)
}

export default { listAll, create, errorHandler }
