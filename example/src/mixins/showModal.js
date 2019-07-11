import { browser } from 'vue-components/utils/shared'

export default {
  mounted() {
    if (!browser().mobile) {
      this.$modal('仅支持移动设备！')
    }
  }
}
