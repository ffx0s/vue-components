<template>
  <div>
    <Navbar title="Modal" />
    <div class="app--spacing">
      <h4>类型</h4>
      <VButton @click="confirmShow = true"> Confirm </VButton>
      <VButton @click="alertShow = true">Alert</VButton>
      <VButton @click="customShow = true">自定义</VButton>

      <VModal
        v-transfer-dom
        v-model="confirmShow"
        @confirm="confirmShow = false"
        @cancel="confirmShow = false"
        showCancelButton
      >
        <strong slot="header">活动开启啦</strong>
        <div>你关注的活动已经开启，是否前往报名？</div>
      </VModal>

      <VModal v-transfer-dom v-model="alertShow" @confirm="alertShow = false">
        <strong slot="header">视频上传失败</strong>
        <div>网络已断开，请检查你的网络设置。</div>
      </VModal>
      <VModal v-transfer-dom v-model="customShow" :showConfirmButton="false">
        自定义
      </VModal>

      <h4>属性</h4>
      <VButton
        @click="$modal({ overlayClick: false, body: '点击遮罩层不关闭' })"
      >
        点击遮罩层不关闭
      </VButton>
      <VButton @click="$modal({ overlay: false, body: '无遮罩层' })">
        无遮罩层
      </VButton>
      <br />
      <br />
      <VButton
        @click="
          $modal({
            body: '修改按钮文案',
            showCancelButton: true,
            confirmText: 'Confirm',
            cancelText: 'Cancel'
          })
        "
      >
        按钮文案
      </VButton>
      <VButton @click="$modal({ body: '有头部', header: '提示' })">
        有头部
      </VButton>
      <br />
      <br />
      <VButton @click="loadingAction"> 等待操作完成 </VButton>
    </div>
  </div>
</template>

<script>
import VModal from 'muvc/modal'

export default {
  name: 'page-modal',
  components: {
    VModal
  },
  data() {
    return {
      confirmShow: false,
      alertShow: false,
      customShow: false
    }
  },
  methods: {
    loadingAction() {
      this.$modal({
        body: '确定后,等待2秒后关闭',
        overlayClick: false,
        showCancelButton: true,
        confirm(instance) {
          instance.confirmLoading = true
          setTimeout(() => {
            instance.done()
          }, 2000)
        }
      })
    }
  }
}
</script>
