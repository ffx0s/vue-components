<template>
  <div id="app">
    <AnimatedRoute :effect="effect" :include="/page-/" max="5" />
    <!-- <router-view /> -->
    <Drawer
      class="app__drawer"
      :direction="drawerDirection"
      selector=".v-route"
      v-model="drawerShow"
    >
      <div class="app__drawer-close" @click="drawerShow = false">X</div>
      <Gruop title="Drawer">
        <Cell title="Link" isLink />
        <Cell title="Link" isLink />
        <Cell title="Link" isLink />
      </Gruop>
      <Gruop title="Drawer">
        <Cell title="Link" isLink />
        <Cell title="Link" isLink />
        <Cell title="Link" isLink />
      </Gruop>
    </Drawer>
  </div>
</template>

<script>
import AnimatedRoute from 'lvan/route'
import Gruop from 'lvan/cell/group'
import Cell from 'lvan/cell'
import Drawer from 'lvan/drawer'
import { disablePagezoom } from 'lvan/utils/shared'

export default {
  name: 'App',
  components: {
    AnimatedRoute,
    Drawer,
    Gruop,
    Cell
  },
  computed: {
    effect() {
      return this.$store.state.page.routeAnimatedEffect
    },
    drawerShow: {
      get() {
        return this.$store.state.page.drawerShow
      },
      set(show) {
        this.$store.commit('page/drawerShow', {
          show,
          direction: this.drawerDirection
        })
      }
    },
    drawerDirection: {
      get() {
        return this.$store.state.page.drawerDirection
      }
    }
  },
  mounted() {
    disablePagezoom()
  }
}
</script>

<style lang="postcss">
@import '~lvan/styles/index.css';
@import './assets/font/css/fontello.css';
@import '~normalize.css';

/* app css */

h4 {
  margin: 0;
  padding-top: 20px;
  padding-bottom: 10px;
}

body {
  font-family: -apple-system-font, Helvetica Neue, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  word-break: break-all;
}

body.hide-scrollbar {
  & .v-route__view::-webkit-scrollbar,
  & .v-swipe__content::-webkit-scrollbar,
  & .v-scroll-view__area::-webkit-scrollbar {
    display: none;
  }
}

body.custom-scrollbar {
  & .v-route__view,
  & .v-swipe__content,
  & .v-scroll-view__area {
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-track {
      background: #ddd;
    }
    &::-webkit-scrollbar-thumb {
      background: #666;
    }
  }
}

.text-center {
  text-align: center;
}

.app--spacing {
  padding: 15px;
}

.app__drawer {
  background-color: #2d2d2d;
  color: white;
  & .v-cell__left,
  & .v-group__title {
    color: #fff;
  }
  & .v-cell {
    background-color: #2d2d2d;
  }
  & .v-group .v-bd-top-bottom:before,
  & .v-group .v-bd-top-bottom:after,
  & .v-cell__content.v-bd-bottom:after {
    border-color: #4a4a4a;
  }
  & .v-cell--clickable {
    &:active {
      background-color: #4a4a4a;
    }
  }
  & .app__drawer-close {
    padding-right: 14px;
    text-align: right;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    cursor: pointer;
  }
}

.v-route,
body {
  background: var(--background);
}

.app__items {
  padding: 0 10px;
  margin: 0;
  margin-top: 10px;
  font-size: 0;
  list-style-type: none;
  & li {
    margin-bottom: 10px;
    transition: all 0.7s;
  }
}

.item-enter,
.item-leave-active {
  opacity: 0;
  transform: translateY(30px);
}

.item-leave-active {
  position: absolute;
}
</style>
