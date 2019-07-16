<template>
  <Cell
    class="v-swipe-cell"
    v-bind="$attrs"
    v-on="$listeners"
    @touchstart.native="pointerdown"
    @touchmove.native="pointermove"
    @touchend.native="pointerup"
    @mousedown.native="onMousedown"
    ref="cell"
  >
    <slot slot="title" name="title" />
    <div
      slot="bottom"
      class="v-swipe-cell__handler"
      v-if="renderHandler"
      @touchstart.stop
      @touchmove.stop
      @touchend.stop
    >
      <div class="v-swipe-cell__items v-swipe-cell--left" ref="leftItems">
        <slot name="left" />
      </div>
      <div class="v-swipe-cell__items v-swipe-cell--right" ref="rightItems">
        <slot name="right">
          <div
            class="v-swipe-cell__item v-swipe-cell--cancel"
            v-if="cancelText"
            @click.stop="handleCancel"
          >
            {{ cancelText }}
          </div>
          <div
            class="v-swipe-cell__item v-swipe-cell--delete"
            :class="{
              'v-swipe-cell--confirm': confirmDeleteText && confirmDelete
            }"
            v-if="deleteText"
            @click.stop="handleDelete"
          >
            {{ deleteText }}
            <div class="v-swipe-cell__delete">
              {{ confirmDeleteText }}
            </div>
          </div>
        </slot>
      </div>
    </div>
  </Cell>
</template>

<script>
import Cell from '../cell'
import { Handler, mouseMove } from '../utils/event'
import { addListener, isTouchDevice } from '../utils/shared'

const instances = []
let closing = false

let bindGlobalCloseEvent = function() {
  addListener(document.body, 'touchstart', closeAll)
  bindGlobalCloseEvent = () => {}
}

function closeAll(exclude) {
  if (!closing) {
    closing = true
    instances.forEach(vm => {
      if (exclude === vm) return
      vm.close()
    })
  }
}

