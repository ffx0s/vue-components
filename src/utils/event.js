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
    this.action = ''
    this.lock = ''
    this.moved = false
    this.delay = this.touchDelay
  }
  move(event) {
    const point = getPoint(event)
    this.vx = point.clientX - this.lastX
    this.vy = point.clientY - this.lastY

    // 每次从按下移动到抬起的过程都只锁定一个方向
    if (this.lock === 'horizontal') {
      this._setAction(this.vx)
    } else if (this.lock === 'vertical') {
      this._setAction(this.vy)
    } else if (this.vx !== 0 || this.vy !== 0) {
      const isHorizontal = Math.abs(this.vx) > Math.abs(this.vy)
      if (isHorizontal) {
        this.lock = 'horizontal'
        this._setAction(this.vx)
      } else {
        this.lock = 'vertical'
        this._setAction(this.vy)
      }
    }

    this.lastX = point.clientX
    this.lastY = point.clientY

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
    this[`on${this.action}`](this.vx, this.vy)
  }
  is(action) {
    return this.action === action
  }
  _setAction(vector) {
    this.action = propsMap[this.lock][vector <= 0 ? 0 : 1]
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
