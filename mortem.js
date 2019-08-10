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
  hle: 70, // human life expectancy (years)
  led: 25567.5, // human life expectancy (days)

  async sbd (d) {
    checkInvalidDate(d)
    Mortem.cfg.set('date', d)
    return d
  },

	async gbd() {
		checkUnsetDate(Mortem)
    const d = new Date(Mortem.cfg.get('date'))
    const DD = d.getDate()
    const MM = d.getMonth() + 1
    const YYYY = d.getFullYear()
    return `${YYYY}/${MM}/${DD}`
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
