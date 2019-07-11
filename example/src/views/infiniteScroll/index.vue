<template>
  <div>
    <Navbar title="InfiniteScroll" />
    <Module v-if="render" />
  </div>
</template>

<script>
import Module from './module'

export default {
  name: 'page-infinite-scroll',
  components: {
    Module
  },
  data() {
    return {
      render: false
    }
  },
  mounted() {
    this.$animatedRoute.$once('afterEnter', () => {
      this.render = true
    })
  }
}
</script>
