<template>
  <Cell
    class="v-swipe-cell"
    :class="{ 'v-swipe-cell--active': active }"
    :clickable="false"
    v-bind="$attrs"
    @click="noop"
    ref="cell"
  >
    <slot slot="title" name="title" />
    <slot slot="describe" name="describe" />
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
import ETouch from '../utils/etouch'
import { addListener, noop } from '../utils/shared'

const instances = []
let currentIndex = null

let bindGlobalCloseEvent = function() {
  addListener(document.body, 'touchstart', closeAll)
  bindGlobalCloseEvent = noop
}

function closeAll() {
  instances.forEach((vm, index) => {
    if (index !== currentIndex && vm.translate !== 0) {
      vm.close()
    }
  })
  currentIndex = null
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
      confirmDelete: false,
      active: false
    }
  },
  created() {
    this.duration = 0
    this.translate = 0

    instances.push(this)
  },
  mounted() {
    bindGlobalCloseEvent()

    this.setStyle = ETouch.rAFThrottle(this.setStyle)

    this.touch = new ETouch({
      el: this.$el,
      lockDirection: ETouch.HORIZONTAL,
      threshold: this.threshold
    })
      .on('down', this.down)
      .on('panstart', this.panstart)
      .on('panleft panright', this.panmove)
      .on('up', this.up)
  },
  beforeDestroy() {
    const index = instances.indexOf(this)
    if (index !== -1) {
      instances.splice(index, 1)
    }
    this.touch.destroy()
    this.touch = null
  },
  methods: {
    noop() {},
    down() {
      this.startTranslate = this.translate
      currentIndex = instances.indexOf(this)
    },
    up() {
      const action = this.shouldSlide()

      if (!action) return
      if (action.click) return this.click()
      if (action.restore) return this.restore()
      if (action.close) return this.close()
      if (action.openRight) return this.openRight()
      if (action.openLeft) this.openLeft()
    },
    panstart() {
      this.renderHandler = true
    },
    panmove(event, { vx }) {
      ETouch.preventDefault(event)

      if (vx < this.min) vx = this.min
      else if (vx > this.max) vx = this.max

      const width = this.getItemsWidth()
      const value =
        Math.abs(this.translate) > width || width === 0
          ? this.friction * vx
          : vx

      this.updateElement(this.translate + value, 0)
    },
    openLeft() {
      this.updateElement(this.getLeftItemsWidth(), this.animationDuration)
    },
    openRight() {
      this.updateElement(-this.getRightItemsWidth(), this.animationDuration)
    },
    close() {
      this.updateElement(0, this.animationDuration)
      this.confirmDelete = false
    },
    restore() {
      this.updateElement(this.startTranslate, this.animationDuration)
    },
    click() {
      this.setActive()

      const cell = this.$refs.cell
      this.$listeners.click ? this.$emit('click') : cell.click()
    },
    setActive() {
      if (this.$refs.cell.isLink) {
        this.active = true
        clearTimeout(this.activeTimer)
        this.activeTimer = setTimeout(() => {
          this.active = false
        }, 100)
      }
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
      if (!this.touch.moved) {
        if (this.translate === 0) return { click: true }
        if (this.translate !== 0) return { close: true }
      }

      const panleft = this.touch.is('panleft')
      const panright = this.touch.is('panright')

      if (!panleft && !panright) return false

      const width = this.getItemsWidth()

      if (this.touch.isSwipe) {
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
    updateElement(translate, duration) {
      this.translate = translate
      this.duration = duration
      this.setStyle()
    },
    setStyle() {
      const style = this.$el.style

      // eslint-disable-next-line prettier/prettier
      style.transform = style.webkitTransform = `translateX(${this.translate}px)`

      // eslint-disable-next-line prettier/prettier
      style.transitionDuration =
      style.webkitTransitionDuration = `${this.duration}ms`
    }
  }
}
</script>

<style lang="postcss">
.v-swipe-cell {
  transition-property: transform;
  background-color: #fff;
}
.v-swipe-cell__items {
  position: absolute;
  top: 0;
  height: 100%;
  display: flex;
}
.v-swipe-cell--active {
  background-color: var(--border);
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
