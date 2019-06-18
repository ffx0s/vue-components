<template>
  <div>
    <Navbar title="Tab" />
    <Tabs v-model="index">
      <Tab class="demo-tab-item" title="InfiniteScroll" lazy>
        <InfiniteScrollModule />
      </Tab>
      <Tab class="demo-tab-item" title="PullRefresh" lazy>
        <PullRefreshModule />
      </Tab>
      <Tab class="demo-tab-item" title="Swipe" lazy> <SwipeModule /> </Tab>
      <Tab class="demo-tab-item" title="ImgViewer" lazy>
        <ImageViewerModule />
      </Tab>
      <Tab class="demo-tab-item" title="Skeleton" lazy>
        <SkeletonModule v-model="loading" />
      </Tab>
    </Tabs>
  </div>
</template>

<script>
import Tabs from 'vue-components/tab/tabs'
import Tab from 'vue-components/tab/item'
import InfiniteScrollModule from '../infiniteScroll/module'
import PullRefreshModule from '../pullRefresh/module'
import SwipeModule from '../swipe/module'
import ImageViewerModule from '../imageViewer/module'
import SkeletonModule from '../skeleton/module'

export default {
  name: 'page-tab',
  components: {
    Tabs,
    Tab,
    InfiniteScrollModule,
    PullRefreshModule,
    SwipeModule,
    ImageViewerModule,
    SkeletonModule
  },
  data() {
    return {
      index: 0,
      loading: true
    }
  }
}
</script>

<style lang="postcss">
.demo-tab-item {
  & .items {
    margin-top: 10px;
  }
}
</style>
