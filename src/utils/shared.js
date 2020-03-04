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
    mobile: !!u.match(/AppleWebKit.*Mobile.*/),
    // mac
    mac: u.indexOf('Mac') > -1,
    iPhone: u.indexOf('iPhone') > -1,
    iPad: u.indexOf('iPad') > -1,
    weixin: u.indexOf('MicroMessenger') > -1
  }

  browser = () => info

  return info
}

export function isNumber(value) {
  return typeof value === 'number'
}

export function getTransform(el) {
  const styles = getComputedStyle(el)
  const value = styles.transform || styles.webkitTransform
  const matrix = value.split(')')[0].split(',')
  return {
    x: +(matrix[12] || matrix[4] || 0),
    y: +(matrix[13] || matrix[5] || 0)
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

export function loadCSS(id, href) {
  if (!document.getElementById(id)) {
    const head = document.getElementsByTagName('head')[0]
    const link = document.createElement('link')
    link.id = id
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = href
    head.appendChild(link)
  }

  return function remove() {
    const styleEl = document.getElementById(id)
    if (styleEl) {
      styleEl.remove()
    }
  }
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
    const defaultOptions = {
      callbackKey: 'callback',
      callbackName: 'jsonp_' + Date.now()
    }
    const { callbackKey, callbackName } = Object.assign(defaultOptions, options)

    url += `${url.split('?')[1] ? '&' : '?'}${callbackKey}=${callbackName}`

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

export function disablePagezoom() {
  document.addEventListener('gesturestart', function(event) {
    event.preventDefault()
  })
}
