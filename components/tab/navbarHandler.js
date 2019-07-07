import BaseHandler from './baseHandler'
import {
  setScrollTop,
  getScrollTop,
  addListener,
  removeListener
} from '../utils/shared'
import animate from '../utils/animate'

export default class ScrollHandler extends BaseHandler {
  constructor(tabEl, swipeItems, options) {
    super(tabEl, swipeItems)
    this.options = Object.assign({}, ScrollHandler.defaultOptions, options)
    this.lastScrollTop = 0
    this.action = ''
    this.bind()
  }
  static defaultOptions = {
    offset: 0
  }
  handleWrapStart(event) {
    const { clientX, clientY } = event.touches[0]
    this.last = { x: clientX, y: clientY }
    this.dif = { x: 0, y: 0 }
    this.isVertical = null
    this.action = ''
    this.tabOffsetTop = this.getTabOffsetTop()
  }
  handleWrapMove(event) {
    const { clientX, clientY } = event.touches[0]
    const x = this.last.x - clientX
    const y = this.last.y - clientY

    this.dif = {
      x,
      y
    }
    this.last = {
      x: clientX,
      y: clientY
    }

    const isVertical = this._isVertical() && Math.abs(y) >= 2

    if (isVertical) {
      const pandown = this.dif.y < 0
      if (pandown) {
        if (this.action !== 'pandown') {
          this.animate(0)
        }
        this.action = 'pandown'
      } else {
        if (this.action !== 'panup') {
          this.animate(this.tabOffsetTop)
        }
        this.action = 'panup'
      }
    }
  }
  bind() {
    if (!this.isBind) {
      addListener(this.wrapScrollEl, 'touchstart', this.handleWrapStart)
      addListener(this.wrapScrollEl, 'touchmove', this.handleWrapMove)
      this.isBind = true
    }
  }
  unbind() {
    if (this.isBind) {
      removeListener(this.wrapScrollEl, 'touchstart', this.handleWrapStart)
      removeListener(this.wrapScrollEl, 'touchmove', this.handleWrapMove)
      this.isBind = false
    }
  }
  resetState() {
    this.lastScrollTop = 0
  }
  animate(targetTop) {
    const currentTop = getScrollTop(this.wrapScrollEl)

    if (currentTop === targetTop) return

    this.inAnimation && this.animation.stop()
    this.inAnimation = true

    this.animation = animate({
      targets: [[currentTop, targetTop]],
      running: target => {
        setScrollTop(this.wrapScrollEl, Math.ceil(target[0]))
      },
      stop: () => {
        this.inAnimation = false
      }
    })
  }
}
