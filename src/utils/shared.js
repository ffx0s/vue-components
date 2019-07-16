export const sleep = time => new Promise(resolve => setTimeout(resolve, time))

export function toFixed(number, digits) {
  return +number.toFixed(digits)
}

export let isTouchDevice = function() {
  const support = 'ontouchstart' in document.documentElement
  isTouchDevice = () => support
  return support
}

export let browser = function(userAgent) {
  const u = userAgent || navigator.userAgent
  const androidVersion = u.match(/Android\s([0-9\\.]*)/) || []
  const info = {
    // android
    android: androidVersion[1] || false,
    // ios
    ios: u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      ? +u.match(/[OS\s]\d+/i)[0]
      : false,
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

export function addListener(element, type, fn, options = { capture: false }) {
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
      : options.capture
  )
}

export function removeListener(
  element,
  type,
  fn,
  options = { capture: false }
) {
  element.removeEventListener(type, fn, options.capture)
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

// 在页面底部/顶部滚动时，阻止默认事件。可以解决 safari 页面滚动不了的问题。
export function fixedSpringback(touchTarget) {
  let lastY = 0
  let scroller = null

  function touchstart(event) {
    lastY = event.touches[0].clientY
    scroller = getScrollEventTarget(event.target)
    if (scroller === window) scroller = null
  }

  function touchmove(event) {
    if (!scroller) return

    const clientY = event.touches[0].clientY
    const y = clientY - lastY
    const pullUpAction = y <= 0
    const scrollTop = scroller.scrollTop

    if (
      (!pullUpAction && scrollTop <= 0) ||
      (pullUpAction &&
        Math.floor(scroller.scrollHeight - scroller.offsetHeight) <= scrollTop)
    ) {
      event.cancelable && event.preventDefault()
    }

    lastY = clientY
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

export function loadJS(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url
    script.async = 'async'
    script.onload = resolve
    script.onerror = reject
    document.getElementsByTagName('head')[0].appendChild(script)
  })
}

export function jsonp(url, options) {
  return new Promise((resolve, reject) => {
    const callbackKey = 'callback'
    const callbackName = 'jsonp_' + Date.now()
    options = Object.assign({ callbackKey, callbackName }, options)
    url += `${url.split('?')[1] ? '&' : '?'}${options.callbackKey}=${
      options.callbackName
    }`
    window[callbackName] = function(data) {
      resolve(data)
      setTimeout(() => {
        window[callbackName] = null
      })
    }
    loadJS(url).catch(reject)
  })
}

export const slice = Array.prototype.slice

/**
 * 类数组对象转数组
 * @param {Object} object 类数组对象：{0: 'a', 1: 'b', length: 2}
 * @returns {Array} 返回数组：['a', 'b']
 */
export function makeArray(object) {
  return slice.call(object)
}

export function noop() {}

/**
 * 防抖
 * @param {Function} fn 执行函数
 * @param {Number} delay 延迟
 * @param {Number} ms 每隔多少毫秒至少执行一次
 */
export function debounce(fn, delay = 200, ms = 500) {
  let timer
  let lastTime
  const debounced = function() {
    let context = this
    let args = arguments
    const nowTime = Date.now()
    const later = function() {
      fn.apply(context, args)
      lastTime = null
    }
    clearTimeout(timer)
    if (!lastTime) lastTime = nowTime
    if (nowTime - lastTime >= ms) {
      fn.apply(context, args)
      lastTime = nowTime
    } else {
      timer = setTimeout(later, delay)
    }
  }
  debounced.calcel = function() {
    clearTimeout(timer)
  }
  return debounced
}

/**
 * 节流
 * @see https://github.com/jashkenas/underscore/blob/master/underscore.js#L842
 */
export function throttle(func, wait = 350, options = {}) {
  var timeout, context, args, result
  var previous = 0

  var later = function() {
    previous = options.leading === false ? 0 : Date.now()
    timeout = null
    result = func.apply(context, args)
    if (!timeout) context = args = null
  }

  var throttled = function() {
    var now = Date.now()
    if (!previous && options.leading === false) previous = now
    var remaining = wait - (now - previous)
    context = this
    args = arguments
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      result = func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
    return result
  }

  throttled.cancel = function() {
    clearTimeout(timeout)
    previous = 0
    timeout = context = args = null
  }

  return throttled
}

/**
 * 基于 requestAnimationFrame 的节流
 * @param {Function} fn 执行函数
 */
export function rAFThrottle(fn) {
  let timer
  let ticking = false
  const throttled = function() {
    if (!ticking) {
      const context = this
      const args = arguments
      const update = function() {
        fn.apply(context, args)
        ticking = false
      }
      ticking = true
      timer = requestAnimationFrame(update)
    }
  }
  throttled.cancel = function() {
    cancelAnimationFrame(timer)
    ticking = false
  }
  return throttled
}

export const view = {
  _width: undefined,
  _height: undefined,
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
    const onResize = debounce(() => {
      this.getWidth()
      this.getHeight()
    })
    addListener(window, 'resize', onResize)
  }
}

if (!process.server) {
  view.bind()
}
