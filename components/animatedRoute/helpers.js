import { view, addListener, browser } from '../utils/shared'

// 判断当前路由是否为前进
export const isForward = (function isForwardWrap() {
  // 如果在这个列表中，始终采用从左到右的滑动效果，首页比较适合用这种方式
  const ALWAYS_BACK_PAGE = []

  // to 如果在这个列表中，始终采用从右到左的滑动效果
  const ALWAYS_FORWARD_PAGE = []

  // 历史记录，记录访问过的页面的 fullPath
  const HISTORY_STACK = []

  return function isForwarInner(to, from) {
    // to 如果在这个列表中，始终认为是后退
    if (to.name && ALWAYS_BACK_PAGE.indexOf(to.name) !== -1) {
      // 清空历史
      HISTORY_STACK.length = 0
      return false
    }

    if (from.name && ALWAYS_BACK_PAGE.indexOf(from.name) !== -1) {
      // 如果是从 ALWAYS_BACK_PAGE 过来的，那么永远都是前进
      HISTORY_STACK.push(to.fullPath)
      return true
    }

    if (to.name && ALWAYS_FORWARD_PAGE.indexOf(to.name) !== -1) {
      // to 如果在这个列表中，始终认为是前进
      HISTORY_STACK.push(to.fullPath)
      return true
    }

    // 根据 fullPath 判断当前页面是否访问过，如果访问过，则属于返回
    const index = HISTORY_STACK.indexOf(to.fullPath)

    if (index !== -1) {
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
    // 进入当前页面的路由时，滚动到之前的位置
    scrollTo(scrollEl, to) {
      if (scrollEl) {
        const page = historyPage[to.fullPath]
        if (page) {
          const hash = page.hash === '' ? '' : page.hash || to.hash
          let top = page.scrollTop || 0
          // 优先滚动到有hash的元素上
          if (hash) {
            const hashEl = scrollEl.querySelector(hash)
            if (hashEl) {
              top = hashEl.offsetTop
            }
          }
          scrollEl.scrollTop = top
        }
      }
    },
    // 离开当前页面的路由时，保存页面滚动位置
    saveScrollTop(scrollEl, from) {
      if (scrollEl) {
        const path = from.fullPath
        if (!historyPage[path]) {
          historyPage[path] = {}
        }
        historyPage[path].scrollTop = scrollEl ? scrollEl.scrollTop : 0
        historyPage[path].hash = ''
      }
    }
  }
})()
