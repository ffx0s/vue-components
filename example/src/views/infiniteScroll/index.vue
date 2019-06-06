<template>
  <div>
    <Navbar title="InfiniteScroll" />
    <Module />
  </div>
</template>

<script>
import Module from './module'

export default {
  name: 'page-infinite-scroll',
  components: {
    Module
  }
}
</script>
