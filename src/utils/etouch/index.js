import EventEmitter from '../eventEmitter'
import {
  addListener,
  removeListener,
  rAFThrottle,
  makeArray,
  isTouchDevice
} from '../shared'
import {
  getPoints,
  getTouchCenter,
  getScale,
  getAngle,
  originZoom
} from './helpers'

export default class ETouch extends EventEmitter {
  constructor(options) {
    super()

    this.data = {}
    this.options = Object.assign({}, ETouch.defaultOptions, options)

    if (this.options.el) {
      this.bind()
    }
  }

  setOptions(options) {
    Object.assign(this.options, options)
    return this
  }

  bind() {
    this._touchEvents(addListener)
  }

  unbind() {
    this._touchEvents(removeListener)
  }

  handleEvent(event) {
    switch (event.type) {
      case 'touchstart':
        this.down(event)
        break
      case 'touchmove':
      case 'mousemove':
        this.move(event)
        break
      case 'touchend':
        this.up(event)
        break
      case 'mousedown':
        this._mouseEvents('down', addListener, event)
        break
      case 'mouseup':
        this._mouseEvents('up', removeListener, event)
    }
  }

  down(event) {
    const touches = getPoints(event)

    this.moving = false
    this.touchesLength = touches.length
    this._startTouchesLength = this.touchesLength

    const { clientX, clientY } = touches[this.touchesLength - 1]

    this.data.clientX = clientX
    this.data.clientY = clientY

    this.emit(this.options.eventTypes.down, event, this.data)
  }

  move(event) {
    const { lockDirection, eventTypes } = this.options
    const hasPinchmove = this._hasListeners(eventTypes.pinchmove)
    const hasRotatemove = this._hasListeners(eventTypes.rotatemove)
    const hasPanmove = this._hasListeners(eventTypes.panmove)
    const touches = getPoints(event)

    if (this.touchesLength === 2 && (hasPinchmove || hasRotatemove)) {
      this._gesturechange(touches, event, hasPinchmove, hasRotatemove)
    } else if (hasPanmove || lockDirection) {
      this._panmove(touches, event)
    }

    this.moved = this.moving = true
  }

  up(event) {
    const { up, pinchmove, rotatemove } = this.options.eventTypes

    const touches = getPoints(event)
    const type = this.data.type

    this.touchesLength = touches.length

    this.emit(up, event, this.data)

    if (this.moved) {
      if (type && type.indexOf('pan') !== -1) {
        this._panend(event)
      } else {
        if (type === pinchmove) {
          this._pinchend(event)
        }
        if (type === rotatemove) {
          this._rotateend(event)
        }
      }

      this.moving = false
    } else if (this._startTouchesLength === 1) {
      this._mockDoubleTap(event)
    } else {
      this.data.type = ''
    }
  }

  is(action) {
    return this.action === action
  }

  destroy() {
    if (this.options.el) {
      this.unbind()
    }
  }

  _touchEvents(action) {
    const {
      el,
      touchstartEventOptions,
      touchmoveEventOptions,
      touchendEventOptions
    } = this.options

    action(el, 'touchstart', this, touchstartEventOptions)
    action(el, 'touchmove', this, touchmoveEventOptions)
    action(el, 'touchend', this, touchendEventOptions)

    if (!isTouchDevice()) {
      action(el, 'mousedown', this, touchstartEventOptions)
    }
  }

  _mouseEvents(name, action, event) {
    const { touchmoveEventOptions, touchendEventOptions } = this.options

    ETouch.preventDefault(event)

    this[name](event)

    action(document, 'mousemove', this, touchmoveEventOptions)
    action(document, 'mouseup', this, touchendEventOptions)
  }

  _mockDoubleTap(event) {
    const { eventTypes, tapDelay } = this.options
    const hasTap = this._hasListeners(eventTypes.tap)
    const hasDoubletap = this._hasListeners(eventTypes.doubletap)

    if (hasDoubletap) {
      this._tapCount = this._tapCount || 0
      this._tapCount++

      clearTimeout(this._tapTimer)

      if (this._tapCount === 2) {
        this._tapCount = 0
        this._emit(eventTypes.doubletap, event)
      } else {
        this._tapTimer = setTimeout(() => {
          this._tapCount = 0
          this._emit(eventTypes.tap, event)
        }, tapDelay)
      }
    } else if (hasTap) {
      this._emit(eventTypes.tap, event)
    }
  }

