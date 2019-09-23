<template>
  <div>
    <Navbar title="Virtual List" />
    <InfiniteScroll
      v-model="loading"
      :empty="empty"
      :failed="failed"
      :finished="finished"
      @load="load"
      @refresh="refresh"
    >
      <VirtualList
        :data="items"
        :scrollOffset="46"
        :multiple="3"
        :itemSize="450"
        :itemSizeGetter="itemSizeGetter"
        ref="virtualList"
        tag="ul"
        class="virtual-list"
      >
        <template v-slot="{ visibleData, getVisibleItemRect }">
          <li
            class="virtual-list__item virtual-list__absolute"
            v-for="(item, index) in visibleData"
            :key="item.id"
            :style="{
              transform:
                'translateY(' + getVisibleItemRect(index).offset + 'px)',
              height: getVisibleItemRect(index).size + 'px'
            }"
          >
            <div class="virtual-list__inner">
              <span class="virtual-list__loading">
                {{ item.floor }} Loading...
              </span>
              <div class="virtual-list__background">
                <img class="virtual-list__img" :src="item.imgSrc" />
              </div>
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
          </li>
        </template>
      </VirtualList>
    </InfiniteScroll>
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
import InfiniteScroll from 'lvan/infiniteScroll'
import VirtualList from 'lvan/virtualList/variable'
import Actionsheet from 'lvan/actionsheet'
import { view } from 'lvan/utils/shared'

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

let count = 0

function getUsers(query) {
  return new Promise(resolve => {
    const data = { records: [], pages: 3, total: 45 }
    let nums = 0
    if (query.offset === 1) {
      count = 0
    }
    while (nums < query.limit) {
      const imgWidth = getRandomIntInclusive(1000, 500)
      const imgHeight = getRandomIntInclusive(100, 800)
      nums++
      count++
      data.records.push({
        id: count,
        floor: '#' + count,
        imgWidth,
        imgHeight,
        imgSrc: `https://dummyimage.com/${imgWidth}x${imgHeight}/c7c7c7`
      })
    }
    setTimeout(() => resolve(data), ~~(Math.random() * 1000 + 500))
  })
}

export default {
  name: 'page-virtual-list-loadmore',
  components: {
    InfiniteScroll,
    VirtualList,
    Actionsheet
  },
  data() {
    return {
      items: Object.preventExtensions([]),
      query: {
        offset: 1,
        limit: 15
      },
      loading: true,
      finished: false,
      failed: false,
      empty: false,
      showDeleteMenus: false,
      deleteActions: [
        { name: '确定', type: 'warning', delete: true, loading: false },
        { name: '我再想想', type: 'primary' }
      ],
      deleteIndex: 0
    }
  },
  methods: {
    fetchData() {
      this.failed = false
      return getUsers(this.query)
        .then(({ records, pages, total }) => {
          // loading 为真的时候是加载更多，否则为下拉刷新操作
          let clearCache
          if (this.loading) {
            this.items = Object.preventExtensions(this.items.concat(records))
          } else {
            this.items = Object.preventExtensions(records)
            clearCache = true
          }
          this.$refs.virtualList.reload(clearCache)
          // 没有数据
          this.empty = !total
          // 是否为最后一页
          this.finished = this.query.offset >= pages
          this.query.offset++
        })
        .catch(this.failure)
    },
    load(done) {
      this.fetchData().then(done)
    },
    refresh(done) {
      this.query.offset = 1
      this.fetchData().then(done)
    },
    failure() {
      this.failed = true
    },
    itemSizeGetter(item) {
      return (view.width() - 10) / (item.imgWidth / item.imgHeight)
    },
    showDeleteActionsheet(index) {
      this.showDeleteMenus = true
      this.deleteIndex = index
    },
    deleteHandler(action) {
      if (action.delete) {
        this.$refs.virtualList.remove(this.deleteIndex)
      }
      this.showDeleteMenus = false
    }
  }
}
</script>

<style lang="postcss">
@import './style.css';
.virtual-list__absolute {
  position: absolute;
  top: 0;
  left: 0;
  will-change: transform;
}
</style>
