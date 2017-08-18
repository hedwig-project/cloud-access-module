import moment from 'moment'

export function filterByTime(from = '', to = '') {
  const filter = {}

  if (from !== '') {
    filter.time = {}
    filter.time.$gt = moment(`${from}T00:00:00Z`).toDate()
  }

  if (to !== '') {
    if (filter.time === undefined) {
      filter.time = {}
    }
    filter.time.$lt = moment(`${to}T23:59:59Z`).toDate()
  }

  return filter
}

export default { filterByTime }
