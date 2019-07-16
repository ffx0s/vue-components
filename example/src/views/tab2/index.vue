<template>
  <div>
    <PullRefresh
      v-model="loading"
      @refresh="refresh"
      :failed="failed"
      waveColor="#f0eff5"
      class="tab2"
    >
      <Headroom
        :maxTop="30"
        pinnedClass=""
        unpinnedClass="tab2-navbar--unpinned"
        transitionClass=""
        transformFixed
      >
        <Navbar class="tab2-navbar" :border="false">
          <template slot="leftText">
            <img
              src="http://static.webfed.cn/FksNjHhy7Je-dpNJanGFwXDjH2xf"
              alt="在沙漠里打滚"
              class="tab2-navbar__userimg"
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

      <div class="tab2-header">
        <div class="tab2-header__user">
          <div class="tab2-header__user-img">
            <img
              src="http://static.webfed.cn/FksNjHhy7Je-dpNJanGFwXDjH2xf"
              alt="在沙漠里打滚"
            />
          </div>
          <div class="tab2-header__user-id">
            <h4>在沙漠里打滚</h4>
            <p>ID：7178291</p>
          </div>
        </div>
      </div>

      <Tabs v-model="index" header :offset="46" class="tab2-tab v-bd-top">
        <Tab title="动态" lazy>
          <div style="height: 30px" v-if="showNotice">
            <Headroom>
              <Notice
                type="primary"
                title="仅支持移动设备！"
                @close="showNotice = false"
              />
            </Headroom>
          </div>
          <div class="tab2-tab__item" v-for="i in nums" :key="i">
            动态 #{{ i }}
          </div>
        </Tab>
        <Tab title="专栏" lazy>
          <div class="tab2-tab__item" v-for="i in 13" :key="i">
            专栏 #{{ i }}
          </div>
        </Tab>
        <Tab title="直播" lazy>
          <div class="tab2-tab__empty">暂无内容</div>
        </Tab>
      </Tabs>
    </PullRefresh>
  </div>
</template>

<script>
import Tabs from 'muvc/tab/tabs'
import Tab from 'muvc/tab/item'
import Headroom from 'muvc/headroom'
import PullRefresh from 'muvc/pullRefresh'
import Notice from 'muvc/notice'
import { sleep } from 'muvc/utils/shared'
import showModal from '../../mixins/showModal'

export default {
  name: 'page-tab2',
  mixins: [showModal],
  components: {
    Tabs,
    Tab,
    Headroom,
    PullRefresh,
    Notice
  },
  data() {
    return {
      index: 0,
      loading: false,
      failed: false,
      showNotice: true,
      nums: 0
    }
  },
  mounted() {
    this.$animatedRoute.$once('afterEnter', () => {
      this.loading = true
    })
  },
  methods: {
    fetchData() {
      return sleep(500)
    },
    async refresh(done) {
      this.failed = false
      await this.fetchData()
      this.nums = 10
      done()
    },
    failure() {
      this.failed = true
    }
  }
}
</script>

<style lang="postcss">
.tab2 {
  overflow: visible;
  height: 100%;
}
.tab2-tab {
  &:before {
    z-index: 3;
  }
}
.tab2-tab__item {
  height: 100px;
  line-height: 100px;
  text-align: center;
  margin: 10px;
  background-color: #fff;
  border-radius: 4px;
}
.tab2-tab__empty {
  width: 100%;
  height: 200px;
  line-height: 200px;
  text-align: center;
  color: var(--textRegular);
}

.tab2-navbar {
  color: transparent;
  background-color: transparent;
  transition: 0.3s background, 0.3s color;
  & .v-button {
    color: #fff;
  }
}
.tab2-navbar--unpinned .tab2-navbar {
  color: #000;
  background-color: #fff;
  & .v-button {
    color: #000;
  }
  & .tab2-navbar__userimg {
    opacity: 1;
  }
}
.tab2-navbar__userimg {
  margin-right: 10px;
  display: block;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s;
}

.tab2-header {
  position: relative;
  height: 250px;
  background-image: url('https://static.webfed.cn/ceddJB493dB4A.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.tab2-header__user {
  position: absolute;
  bottom: 40px;
  left: 14px;
  display: flex;
  align-items: center;
}
.tab2-header__user-img {
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
.tab2-header__user-id {
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
