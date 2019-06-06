<template>
  <div>
    <Navbar title="Virtual List" />
    <VirtualList
      :data="data"
      :itemSize="itemSize"
      :scrollOffset="46"
      ref="list"
    >
      <template v-slot="{ visibleData }">
        <div
          class="image-list-item v-bd-y-bottom"
          :style="{ height: itemSize + 'px' }"
          v-for="(item, index) in visibleData"
          :key="item.id"
        >
          <div class="image-list-item-inner">
            <div class="image-list-item-background">
              <span class="image-list-item-loading"> {{ item.floor }} </span>
              <VButton
                type="icon"
                class="image-list-item-delete"
                @click="showDeleteActionsheet(index)"
              >
                <img
                  src="../../assets/icon-delete.svg"
                  style="width:20px;height:20px;"
                />
              </VButton>
            </div>
          </div>
        </div>
      </template>
    </VirtualList>
    <Actionsheet
      v-transfer-dom
      describe="删除后不可恢复，确定要删除吗？"
      v-model="showDeleteMenus"
      :actions="deleteActions"
      @click="deleteHandler"
    />
  </div>
</template>

<script>
import VirtualList from 'vue-components/virtualList'
import Actionsheet from 'vue-components/actionsheet'

function getData(number) {
  const data = []
  for (let i = 1; i <= number; i++) {
    data.push({
      id: i,
      floor: '#' + i
    })
  }
  return data
}

export default {
  name: 'page-virtual-list',
  components: {
    VirtualList,
    Actionsheet
  },
  data() {
    return {
      itemSize: 175,
      data: Object.preventExtensions(getData(1000)),
      showDeleteMenus: false,
      deleteActions: [
        { name: '确定', type: 'warning', delete: true, loading: false },
        { name: '我再想想', type: 'primary' }
      ],
      deleteIndex: 0
    }
  },
  methods: {
    showDeleteActionsheet(index) {
      this.showDeleteMenus = true
      this.deleteIndex = index
    },
    deleteHandler(action) {
      if (action.delete) {
        this.$refs.list.remove(this.deleteIndex)
      }
      this.showDeleteMenus = false
    }
  }
}
</script>

<style lang="postcss">
@import './style.css';
</style>
