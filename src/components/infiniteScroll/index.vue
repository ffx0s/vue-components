<template>
  <component
    :is="pullRefresh ? 'PullRefresh' : 'div'"
    :failed="failed"
    :disabled="isLoading"
    ref="pullRefresh"
    v-model="refreshing"
    @refresh="refresh"
  >
    <div class="v-infinite-scroll" ref="container"><slot /></div>
    <!-- 加载中 -->
    <div class="v-infinite-scroll-footer" v-show="value">
      <slot name="loading">
        <Loading class="v-infinite-scroll-loading" size="32" />
      </slot>
    </div>
    <!-- 全部加载完成 -->
    <div class="v-infinite-scroll-footer" v-show="finished && !empty">
      <slot name="finished">全部加载完成</slot>
    </div>
    <!-- 空空如也 -->
    <div class="v-infinite-scroll-footer" v-show="empty">
      <slot name="empty">
        <div class="v-infinite-scroll-empty">空空如也</div>
      </slot>
    </div>
    <!-- 加载失败 -->
    <div class="v-infinite-scroll-footer" v-show="failed" @click="load">
      <slot name="failed">加载失败,点击重试</slot>
    </div>
  </component>
</template>

<script>
import PullRefresh from '../../components/pullRefresh'
import Loading from '../../components/loading'
import Debouncer from '../../utils/debouncer'
import {
  addListener,
  removeListener,
  getScrollEventTarget,
  view
} from '../../utils/shared'

export default {
  name: 'InfiniteScroll',
  components: {
    PullRefresh,
    Loading
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    // 加载完成 (不再滚动触发加载数据)
    finished: {
      type: Boolean,
      default: false
    },
    // 加载失败
    failed: {
      type: Boolean,
      default: false
    },
    // 首次加载时没有数据的状态
    empty: {
      type: Boolean,
      default: false
    },
    offset: {
      type: Number,
      default: 300
    },
    // 是否内置下拉刷新功能
    pullRefresh: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      refreshing: false,
      isLoading: false
    }
  },
  watch: {
    value: {
      handler: function(value) {
        value && this.load()
      },
      immediate: true
    }
  },
  mounted() {
    this.bind()
  },
  activated() {
    this.bind()
  },
  deactivated() {
    this.unbind()
  },
  beforeDestroy() {
    this.unbind()
  },
  methods: {
    bind() {
      if (this.isBind) return
      this.$nextTick(() => {
        this.onscroll = new Debouncer(this.scrollHandler)
        this.scrollEl = this.pullRefresh
          ? this.$refs.pullRefresh.scrollEl
          : getScrollEventTarget(this.$el)
        this.container = this.$refs.container
        addListener(this.scrollEl, 'scroll', this.onscroll)
      })
      this.isBind = true
    },
    unbind() {
      removeListener(this.scrollEl, 'scroll', this.onscroll)
      this.isBind = false
      this.scrollEl = null
      this.container = null
      this.onscroll = null
    },
    scrollHandler() {
      if (this.shouldLoadMore()) {
        this.load()
      }
    },
    shouldLoadMore() {
      if (this.finished || this.value || this.failed) return false
      const bottom = this.container.getBoundingClientRect().bottom
      return bottom - view.height() <= this.offset
    },
    load() {
      if (this.finished) {
        this.done()
        return
      }
      // 保证有序加载，同一时间只执行一个操作
      if (this.isLoading || this.refreshing) return
      this.isLoading = true
      this.$emit('input', true)
      this.$emit('load', this.done)
    },
    refresh(done) {
      this.$emit('refresh', done)
    },
    done() {
      this.$nextTick(() => {
        this.$emit('input', false)
        this.isLoading = false
      })
    }
  }
}
</script>

<style lang="postcss">
.v-infinite-scroll-footer {
  width: 100%;
  height: 50px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.v-infinite-scroll-empty {
  min-height: 400px;
  display: flex;
  align-items: center;
}
.v-infinite-scroll-loading {
  color: var(--textSecondary);
}
</style>
