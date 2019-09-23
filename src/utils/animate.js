import easing from './easing'

/**
 * 获取当前时间戳
 * @returns {Number} 时间戳
 */
const now = () => new Date().getTime()

/**
 * 动画执行函数，仅在opiotns.running函数返回数值，不做具体元素的动画操作
 * @param {Object} options 选项
 * @property {Number} options.time 在指定时间（ms）内完成动画，默认 500
 * @property {String} options.type 动画类型，默认 easeOutQuad
 * @property {Array} options.targets 二维数组，存放起始值与目标值，例：[[0, 100], [100, 0]]，表示起始值0到目标值100的过程中的变化，变化的数值会作为options.running函数的参数返回
 * @property {Function} options.running options.targets数值变化过程会执行这个函数
 * @property {Function} options.end 结束后的回调函数
 */
export default function(options) {
  const { time, type, targets, running, stop: end } = Object.assign(
    { time: 500, type: 'easeOutQuad' },
    options
  )
  const startTime = now()
  let timer = null

  function step() {
    const changeTime = now()
    const scale = 1 - (Math.max(0, startTime - changeTime + time) / time || 0)
    const value = []

    targets.forEach(target => {
      const currentValue =
        target[0] === target[1]
          ? target[0]
          : easing[type](
              scale * time,
              target[0],
              target[1] - target[0],
              time
            ) || 0

      value.push(currentValue)
    })

    if (scale === 1) {
      stop()
    } else {
      timer = requestAnimationFrame(step)
    }

    running(value)
  }

  function stop() {
    cancelAnimationFrame(timer)
    end && end()
  }

  timer = requestAnimationFrame(step)

  return {
    stop
  }
}
