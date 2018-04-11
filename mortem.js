const Conf = require('conf')
const moment = require('moment')

const unsetDateError = (mortem) => {
  if (!Mortem.cfg.has('date')) {
    throw 'Unseted date. use: mortem sbd YYYY/MM/DD'
  }
}
const invalidDateError = (d) => {
  if (!moment(d, 'YYYY/MM/DD').isValid()) {
    throw 'Invalid date. format: YYYY/MM/DD'
  }
}

const Mortem = {
  cfg: new Conf(),
  hle: 70, // human life expectancy (years)
  led: 25567.5, // human life expectancy (days)

  async sbd (d) {
    invalidDateError(d)
    Mortem.cfg.set('date', d)
    return d
  },

  async gbd () {
    unsetDateError(Mortem)
    const d = new Date(Mortem.cfg.get('date'))
    return moment(d).format('YYYY/MM/DD')
  },

  async etr () {
    unsetDateError(Mortem)
    return Mortem.led - (await Mortem.ndl())
  },

  async eyd () {
    unsetDateError(Mortem)
    const d = new Date(Mortem.cfg.get('date'))
    return d.getFullYear() + Mortem.hle
  },

  async pro () {
    unsetDateError(Mortem)
    return (await Mortem.ndl()) / Mortem.led * 100
  },

  async ndl () {
    unsetDateError(Mortem)
    const d = new Date(Mortem.cfg.get('date'))
    return Math.round(Math.abs((d.getTime() - new Date().getTime()) / 86400000))
  }
}

module.exports = Mortem
