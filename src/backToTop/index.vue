<template>
  <Headroom
    position="bottom"
    class="v-back-totop--initial"
    pinnedClass="v-back-totop--pinned"
    unpinnedClass="v-back-totop--unpinned"
    transitionClass="v-back-totop--transition"
    @click.native="scrollTo(0)"
  >
    <slot>
      <div class="v-back-totop"></div>
    </slot>
  </Headroom>
</template>

<script>
import Headroom from '../headroom'
import animate from '../utils/animate'
import {
  getScrollEventTarget,
  setScrollTop,
  getScrollTop
} from '../utils/scroll'

export default {
  name: 'BackToTop',
  components: {
    Headroom
  },
  mounted() {
    this.scrollEl = getScrollEventTarget(this.$el)
  },
  methods: {
    scrollTo(targetValue, transition = true) {
      const currentValue = getScrollTop(this.scrollEl)

      if (currentValue === targetValue) return

      this.animate && this.animate.stop()
      if (transition) {
        this.animate = animate({
          targets: [[currentValue, targetValue]],
          running: values => {
            setScrollTop(this.scrollEl, Math.ceil(values[0]))
          }
        })
      } else {
        setScrollTop(this.scrollEl, targetValue)
      }
    }
  }
}
</script>

<style lang="postcss">
.v-back-totop--initial {
  --size: 40px;
  opacity: 0;
  width: var(--size);
  bottom: 50px;
  right: 50px;
}
.v-back-totop {
  width: var(--size);
  height: var(--size);
  line-height: var(--size);
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: var(--textPrimary);
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' fill='%23404040' width='15' height='15'%3E%3Cpath d='M846.62 753.07L511.63 406.697 172.304 757.6v-.018c-11.521 11.462-27.133 18.532-44.375 18.532-35.32 0-63.924-29.6-63.924-66.11 0-17.817 6.831-33.985 17.917-45.885l383.58-396.651c11.643-12.457 27.93-20.224 46.007-20.224h.277c18.077 0 34.407 7.767 46.007 20.224h.039l383.546 396.65-.16.161c11.042 11.878 17.796 27.97 17.796 45.726 0 36.51-28.606 66.11-63.924 66.11-19.39 0-36.748-8.94-48.47-23.046zm0 0'/%3E%3C/svg%3E");
  background-position: center;
  background-repeat: no-repeat;
}
.v-back-totop--unpinned,
.v-back-totop--pinned {
  opacity: 1;
}
.v-back-totop--transition {
  transition: 0.3s opacity;
}
</style>
