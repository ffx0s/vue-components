import ETouch from '../utils/etouch'
import animate from '../utils/animate'
import { view } from '../utils/shared'
import { imgContain, checkPosition } from './helpers'

export default {
  methods: {
    createTouch() {
      const touchOptions = { passive: false, capture: true }

      this.touch = new ETouch({
        el: this.$refs.touch,
        origin: true,
        touchstartEventOptions: touchOptions,
        touchmoveEventOptions: touchOptions,
        touchendEventOptions: touchOptions,
        position: () => this.getCurrentStyle()
      })
        .on('down', this.down)
        .on('tap', this.tap)
        .on('doubletap', this.doubletap)
        .on('panstart', this.panstart)
        .on('panmove', this.panmove)
        .on('pinchstart', this.pinchstart)
        .on('pinchmove', this.pinchmove)
        .on('panend pinchend', this.panendPinchend)
    },

    down(event) {
      ETouch.preventDefault(event)

      this.inAnimation && this.animation.stop()
    },

    tap(event) {
      if (this.lock || this.disabled) return

      if (this.clickHidden) {
        this.hide()
      }

      this.$emit('tap', event)
    },

    doubletap(event, { clientX, clientY }) {
      if (this.lock || this.disabled) return

      const { scale, width, height } = this.getCurrentStyle()
      const initStyle = this.getCurrentInitStyle()

      if (scale !== initStyle.scale) {
        this.updateElement({
          x: initStyle.x,
          y: initStyle.y,
          scale: initStyle.scale,
          duration: this.zoomAnimationDuration
        })
      } else {
        const fillWidth = false
        const newScale =
          width / height > 1
            ? imgContain(width, height, view.width(), view.height(), fillWidth)
                .scale
            : 1

        this.scaleTo({ x: clientX, y: clientY }, newScale, true)
      }

      this.$emit('doubletap', event)
    },

    panstart(event) {
      event.stopPropagation()
      this.disabled = false
      this.zoomHidden = false
      this.reverse = 1
      this.overlayOpacity = 1
      this.startScale = this.getCurrentStyle().scale
    },

    panmove(event, { vx, vy, clientX, clientY }) {
      if (this.lock || this.disabled) return

      ETouch.preventDefault(event)
      event.stopPropagation()

      const style = this.getCurrentStyle()

      // 根据 checkPosition 判断是否需要切换上一张/下一张
      const { isLeft, isRight, isTop, isBottom } = checkPosition({
        x: style.x + vx,
        y: style.y + vy,
        scale: style.scale,
        width: style.width,
        height: style.height
      })

      if (this.touch.direction === ETouch.HORIZONTAL) {
        if (!this.zoomHidden) {
          if (
            (isRight && this.touch.is('panleft')) ||
            (isLeft && this.touch.is('panright'))
          ) {
            this.disabled = true
          }
        }
      } else {
        // 垂直滑动：缩小图片并隐藏
        if (isTop || isBottom) {
          const style = this.getCurrentStyle()
          const scaleChanged = 1 - (vy / clientY) * this.reverse
          const newScale = style.scale * scaleChanged

          if (newScale >= this.startScale) {
            this.reverse = -this.reverse
          }

          this.overlayOpacity *= scaleChanged
          this.center = { x: clientX, y: clientY }

          this.scaleTo(this.center, newScale, false, false)
          this.updateoverlayOpacity(this.overlayOpacity)

          this.zoomHidden = true
        }
      }

      if (!this.disabled) {
        this.updateElement({
          x: style.x + vx,
          y: style.y + vy,
          duration: 0
        })
      }
    },

    pinchstart() {
      this.touch.setOptions({
        minScale: this.getCurrentInitStyle().scale / 2
      })
    },

    pinchmove(event, { position, center }) {
      if (this.lock || this.disabled) return

      ETouch.preventDefault(event)
      event.stopPropagation()

      this.center = center

      let { scale, x, y } = position

      this.updateElement({
        x,
        y,
        scale,
        duration: 0
      })
    },

    panendPinchend(event) {
      const disabled = this.disabled

      this.disabled = false

      if (this.lock || disabled) return

      event.stopPropagation()

      const style = this.getCurrentStyle()
      const hide =
        this.zoomHidden && style.scale / this.startScale <= this.hideScale

      if (hide) return this.hide()

      this.updateoverlayOpacity(1)

      // 是否快速滑动，是的话则返回滑动相关数据
      const result = this.isFastMove()

      if (result) {
        let x = style.x + result.x
        let y = style.y + result.y
        let scale = style.scale
        let type = 'easeOutCubic'
        const position = this.validation({
          x,
          y,
          scale,
          width: style.width,
          height: style.height
        })

        if (position.isDraw) {
          x = position.x
          y = position.y
          scale = position.scale

          // 根据滑动的方向和当前的位置判断是否需要回弹效果
          const isHorizontal = this.touch.direction === ETouch.HORIZONTAL

          if (
            ((position.isBottom || position.isTop) && !isHorizontal) ||
            ((position.isLeft || position.isRight) && isHorizontal)
          ) {
            type = 'easeOutBack'
          }
        }

        // 缓冲动画
        this.animate(x, y, scale, { type, time: result.time })
      } else {
        this.validation(null, true)
      }
    },

    scaleTo(point, scale, transition = true, check = true) {
      const style = this.getCurrentStyle()

      if (scale === style.scale) return

      let { x, y } = ETouch.originZoom(style, point, scale)

      if (check) {
        const position = checkPosition({
          x,
          y,
          scale,
          width: style.width,
          height: style.height
        })
        x = position.x
        y = position.y
      }

      this.updateElement({
        x,
        y,
        scale,
        duration: transition ? this.zoomAnimationDuration : 0
      })
    },

    validation(style, isDraw) {
      style = style || this.getCurrentStyle()

      const position = this.checkScale(style) || checkPosition(style)

      if (position.scale === undefined) {
        position.scale = style.scale
      }

      if (isDraw && position.isDraw) {
        this.animate(position.x, position.y, position.scale)
      }

      return position
    },

    checkScale(style) {
      const maxScale = 1
      const minScale = this.getCurrentInitStyle().scale
      const that = this

      function setScale(newScale) {
        const { x, y } = ETouch.originZoom(style, that.center, newScale)

        const position = checkPosition({
          x,
          y,
          scale: newScale,
          width: style.width,
          height: style.height
        })

        position.isDraw = true
        position.scale = newScale

        return position
      }

      if (style.scale > maxScale) {
        return setScale(maxScale)
      } else if (style.scale < minScale) {
        return setScale(minScale)
      }
    },

    animate(x, y, scale, options = { time: 450, type: 'easeOutCubic' }) {
      const index = this.index
      const style = this.getCurrentStyle()

      this.inAnimation && this.animation.stop()
      this.inAnimation = true

      this.animation = animate({
        targets: [[style.scale, scale], [style.x, x], [style.y, y]],
        time: options.time,
        type: options.type,
        running: target => {
          Object.assign(style, {
            scale: target[0],
            x: target[1],
            y: target[2],
            duration: 0
          })

          this.setStyle(style, index)
        },
        stop: () => {
          this.inAnimation = false
        }
      })
    },

    isFastMove() {
      const speed = 0.2
      const duration = 840
      const { vx, vy, time } = this.touch.data
      const speedX = vx / time
      const speedY = vy / time

      if (Math.abs(speedX) > speed || Math.abs(speedY) > speed) {
        const time = duration / 2
        const x = speedX * time
        const y = speedY * time
        return { x, y, time: duration }
      }
    }
  }
}
