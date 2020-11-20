import { addListener, browser } from './shared'

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

// 解决 safari 页面回弹时无法滚动的问题
export function noBounce(touchTarget = document.body) {
  if (!browser().ios || noBounce.isBind) return

  let lastX = 0
  let lastY = 0
  let scroller = null

  function touchstart(event) {
    lastX = event.touches[0].clientX
    lastY = event.touches[0].clientY
    scroller = getScrollEventTarget(event.target)
    if (scroller === window || scroller.hasAttribute('ignore-no-bounce'))
      scroller = null
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

  addListener(touchTarget, 'touchstart', touchstart, { passive: false })
  addListener(touchTarget, 'touchmove', touchmove, { passive: false })

  noBounce.isBind = true
}
