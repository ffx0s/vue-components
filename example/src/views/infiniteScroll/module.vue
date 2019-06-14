<template>
  <InfiniteScroll
    class="page-infinite-scroll"
    v-model="loading"
    :empty="empty"
    :failed="failed"
    :finished="finished"
    backgroundColor="#f0eff5"
    @load="load"
    @refresh="refresh"
  >
    <transition-group class="items" tag="ul" :name="transitionName">
      <Card tag="li" v-for="item in items" :key="item.id" :item="item" />
    </transition-group>
  </InfiniteScroll>
</template>

<script>
import Card from 'vue-components/card/c2'
import InfiniteScroll from 'vue-components/infiniteScroll'
import { getProducts } from '../../api/product'

export default {
  components: {
    Card,
    InfiniteScroll
  },
  data() {
    return {
      items: [],
      loading: true,
      finished: false,
      failed: false,
      empty: false,
      transitionName: 'item'
    }
  },
  created() {
    this.query = {
      offset: 0,
      limit: 15
    }
  },
  methods: {
    fetchData(query) {
      this.failed = false
      return getProducts(query)
        .then(({ records, pages, total }) => {
          if (this.loading) {
            // 加载更多
            this.transitionName = 'item'
            this.items = this.items.concat(records)
            this.query.offset = query.offset
          } else {
            // 下拉刷新
            this.transitionName = ''
            this.items = records
            this.query.offset = 1
          }
          // 没有数据
          this.empty = !total
          // 是否为最后一页
          this.finished = query.offset >= pages
        })
        .catch(this.failure)
    },
    load(done) {
      this.fetchData({
        ...this.query,
        offset: this.query.offset + 1
      }).then(done)
    },
    refresh(done) {
      this.fetchData({ ...this.query, offset: 1 }).then(done)
    },
    failure() {
      this.failed = true
    }
  }
}
</script>

<style lang="postcss">
.page-infinite-scroll {
  padding-bottom: 10px;
}
</style>
