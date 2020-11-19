import { pageState, scroller } from '../helpers'
import { view } from '../../utils/shared'

export function transition(effect) {
  return function(to, from) {
    const _effect = effect || view.width() > 500 ? 'android' : 'ios'
    const direction = pageState.updateDirection(to.fullPath)
    const transitionName = direction
      ? `v-route-${_effect}-${direction === 'forward' ? 'in' : 'out'}`
      : `v-route--notransition`

    return {
      name: transitionName,
      mode: '',
      beforeEnter(el) {
        requestAnimationFrame(() => {
          scroller.scrollTo(el, to.fullPath)
        })
      },
      beforeLeave(el) {
        scroller.saveScrollTop(el, from.fullPath)
      }
    }
  }
}
