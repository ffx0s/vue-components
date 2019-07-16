<template>
  <div>
    <Navbar title="Virtual List" />
    <VirtualList
      :data="data"
      :itemSize="200"
      :itemSizeGetter="itemSizeGetter"
      :scrollOffset="46"
      ref="list"
    >
      <template v-slot="{ visibleData }">
        <div
          class="virtual-list v-bd-bottom"
          v-for="(item, index) in visibleData"
          :key="item.id"
          :style="{
            height: item.height + 'px'
          }"
        >
          <div class="virtual-list__inner">
            <div class="virtual-list__background">
              <span class="virtual-list__loading">{{ item.floor }}</span>
              <VButton
                type="icon"
                class="virtual-list__delete"
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
import VirtualList from 'muvc/virtualList/variable'
import Actionsheet from 'muvc/actionsheet'

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getData(number) {
  const data = []
  for (let i = 1; i <= number; i++) {
    data.push({
      id: i,
      floor: '#' + i,
      height: getRandomIntInclusive(100, 300)
    })
  }
  return data
}

export default {
  name: 'page-virtual-list-variable',
  components: {
    VirtualList,
    Actionsheet
  },
  data() {
    return {
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
    itemSizeGetter(item) {
      return item.height
    },
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
