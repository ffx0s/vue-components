import { getScrollEventTarget } from '../../utils/scroll'

export default class Base {
  constructor(tabEl, swipeItems) {
    this.tabEl = tabEl
    this.wrapScrollEl = getScrollEventTarget(tabEl)
    this.tabScrollEls = swipeItems.map(item => item.$el.children[0])
    this.handleWrapStart = this.handleWrapStart.bind(this)
    this.handleWrapMove = this.handleWrapMove.bind(this)
  }
  _isVertical() {
    if (this.isVertical === null) {
      this.isVertical = Math.abs(this.dif.y) >= Math.abs(this.dif.x)
    }
    return this.isVertical
  }
  resetState() {}
  tabScrollToTop() {}
  getTabOffsetTop() {
    return this.tabEl.offsetTop - this.options.offset
  }
}
