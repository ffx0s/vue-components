import { view, addListener, browser } from '../utils/shared'

export const pageState = {
  // 存储已访问页面路径
  HISTORY_STACK: [],
  // 是否通过手势滑动返回
  touchBack: false,
  // 是否通过手势滑动前进
  touchForward: false,
  // 页面切换方向
  direction: '',
  saveToStorage() {
    // 页面刷新时存储页面记录
    addListener(window, 'pagehide', function() {
      sessionStorage.HISTORY_STACK = JSON.stringify(pageState.HISTORY_STACK)
    })

    // 延迟执行，防止首次进入有过渡效果
    setTimeout(() => {
      try {
        pageState.HISTORY_STACK = JSON.parse(sessionStorage.HISTORY_STACK)
      } catch {
        // ...
      }
    }, 500)
  },
  isForward(pagePath) {
    const HISTORY_STACK = pageState.HISTORY_STACK
    // 根据 fullPath 判断当前页面是否访问过，如果访问过，则属于返回
    const index = HISTORY_STACK.indexOf(pagePath)
    const visited = index !== -1

    if (visited) {
      HISTORY_STACK.length = index + 1
      return false
    }

    HISTORY_STACK.push(pagePath)

    return true
  },
  resetTouch() {
    pageState.touchBack = false
    pageState.touchForward = false
  },
  // 更新页面切换的方向
  updateDirection(pagePath) {
    pageState.direction = pageState.isForward(pagePath)
      ? pageState.touchForward
        ? ''
        : 'forward'
      : pageState.touchBack
      ? ''
      : 'back'

    pageState.resetTouch()

    return pageState.direction
  },
  /**
   * 解决 IOS 滑动页面前进/后退的问题
   * @param {Object} pageState
   * @returns {Object} status
   */
  fixedSwipeBack() {
    if (!browser().ios) return
    const time = browser().chromeIOS ? 700 : 300
    let timer = null
    let pointX = 0

    pageState.touchBack = false
    pageState.touchForward = false

    addListener(document, 'touchstart', event => {
      pointX = event.changedTouches[0].clientX
      pageState.resetTouch()
    })

    addListener(document, 'touchmove', () => {
      const value = view.width() / 2
      pageState.touchForward = pointX > value
      pageState.touchBack = pointX < value
    })

    addListener(document, 'touchend', () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        pageState.resetTouch()
      }, time)
    })
  }
}

export const scroller = (function page() {
  // 页面滚动条坐标信息
  const historyPage = {}

  return {
    historyPage,
    // 进入当前页面的路由时，滚动到之前的位置
    scrollTo(scrollEl, pagePath) {
      const page = historyPage[pagePath]
      if (page) {
        scrollEl.scrollTop = page.scrollTop
      }
    },
    // 离开当前页面的路由时，保存页面滚动位置
    saveScrollTop(scrollEl, pagePath) {
      if (!historyPage[pagePath]) {
        historyPage[pagePath] = {}
      }
      historyPage[pagePath].scrollTop = scrollEl ? scrollEl.scrollTop : 0
    }
  }
})()
