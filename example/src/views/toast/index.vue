<template>
  <div>
    <Navbar title="Toast" />
    <div class="app--spacing">
      <h4>类型</h4>
      <VButton
        type="primary"
        @click="$toast({ title: '加载中...', type: 'loading' })"
      >
        加载中
      </VButton>
      <VButton
        type="success"
        @click="$toast({ title: '成功', type: 'success' })"
      >
        成功
      </VButton>
      <VButton type="error" @click="$toast({ title: '失败', type: 'error' })">
        失败
      </VButton>
      <VButton @click="$toast('纯文字')">纯文字</VButton>

      <h4>持续状态</h4>
      <VButton type="warning" @click="handler">
        {{ !show ? '一直存在' : '点我关闭' }}
      </VButton>
      <VButton @click="$toast({ duration: 3000, title: '三秒后关闭' })">
        持续3秒
      </VButton>

      <VButton @click="$toast({ delay: 1000, title: '延迟一秒显示' })">
        延迟显示
      </VButton>

      <h4>图标</h4>
      <VButton type="primary" @click="$toast({ type: 'loading' })">
        无文字
      </VButton>
      <VButton @click="iconToastShow = true">自定义图标</VButton>
      <Toast type="icon" v-model="iconToastShow" title="自定义图标">
        <i class="icon-star-empty" slot="icon" style="font-size:33px;"></i>
      </Toast>

      <h4>锁定屏幕</h4>
      <VButton
        @click="
          $toast({
            overlay: true,
            title: '无法点击页面其它元素',
            duration: 3000
          })
        "
      >
        显示
      </VButton>
    </div>
  </div>
</template>

<script>
import Toast from 'lvan/toast'

export default {
  name: 'page-toast',
  components: {
    Toast
  },
  data() {
    return {
      show: false,
      iconToastShow: false
    }
  },
  methods: {
    handler() {
      if (!this.show) {
        this.$toast({ duration: 0, title: '点按钮关闭', type: 'loading' })
        this.show = true
      } else {
        this.$toast.close()
        this.show = false
      }
    }
  }
}
</script>
