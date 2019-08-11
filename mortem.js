const Conf = require('conf')

const checkUnsetDate = (Mortem) => {
  if (!Mortem.cfg.has('date')) {
    throw 'Unseted date. use: mortem sbd YYYY/MM/DD'
  }
}
const checkInvalidDate = (d) => {
  const re = /^(-?(?:[1-9][0-9]*)?[0-9]{4})\/(1[0-2]|0[1-9])\/(3[01]|0[1-9]|[12][0-9])$/
  if (!re.test(d)) {
    throw 'Invalid date. format: YYYY/MM/DD'
  }
}

const Mortem = {
  cfg: new Conf(),
  ley: 70, // life expectancy (years)
  led: 25567.5, // life expectancy (days)

  async setBirthDate(d) {
    checkInvalidDate(d)
    Mortem.cfg.set('date', d)
    return d
  },

  async getBirthDate() {
    checkUnsetDate(Mortem)
    const d = new Date(Mortem.cfg.get('date'))
    const DD = `${d.getDate()}`.padStart(2, '0')
    const MM = `${d.getMonth() + 1}`.padStart(2, '0')
    const YYYY = d.getFullYear()
    return `${YYYY}/${MM}/${DD}`
  },

  async estimatedDaysRemaining() {
    checkUnsetDate(Mortem)
    const expected = Mortem.led
    const lived = await Mortem.numberOfDaysLived()
    return Math.ceil(expected - lived)
  },

  async estimatedYearOfDeath() {
    checkUnsetDate(Mortem)
    const d = new Date(Mortem.cfg.get('date'))
    const birth = d.getFullYear()
    const expected = Mortem.ley
    return  birth + expected
  },

  async progressPercentage() {
    checkUnsetDate(Mortem)
    const lived = await Mortem.numberOfDaysLived()
    const expected = Mortem.led
    const percentage = (lived / expected) * 100
    return `${percentage.toFixed(2)}%`
  },

  async numberOfDaysLived() {
    checkUnsetDate(Mortem)
    const d = new Date(Mortem.cfg.get('date'))
    const birth = d.getTime()
    const now = new Date().getTime()
    const timeLived = now - birth
    return Math.ceil(timeLived / (1000 * 60 * 60 * 24))
  }
}

module.exports = Mortem
