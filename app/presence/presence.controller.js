import Presence from './presence.model'
import { filterByTime } from '../helpers/parameters'
import logger from '../logger'

function list(req, res, next) {
  const filter = filterByTime(req.query.from, req.query.to)
  const query = Presence.find(filter, { __v: 0 }).sort({ time: 'desc' })

  if (filter.time === undefined) {
    query.limit(50)
  }

  query
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

export default { list, create, errorHandler }
