<template>
  <div>
    <PullRefresh
      v-model="loading"
      @refresh="refresh"
      :failed="failed"
      backgroundColor="#f0eff5"
      class="page-tab2-pullrefresh"
    >
      <Headroom
        :maxTop="30"
        pinnedClass="page-tab2-navbar-pinned"
        unpinnedClass="page-tab2-navbar-unpinned"
        transitionClass=""
        transformFixed="top"
      >
        <Navbar class="page-tab2-navbar" :border="false">
          <template slot="leftText">
            <img
              src="http://static.webfed.cn/FksNjHhy7Je-dpNJanGFwXDjH2xf"
              alt="在沙漠里打滚"
              class="page-tab2-navbar-userimg"
            />
            在沙漠里打滚
          </template>
          <VButton slot="right" type="icon" @click="$toast('menu')">
            <svg
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
            >
              <path
                d="M232.727273 512m-69.818182 0a3 3 0 1 0 139.636364 0 3 3 0 1 0-139.636364 0Z"
              ></path>
              <path
                d="M512 512m-69.818182 0a3 3 0 1 0 139.636364 0 3 3 0 1 0-139.636364 0Z"
              ></path>
              <path
                d="M791.272727 512m-69.818182 0a3 3 0 1 0 139.636364 0 3 3 0 1 0-139.636364 0Z"
              ></path>
            </svg>
          </VButton>
        </Navbar>
      </Headroom>

      <div class="page-tab2-user-bg">
        <div class="page-tab2-user">
          <div class="page-tab2-userimg">
            <img
              src="http://static.webfed.cn/FksNjHhy7Je-dpNJanGFwXDjH2xf"
              alt="在沙漠里打滚"
            />
          </div>
          <div class="page-tab2-userid">
            <h4>在沙漠里打滚</h4>
            <p>ID：7178291</p>
          </div>
        </div>
      </div>

      <Tabs v-model="index" header :offset="46" class="page-tab2 v-bd-y-top">
        <Tab title="动态" lazy>
          <div class="page-tab2-item" v-for="i in 10" :key="i">
            动态 #{{ i }}
          </div>
        </Tab>
        <Tab title="专栏" lazy>
          <div class="page-tab2-item" v-for="i in 13" :key="i">
            专栏 #{{ i }}
          </div>
        </Tab>
        <Tab title="直播" lazy>
          <div class="page-tab2-empty">暂无内容</div>
        </Tab>
      </Tabs>
    </PullRefresh>
  </div>
</template>

<script>
import Tabs from 'vue-components/tab/tabs'
import Tab from 'vue-components/tab/item'
import Headroom from 'vue-components/headroom'
import PullRefresh from 'vue-components/pullRefresh'
import { sleep } from 'vue-components/utils/shared'

export default {
  name: 'page-tab2',
  components: {
    Tabs,
    Tab,
    Headroom,
    PullRefresh
  },
  data() {
    return {
      index: 0,
      loading: true,
      failed: false
    }
  },
  methods: {
    fetchData() {
      return sleep(500)
    },
    async refresh(done) {
      this.failed = false
      await this.fetchData()
      done()
    },
    failure() {
      this.failed = true
    }
  }
}
</script>

<style lang="postcss">
.page-tab2-pullrefresh {
  overflow: visible;
  height: 100%;
}
.page-tab2 {
  &:before {
    z-index: 3;
  }
}
.page-tab2-item {
  height: 100px;
  line-height: 100px;
  text-align: center;
  margin: 10px;
  background-color: #fff;
  border-radius: 4px;
}
.page-tab2-empty {
  width: 100%;
  height: 200px;
  line-height: 200px;
  text-align: center;
  color: var(--textRegular);
}

.page-tab2-navbar {
  color: transparent;
  background-color: transparent;
  transition: 0.3s background, 0.3s color;
  & .v-button {
    color: #fff;
  }
}
.page-tab2-navbar-unpinned .page-tab2-navbar {
  color: #000;
  background-color: #fff;
  & .v-button {
    color: #000;
  }
  & .page-tab2-navbar-userimg {
    opacity: 1;
  }
}
.page-tab2-navbar-userimg {
  margin-right: 10px;
  display: block;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s;
}

.page-tab2-user-bg {
  position: relative;
  height: 250px;
  background-image: url('https://static.webfed.cn/ceddJB493dB4A.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.page-tab2-user {
  position: absolute;
  bottom: 40px;
  left: 14px;
  display: flex;
  align-items: center;
}
.page-tab2-userimg {
  margin-right: 14px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 1px solid #fff;
  & img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
.page-tab2-userid {
  color: #fff;
  & h4 {
    padding: 0;
    margin: 0;
    font-size: 16px;
    font-weight: normal;
  }
  & p {
    margin: 0;
    font-size: 12px;
  }
}
</style>
