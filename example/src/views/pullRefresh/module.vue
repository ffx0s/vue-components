<template>
  <PullRefresh v-model="loading" @refresh="refresh" :failed="failed">
    <transition-group class="items" tag="ul" name="item">
      <li class="item" v-for="item in items" :key="item.id">
        {{ item.value }}
      </li>
    </transition-group>
  </PullRefresh>
</template>

<script>
import PullRefresh from 'vue-components/pullRefresh'

function getItems() {
  return new Promise(resolve => {
    let count = 10
    const data = []
    while (count--) {
      data.push({ id: count, value: (Math.random() * 100).toFixed(0) })
    }
    setTimeout(() => resolve(data), ~~(Math.random() * 100 + 300))
  })
}

export default {
  components: {
    PullRefresh
  },
  data() {
    return {
      items: [],
      loading: true,
      failed: false
    }
  },
  methods: {
    fetchData() {
      this.failed = false
      return getItems().catch(this.failure)
    },
    async refresh(done) {
      const data = await this.fetchData()
      this.items = data
      done()
    },
    failure() {
      this.failed = true
    }
  }
}
</script>
