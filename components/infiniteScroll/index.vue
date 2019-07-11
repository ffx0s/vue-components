<template>
  <WithScroll :onscroll="update" rAF>
    <component
      v-bind="$attrs"
      :is="pullRefresh ? 'PullRefresh' : 'div'"
      :failed="failed"
      :disabled="isLoading"
      v-model="refreshing"
      @refresh="refresh"
    >
      <div class="v-infinite-scroll" ref="container"><slot /></div>
      <div :class="footerClass">
        <!-- 加载中 -->
        <div :class="loadingClass" v-show="value">
          <slot name="loading">
            <Loading class="v-infinite-scroll__loading" size="32" />
          </slot>
        </div>
        <!-- 全部加载完成 -->
        <div :class="finishedClass" v-show="finished && !empty">
          <slot name="finished">全部加载完成</slot>
        </div>
        <!-- 空空如也 -->
        <div :class="emptyClass" v-show="empty">
          <slot name="empty">空空如也</slot>
        </div>
        <!-- 加载失败 -->
        <div :class="failedClass" v-show="failed && !finished" @click="load">
          <slot name="failed">加载失败,点击重试</slot>
        </div>
      </div>
    </component>
  </WithScroll>
</template>

<script>
import PullRefresh from '../pullRefresh'
import Loading from '../loading'
import WithScroll from '../withScroll'
import { view } from '../utils/shared'

export default {
  name: 'InfiniteScroll',
  inheritAttrs: false,
  components: {
    WithScroll,
    PullRefresh,
    Loading
  },
  props: {
    // 加载中
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
    // 距离底部的偏移量，小于时触发加载
    offset: {
      type: Number,
      default: 300
    },
    // 是否需要下拉刷新功能
    pullRefresh: {
      type: Boolean,
      default: true
    },
    footerClass: {
      type: String,
      default: 'v-infinite-scroll__footer'
    },
    loadingClass: {
      type: String,
      default: ''
    },
    finishedClass: {
      type: String,
      default: ''
    },
    emptyClass: {
      type: String,
      default: 'v-infinite-scroll__empty'
    },
    failedClass: {
      type: String,
      default: ''
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
  methods: {
    update() {
      if (this.shouldLoadMore()) {
        this.load()
      }
    },
    shouldLoadMore() {
      if (this.finished || this.value || this.failed) return false
      const bottom = this.$refs.container.getBoundingClientRect().bottom
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
.v-infinite-scroll__footer {
  width: 100%;
  min-height: 52px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.v-infinite-scroll__empty {
  min-height: 400px;
  display: flex;
  align-items: center;
}
.v-infinite-scroll__loading {
  color: var(--textSecondary);
}
</style>
