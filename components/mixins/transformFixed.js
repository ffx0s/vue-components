import { view, browser } from '../utils/shared'

export default {
  props: {
    transformFixed: [String, Boolean]
  },
  data() {
    return {
      transfer: false,
      transformFixedStyle: {}
    }
  },
  mounted() {
    this.pagePath = this.$route.fullPath
    this.entering = false
    this.leaving = false
    this.enter()
  },
  activated() {
    this.enter()
  },
  deactivated() {
    this.leave()
  },
  beforeDestroy() {
    this.leave(true)
  },
  methods: {
    enter() {
      if (this.transformFixed !== false && !this.entering) {
        this.entering = true
        this.$nextTick(() => {
          this.setTransformFixedStyle()
        })
        this.$animatedRoute.$once('afterEnter', () => {
          setTimeout(() => {
            this.removeTransformFixedStyle()
            this.transfer = true
            this.entering = false
          }, 50)
        })
      }
    },
    leave(destroy) {
      if (this.transformFixed !== false && !this.leaving) {
        this.leaving = true
        this.transfer = false
        this.setTransformFixedStyle(destroy)
        this.$nextTick(() => {
          this.leaving = false
        })
      }
    },
    setTransformFixedStyle(destroy) {
      const pageData = this.$animatedRoute.getPageScrollData(this.pagePath) || {
        scrollTop: 0
      }
      const isBottom = this.position === 'bottom'
      const [offset] = this.transformFixed.split('|')
      const elHeight = this.$el.offsetHeight
      const value = isBottom
        ? pageData.scrollTop + view.height() - elHeight - +offset + 'px'
        : pageData.scrollTop + 'px'

      // 销毁实例前，数据响应失效，改用原生操作
      if (destroy) {
        const style = this.$el.style
        style.position = 'absolute'
        style.top = value
      } else {
        this.transformFixedStyle = {
          position: 'absolute',
          top: value
        }
      }
    },
    removeTransformFixedStyle() {
      const ios = browser().ios
      const style =
        ios && ios < 9
          ? {
              position: 'absolute'
            }
          : {}
      this.transformFixedStyle = style
    }
  }
}
