import BaseHandler from './baseHandler'
import {
  setScrollTop,
  getScrollTop,
  addListener,
  removeListener,
  rAFThrottle
} from '../utils/shared'
import animate from '../utils/animate'

export default class ScrollHandler extends BaseHandler {
  constructor(tabEl, swipeItems, options) {
    super(tabEl, swipeItems)
    this.options = Object.assign({}, ScrollHandler.defaultOptions, options)
    this.tabIndex = this.options.tabIndex
    this.tabOffsetTop = this.getTabOffsetTop()
    this.tabScrollEnd = true
    this.handleTabScroll = rAFThrottle(this.handleTabScroll.bind(this))
    this.handleWrapEnd = this.handleWrapEnd.bind(this)
    this.bind()
  }
  static defaultOptions = {
    offset: 0,
    tabIndex: 0
  }
  handleTabScroll(event) {
    const scrollTop = event.target.scrollTop

    if (!this.inTabAnimation && !this.ticking) {
      this.tabScrollEnd = false

      clearTimeout(this.tabScrollTimer)

      this.tabScrollTimer = setTimeout(() => {
        this.tabScrollEnd = true
      }, 100)
    }

    if (this.touchEventName === 'end' && scrollTop < 0) {
      if (!this.inAnimation) {
        this.setWrapScrollTop(this.wrapScrollTop - Math.abs(scrollTop * 0.3))
      }
    }
  }
  bind() {
    if (!this.isBind) {
      this.tabScrollEls.forEach(el => {
        addListener(el, 'scroll', this.handleTabScroll)
      })
      addListener(this.wrapScrollEl, 'touchstart', this.handleWrapStart)
      addListener(this.wrapScrollEl, 'touchmove', this.handleWrapMove, {
        passive: false
      })
      addListener(this.wrapScrollEl, 'touchend', this.handleWrapEnd)
      this.isBind = true
    }
  }
  unbind() {
    if (this.isBind) {
      this.tabScrollEls.forEach(el => {
        removeListener(el, 'scroll', this.handleTabScroll)
      })
      removeListener(this.wrapScrollEl, 'touchstart', this.handleWrapStart)
      removeListener(this.wrapScrollEl, 'touchmove', this.handleWrapMove, {
        passive: false
      })
      removeListener(this.wrapScrollEl, 'touchend', this.handleWrapEnd)
      this.isBind = false
    }
  }
  animate(targetTop, time) {
    if (this.inAnimation) return

    this.wrapScrollTop = getScrollTop(this.wrapScrollEl)

    targetTop = Math.max(targetTop, 0)

    if (this.wrapScrollTop === targetTop) return

    if (targetTop === 0) {
      const value = 350

      if (Math.abs(this.wrapScrollTop - targetTop) < value) {
        time = value
      }
    }

    const tabScrollTop = this.getTabScrollTop(this.tabIndex)
    const { scrollHeight, offsetHeight } = this.tabScrollEls[this.tabIndex]
    const maxScrollTop = scrollHeight - offsetHeight
    let tabScrollEnd = this.tabScrollEnd

    this.inAnimation = true

    this.animation = animate({
      time,
      type: 'easeOutCubic',
      targets: [[this.wrapScrollTop, targetTop]],
      running: target => {
        const value = Math.ceil(target[0])
        if (this.wrapScrollTop < this.tabOffsetTop) {
          this.setWrapScrollTop(value)
          tabScrollEnd = this.tabScrollEnd
        } else {
          if (tabScrollEnd) {
            this.inTabAnimation = true
            const scrollTop = tabScrollTop + (value - this.tabOffsetTop)
            if (scrollTop < maxScrollTop) {
              this.setTabScrollTop(this.tabIndex, scrollTop)
            } else {
              this.animation.stop()
            }
          }
        }
      },
      stop: () => {
        this.inAnimation = false
        this.inTabAnimation = false
      }
    })
  }
  handleWrapStart(event) {
    if (this.inAnimation) this.animation.stop()

    const { clientX, clientY } = event.touches[0]

    this.touchEventName = 'start'
    this.dif = { x: 0, y: 0, time: 0 }
    this.last = { x: clientX, y: clientY, time: event.timeStamp }
    this.tabOffsetTop = this.getTabOffsetTop()
    this.wrapScrollTop = getScrollTop(this.wrapScrollEl)
    this.firstStuck = this.isStuck()
    this.isVertical = null
    this.ticking = false
  }
  handleWrapMove(event) {
    const { clientX, clientY } = event.touches[0]
    const x = this.last.x - clientX
    const y = this.last.y - clientY

    this.touchEventName = 'move'
    this.dif = {
      x,
      y,
      time: event.timeStamp - this.last.time
    }
    this.last = {
      x: clientX,
      y: clientY,
      time: event.timeStamp
    }

    const isVertical = this._isVertical()
    const shouldUpdate = isVertical && y !== 0

    if (shouldUpdate) {
      const isUp = y > 0
      const tabScrollTop = this.getTabScrollTop(this.tabIndex)

      if (this.firstStuck) {
        if (tabScrollTop <= 0 && !isUp) {
          this.firstStuck = false
        }
      } else {
        event.cancelable && event.preventDefault()

        const offset = y * 0.8

        const stuck = this.isStuck()

        if (stuck) {
          if (isUp || tabScrollTop > 0) {
            // up
            if (this.tabScrollEnd) {
              this.setTabScrollTop(this.tabIndex, y, true)
            }
            this.ticking = true
          } else {
            // down
            this.setWrapScrollTop(this.wrapScrollTop + offset)
          }
        } else {
          this.setWrapScrollTop(this.wrapScrollTop + offset)
        }
      }
    } else {
      event.cancelable && event.preventDefault()
    }
  }
  handleWrapEnd() {
    this.touchEventName = 'end'

    if (this._isVertical()) {
      const result = this._isFastMove()

      if (result && !this.firstStuck) {
        const targetTop = this.wrapScrollTop + result.y
        this.animate(targetTop, result.time)
      }
    }
  }
  _isFastMove() {
    const speed = 0.2
    const speedY = this.dif.y / this.dif.time

    if (Math.abs(speedY) > speed) {
      const time = 420
      const value = 2
      let y = speedY * (time / value)
      return { y, time: time * 3 }
    }
  }
  isStuck() {
    return this.wrapScrollTop >= this.tabOffsetTop
  }
  setWrapScrollTop(value) {
    value = Math.min(Math.max(value, 0), this.tabOffsetTop)
    this.wrapScrollTop = value
    setScrollTop(this.wrapScrollEl, value)
  }
  setTabScrollTop(index, value, increase) {
    if (increase) {
      this.tabScrollEls[index].scrollTop += value
    } else {
      this.tabScrollEls[index].scrollTop = value
    }
  }
  getTabScrollTop(index) {
    return this.tabScrollEls[index].scrollTop
  }
  tabScrollToTop(index) {
    this.inAnimation && this.animation.stop()
    setTimeout(() => {
      if (!this.isStuck()) {
        this.setTabScrollTop(index, 0)
      }
    })
  }
}
