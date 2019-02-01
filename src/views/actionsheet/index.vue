<template>
  <div>
    <Navbar title="Actionsheet" />
    <div class="page-spacing">
      <h4>类型</h4>
      <VButton @click="showUploadMenus = true">默认</VButton>
      <VButton @click="showCustomMenus = true">自定义</VButton>

      <Actionsheet
        v-transfer-dom
        v-model="showUploadMenus"
        :actions="actions"
      />
      <Actionsheet v-transfer-dom v-model="showCustomMenus" title="分享到">
        <div class="share-actionsheet">
          <i class="share-item weixin"></i> <i class="share-item friend"></i>
          <i class="share-item qq"></i> <i class="share-item weibo"></i>
        </div>
      </Actionsheet>
      <Actionsheet
        v-transfer-dom
        v-model="showAlignMenus"
        :actions="actions"
        align="left"
        cancelText=""
      />
      <Actionsheet
        v-transfer-dom
        v-model="showHeaderMenus"
        title="上传图片"
        describe="请上传小于2M的图片"
        :actions="actions"
      />
      <Actionsheet
        v-transfer-dom
        v-model="showDisabledMenus"
        :actions="disabledActions"
      />
      <Actionsheet
        v-transfer-dom
        describe="删除后不可恢复，确定要删除吗？"
        v-model="showDeleteMenus"
        :actions="deleteActions"
        @click="deleteHandler"
      />

      <h4>属性</h4>
      <VButton @click="showAlignMenus = true"> 左对齐 </VButton>
      <VButton @click="showHeaderMenus = true"> 有头部和描述 </VButton>
      <br />
      <br />
      <VButton @click="showDisabledMenus = true"> 禁用 </VButton>
      <VButton @click="showDeleteMenus = true"> 颜色 </VButton>
    </div>
  </div>
</template>

<script>
import Actionsheet from '../../components/actionsheet'
export default {
  name: 'page-actionsheet',
  components: {
    Actionsheet
  },
  data() {
    return {
      showUploadMenus: false,
      actions: [{ name: '拍照' }, { name: '从相册选择' }],
      disabledActions: [
        { name: '拍照' },
        { name: '从相册选择', type: 'disabled' }
      ],
      deleteActions: [
        { name: '确定', type: 'warning', delete: true, loading: false },
        { name: '我再想想', type: 'primary' }
      ],
      showCustomMenus: false,
      showAlignMenus: false,
      showHeaderMenus: false,
      showDisabledMenus: false,
      showDeleteMenus: false
    }
  },
  methods: {
    alignLeft() {
      this.showUploadMenus = true
      this.align = 'left'
    },
    deleteHandler(action) {
      if (action.delete) {
        action.loading = true
      } else {
        this.showDeleteMenus = false
      }
    }
  }
}
</script>

<style lang="postcss">
.share-actionsheet {
  display: flex;
  padding: 14px 12px;
  background-color: #fff;
}
.share-item {
  text-align: center;
  flex: 1;
  height: 46px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 100%;
}
.weixin {
  background-image: url('./images/share-wx.svg');
}
.friend {
  background-image: url('./images/share-tl.svg');
}
.qq {
  background-image: url('./images/share-qq.svg');
}
.weibo {
  background-image: url('./images/share-wb.svg');
}
</style>
