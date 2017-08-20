import Alarm from '../alarm/alarm.model'
import Gate from '../gate/gate.model'
import Humidity from '../humidity/humidity.model'
import Presence from '../presence/presence.model'
import Relay from '../relay/relay.model'
import Temperature from '../temperature/temperature.model'
import { filterByRelayName, filterByTime } from '../helpers/parameters'
import logger from '../logger'

function listAlarm(req, res, next) {
  const filter = Object.assign(
    filterByTime(req.query.from, req.query.to),
    { controllerId: req.params.controllerId })
  const query = Alarm.find(filter, { __v: 0 }).sort({ time: 'desc' })

  if (filter.time === undefined) {
    query.limit(50)
  }

  query
    .exec()
    .then(alarms => res.status(200).json(alarms))
    .catch(e => next(e))
}

function listGate(req, res, next) {
  const filter = Object.assign(
    filterByTime(req.query.from, req.query.to),
    { controllerId: req.params.controllerId })
  const query = Gate.find(filter, { __v: 0 }).sort({ time: 'desc' })

  if (filter.time === undefined) {
    query.limit(50)
  }

  query
    .exec()
    .then(gates => res.status(200).json(gates))
    .catch(e => next(e))
}

function listHumidity(req, res, next) {
  const filter = Object.assign(
    filterByTime(req.query.from, req.query.to),
    { controllerId: req.params.controllerId })
  const query = Humidity.find(filter, { __v: 0 }).sort({ time: 'desc' })

  if (filter.time === undefined) {
    query.limit(50)
  }

  query
    .exec()
    .then(humidities => res.status(200).json(humidities))
    .catch(e => next(e))
}

function getHumidityAverage(req, res, next) {
  const filter = Object.assign(
    filterByTime(req.query.from, req.query.to),
    { controllerId: req.params.controllerId })

  Humidity
    .aggregate()
    .match(filter)
    .group({ _id: null, average: { $avg: '$humidity' } })
    .project({ _id: 0 })
    .exec()
    .then(average => res.status(200).json(average[0]))
    .catch(e => next(e))
}

function getHumidityMinimum(req, res, next) {
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

function getHumidityMaximum(req, res, next) {
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

function listPresence(req, res, next) {
  const filter = Object.assign(
    filterByTime(req.query.from, req.query.to),
    { controllerId: req.params.controllerId })
  const query = Presence.find(filter, { __v: 0 }).sort({ time: 'desc' })

  if (filter.time === undefined) {
    query.limit(50)
  }

  query
    .exec()
    .then(presences => res.status(200).json(presences))
    .catch(e => next(e))
}

function listRelay(req, res, next) {
  const filter = Object.assign(
    filterByRelayName(req.query.name),
    filterByTime(req.query.from, req.query.to),
    { controllerId: req.params.controllerId })
  const query = Relay.find(filter, { __v: 0 }).sort({ time: 'desc' })

  if (filter.time === undefined) {
    query.limit(50)
  }

  query
    .exec()
    .then(relays => res.status(200).json(relays))
    .catch(e => next(e))
}

function listTemperature(req, res, next) {
  const filter = Object.assign(
    filterByTime(req.query.from, req.query.to),
    { controllerId: req.params.controllerId })
  const query = Temperature.find(filter, { __v: 0 }).sort({ time: 'desc' })

  if (filter.time === undefined) {
    query.limit(50)
  }

  query
    .exec()
    .then(temperatures => res.status(200).json(temperatures))
    .catch(e => next(e))
}

function getTemperatureAverage(req, res, next) {
  const filter = Object.assign(
    filterByTime(req.query.from, req.query.to),
    { controllerId: req.params.controllerId })

  Temperature
    .aggregate()
    .match(filter)
    .group({ _id: null, average: { $avg: '$temperature' } })
    .project({ _id: 0 })
    .exec()
    .then(average => res.status(200).json(average[0]))
    .catch(e => next(e))
}

function getTemperatureMinimum(req, res, next) {
  const filter = Object.assign(
    filterByTime(req.query.from, req.query.to),
    { controllerId: req.params.controllerId })

  Temperature
    .aggregate()
    .match(filter)
    .group({ _id: null, average: { $min: '$temperature' } })
    .project({ _id: 0 })
    .exec()
    .then(average => res.status(200).json(average[0]))
    .catch(e => next(e))
}

function getTemperatureMaximum(req, res, next) {
  const filter = Object.assign(
    filterByTime(req.query.from, req.query.to),
    { controllerId: req.params.controllerId })

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

export default {
  listAlarm,
  listGate,
  listHumidity,
  getHumidityAverage,
  getHumidityMinimum,
  getHumidityMaximum,
  listPresence,
  listRelay,
  listTemperature,
  getTemperatureAverage,
  getTemperatureMinimum,
  getTemperatureMaximum,
  errorHandler,
}
