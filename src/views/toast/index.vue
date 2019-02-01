<template>
  <div>
    <Navbar title="Toast" />
    <div class="page-spacing">
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

      <h4>自定义图标</h4>
      <VButton @click="iconToastShow = true">自定义图标</VButton>
      <Toast type="icon" v-model="iconToastShow" title="失败">
        <svg
          slot="icon"
          viewBox="0 0 1024 1024"
          style="color:white;width: 45px;height: 45px;"
        >
          <path
            d="M512.162194 956.234617c-245.843174 0-445.104427-199.334931-445.104427-445.119777 0-245.901503 199.261253-445.105451 445.104427-445.105451 245.844198 0 445.106474 199.203948 445.106474 445.105451C957.268668 756.899686 758.006392 956.234617 512.162194 956.234617zM512.162194 129.594567c-210.362079 0-381.504924 171.142845-381.504924 381.520273 0 210.391754 171.142845 381.520273 381.504924 381.520273 210.393801 0 381.505947-171.128519 381.505947-381.520273C893.668141 300.737412 722.555995 129.594567 512.162194 129.594567zM511.960603 362.712929c-16.755616 0-30.553876-5.02955-41.597397-15.219633-10.92891-10.130731-16.376992-22.652929-16.376992-37.566594 0-15.349593 5.390777-27.756157 16.261359-37.437657 10.870582-9.565866 24.841781-14.421454 41.714054-14.421454 17.420765 0 31.56695 4.971222 42.264593 14.769378 10.781554 9.841136 16.116049 22.189372 16.116049 37.089733 0 15.0733-5.450129 27.683503-16.379039 37.683251C542.97599 357.683379 529.004791 362.712929 511.960603 362.712929zM561.411875 764.16209l-99.977016 0L461.434859 420.774299l99.977016 0L561.411875 764.16209z"
            fill="currentColor"
          />
        </svg>
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
import Toast from '../../components/toast'

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
