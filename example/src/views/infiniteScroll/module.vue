<template>
  <InfiniteScroll
    class="infinite-scroll"
    v-model="loading"
    :empty="empty"
    :failed="failed"
    :finished="finished"
    waveColor="#f0eff5"
    @load="load"
    @refresh="refresh"
  >
    <transition-group class="app__items" tag="ul" :name="transitionName">
      <Card tag="li" v-for="item in items" :key="item.id" :item="item" />
    </transition-group>
  </InfiniteScroll>
</template>

<script>
import Card from 'lvan/card/c2'
import InfiniteScroll from 'lvan/infiniteScroll'
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
      page: 0,
      size: 15
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
            this.query.page = query.page
          } else {
            // 下拉刷新
            this.transitionName = ''
            this.items = records
            this.query.page = 1
          }
          // 没有数据
          this.empty = !total
          // 是否为最后一页
          this.finished = query.page >= pages
        })
        .catch(this.failure)
    },
    load(done) {
      this.fetchData({
        ...this.query,
        page: this.query.page + 1
      }).then(done)
    },
    refresh(done) {
      this.fetchData({ ...this.query, page: 1 }).then(done)
    },
    failure() {
      this.failed = true
    }
  }
}
</script>

<style lang="postcss">
.infinite-scroll {
  padding-bottom: 10px;
  color: var(--textRegular);
}
</style>
