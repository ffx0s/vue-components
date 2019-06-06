import { addListener, removeListener, rAFThrottle } from './shared'

function getPoint(event) {
  return event.touches ? event.touches[0] : event
}

export class Handler {
  constructor(options) {
    this.update = rAFThrottle(this.update)
    this.options = Object.assign({}, Handler.defaultOptions, options)
  }

  static defaultOptions = {
    touchDelay: 3,
    threshold: 10,
    isPreventDefault() {
      return false
    },
    isStopPropagation() {
      return false
    }
  }
  static HORIZONTAL = 'horizontal'
  static VERTICAL = 'vertical'
  static actions = ['panleft', 'panright', 'panup', 'pandown']
  static propsMap = {
    [Handler.HORIZONTAL]: [Handler.actions[0], Handler.actions[1]],
    [Handler.VERTICAL]: [Handler.actions[2], Handler.actions[3]]
  }

  start(event) {
    const point = getPoint(event)
    this.lastX = point.clientX
    this.lastY = point.clientY
    this.action = ''
    this.direction = ''
    this.isFast = false
    this.moved = false
    this.touchDelay = this.options.touchDelay
  }
  move(event) {
    const point = getPoint(event)
    this.vx = point.clientX - this.lastX
    this.vy = point.clientY - this.lastY

    // 每次从按下移动到抬起的过程都只锁定一个方向
    if (this.direction === Handler.HORIZONTAL) {
      this._setAction(this.vx)
    } else if (this.direction === Handler.VERTICAL) {
      this._setAction(this.vy)
    } else if (this.vx !== 0 || this.vy !== 0) {
      const isHorizontal = Math.abs(this.vx) >= Math.abs(this.vy)
      if (isHorizontal) {
        this.direction = Handler.HORIZONTAL
        this._setAction(this.vx)
      } else {
        this.direction = Handler.VERTICAL
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
    const update = this.options[this.action]
    if (update) {
      update(this.vx, this.vy)
    }
  }
  is(action) {
    return this.action === action
  }
  removeActions(actions) {
    if (!actions) actions = Handler.actions
    if (Array.isArray(actions)) {
      actions.forEach(action => {
        this.options[action] = null
      })
    } else {
      this.options[actions] = null
    }
  }
  _setAction(vector) {
    this.action = Handler.propsMap[this.direction][vector <= 0 ? 0 : 1]
    this.isFast = Math.abs(vector) > this.options.threshold
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
