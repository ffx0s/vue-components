<template>
  <div>
    <Navbar title="PullRefresh" />
    <Module />
  </div>
</template>

<script>
import Module from './module'

export default {
  name: 'page-pull-refresh',
  components: {
    Module
  }
}
</script>
