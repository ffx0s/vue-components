<template>
  <div v-if="loaded"><slot /></div>
</template>

<script>
export default {
  name: 'TabItem',
  props: {
    title: {
      type: String,
      default: ''
    },
    lazy: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loaded: !this.lazy
    }
  },
  methods: {
    load() {
      if (!this.loaded) this.loaded = true
    }
  }
}
</script>
