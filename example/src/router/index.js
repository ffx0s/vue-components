import Vue from 'vue'
import Router from 'vue-router'
import Toast from 'lvan/toast/plugin'

Vue.use(Router)

function loadRoute(name) {
  return function() {
    return import('../views/' + name).catch(() => {
      Toast('网络出错，请重试')
    })
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: loadRoute('home')
  },
  {
    path: '/button',
    name: 'button',
    component: loadRoute('button')
  },
  {
    path: '/validator',
    name: 'validator',
    component: loadRoute('validator')
  },
  {
    path: '/scrollView',
    name: 'scrollView',
    component: loadRoute('scrollView')
  },
  {
    path: '/headroom',
    name: 'headroom',
    component: loadRoute('headroom')
  },
  {
    path: '/pullRefresh',
    name: 'pullRefresh',
    component: loadRoute('pullRefresh')
  },
  {
    path: '/infiniteScroll',
    name: 'infiniteScroll',
    component: loadRoute('infiniteScroll')
  },
  {
    path: '/tab',
    name: 'tab',
    component: loadRoute('tab')
  },
  {
    path: '/tab2',
    name: 'tab2',
    component: loadRoute('tab2')
  },
  {
    path: '/swipe',
    name: 'swipe',
    component: loadRoute('swipe')
  },
  {
    path: '/swipeCell',
    name: 'swipeCell',
    component: loadRoute('swipeCell')
  },
  {
    path: '/cell',
    name: 'cell',
    component: loadRoute('cell')
  },
  {
    path: '/loading',
    name: 'loading',
    component: loadRoute('loading')
  },
  {
    path: '/toast',
    name: 'toast',
    component: loadRoute('toast')
  },
  {
    path: '/radio',
    name: 'radio',
    component: loadRoute('radio')
  },
  {
    path: '/checkbox',
    name: 'checkbox',
    component: loadRoute('checkbox')
  },
  {
    path: '/switch',
    name: 'switch',
    component: loadRoute('switch')
  },
  {
    path: '/field',
    name: 'field',
    component: loadRoute('field')
  },
  {
    path: '/modal',
    name: 'modal',
    component: loadRoute('modal')
  },
  {
    path: '/actionsheet',
    name: 'actionsheet',
    component: loadRoute('actionsheet')
  },
  {
    path: '/navbar',
    name: 'navbar',
    component: loadRoute('navbar')
  },
  {
    path: '/drawer',
    name: 'drawer',
    component: loadRoute('drawer')
  },
  {
    path: '/1px',
    name: '1px',
    component: loadRoute('1px')
  },
  {
    path: '/touch',
    name: 'touch',
    component: loadRoute('touch')
  },
  {
    path: '/scroll',
    name: 'scroll',
    component: loadRoute('scroll')
  },
  {
    path: '/picker',
    name: 'picker',
    component: loadRoute('picker')
  },
  {
    path: '/popup',
    name: 'popup',
    component: loadRoute('popup')
  },
  {
    path: '/tabBar',
    name: 'tabBar',
    component: loadRoute('tabBar')
  },
  {
    path: '/badge',
    name: 'badge',
    component: loadRoute('badge')
  },
  {
    path: '/notice',
    name: 'notice',
    component: loadRoute('notice')
  },
  {
    path: '/skeleton',
    name: 'skeleton',
    component: loadRoute('skeleton')
  },
  {
    path: '/virtualList',
    name: 'virtualList',
    component: loadRoute('virtualList')
  },
  {
    path: '/virtualList/variable',
    name: 'virtualList/variable',
    component: loadRoute('virtualList/variable')
  },
  {
    path: '/virtualList/loadMore',
    name: 'virtualList/loadMore',
    component: loadRoute('virtualList/loadMore')
  },
  {
    path: '/imageViewer',
    name: 'imageViewer',
    component: loadRoute('imageViewer')
  },
  {
    path: '/ring',
    name: 'ring',
    component: loadRoute('ring')
  },
  {
    path: '/404',
    name: '404',
    component: loadRoute('pageNotFound')
  },
  {
    path: '*',
    redirect: { name: '404' }
  }
]

const router = new Router({
  routes,
  // mode: 'history',
  linkActiveClass: 'active',
  scrollBehavior() {
    return false
  }
})

router.beforeEach((to, from, next) => {
  Toast({ delay: 1000, type: 'loading', duration: 0 })
  next()
})

router.afterEach(() => {
  Toast.close()
})

export default router
