<template>
  <Cell
    class="v-swipe-cell"
    :style="style"
    v-bind="$attrs"
    v-on="$listeners"
    @touchstart.stop.native="pointerdown"
    @touchmove.native="pointermove"
    @touchend.native="pointerup"
    @mousedown.native="onMousedown"
  >
    <slot slot="title" name="title" />
    <div
      slot="bottom"
      class="v-swipe-cell-handler"
      v-if="renderHandler"
      @touchstart.stop
      @touchmove.stop
      @touchend.stop
    >
      <div class="v-swipe-cell-items v-swipe-cell-left" ref="leftItems">
        <slot name="left" />
      </div>
      <div class="v-swipe-cell-items v-swipe-cell-right" ref="rightItems">
        <slot name="right">
          <div
            class="v-swipe-cell-item v-swipe-cell-cancel"
            v-if="cancelText"
            @click.stop="cancelHandler"
          >
            {{ cancelText }}
          </div>
          <div
            class="v-swipe-cell-item v-swipe-cell-delete"
            :class="{
              'v-swipe-cell-confirm': confirmDeleteText && confirmDelete
            }"
            v-if="deleteText"
            @click.stop="deleteHandler"
          >
            {{ deleteText }}
            <div class="v-swipe-cell-confirm-delete">
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

let bindGlobalCloseEvent = function() {
  addListener(document.body, 'touchstart', closeAll)
  bindGlobalCloseEvent = () => {}
}

function closeAll(exclude) {
  instances.forEach(vm => {
    if (exclude === vm) return
    vm.close()
  })
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
  computed: {
    style() {
      return {
        transitionDuration: `${this.duration}ms`,
        transform: `translateX(${this.translate}px)`
      }
    }
  },
  data() {
    return {
      duration: this.animationDuration,
      translate: 0,
      renderHandler: false,
      confirmDelete: false
    }
  },
  created() {
    this.handler = new Handler({
      panleft: this.update,
      panright: this.update,
      isPreventDefault: this.isPreventDefault
    })
    instances.push(this)
  },
  beforeDestroy() {
    const index = instances.indexOf(this)
    if (index !== -1) {
      instances.splice(index, 1)
    }
  },
  mounted() {
    bindGlobalCloseEvent()
  },
  methods: {
    pointerdown(event) {
      closeAll(this)
      this.handler.start(event)
      this.startTranslate = this.translate
      this.vector = 0
    },
    pointermove(event) {
      this.renderHandler = true
      this.handler.move(event)
    },
    pointerup() {
      this.handler.up()
      const action = this.shouldSliding()
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
      this.vector = x
      this.duration = 0
      this.translate += value
    },
    isPreventDefault() {
      return this.handler.is('panleft') || this.handler.is('panright')
    },
    openLeft() {
      this.duration = this.animationDuration
      this.translate = this.getLeftItemsWidth()
    },
    openRight() {
      this.duration = this.animationDuration
      this.translate = -this.getRightItemsWidth()
    },
    close() {
      this.duration = this.animationDuration
      this.translate = 0
      this.confirmDelete = false
    },
    restore() {
      this.duration = this.animationDuration
      this.translate = this.startTranslate
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
    shouldSliding() {
      const swipeLeft = this.handler.is('panleft')
      const swipeRight = this.handler.is('panright')

      if (!this.handler.moved && this.translate) return { close: true }

      if (!swipeLeft && !swipeRight) return false

      const width = this.getItemsWidth()
      const isFastMoving = Math.abs(this.vector) > this.threshold

      if (isFastMoving) {
        const isOpen = this.startTranslate !== 0
        const openRight = !isOpen && swipeLeft
        const openLeft = !isOpen && swipeRight
        let restore = isOpen && width && Math.abs(this.translate) > width
        return {
          restore,
          openRight,
          openLeft,
          close: !openRight && !openLeft && !restore
        }
      }

      const minSlideDistance = width / 4
      const slideDistance = Math.abs(this.translate - this.startTranslate)
      const value = slideDistance > minSlideDistance
      const openLeft = this.translate > 0 && value
      const openRight = this.translate < 0 && value
      const restore = !openLeft && !openRight

      return {
        restore,
        openRight,
        openLeft,
        close: Math.abs(this.translate) < minSlideDistance
      }
    },
    cancelHandler() {
      this.$emit('cancel', this.close)
    },
    deleteHandler() {
      if (this.confirmDeleteText && !this.confirmDelete) {
        this.confirmDelete = true
      } else {
        this.$emit('delete', this.close)
      }
    }
  }
}
</script>

<style lang="postcss">
.v-swipe-cell {
  transition-property: transform;
}
.v-swipe-cell-items {
  position: absolute;
  top: 0;
  height: 100%;
  display: flex;
}
.v-swipe-cell-left {
  left: 0;
  transform: translate3d(-100%, 0, 0);
  & .v-swipe-cell-item::after {
    right: 98%;
  }
}
.v-swipe-cell-right {
  right: 0;
  transform: translate3d(100%, 0, 0);
  & .v-swipe-cell-item::after {
    left: 98%;
  }
}
.v-swipe-cell-item {
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
.v-swipe-cell-delete {
  color: #fff;
  background-color: var(--error);
  transition: 0.3s transform;
}
.v-swipe-cell-cancel {
  color: #fff;
  background-color: var(--border);
}
.v-swipe-cell-confirm {
  transform: translateX(-100%);
  & .v-swipe-cell-confirm-delete {
    opacity: 1;
    visibility: visible;
  }
}
.v-swipe-cell-confirm-delete {
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
