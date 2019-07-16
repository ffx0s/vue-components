import Vue from 'vue'
import Router from 'vue-router'
import Toast from 'muvc/toast/plugin'

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
    meta: { title: 'home' },
    component: loadRoute('home')
  },
  {
    path: '/button',
    name: 'button',
    meta: { title: 'button' },
    component: loadRoute('button')
  },
  {
    path: '/validator',
    name: 'validator',
    meta: { title: 'validator' },
    component: loadRoute('validator')
  },
  {
    path: '/scrollView',
    name: 'scrollView',
    meta: { title: 'scrollView' },
    component: loadRoute('scrollView')
  },
  {
    path: '/headroom',
    name: 'headroom',
    meta: { title: 'headroom' },
    component: loadRoute('headroom')
  },
  {
    path: '/pullRefresh',
    name: 'pullRefresh',
    meta: { title: 'pullRefresh' },
    component: loadRoute('pullRefresh')
  },
  {
    path: '/infiniteScroll',
    name: 'infiniteScroll',
    meta: { title: 'infiniteScroll' },
    component: loadRoute('infiniteScroll')
  },
  {
    path: '/tab',
    name: 'tab',
    meta: { title: 'tab' },
    component: loadRoute('tab')
  },
  {
    path: '/tab2',
    name: 'tab2',
    meta: { title: 'tab2' },
    component: loadRoute('tab2')
  },
  {
    path: '/swipe',
    name: 'swipe',
    meta: { title: 'swipe' },
    component: loadRoute('swipe')
  },
  {
    path: '/swipeCell',
    name: 'swipeCell',
    meta: { title: 'swipeCell' },
    component: loadRoute('swipeCell')
  },
  {
    path: '/cell',
    name: 'cell',
    meta: { title: 'cell' },
    component: loadRoute('cell')
  },
  {
    path: '/toast',
    name: 'toast',
    meta: { title: 'toast' },
    component: loadRoute('toast')
  },
  {
    path: '/radio',
    name: 'radio',
    meta: { title: 'radio' },
    component: loadRoute('radio')
  },
  {
    path: '/checkbox',
    name: 'checkbox',
    meta: { title: 'checkbox' },
    component: loadRoute('checkbox')
  },
  {
    path: '/switch',
    name: 'switch',
    meta: { title: 'switch' },
    component: loadRoute('switch')
  },
  {
    path: '/field',
    name: 'field',
    meta: { title: 'field' },
    component: loadRoute('field')
  },
  {
    path: '/modal',
    name: 'modal',
    meta: { title: 'modal' },
    component: loadRoute('modal')
  },
  {
    path: '/actionsheet',
    name: 'actionsheet',
    meta: { title: 'actionsheet' },
    component: loadRoute('actionsheet')
  },
  {
    path: '/navbar',
    name: 'navbar',
    meta: { title: 'navbar' },
    component: loadRoute('navbar')
  },
  {
    path: '/drawer',
    name: 'drawer',
    meta: { title: 'drawer' },
    component: loadRoute('drawer')
  },
  {
    path: '/1px',
    name: '1px',
    meta: { title: '1px' },
    component: loadRoute('1px')
  },
  {
    path: '/picker',
    name: 'picker',
    meta: { title: 'picker' },
    component: loadRoute('picker')
  },
  {
    path: '/popup',
    name: 'popup',
    meta: { title: 'popup' },
    component: loadRoute('popup')
  },
  {
    path: '/tabBar',
    name: 'tabBar',
    meta: { title: 'tabBar' },
    component: loadRoute('tabBar')
  },
  {
    path: '/badge',
    name: 'badge',
    meta: { title: 'badge' },
    component: loadRoute('badge')
  },
  {
    path: '/notice',
    name: 'notice',
    meta: { title: 'notice' },
    component: loadRoute('notice')
  },
  {
    path: '/skeleton',
    name: 'skeleton',
    meta: { title: 'skeleton' },
    component: loadRoute('skeleton')
  },
  {
    path: '/virtualList',
    name: 'virtualList',
    meta: { title: 'virtualList' },
    component: loadRoute('virtualList')
  },
  {
    path: '/virtualList/variable',
    name: 'virtualList/variable',
    meta: { title: 'virtualList' },
    component: loadRoute('virtualList/variable')
  },
  {
    path: '/virtualList/loadMore',
    name: 'virtualList/loadMore',
    meta: { title: 'virtualList' },
    component: loadRoute('virtualList/loadMore')
  },
  {
    path: '/imageViewer',
    name: 'imageViewer',
    meta: { title: 'imageViewer' },
    component: loadRoute('imageViewer')
  },
  {
    path: '/ring',
    name: 'ring',
    meta: { title: 'ring' },
    component: loadRoute('ring')
  },
  {
    path: '/404',
    name: '404',
    meta: { title: '404' },
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
