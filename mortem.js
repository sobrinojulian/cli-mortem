const Conf = require('conf')
const moment = require('moment')

const checkUnsetDate = (mortem) => {
  if (!Mortem.cfg.has('date')) {
    throw 'Unseted date. use: mortem sbd YYYY/MM/DD'
  }
}
const checkInvalidDate = (d) => {
  if (!moment(d, 'YYYY/MM/DD').isValid()) {
    throw 'Invalid date. format: YYYY/MM/DD'
  }
}

const Mortem = {
  cfg: new Conf(),
  hle: 70, // human life expectancy (years)
  led: 25567.5, // human life expectancy (days)

  async sbd (d) {
    checkInvalidDate(d)
    Mortem.cfg.set('date', d)
    return d
  },

  async gbd () {
    checkUnsetDate(Mortem)
    const d = new Date(Mortem.cfg.get('date'))
    return moment(d).format('YYYY/MM/DD')
  },

  async etr () {
    checkUnsetDate(Mortem)
    return Mortem.led - (await Mortem.ndl())
  },

  async eyd () {
    checkUnsetDate(Mortem)
    const d = new Date(Mortem.cfg.get('date'))
    return d.getFullYear() + Mortem.hle
  },

  async pro () {
    checkUnsetDate(Mortem)
    return `${((await Mortem.ndl()) / Mortem.led * 100).toFixed(2)}%`
  },

  async ndl () {
    checkUnsetDate(Mortem)
    const d = new Date(Mortem.cfg.get('date'))
    return Math.round(Math.abs((d.getTime() - new Date().getTime()) / 86400000))
  }
}

module.exports = Mortem