  _verifyDirection() {
    const lockDirection = this.options.lockDirection

    return (
      lockDirection === false ||
      (lockDirection && lockDirection === this.direction)
    )
  }

  _setDirection(vx, vy) {
    // vx、vy 可能为 0
    if (vx !== 0 || vy !== 0) {
      const isHorizontal = Math.abs(vx) >= Math.abs(vy)

      if (isHorizontal) {
        this.direction = ETouch.HORIZONTAL
        this._setAction(vx)
      } else {
        this.direction = ETouch.VERTICAL
        this._setAction(vy)
      }
    }
  }

  _setAction(vector) {
    this.action = ETouch.propsMap[this.direction][vector <= 0 ? 0 : 1]
    this.isSwipe = Math.abs(vector) > this.options.threshold
  }

  _panstart(touches, event) {
    const { clientX, clientY } = touches[this.touchesLength - 1]
    const { eventTypes, position } = this.options
    const { x, y } = position()

    const vx = clientX - this.data.clientX
    const vy = clientY - this.data.clientY

    this._setDirection(vx, vy)

    if (!this._verifyDirection()) return

    this.startPosition = { x, y }
    this.isSwipe = false
    this.timeStamp = event.timeStamp

    this.data = {
      clientX,
      clientY,
      vx,
      vy,
      deltaX: 0,
      deltaY: 0,
      time: 0
    }

    this._emit(eventTypes.panstart, event)
  }

  _panmove(touches, event) {
    const { clientX, clientY } = touches[this.touchesLength - 1]
    const { lockDirection, eventTypes } = this.options

    if (!this.moving) {
      this._panstart(touches, event)
    }

    if (!this._verifyDirection()) return

    const data = this.data
    const vx = clientX - data.clientX
    const vy = clientY - data.clientY

    if (!vx && !vy) return

    const deltaX = data.deltaX + vx
    const deltaY = data.deltaY + vy

    const { x, y } = this.startPosition
    const position = {
      x: x + deltaX,
      y: y + deltaY
    }
    const time = event.timeStamp - this.timeStamp

    this.timeStamp = event.timeStamp

    // 是否锁定方向
    if (lockDirection) {
      const vector = this.direction === ETouch.HORIZONTAL ? vx : vy

      this._setAction(vector)
    } else {
      this._setDirection(vx, vy)
    }

    this.data = {
      vx,
      vy,
      deltaX,
      deltaY,
      clientX,
      clientY,
      time,
      position
    }

    if (lockDirection) {
      this._emit(this.action, event)
    } else {
      this._emit(eventTypes.panmove, event)
    }
  }

  _panend(event) {
    if (!this.touchesLength && !this._verifyDirection()) return
    this._emit(this.options.eventTypes.panend, event)
    this.moved = false
  }

  _gesturechange(touches, event, hasPinchmove, hasRotatemove) {
    const zoom = makeArray(touches).map(touch => {
      return { x: touch.clientX, y: touch.clientY }
    })

    if (hasPinchmove) {
      this._pinchmove(zoom, event)
    }
    if (hasRotatemove) {
      this._rotatemove(zoom, event)
    }

    this.data.zoom = zoom
  }

  _pinchstart(zoom, center, event) {
    const { eventTypes, position } = this.options
    const { x, y, scale } = position()

    this.startPosition = { x, y, scale }

    this.data = {
      zoom,
      center,
      scale: 1,
      vx: 0,
      vy: 0,
      deltaX: 0,
      deltaY: 0,
      position: { x, y, scale }
    }

    this._emit(eventTypes.pinchstart, event)
  }

  _pinchmove(zoom, event) {
    const { eventTypes, origin, zoomMove, maxScale, minScale } = this.options
    const center = getTouchCenter(zoom)

    if (!this.moving) {
      this._pinchstart(zoom, center, event)
    }

    const data = this.data
    const scaleChange = getScale(data.zoom, zoom) - 1

    const scale = (data.scale += scaleChange)
    const vx = center.x - data.center.x
    const vy = center.y - data.center.y
    const deltaX = data.deltaX + vx
    const deltaY = data.deltaY + vy

    const { x, y, scale: startScale } = this.startPosition
    let newScale = scale * startScale

    if (maxScale && newScale > maxScale) {
      newScale = maxScale
    } else if (minScale && newScale < minScale) {
      newScale = minScale
    }

    let position = {}

    if (origin) {
      const point = typeof origin === 'object' ? origin : center

      const result = originZoom(data.position, point, newScale)

      position.x = result.x
      position.y = result.y
      position.scale = newScale

      if (zoomMove) {
        position.x += vx
        position.y += vy
      }
    } else {
      position = { x, y, scale: newScale }

      if (zoomMove) {
        position.x = x + deltaX
        position.y = y + deltaY
      }
    }

    Object.assign(this.data, {
      center,
      scale,
      vx,
      vy,
      deltaX,
      deltaY,
      position
    })

    this._emit(eventTypes.pinchmove, event)
  }

