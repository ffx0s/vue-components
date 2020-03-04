<template>
  <div>
    <Navbar title="Button" />
    <div class="app--spacing">
      <h4>大小</h4>
      <VButton large>大号按钮</VButton>
      <VButton>默认大小</VButton>
      <VButton small>小号按钮</VButton>

      <h4>类型</h4>
      <VButton>默认</VButton>
      <VButton type="primary">主要</VButton>
      <VButton type="success">成功</VButton>
      <VButton type="error">出错</VButton>
      <div class="button__span"></div>
      <VButton type="warning">警告</VButton>

      <h4>禁用状态</h4>
      <VButton disabled type="primary">主要</VButton>
      <VButton disabled type="success">成功</VButton>
      <VButton disabled type="error">出错</VButton>
      <VButton disabled type="warning">警告</VButton>

      <h4>轮廊</h4>
      <VButton outline type="primary">主要</VButton>
      <VButton outline type="success">成功</VButton>
      <VButton outline type="error">出错</VButton>
      <VButton outline type="warning">警告</VButton>
      <br />
      <br />
      <VButton outline fill type="primary">主要</VButton>
      <VButton outline fill type="success">成功</VButton>
      <VButton outline fill type="error">出错</VButton>
      <VButton outline fill type="warning">警告</VButton>

      <h4>加载中</h4>
      <VButton loading type="primary">默认加载</VButton>
      <VButton :loading="loading" type="success" @click="loading = true">
        点击加载
        <div slot="loading">加载中...</div>
      </VButton>
      <div class="button__span"></div>
      <VButton :loading="loading" type="error">
        自定义加载
        <div slot="loading">Loading...</div>
      </VButton>

      <p>
        延迟加载，响应慢时才显示 loading，响应快则不显示，避免状态切换导致闪烁。
      </p>
      <VButton
        @click="fast"
        :loading="loading2"
        :loadingDelay="200"
        type="warning"
      >
        响应快
      </VButton>
      <VButton
        @click="slow"
        :loadingDelay="200"
        :loading="loading3"
        type="error"
      >
        响应慢
      </VButton>

      <h4>块级按钮</h4>
      <VButton block type="primary">主要</VButton>

      <h4>图标按钮</h4>
      <VButton type="icon">
        <img
          src="../../assets/images/icon-delete.svg"
          style="width:20px;height:20px;"
        />
      </VButton>
      <VButton type="icon">
        <svg viewBox="0 0 1024 1024" style="width:20px;height:20px;">
          <path
            d="M312.4 488.624L668.8 152.976a29.36 29.36 0 0 1 42.352 0 31.408 31.408 0 0 1 0 43.552L376.24 512l334.912 315.36a31.408 31.408 0 0 1 0 43.552 29.36 29.36 0 0 1-42.352 0L312.4 535.264a36.32 36.32 0 0 1 0-46.64z"
            fill="currentColor"
          />
        </svg>
      </VButton>

      <h4>纯文字按钮</h4>
      <VButton text>默认</VButton>
      <VButton text type="primary">主要</VButton>
      <VButton text large type="success">成功</VButton>
      <VButton text small type="warning">警告</VButton>

      <h4>圆角按钮</h4>
      <VButton radius>默认</VButton>
      <VButton radius outline type="primary">主要</VButton>
      <VButton radius outline fill type="success">成功</VButton>
      <VButton radius type="error">出错</VButton>
      <div class="button__span"></div>
      <VButton radius type="warning">警告</VButton>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page-button',
  data() {
    return {
      loading: false,
      loading2: false,
      loading3: false
    }
  },
  methods: {
    fast() {
      this.loading2 = true
      setTimeout(() => {
        this.loading2 = false
      }, 200)
    },
    slow() {
      this.loading3 = true
      setTimeout(() => {
        this.loading3 = false
      }, 1000)
    }
  }
}
</script>

<style lang="postcss">
.button__span {
  padding-top: 10px;
}
</style>
