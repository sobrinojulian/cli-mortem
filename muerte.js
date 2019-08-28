const Conf = require('conf')

const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

const checkUnsetDate = Muerte => {
  if (!Muerte.cfg.has('date')) {
    throw 'Unseted date. use: muerte sbd YYYY/MM/DD'
  }
}
const checkInvalidDate = d => {
  const re = /^(-?(?:[1-9][0-9]*)?[0-9]{4})\/(1[0-2]|0[1-9])\/(3[01]|0[1-9]|[12][0-9])$/
  if (!re.test(d)) {
    throw 'Invalid date. format: YYYY/MM/DD'
  }
}

const Muerte = {
  cfg: new Conf(),
  lifeExpectancyYears: 70,
  lifeExpectancyDays: 25567.5,

  async setBirthDate (d) {
    checkInvalidDate(d)
    Muerte.cfg.set('date', d)
    return d
  },

  async getBirthDate () {
    checkUnsetDate(Muerte)
    const d = new Date(Muerte.cfg.get('date'))
    const DD = `${d.getDate()}`.padStart(2, '0')
    const MM = `${d.getMonth() + 1}`.padStart(2, '0')
    const YYYY = d.getFullYear()
    return `${YYYY}/${MM}/${DD}`
  },

  async numberOfDaysLived () {
    checkUnsetDate(Muerte)
    const d = new Date(Muerte.cfg.get('date'))
    const birth = d.getTime()
    const now = new Date().getTime()
    const msLived = now - birth
    return Math.ceil(msLived / DAY)
  },

  async estimatedYearOfDeath () {
    checkUnsetDate(Muerte)
    const d = new Date(Muerte.cfg.get('date'))
    const birth = d.getFullYear()
    const expected = Muerte.lifeExpectancyYears
    return birth + expected
  },

  async estimatedDaysRemaining () {
    checkUnsetDate(Muerte)
    const expected = Muerte.lifeExpectancyDays
    const lived = await Muerte.numberOfDaysLived()
    return Math.ceil(expected - lived)
  },

  async progressPercentage () {
    checkUnsetDate(Muerte)
    const lived = await Muerte.numberOfDaysLived()
    const expected = Muerte.lifeExpectancyDays
    const percentage = (lived / expected) * 100
    return `${percentage.toFixed(2)}%`
  }
}

module.exports = Muerte