export default {
  name: 'SwipeCell',
  components: {
    Cell
  },
  inheritAttrs: false,
  props: {
    animationDuration: {
      type: Number,
      default: 500
    },
    // 快速切换阀值
    threshold: {
      type: Number,
      default: 10
    },
    // 快速切换时的最大移动距离
    max: {
      type: Number,
      default: 30
    },
    // 快速切换时的最小移动距离
    min: {
      type: Number,
      default: -30
    },
    // 滑动的距离，超过这个值则显示对应操作项
    distance: {
      type: Number,
      default: 30
    },
    // 不能移动时的摩擦力
    friction: {
      type: Number,
      default: 0.2
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    deleteText: {
      type: String,
      default: '删除'
    },
    confirmDeleteText: {
      type: String,
      default: '确定删除'
    }
  },
  data() {
    return {
      renderHandler: false,
      confirmDelete: false
    }
  },
  created() {
    this.duration = 0
    this.translate = 0
    this.handler = new Handler({
      panleft: this.update,
      panright: this.update,
      threshold: this.threshold,
      isPreventDefault: this.isPreventDefault
    })
    instances.push(this)
  },
  beforeDestroy() {
    const index = instances.indexOf(this)
    if (index !== -1) {
      instances.splice(index, 1)
    }
    this.swipeCellEl = null
  },
  mounted() {
    bindGlobalCloseEvent()
    this.swipeCellEl = this.$refs.cell.$el
  },
  methods: {
    pointerdown(event) {
      closeAll(this)
      this.handler.start(event)
      this.startTranslate = this.translate
    },
    pointermove(event) {
      this.renderHandler = true
      this.handler.move(event)
    },
    pointerup() {
      this.handler.up()
      closing = false

      const action = this.shouldSlide()

      if (!action) return
      if (action.restore) return this.restore()
      if (action.close) return this.close()
      if (action.openRight) return this.openRight()
      if (action.openLeft) this.openLeft()
    },
    onMousedown(event) {
      if (isTouchDevice()) return
      event.preventDefault()
      this.pointerdown(event)
      mouseMove(this.pointermove, this.pointerup)
    },
    update(x) {
      if (x < this.min) x = this.min
      else if (x > this.max) x = this.max

      const width = this.getItemsWidth()
      const value =
        Math.abs(this.translate) > width || width === 0 ? this.friction * x : x

      this.setTranslate(this.translate + value, 0)
    },
    isPreventDefault() {
      return this.handler.is('panleft') || this.handler.is('panright')
    },
    openLeft() {
      this.setTranslate(this.getLeftItemsWidth(), this.animationDuration)
    },
    openRight() {
      this.setTranslate(-this.getRightItemsWidth(), this.animationDuration)
    },
    close() {
      this.setTranslate(0, this.animationDuration)
      this.confirmDelete = false
    },
    restore() {
      this.setTranslate(this.startTranslate, this.animationDuration)
    },
    getLeftItemsWidth() {
      return (
        this.leftItemsWidth ||
        (this.leftItemsWidth = this.$refs.leftItems.offsetWidth)
      )
    },
    getRightItemsWidth() {
      return (
        this.rightItemsWidth ||
        (this.rightItemsWidth = this.$refs.rightItems.offsetWidth)
      )
    },
    getItemsWidth() {
      return this.translate < 0
        ? this.getRightItemsWidth()
        : this.getLeftItemsWidth()
    },
    shouldSlide() {
      if (!this.handler.moved && this.translate) return { close: true }

      const panleft = this.handler.is('panleft')
      const panright = this.handler.is('panright')

      if (!panleft && !panright) return false

      const width = this.getItemsWidth()

      if (this.handler.isFast) {
        const isOpen = this.startTranslate !== 0
        const openRight = !isOpen && panleft
        const openLeft = !isOpen && panright
        let restore = isOpen && width && Math.abs(this.translate) > width
        return {
          restore,
          openRight,
          openLeft,
          close: !openRight && !openLeft && !restore
        }
      }

      const slideDistance = Math.abs(this.translate - this.startTranslate)
      const shouldSlide = slideDistance > this.distance
      const openLeft = shouldSlide && this.translate > 0
      const openRight = shouldSlide && this.translate < 0
      const restore = !openLeft && !openRight
      const close =
        (this.translate > this.startTranslate && openRight) ||
        (this.translate < this.startTranslate && openLeft)

      return {
        restore,
        openRight,
        openLeft,
        close
      }
    },
    handleCancel() {
      this.$emit('cancel', this.close)
    },
    handleDelete() {
      if (this.confirmDeleteText && !this.confirmDelete) {
        this.confirmDelete = true
      } else {
        this.$emit('delete', this.close)
      }
    },
    setTranslate(translate, duration) {
      const style = this.swipeCellEl.style

      style.transform = style.webkitTransform = `translateX(${translate}px)`
      // eslint-disable-next-line prettier/prettier
      style.transitionDuration =
      style.webkitTransitionDuration = `${duration}ms`

      this.translate = translate
      this.duration = duration
    }
  }
}
</script>

<style lang="postcss">
.v-swipe-cell {
  transition-property: transform;
}
.v-swipe-cell__items {
  position: absolute;
  top: 0;
  height: 100%;
  display: flex;
}
.v-swipe-cell--left {
  left: 0;
  transform: translate3d(-100%, 0, 0);
  & .v-swipe-cell__item::after {
    right: 98%;
  }
}
.v-swipe-cell--right {
  right: 0;
  transform: translate3d(100%, 0, 0);
  & .v-swipe-cell__item::after {
    left: 98%;
  }
}
.v-swipe-cell__item {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 25px;
  height: 100%;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 500%;
    height: 100%;
    background-color: inherit;
  }
}
.v-swipe-cell--delete {
  color: #fff;
  background-color: var(--error);
  transition: 0.3s transform;
}
.v-swipe-cell--cancel {
  color: #fff;
  background-color: var(--border);
}
.v-swipe-cell--confirm {
  transform: translateX(-100%);
  & .v-swipe-cell__delete {
    opacity: 1;
    visibility: visible;
  }
}
.v-swipe-cell__delete {
  position: absolute;
  background: inherit;
  width: 200%;
  height: 100%;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  z-index: 1;
  opacity: 0;
  visibility: hidden;
  transition: 0.3s opacity, 0.3s visibility;
}
</style>
