import { pageState, scroller } from '../helpers'

export function transition(effect = 'ios', fn) {
  return function(to, from) {
    const direction = pageState.updateDirection(to.fullPath)
    const options = fn ? fn({ direction, to, from }) : {}

    effect = options.effect || effect

    const name = direction
      ? `v-route-${effect}-${direction === 'forward' ? 'in' : 'out'}`
      : `v-route--notransition`

    return {
      name,
      mode: '',
      beforeEnter(el) {
        requestAnimationFrame(() => {
          scroller.scrollTo(el, to.fullPath)
        })
      },
      beforeLeave(el) {
        scroller.saveScrollTop(el, from.fullPath)
      },
      ...options
    }
  }
}
