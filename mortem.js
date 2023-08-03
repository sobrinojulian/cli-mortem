/**
 * Mortem
 * Morbid stats
 *
 * @author Josh Avanier, Sobrino Julian
 * @license MIT
 */

function Mortem(d = new Date()) {
  this.d = d

  this.ley = 75 // human life expectancy (years)
  this.led = this.ley * 365 // human life expectancy (days)
  this.now = new Date() // this moment (Date)

  /**
   * Calculate each command
   * @return {string} summary of each command
   */
  this.all = () =>
    [
      `age: ${this.age()}`,
      `ndl: ${this.ndl()}`,
      `eyd: ${this.eyd()}`,
      `edr: ${this.edr()}`,
      `pro: ${this.pro()}`,
      `ypr: ${this.ypr()}`
    ].join('\n')

  /**
   * Calculate age
   * @return {number} (years)
   */
  this.age = () => (Math.abs(this.d - this.now) / 3.154e10).toFixed(2)

  /**
   * Calculate estimated time remaining
   * @return {number} EDR (days)
   */
  this.edr = () => this.led - this.ndl()

  /**
   * Calculate estimate year of death
   * @return {number} EYD
   */
  this.eyd = () => this.d.getFullYear() + this.ley

  /**
   * Calculate the number of days lived so far
   * @return {number} number of days
   */
  this.ndl = () => {
    return Math.round(Math.abs((+this.d - +new Date()) / 864e5))
  }

  /**
   * Calculate life progress
   * @return {number} progress percentage
   */
  this.pro = () => ((this.ndl() / this.led) * 100).toFixed(2)

  /**
   * Calculate year progress
   * @return {number} progress percentage
   */
  this.ypr = () => {
    const year = this.now.getFullYear()
    const begin = new Date(year, 0, 1)
    const end = this.now
    const days = Math.ceil((end - begin) / 8.64e7)
    const pro = (days / 365.25) * 100
    return pro.toFixed(2)
  }
}

export default Mortem
