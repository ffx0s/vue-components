import { toFixed, view } from '../utils/shared'

/**
 * 图片自适应容器
 * @param {Number} imgW 图片宽度
 * @param {Number} imgH 图片高度
 * @param {Number} divW 容器宽度
 * @param {Number} divH 容器高度
 * @param {Boolean} fillWidth 图片是否水平铺满视图
 * @returns {Object} 返回计算后的图片大小
 */

export function imgContain(imgW, imgH, divW, divH, fillWidth = true) {
  const imgScale = imgW / imgH
  const divScale = divW / divH
  let width
  let height

  // 图片宽高都小于视图则大小不变
  if (imgW < divW && imgH < divH) {
    width = imgW
    height = imgH
  } else if (imgScale > divScale && fillWidth) {
    width = divW
    height = toFixed(width / imgScale, 2)
  } else {
    width = toFixed(imgScale * divH, 2)
    height = divH
  }

  let x = toFixed(-(width - divW) / 2, 2)
  let y = toFixed(-(height - divH) / 2, 2)
  let scale = toFixed(width / imgW, 5)

  return {
    width,
    height,
    x,
    y,
    scale
  }
}

/**
 * 检测目标位置是否超出范围
 * @param {Object} target 检测目标 {x,y,scale,width,height}
 * @return {Object} {x, y, isDraw, isLeft, isRight, isTop, isBottom} 返回修正后的位置
 */
export function checkPosition({ x, y, scale, width, height }) {
  width = toFixed(width * scale, 2)
  height = toFixed(height * scale, 2)

  const w = view.width() - (width + x)
  const h = view.height() - (height + y)

  let isDraw = false
  let isLeft = false
  let isRight = false
  let isTop = false
  let isBottom = false

  if (height < view.height()) {
    y = (view.height() - height) / 2
    isDraw = isTop = isBottom = true
  } else {
    if (y > 0) {
      y = 0
      isDraw = isTop = true
    } else if (h > 0) {
      y += h
      isDraw = isBottom = true
    }
  }

  if (width < view.width()) {
    x = (view.width() - width) / 2
    isDraw = isLeft = isRight = true
  } else {
    if (x > 0) {
      x = 0
      isDraw = isLeft = true
    } else if (w > 0) {
      x += w
      isDraw = isRight = true
    }
  }

  return { x, y, isDraw, isLeft, isRight, isTop, isBottom }
}
