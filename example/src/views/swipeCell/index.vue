<template>
  <div>
    <Navbar title="SwipeCell" />
    <Notice title="用移动设备查看" />
    <Group title="默认">
      <SwipeCell @cancel="cancelHandler">
        <template slot="title">
          <div>左右可滑动</div>
          <div class="swipe-cell__describe">左滑取消删除，右滑回复</div>
        </template>
        <template slot="left">
          <div
            class="v-swipe-cell__item"
            style="color: #fff;background-color: #2196f3;"
          >
            回复
          </div>
        </template>
      </SwipeCell>
      <SwipeCell cancelText="">
        <template slot="title">
          <div>左滑</div>
          <div class="swipe-cell__describe">左滑删除</div>
        </template>
      </SwipeCell>
      <SwipeCell deleteText="" @cancel="cancelHandler">
        <template slot="title">
          <div>左滑</div>
          <div class="swipe-cell__describe">左滑取消</div>
        </template>
      </SwipeCell>
    </Group>

    <Group title="自定义内容">
      <SwipeCell title="右侧自定义">
        <template slot="right">
          <div
            class="v-swipe-cell__item"
            style="color: #fff;background-color: pink;"
          >
            置顶
          </div>
        </template>
      </SwipeCell>
      <SwipeCell deleteText="" cancelText="" title="左侧自定义">
        <div style="background-color: white;" slot="left">
          <VButton type="icon">
            <img
              src="../../assets/icon-delete.svg"
              style="width:20px;height:20px;"
            />
          </VButton>
        </div>
      </SwipeCell>
    </Group>

    <Group title="自定义确认删除">
      <SwipeCell
        v-for="(item, index) in items"
        :key="item"
        :value="item"
        isLink
        confirmDeleteText=""
        @cancel="cancelHandler"
        @delete="deleteHandler(index)"
      >
        <template slot="title">
          <div>左滑</div>
          <div class="swipe-cell__describe">左滑删除</div>
        </template>
      </SwipeCell>
    </Group>

    <ActionSheet
      describe="删除后不可恢复，确定要删除吗？"
      :actions="deleteActions"
      v-transfer-dom
      v-model="showDeleteMenus"
      @click="confirmDelete"
    />
  </div>
</template>

<script>
import Group from 'vue-components/cell/group'
import SwipeCell from 'vue-components/swipeCell'
import ActionSheet from 'vue-components/actionsheet'
import Notice from 'vue-components/notice'

export default {
  name: 'page-swipe-cell',
  components: {
    Group,
    SwipeCell,
    ActionSheet,
    Notice
  },
  data() {
    return {
      items: [1, 2, 3],
      deleteIndex: 0,
      showDeleteMenus: false,
      deleteActions: [{ name: '删除', type: 'warning', delete: true }]
    }
  },
  methods: {
    deleteHandler(index) {
      this.deleteIndex = index
      this.showDeleteMenus = true
    },
    cancelHandler(close) {
      close()
    },
    confirmDelete(action) {
      if (action.delete) {
        this.items.splice(this.deleteIndex, 1)
      }
      this.showDeleteMenus = false
    }
  }
}
</script>

<style lang="postcss">
.swipe-cell__describe {
  color: var(--textRegular);
  font-size: 14px;
}
</style>
