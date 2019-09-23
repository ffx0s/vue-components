<template>
  <div style="overflow: hidden">
    <Navbar title="Touch gestures" />
    <div class="app--spacing" style="background-color: #fff">
      <CheckboxGroup v-model="selectValues" @change="change">
        <Checkbox
          style="margin: 5px 15px 5px 0;"
          v-for="feature in features"
          :key="feature"
          :label="feature"
        />
      </CheckboxGroup>
    </div>
    <div class="touch-image" ref="drag">
      <img
        src="https://static.webfed.cn/o_1d9u7gc8c8ip1u35n111i46ehce.jpg"
        alt="dragImage"
      />
    </div>
  </div>
</template>

<script>
import ETouch from 'lvan/utils/etouch'
import CheckboxGroup from 'lvan/checkbox/group'
import Checkbox from 'lvan/checkbox'

const eventTypes = {
  drag: ['panstart', 'panmove', 'panend'],
  zoom: ['pinchstart', 'pinchmove', 'pinchend'],
  rotate: ['rotatestart', 'rotatemove', 'rotateend'],
  tap: ['tap'],
  doubletap: ['doubletap']
}

export default {
  name: 'page-touch',
  components: {
    CheckboxGroup,
    Checkbox
  },
  data() {
    const features = ['drag', 'zoom', 'rotate', 'tap', 'doubletap']
    return {
      features,
      selectValues: [...features]
    }
  },
  mounted() {
    this.transform = { x: -450, y: -150, scale: 0.2, rotation: 0, duration: 0 }
    this.updateElement = ETouch.rAFThrottle(this.updateElement)
    this.touch = new ETouch({
      el: this.$refs.drag,
      position: () => this.transform
    })
      // pointerdown
      .on('down', ETouch.preventDefault)
    // .on('input', this.input)

    this.updateElement()

    this.selectValues.forEach(value => {
      this.eventOperation(true, eventTypes[value])
    })
  },
  beforeDestroy() {
    this.touch.destroy()
  },
  methods: {
    change(values, value) {
      this.eventOperation(value.checked, eventTypes[value.label])
    },
    eventOperation(bind, types) {
      const action = bind ? 'on' : 'off'
      types.forEach(type => {
        this.touch[action](type, this[type])
      })
    },
    input(event, data) {
      console.log('input', data.type)
    },
    panstart(event, data) {
      console.log('panstart', data.type)
    },
    panmove(event, { type, position }) {
      ETouch.preventDefault(event)
      position.duration = 0
      this.updateElement(position)
      console.log('panmove', type)
    },
    panend(event, data) {
      console.log('panend', data.type)
    },
    pinchstart(event, data) {
      console.log('pinchstart', data.type)
    },
    pinchmove(event, { type, position }) {
      ETouch.preventDefault(event)
      position.duration = 0
      this.updateElement(position)
      console.log('pinchmove', type)
    },
    pinchend(event, data) {
      console.log('pinchend', data.type)
    },
    rotatestart(event, data) {
      console.log('rotatestart', data.type)
    },
    rotatemove(event, { type, position }) {
      ETouch.preventDefault(event)
      this.updateElement({
        duration: 0,
        rotation: position.rotation
      })
      console.log('rotatemove', type)
    },
    rotateend(event, data) {
      console.log('rotateend', data.type)
    },
    tap(event, data) {
      console.log('tap', data.type)
      this.$toast('tap')
    },
    doubletap(event) {
      ETouch.preventDefault(event)

      this.updateElement({
        scale: this.transform.scale !== 0.2 ? 0.2 : 0.5,
        duration: 300
      })

      console.log('doubletap')
    },
    updateElement(transform) {
      const style = this.$refs.drag.style

      let { x, y, scale, rotation, duration } = Object.assign(
        this.transform,
        transform
      )

      scale = Math.min(Math.max(scale, 0.1), 1)

      style.transform = style.webkitTransform = `
        translate3d(${x}px, ${y}px, 0)
        scale(${scale})
        rotate(${rotation}deg)
      `
      style.transitionDuration = style.webkitTransitionDuration = `${duration}ms`
    }
  }
}
</script>

<style lang="postcss">
.touch-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 1280px;
  height: 781px;
  & img {
    width: 100%;
  }
}
</style>
