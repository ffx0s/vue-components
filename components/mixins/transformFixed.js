import { view, browser } from '../utils/shared'

export default {
  props: {
    transformFixed: {
      type: String,
      default: ''
    }
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
    this.leave()
  },
  methods: {
    enter() {
      if (this.transformFixed && !this.entering) {
        this.entering = true
        this.setTransformFixedStyle()
        this.$animatedRoute.$once('afterEnter', () => {
          setTimeout(() => {
            this.removeTransformFixedStyle()
            this.transfer = true
            this.entering = false
          }, 50)
        })
      }
    },
    leave() {
      if (this.transformFixed && !this.leaving) {
        this.leaving = true
        this.transfer = false
        this.setTransformFixedStyle()
        this.$nextTick(() => {
          this.leaving = false
        })
      }
    },
    setTransformFixedStyle() {
      this.$nextTick(() => {
        const pageData = this.$animatedRoute.getPageScrollData(
          this.pagePath
        ) || {
          scrollTop: 0
        }
        const [position = 'bottom', offset = 0] = this.transformFixed.split('|')
        const elHeight = this.$el.offsetHeight
        const value =
          position === 'bottom'
            ? pageData.scrollTop + view.height() - elHeight - +offset + 'px'
            : pageData.scrollTop + 'px'

        this.transformFixedStyle = {
          position: 'absolute',
          top: value
        }
      })
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
