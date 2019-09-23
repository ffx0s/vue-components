export function getPoints(event) {
  return event.touches ? event.touches : [event]
}

function sum(a, b) {
  return a + b
}

/**
 * 获取两个点的中心
 * @param {Array} vectors 点
 */
export function getTouchCenter(vectors) {
  return {
    x: vectors.map(v => v.x).reduce(sum) / vectors.length,
    y: vectors.map(v => v.y).reduce(sum) / vectors.length
  }
}

// 获取点距离
export function getDistance(p1, p2) {
  const x = p2.x - p1.x
  const y = p2.y - p1.y

  return Math.sqrt(x * x + y * y)
}

/**
 * 通过两点距离计算比例
 * @param {Array} start 起始点
 * @param {Array} end 结束点
 */
export function getScale(start, end) {
  return getDistance(end[0], end[1]) / getDistance(start[0], start[1])
}

/**
 * 获取两个点之间的角度
 * @param {Array} p1 point
 * @param {Array} p2 point
 */
export function getAngle(p1, p2) {
  const x = p1.x - p2.x
  const y = p1.y - p2.y
  return (Math.atan2(y, x) * 180) / Math.PI
}

/**
 * 以指定点坐标为原点进行缩放，计算缩放后的位置
 * @param {Object} current 当前物体坐标{x,y,scale}
 * @param {Object} point 缩放原点{x,y}
 * @param {Number} scale 目标比例
 * @returns {Object} 返回新的坐标 {x,y}
 */
export function originZoom(current, point, scale) {
  // 指定原点座标与当前物体的距离
  const distanceX = point.x - current.x
  const distanceY = point.y - current.y

  const scaleChanged = 1 - scale / current.scale
  const x = current.x + distanceX * scaleChanged
  const y = current.y + distanceY * scaleChanged

  return { x, y }
}
