<template>
  <div>
    <div style="height:46px;">
      <Navbar fixed title="Skeleton" v-transfer-dom>
        <VSwitch slot="right" v-model="loading" />
      </Navbar>
    </div>
    <Module v-model="loading" />
  </div>
</template>

<script>
import VSwitch from 'lvan/switch'
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
