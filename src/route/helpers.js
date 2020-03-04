import { view, addListener, browser } from '../utils/shared'

// 判断当前路由是否为前进
export const isForward = (function isForwardWrap() {
  // 历史记录，记录访问过的页面的 fullPath
  let HISTORY_STACK = []

  // 页面刷新时存储页面记录
  addListener(window, 'pagehide', function() {
    sessionStorage.HISTORY_STACK = JSON.stringify(HISTORY_STACK)
  })

  // 延迟执行，防止首次进入有过渡效果
  setTimeout(() => {
    try {
      HISTORY_STACK = JSON.parse(sessionStorage.HISTORY_STACK)
    } catch {
      // ...
    }
  }, 500)

  return function isForwarInner(to) {
    // 根据 fullPath 判断当前页面是否访问过，如果访问过，则属于返回
    const index = HISTORY_STACK.indexOf(to.fullPath)
    const visited = index !== -1

    if (visited) {
      HISTORY_STACK.length = index + 1
      return false
    }

    // 将 to.fullPath 加到栈顶
    HISTORY_STACK.push(to.fullPath)

    return true
  }
})()

/**
 * 解决 IOS 两边手动测滑问题
 * @param {Object} status 空对象，函数执行后会往这个对象添加属性，用于判断前进还是后退
 * @returns {Object} status
 */
export function fixedSwipeBack(status) {
  const time = browser().chromeIOS ? 700 : 300
  let timer = null
  let pointX = 0

  status.back = false
  status.go = true
  status.reset = () => {
    status.back = false
    status.go = false
  }

  addListener(document, 'touchstart', event => {
    pointX = event.changedTouches[0].clientX
    status.reset()
  })

  addListener(document, 'touchmove', () => {
    const value = view.width() / 2
    status.go = pointX > value
    status.back = pointX < value
  })

  addListener(document, 'touchend', () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      status.reset()
    }, time)
  })

  return status
}

export const scroller = (function page() {
  // 页面滚动条坐标信息
  const historyPage = {}

  return {
    historyPage,
    // 进入当前页面的路由时，滚动到之前的位置
    scrollTo(scrollEl, to) {
      const page = historyPage[to.fullPath]
      if (page) {
        scrollEl.scrollTop = page.scrollTop
      }
    },
    // 离开当前页面的路由时，保存页面滚动位置
    saveScrollTop(scrollEl, from) {
      const path = from.fullPath
      if (!historyPage[path]) {
        historyPage[path] = {}
      }
      historyPage[path].scrollTop = scrollEl ? scrollEl.scrollTop : 0
    }
  }
})()
