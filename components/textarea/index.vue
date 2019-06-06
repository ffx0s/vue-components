<template>
  <textarea class="v-textarea" v-model="currentValue" @input="change" />
</template>

<script>
export default {
  name: 'Textarea',
  props: {
    value: String
  },
  computed: {
    currentValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  mounted() {
    if (this.value) {
      this.change()
    }
  },
  methods: {
    change() {
      this.$el.style.height = ''
      this.$el.style.height = this.$el.scrollHeight + 'px'
    }
  }
}
</script>

<style lang="postcss">
.v-textarea {
  appearance: none;
  border: none;
  padding: 0;
  width: 100%;
  font-size: 16px;
  background-color: transparent;
  overflow: hidden;
  transform: translateZ(0);
}
</style>
