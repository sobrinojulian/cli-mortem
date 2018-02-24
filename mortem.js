/**
 * Mortem
 * Morbid stats
 *
 * @author Josh Avanier
 * @version 1.0.0
 * @license MIT
 */

const Mortem = {

  hle: 70, // human life expectancy (years)
  led: 25567.5, // human life expectancy (days)

  /**
   * Calculate estimated time remaining
   * @param {Date} d - date of birth
   * @return {number} ETR (days)
   */
  etr(d) {
    return Mortem.led - Mortem.ndl(d)
  },

  /**
   * Calculate estimate year of death
   * @param {Date} d - date of birth
   * @return {number} EYD
   */
  eyd(d) {
    return d.getFullYear() + Mortem.hle
  },

  /**
   * Calculate progress
   * @param {Date} d - date of birth
   * @return {number} progress percentage
   */
  pro(d) {
    return (Mortem.ndl(d) / Mortem.led) * 100
  },

  /**
   * Calculate the number of days lived so far
   * @param {Date} d - date of birth
   * @return {number} number of days
   */
  ndl(d) {
    return Math.round(Math.abs((d.getTime() - (new Date()).getTime())/86400000))
  }
}

module.exports.etr = (d) => Mortem.etr(d);
module.exports.eyd = (d) => Mortem.eyd(d);
module.exports.pro = (d) => Mortem.pro(d);
module.exports.ndl = (d) => Mortem.ndl(d);