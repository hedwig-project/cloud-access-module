import Humidity from './humidity.model'
import { filterByTime } from '../helpers/parameters'
import logger from '../logger'

function list(req, res, next) {
  const filter = filterByTime(req.query.from, req.query.to)
  const query = Humidity.find(filter, { __v: 0 }).sort({ time: 'desc' })

  if (filter.time === undefined) {
    query.limit(50)
  }

  query
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

function average(req, res, next) {
  const filter = filterByTime(req.query.from, req.query.to)

  Humidity
    .aggregate()
    .match(filter)
    .group({ _id: null, average: { $avg: '$humidity' } })
    .project({ _id: 0 })
    .exec()
    .then(average => res.status(200).json(average[0]))
    .catch(e => next(e))
}

function minimum(req, res, next) {
  const filter = filterByTime(req.query.from, req.query.to)

  Humidity
    .aggregate()
    .match(filter)
    .group({ _id: null, minimum: { $min: '$humidity' } })
    .project({ _id: 0 })
    .exec()
    .then(average => res.status(200).json(average[0]))
    .catch(e => next(e))
}

function maximum(req, res, next) {
  const filter = filterByTime(req.query.from, req.query.to)

  Humidity
    .aggregate()
    .match(filter)
    .group({ _id: null, minimum: { $max: '$humidity' } })
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
