<template>
  <div>
    <Navbar title="Tab">
      <VButton
        @click="$router.push({ name: 'tab2' })"
        slot="right"
        type="primary"
        text
      >
        TabView
      </VButton>
    </Navbar>
    <Tabs v-model="index" navbar>
      <Tab title="Skeleton" lazy>
        <SkeletonModule v-model="loading" />
      </Tab>
      <Tab title="ImgViewer" lazy>
        <ImageViewerModule />
      </Tab>
      <Tab title="InfiniteScroll" lazy>
        <InfiniteScrollModule />
      </Tab>
      <Tab title="PullRefresh" lazy>
        <PullRefreshModule />
      </Tab>
      <Tab title="Swipe" lazy> <SwipeModule /> </Tab>
    </Tabs>
  </div>
</template>

<script>
import Tabs from 'muvc/tab/tabs'
import Tab from 'muvc/tab/item'
import InfiniteScrollModule from '../infiniteScroll/module'
import PullRefreshModule from '../pullRefresh/module'
import SwipeModule from '../swipe/module'
import ImageViewerModule from '../imageViewer/module'
import SkeletonModule from '../skeleton/module'
import showModal from '../../mixins/showModal'

export default {
  name: 'page-tab',
  mixins: [showModal],
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
