import Relay from './relay.model'
import { filterByRelayName, filterByTime } from '../helpers/parameters'
import logger from '../logger'

function list(req, res, next) {
  const filter = Object.assign(
    filterByRelayName(req.query.name),
    filterByTime(req.query.from, req.query.to))
  const query = Relay.find(filter, { __v: 0 }).sort({ time: 'desc' })

  if (filter.time === undefined) {
    query.limit(50)
  }

  query
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

export default { list, create, errorHandler }
