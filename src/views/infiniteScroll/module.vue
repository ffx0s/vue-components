<template>
  <InfiniteScroll
    class="page-infinite-scroll"
    v-model="loading"
    :empty="empty"
    :failed="failed"
    :finished="finished"
    @load="load"
    @refresh="refresh"
  >
    <transition-group class="items" tag="ul" name="item">
      <li class="item" v-for="item in items" :key="item.id">
        {{ item.value }}
      </li>
    </transition-group>
  </InfiniteScroll>
</template>

<script>
import InfiniteScroll from '../../components/infiniteScroll'

let count = 0

function getUsers(query) {
  return new Promise(resolve => {
    const data = { records: [], pages: 3, total: 45 }
    let nums = 0
    if (query.offset === 1) {
      count = 0
    }
    while (nums < query.limit) {
      nums++
      count++
      data.records.push({ id: count, value: count })
    }
    setTimeout(() => resolve(data), ~~(Math.random() * 100 + 500))
  })
}

export default {
  components: {
    InfiniteScroll
  },
  data() {
    return {
      items: [],
      query: {
        offset: 1,
        limit: 15
      },
      loading: true,
      finished: false,
      failed: false,
      empty: false
    }
  },
  methods: {
    fetchData() {
      this.failed = false
      return getUsers(this.query)
        .then(({ records, pages, total }) => {
          // loading 为真的时候是加载更多，否则为下拉刷新操作
          this.items = this.loading ? this.items.concat(records) : records
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
    }
  }
}
</script>

<style>
.page-infinite-scroll {
  padding-bottom: 10px;
}
</style>