  _pinchend(event) {
    this._emit(this.options.eventTypes.pinchend, event)
    this.moved = false
  }

  _rotatestart(zoom, event) {
    const { eventTypes, position } = this.options
    const { rotation } = position()

    this.startPosition.rotation = rotation

    this.data.rotation = 0
    this.data.zoom = zoom

    this._emit(eventTypes.rotatestart, event)
  }

  _rotatemove(zoom, event) {
    const { eventTypes } = this.options

    if (!this.moving) {
      this._rotatestart(zoom, event)
    }

    const data = this.data

    const rotationChange =
      getAngle(zoom[0], zoom[1]) - getAngle(data.zoom[0], data.zoom[1])
    const rotation = (data.rotation += rotationChange)

    const { rotation: startRotation } = this.startPosition
    const newRotation = rotation + startRotation

    data.position.rotation = newRotation
    data.rotation = rotation

    this._emit(eventTypes.rotatemove, event)
  }

  _rotateend(event) {
    this._emit(this.options.eventTypes.rotateend, event)
    this.moved = false
  }

  _emit(eventType, event) {
    this.data.type = eventType
    this._input(event)
    this.emit(eventType, event, this.data)
  }

  _input(event) {
    const input = this.options.eventTypes.input

    if (this._hasListeners(input)) {
      this.emit(input, event, this.data)
    }
  }

  _hasListeners(eventType) {
    const listeners = this.listeners[eventType]
    return listeners && listeners.length
  }
}

const passive = { passive: false }

ETouch.defaultOptions = {
  el: null,
  touchstartEventOptions: passive,
  touchmoveEventOptions: passive,
  touchendEventOptions: passive,
  /**
   * 移动时是否锁定水平/垂直方向，可选值：false|String
   * false - 不锁定方向
   * vertical - 锁定垂直方向
   * horizontal - 锁定水平方向
   */
  lockDirection: false,
  eventTypes: {
    down: 'down',
    up: 'up',
    panstart: 'panstart',
    panmove: 'panmove',
    panend: 'panend',
    pinchstart: 'pinchstart',
    pinchmove: 'pinchmove',
    pinchend: 'pinchend',
    rotatestart: 'rotatestart',
    rotatemove: 'rotatemove',
    rotateend: 'rotateend',
    panleft: 'panleft',
    panright: 'panright',
    panup: 'panup',
    pandown: 'pandown',
    tap: 'tap',
    doubletap: 'doubletap',
    input: 'input'
  },
  // 存在双击事件时，单击事件的延迟时间
  tapDelay: 200,
  // 快速滑动的阈值
  threshold: 3,
  /**
   * 缩放原点设置，可选值：false|true|{x, y}
   * false - 不设置原点缩放
   * true - 以两指中心点为原点进行缩放
   * {x: Number, y: Number} - 以 x,y 为原点进行缩放
   */
  origin: false,
  // 缩放的同时是否可以移动
  zoomMove: true,
  // 获取元素的当前位置的函数
  position() {
    return { x: 0, y: 0, scale: 1, rotation: 0 }
  },
  maxScale: null,
  minScale: null
}

ETouch.HORIZONTAL = 'horizontal'

ETouch.VERTICAL = 'vertical'

ETouch.propsMap = {
  [ETouch.HORIZONTAL]: [
    ETouch.defaultOptions.eventTypes.panleft,
    ETouch.defaultOptions.eventTypes.panright
  ],
  [ETouch.VERTICAL]: [
    ETouch.defaultOptions.eventTypes.panup,
    ETouch.defaultOptions.eventTypes.pandown
  ]
}

ETouch.rAFThrottle = rAFThrottle

ETouch.originZoom = originZoom

ETouch.preventDefault = function(event) {
  event.cancelable && event.preventDefault()
}
