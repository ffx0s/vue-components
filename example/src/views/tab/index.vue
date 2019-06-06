<template>
  <div>
    <Navbar title="Tab" />
    <Tabs class="demo-tab" v-model="index">
      <Tab class="demo-tab-item" title="LoadMore" lazy>
        <InfiniteScrollModule />
      </Tab>
      <Tab class="demo-tab-item" title="PullRefresh" lazy>
        <PullRefreshModule />
      </Tab>
      <Tab class="demo-tab-item" title="Swipe" lazy> <SwipeModule /> </Tab>
      <Tab class="demo-tab-item" title="ImgViewer"> <ImageViewerModule /> </Tab>
      <Tab class="demo-tab-item" title="Tab5">
        <ul class="items">
          <li>Tab5</li>
        </ul>
      </Tab>
      <Tab class="demo-tab-item" title="Tab6">
        <ul class="items">
          <li>Tab6</li>
        </ul>
      </Tab>
      <Tab lazy class="demo-tab-item" title="Tab7">
        <ul class="items">
          <li>Tab7</li>
        </ul>
      </Tab>
      <Tab class="demo-tab-item" title="Tab8">
        <ul class="items">
          <li>Tab8</li>
        </ul>
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

export default {
  name: 'page-tab',
  components: {
    Tabs,
    Tab,
    InfiniteScrollModule,
    PullRefreshModule,
    SwipeModule,
    ImageViewerModule
  },
  data() {
    return {
      index: 0
    }
  }
}
</script>

<style lang="postcss">
.demo-tab {
  position: absolute;
  top: 46px;
  bottom: 0;
  width: 100%;
  height: auto;
}
.demo-tab-item {
  & .items {
    margin-top: 10px;
  }
}
</style>
