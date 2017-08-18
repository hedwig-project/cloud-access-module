import Gate from './gate.model'
import { filterByTime } from '../helpers/parameters'
import logger from '../logger'

function list(req, res, next) {
  const filter = filterByTime(req.query.from, req.query.to)
  const query = Gate.find(filter, { __v: 0 }).sort({ time: 'desc' })

  if (filter.time === undefined) {
    query.limit(50)
  }

  query
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

export default { list, create, errorHandler }
