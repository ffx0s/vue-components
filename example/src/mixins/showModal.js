import { browser } from 'muvc/utils/shared'

export default {
  mounted() {
    if (!browser().mobile) {
      this.$modal('仅支持移动设备！')
    }
  }
}
