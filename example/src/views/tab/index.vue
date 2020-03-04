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
    <Tab v-model="index" navbar>
      <TabItem title="Skeleton" lazy>
        <SkeletonModule v-model="loading" />
      </TabItem>
      <TabItem title="ImgViewer" lazy>
        <ImageViewerModule />
      </TabItem>
      <TabItem title="InfiniteScroll" lazy>
        <InfiniteScrollModule />
      </TabItem>
      <TabItem title="PullRefresh" lazy>
        <PullRefreshModule />
      </TabItem>
      <TabItem title="Swipe" lazy> <SwipeModule /> </TabItem>
    </Tab>
  </div>
</template>

<script>
import Tab from 'lvan/tab'
import TabItem from 'lvan/tab/item'
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
    Tab,
    TabItem,
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
