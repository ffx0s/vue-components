export const sleep = time => new Promise(resolve => setTimeout(resolve, time))

export let isTouchDevice = function() {
  const support = 'ontouchstart' in document.documentElement
  isTouchDevice = () => support
  return support
}

export let browser = function(userAgent) {
  const u = userAgent || navigator.userAgent
  const info = {
    // Chrome
    chrome: u.indexOf('Chrome') > -1 && u.indexOf('Edge') === -1,
    // Chrome IOS
    chromeIOS: u.indexOf('CriOS') !== -1,
    // IE
    trident: u.indexOf('Trident') > -1,
    // webkit 内核(Chrome , Safari)
    webkit: u.indexOf('AppleWebKit') > -1,
    // 火狐
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1,
    // 移动终端
    mobile: !!u.match(/AppleWebKit.*Mobile.*/),
    // mac
    mac: u.indexOf('Mac') > -1,
    // ios
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    // android / uc浏览器
    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
    iPhone: u.indexOf('iPhone') > -1,
    iPad: u.indexOf('iPad') > -1,
    weixin: u.indexOf('MicroMessenger') > -1
  }

  info.safari = info.ios && !info.chromeIOS

  browser = () => info
  return info
}

export function isNumber(value) {
  return typeof value === 'number'
}

export function getTransform(el) {
  const styles = getComputedStyle(el)
  const value = (styles.transform || styles.webkitTransform)
    .replace(/[^0-9\-.,]/g, '')
    .split(',')
  return {
    scaleX: +value[0],
    scaleY: +value[3],
    x: +value[4],
    y: +value[5]
  }
}

export function intersects(rectA, rectB) {
  return !(
    rectA.left + rectA.width <= rectB.left ||
    rectB.left + rectB.width <= rectA.left ||
    rectA.top + rectA.height <= rectB.top ||
    rectB.top + rectB.height <= rectA.top
  )
}

// 是否支持 passive 属性
let supportsPassive = () => {
  let support = false
  try {
    const options = Object.defineProperty({}, 'passive', {
      get: function() {
        support = true
        supportsPassive = () => true
        return true
      }
    })
    window.addEventListener('testPassive', null, options)
    window.removeEventListener('testPassive', null, options)
  } catch (err) {
    supportsPassive = () => false
  }
  return support
}

export function addListener(element, type, fn, options) {
  element.addEventListener(
    type,
    fn,
    supportsPassive()
      ? {
          capture: false,
          passive: true,
          once: false,
          ...options
        }
      : !!options
  )
}

export function removeListener(element, type, fn, options) {
  element.removeEventListener(type, fn, options)
}

export function getScrollTop(el) {
  if (el && el.nodeType) return el.scrollTop
  return (
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop
  )
}

export function setScrollTop(el, scrollTop) {
  if (el.nodeType) el.scrollTop = scrollTop
  else el.scrollTo(0, scrollTop)
}

export function getScrollEventTarget(element) {
  let currentNode = element
  while (
    currentNode &&
    currentNode.tagName !== 'HTML' &&
    currentNode.tagName !== 'BODY' &&
    currentNode.nodeType === 1
  ) {
    const overflowY = getComputedStyle(currentNode).overflowY
    if (overflowY === 'scroll' || overflowY === 'auto') {
      return currentNode
    }
    currentNode = currentNode.parentNode
  }
  return window
}

// 解决 safari -webkit-overflow-scrolling 滚动回弹效果没有结束时滚动不了问题
export function fixedSpringback(touchTarget) {
  if (!browser().safari) return

  const resistance = 5
  let startY = 0
  let scroller = null

  function touchstart(event) {
    startY = event.touches[0].pageY
    scroller = getScrollEventTarget(event.target)
    if (scroller === window) scroller = null
  }

  function touchmove(event) {
    if (!scroller) return
    const y = startY - event.touches[0].pageY
    const pullDownAction = y < -resistance
    const pullUpAction = y > resistance
    if (
      (pullDownAction && scroller.scrollTop <= 0) ||
      (pullUpAction &&
        Math.floor(scroller.scrollHeight - view.getHeight()) <=
          scroller.scrollTop)
    ) {
      event.cancelable && event.preventDefault()
    }
  }

  addListener(touchTarget, 'touchstart', touchstart)
  addListener(touchTarget, 'touchmove', touchmove, { passive: false })
}

/**
 * 获取当前组件的父级
 * @param {Object} current 当前组件实例
 * @param {String} name 组件名
 */
export function getVMParent(current, name) {
  let parent = current.$parent
  while (parent && parent.name !== name) {
    parent = parent.$parent
  }
  return parent
}

export const view = {
  _width: undefined,
  _height: undefined,
  _timer: null,
  _isBind: false,
  width() {
    this.getWidth()
    this.width = () => this._width
    return this._width
  },
  height() {
    this.getHeight()
    this.height = () => this._height
    return this._height
  },
  getWidth() {
    this._width = document.documentElement.clientWidth
    return this._width
  },
  getHeight() {
    this._height = document.documentElement.clientHeight
    return this._height
  },
  bind() {
    if (process.server || this._isBind) return
    const self = this
    addListener(window, 'resize', () => {
      clearTimeout(self._timer)
      self._timer = setTimeout(() => {
        self.getWidth()
        self.getHeight()
      }, 300)
    })
    self._isBind = true
  }
}

view.bind()
