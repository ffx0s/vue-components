/**
 * 缓动函数，执行后返回当前的位置
 * t：当前时间
 * b：初始值
 * c：变化值
 * d：总时间
 */

const Easing = {
  linear(t, b, c, d) {
    return (c * t) / d + b
  },
  easeInQuad(t, b, c, d) {
    return c * (t /= d) * t + b
  },
  easeOutQuad(t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b
  },
  easeOutStrong: function(t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b
  },
  easeInOutQuad(t, b, c, d) {
    if ((t /= d / 2) < 1) {
      return (c / 2) * t * t + b
    } else {
      return (-c / 2) * (--t * (t - 2) - 1) + b
    }
  },
  easeOutCubic(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b
  },
  easeOutBack(t, b, c, d, s) {
    if (s === void 0) {
      s = 1.70158
    }
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
  }
}

export default Easing
