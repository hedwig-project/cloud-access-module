import Temperature from './temperature.model'
import { filterByTime } from '../helpers/parameters'
import logger from '../logger'

function list(req, res, next) {
  const filter = filterByTime(req.query.from, req.query.to)
  const query = Temperature.find(filter, { __v: 0 }).sort({ time: 'desc' })

  if (filter.time === undefined) {
    query.limit(50)
  }

  query
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

function average(req, res, next) {
  const filter = filterByTime(req.query.from, req.query.to)

  Temperature
    .aggregate()
    .match(filter)
    .group({ _id: null, average: { $avg: '$temperature' } })
    .project({ _id: 0 })
    .exec()
    .then(average => res.status(200).json(average[0]))
    .catch(e => next(e))
}

function minimum(req, res, next) {
  const filter = filterByTime(req.query.from, req.query.to)

  Temperature
    .aggregate()
    .match(filter)
    .group({ _id: null, average: { $min: '$temperature' } })
    .project({ _id: 0 })
    .exec()
    .then(average => res.status(200).json(average[0]))
    .catch(e => next(e))
}

function maximum(req, res, next) {
  const filter = filterByTime(req.query.from, req.query.to)

  Temperature
    .aggregate()
    .match(filter)
    .group({ _id: null, average: { $max: '$temperature' } })
    .project({ _id: 0 })
    .exec()
    .then(average => res.status(200).json(average[0]))
    .catch(e => next(e))
}

function errorHandler(err, req, res, next) {  // eslint-disable-line no-unused-vars
  const error = { code: err.name, message: err.message, details: err.errors }
  logger.error(error)
  res.status(500).json(error)
}

export default { list, create, average, minimum, maximum, errorHandler }
