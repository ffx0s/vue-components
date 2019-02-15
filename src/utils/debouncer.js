window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) {
    return setTimeout(callback, 1000 / 60)
  }

window.cancelAnimationFrame =
  window.cancelAnimationFrame ||
  window.webkitCancelAnimationFrame ||
  window.mozCancelAnimationFrame ||
  function(id) {
    clearTimeout(id)
  }
/**
 * Handles debouncing of events via requestAnimationFrame
 * @see http://www.html5rocks.com/en/tutorials/speed/animations/
 * @param {Function} callback The callback to handle whichever event
 */
export default class Debouncer {
  constructor(callback) {
    this.callback = callback
    this.ticking = false
    this.timer = null
  }

  /**
   * dispatches the event to the supplied callback
   * @private
   */
  update() {
    this.callback && this.callback()
    this.ticking = false
  }

  /**
   * ensures events don't get stacked
   * @private
   */
  requestTick() {
    if (!this.ticking) {
      this.timer = requestAnimationFrame(
        this.rafCallback || (this.rafCallback = this.update.bind(this))
      )
      this.ticking = true
    }
  }

  /**
   * Attach this as the event listeners
   */
  handleEvent() {
    this.requestTick()
  }

  cancel() {
    cancelAnimationFrame(this.timer)
    this.ticking = false
  }
}
