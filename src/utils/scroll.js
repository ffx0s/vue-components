import { addListener } from './shared'

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
  if (fixedSpringback.isBind) return

  let lastX = 0
  let lastY = 0
  let scroller = null

  function touchstart(event) {
    lastX = event.touches[0].clientX
    lastY = event.touches[0].clientY
    scroller = getScrollEventTarget(event.target)
    if (scroller === window) scroller = null
  }

  function touchmove(event) {
    if (!scroller) return

    const clientX = event.touches[0].clientX
    const clientY = event.touches[0].clientY
    const x = clientX - lastX
    const y = clientY - lastY
    const isVertical = Math.abs(x) <= Math.abs(y)

    if (isVertical) {
      const pullUpAction = y <= 0
      const scrollTop = scroller.scrollTop

      if (
        (!pullUpAction && scrollTop <= 0) ||
        (pullUpAction &&
          Math.floor(scroller.scrollHeight - scroller.offsetHeight) <=
            scrollTop)
      ) {
        event.cancelable && event.preventDefault()
      }
    }

    lastX = clientX
    lastY = clientY
  }

  addListener(touchTarget, 'touchstart', touchstart)
  addListener(touchTarget, 'touchmove', touchmove, { passive: false })

  fixedSpringback.isBind = true
}
