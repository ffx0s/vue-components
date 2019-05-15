import { addListener, removeListener, rAFThrottle } from './shared'

function getPoint(event) {
  return event.touches ? event.touches[0] : event
}

export class Handler {
  constructor(options) {
    this.update = rAFThrottle(this.update)
    this.options = Object.assign({}, Handler.defaultOptions, options)
  }
  start(event) {
    const point = getPoint(event)
    this.lastX = point.clientX
    this.lastY = point.clientY
    this.action = ''
    this.lock = ''
    this.moved = false
    this.touchDelay = this.options.touchDelay
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
      const isHorizontal = Math.abs(this.vx) >= Math.abs(this.vy)
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

    if (this.options.isPreventDefault()) {
      event.cancelable && event.preventDefault()
    }

    if (this.options.isStopPropagation()) {
      event.stopPropagation()
    }
    // 延迟防止第一次拖拽抖动
    if (this.touchDelay) {
      this.touchDelay--
      return
    }

    this.moved = true
    this.update()
  }
  up() {
    this.update.cancel()
  }
  update() {
    const update = this.options[`on${this.action}`]
    if (update) {
      update(this.vx, this.vy)
    }
  }
  is(action) {
    return this.action === action
  }
  _setAction(vector) {
    this.action = Handler.propsMap[this.lock][vector <= 0 ? 0 : 1]
  }
  static defaultOptions = {
    touchDelay: 3,
    isPreventDefault() {
      return false
    },
    isStopPropagation() {
      return false
    }
  }
  static propsMap = {
    horizontal: ['Left', 'Right'],
    vertical: ['Up', 'Down']
  }
}

export function mouseMove(moveFn, upFn, capture = false) {
  function mouseup(event) {
    upFn(event)
    remove()
    removeListener(document, 'mouseup', mouseup, { capture })
  }
  function remove() {
    removeListener(document, 'mousemove', moveFn, { capture })
  }
  addListener(document, 'mousemove', moveFn, { passive: false, capture })
  addListener(document, 'mouseup', mouseup, { capture })

  return remove
}
