import Debouncer from './debouncer'
import { addListener, removeListener } from './shared'

function getPoint(event) {
  return event.touches ? event.touches[0] : event
}

const propsMap = {
  horizontal: ['Left', 'Right'],
  vertical: ['Up', 'Down']
}

export class Handler {
  constructor(props) {
    this.lastX = 0
    this.lastY = 0
    this.action = ''
    this.lock = ''
    this.moved = false
    this.touchDelay = 3
    this.delay = this.touchDelay
    this.isPreventDefault = () => false
    this.isStopPropagation = () => false
    this.debouncer = new Debouncer(this.update.bind(this))
    if (props) {
      Object.assign(this, props)
    }
  }
  start(event) {
    const point = getPoint(event)
    this.lastX = point.clientX
    this.lastY = point.clientY
    this.delay = this.touchDelay
    this.moved = false
    this.debouncer.ticking = false
    this.lock = ''
    this.action = ''
  }
  move(event) {
    const point = getPoint(event)
    const moveX = point.clientX
    const moveY = point.clientY
    this.dx = moveX - this.lastX
    this.dy = moveY - this.lastY

    // 每次从按下移动到抬起的过程都只锁定一个方向
    if (this.lock === 'horizontal') {
      this._setAction(moveX, this.lastX)
    } else if (this.lock === 'vertical') {
      this._setAction(moveY, this.lastY)
    } else if (this.dx !== 0 || this.dy !== 0) {
      const isHorizontal = Math.abs(this.dx) > Math.abs(this.dy)
      if (isHorizontal) {
        this.lock = 'horizontal'
        this._setAction(moveX, this.lastX)
      } else {
        this.lock = 'vertical'
        this._setAction(moveY, this.lastY)
      }
    }

    this.lastX = moveX
    this.lastY = moveY

    if (this.isPreventDefault()) {
      event.cancelable && event.preventDefault()
    }

    if (this.isStopPropagation()) {
      event.stopPropagation()
    }
    // 延迟防止第一次拖拽抖动
    if (this.delay) {
      this.delay--
      return
    }

    this.moved = true

    if (this[`on${this.action}`]) {
      this.debouncer.requestTick()
    }
  }
  up() {
    this.debouncer.cancel()
  }
  update() {
    this[`on${this.action}`](this.dx, this.dy)
  }
  is(action) {
    return this.action === action
  }
  _setAction(value, lastValue) {
    this.action = propsMap[this.lock][value < lastValue ? 0 : 1]
  }
}

export function mouseMove(moveFn, upFn) {
  function mouseup() {
    upFn()
    removeListener(document, 'mousemove', moveFn)
    removeListener(document, 'mouseup', mouseup)
  }
  addListener(document, 'mousemove', moveFn, { passive: false })
  addListener(document, 'mouseup', mouseup)
}
