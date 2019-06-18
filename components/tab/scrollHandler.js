import {
  getScrollEventTarget,
  addListener,
  removeListener,
  rAFThrottle
} from '../utils/shared'
import animate from '../utils/animate'

export default class ScrollHandler {
  constructor(el, swipeItems) {
    this.offsetTop = el.offsetTop
    if (this.offsetTop > 0) {
      this.lastScrollTop = 0
      this.resistance = 30
      this.wrapScrollEl = getScrollEventTarget(el)
      this.tabScrollEls = swipeItems.map(item => item.$el.children[0])
      this.onscroll = rAFThrottle(this.onscroll.bind(this))
      this.bind()
    }
  }
  onscroll(event) {
    if (this.scrolling) return
    const target = event.target
    const scrollTop = target.scrollTop

    if (Math.abs(this.lastScrollTop - scrollTop) >= this.resistance) {
      const isBottom =
        Math.floor(target.scrollHeight - target.offsetHeight) <= scrollTop
      const currentTop = this.wrapScrollEl.scrollTop
      let targetTop

      if ((scrollTop > 0 && scrollTop > this.lastScrollTop) || isBottom) {
        // up
        targetTop = this.offsetTop
      } else {
        // down
        targetTop = 0
      }

      if (currentTop !== targetTop) {
        animate({
          targets: [[currentTop, targetTop]],
          running: target => {
            this.scrolling = true
            this.wrapScrollEl.scrollTop = target[0]
          },
          end: () => {
            this.scrolling = false
          }
        })
      }
      this.lastScrollTop = scrollTop
    }
  }
  bind() {
    if (!this.isBind) {
      this.tabScrollEls.forEach(el => {
        addListener(el, 'scroll', this.onscroll)
      })
      this.isBind = true
    }
  }
  unbind() {
    if (this.isBind) {
      this.tabScrollEls.forEach(el => {
        removeListener(el, 'scroll', this.onscroll)
      })
      this.isBind = false
    }
  }
  resetState() {
    this.lastScrollTop = 0
  }
}
