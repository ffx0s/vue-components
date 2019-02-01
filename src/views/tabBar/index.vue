<template>
  <div>
    <Navbar title="TabBar" />
    <h4 class="text-center">默认</h4>
    <TabBar v-model="index">
      <TabBarItem title="聊天" iconClass="far fa-comment" badge="2" />
      <TabBarItem title="联系人" iconClass="far fa-address-book" />
      <TabBarItem title="收藏夹" iconClass="far fa-star" />
      <TabBarItem title="礼物">
        <svg slot="icon" viewBox="0 0 1024 1024">
          <path
            d="M880 310H732.4c13.6-21.4 21.6-46.8 21.6-74 0-76.1-61.9-138-138-138-41.4 0-78.7 18.4-104 47.4-25.3-29-62.6-47.4-104-47.4-76.1 0-138 61.9-138 138 0 27.2 7.9 52.6 21.6 74H144c-17.7 0-32 14.3-32 32v200c0 4.4 3.6 8 8 8h40v344c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V550h40c4.4 0 8-3.6 8-8V342c0-17.7-14.3-32-32-32z m-334-74c0-38.6 31.4-70 70-70s70 31.4 70 70-31.4 70-70 70h-70v-70z m-138-70c38.6 0 70 31.4 70 70v70h-70c-38.6 0-70-31.4-70-70s31.4-70 70-70zM180 482V378h298v104H180z m48 68h250v308H228V550z m568 308H546V550h250v308z m48-376H546V378h298v104z"
            fill="currentColor"
          />
        </svg>
      </TabBarItem>
    </TabBar>
    <br />
    <br />
    <h4 class="text-center">自定义颜色</h4>
    <TabBar
      class="page-tabbar-color"
      activeClass="page-tabbar-color-active"
      v-model="index"
    >
      <TabBarItem
        class="page-tabbar-color-item"
        title="聊天"
        iconClass="far fa-comment"
        badge="2"
      />
      <TabBarItem
        class="page-tabbar-color-item"
        title="联系人"
        iconClass="far fa-address-book"
      />
      <TabBarItem
        class="page-tabbar-color-item"
        title="收藏夹"
        iconClass="far fa-star"
      />
      <TabBarItem class="page-tabbar-color-item" title="礼物">
        <svg slot="icon" viewBox="0 0 1024 1024">
          <path
            d="M880 310H732.4c13.6-21.4 21.6-46.8 21.6-74 0-76.1-61.9-138-138-138-41.4 0-78.7 18.4-104 47.4-25.3-29-62.6-47.4-104-47.4-76.1 0-138 61.9-138 138 0 27.2 7.9 52.6 21.6 74H144c-17.7 0-32 14.3-32 32v200c0 4.4 3.6 8 8 8h40v344c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V550h40c4.4 0 8-3.6 8-8V342c0-17.7-14.3-32-32-32z m-334-74c0-38.6 31.4-70 70-70s70 31.4 70 70-31.4 70-70 70h-70v-70z m-138-70c38.6 0 70 31.4 70 70v70h-70c-38.6 0-70-31.4-70-70s31.4-70 70-70zM180 482V378h298v104H180z m48 68h250v308H228V550z m568 308H546V550h250v308z m48-376H546V378h298v104z"
            fill="currentColor"
          />
        </svg>
      </TabBarItem>
    </TabBar>
    <br />
    <br />
    <h4 class="text-center">Router-link 模式</h4>
    <TabBar>
      <TabBarItem
        title="聊天"
        to="tabBar"
        tag="router-link"
        iconClass="far fa-comment"
        activeClass="v-tab-bar-item-active"
      />
      <TabBarItem
        title="联系人"
        to="toast"
        tag="router-link"
        iconClass="far fa-address-book"
        activeClass="v-tab-bar-item-active"
        badge=""
      />
      <TabBarItem
        title="收藏夹"
        to="cell"
        tag="router-link"
        iconClass="far fa-star"
        activeClass="v-tab-bar-item-active"
      />
      <TabBarItem
        title="礼物"
        to="tab"
        tag="router-link"
        activeClass="v-tab-bar-item-active"
        badge="99+"
      >
        <svg slot="icon" viewBox="0 0 1024 1024">
          <path
            d="M880 310H732.4c13.6-21.4 21.6-46.8 21.6-74 0-76.1-61.9-138-138-138-41.4 0-78.7 18.4-104 47.4-25.3-29-62.6-47.4-104-47.4-76.1 0-138 61.9-138 138 0 27.2 7.9 52.6 21.6 74H144c-17.7 0-32 14.3-32 32v200c0 4.4 3.6 8 8 8h40v344c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V550h40c4.4 0 8-3.6 8-8V342c0-17.7-14.3-32-32-32z m-334-74c0-38.6 31.4-70 70-70s70 31.4 70 70-31.4 70-70 70h-70v-70z m-138-70c38.6 0 70 31.4 70 70v70h-70c-38.6 0-70-31.4-70-70s31.4-70 70-70zM180 482V378h298v104H180z m48 68h250v308H228V550z m568 308H546V550h250v308z m48-376H546V378h298v104z"
            fill="currentColor"
          />
        </svg>
      </TabBarItem>
    </TabBar>
  </div>
</template>

<script>
import TabBar from '../../components/tabBar/tabBar'
import TabBarItem from '../../components/tabBar/item'

export default {
  name: 'page-tabBar',
  components: {
    TabBar,
    TabBarItem
  },
  data() {
    return {
      index: 1
    }
  }
}
</script>

<style lang="postcss">
.page-tabbar-color {
  background-color: #fff;
}
.page-tabbar-color-item {
  color: #888;
}
.page-tabbar-color-active {
  color: var(--error);
}
</style>
