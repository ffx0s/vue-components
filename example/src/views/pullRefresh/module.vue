<template>
  <PullRefresh
    v-model="loading"
    @refresh="refresh"
    :failed="failed"
    backgroundColor="#f0eff5"
  >
    <transition-group class="items" tag="ul" :name="transitionName">
      <Card tag="li" v-for="item in items" :key="item.id" :item="item" />
    </transition-group>
  </PullRefresh>
</template>

<script>
import Card from 'vue-components/card/c3'
import PullRefresh from 'vue-components/pullRefresh'
import { getComments } from '../../api/product'

export default {
  components: {
    Card,
    PullRefresh
  },
  data() {
    return {
      items: [],
      loading: true,
      failed: false,
      transitionName: ''
    }
  },
  methods: {
    fetchData() {
      const productId = 110
      return getComments(productId)
        .then(data => {
          this.items = data.records
        })
        .catch(this.failure)
    },
    async refresh(done) {
      this.failed = false
      this.transitionName = this.items.length ? '' : 'item'
      await this.fetchData()
      done()
    },
    failure() {
      this.failed = true
    }
  }
}
</script>
