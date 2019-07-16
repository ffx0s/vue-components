<template>
  <div>
    <Navbar title="Skeleton">
      <VSwitch slot="right" v-model="loading" />
    </Navbar>
    <Module v-model="loading" />
  </div>
</template>

<script>
import VSwitch from 'muvc/switch'
import Module from './module'

export default {
  components: {
    VSwitch,
    Module
  },
  data() {
    return {
      loading: true
    }
  }
}
</script>
