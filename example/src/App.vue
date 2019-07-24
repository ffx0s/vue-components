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
import AnimatedRoute from 'muvc/route'
import Gruop from 'muvc/cell/group'
import Cell from 'muvc/cell'
import Drawer from 'muvc/drawer'

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
  }
}
</script>

<style lang="postcss">
@import '~muvc/styles/1px.css';
@import '~muvc/styles/animate.css';
@import '~muvc/styles/color.css';
@import '~muvc/styles/skeleton.css';
@import './assets/font/css/fontello.css';

a {
  text-decoration: none;
}

a,
button,
div,
input,
select,
textarea {
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  -webkit-tap-highlight-color: transparent !important;
  outline: none;
}

html {
  font-size: 16px;
  font-family: sans-serif;
  -webkit-text-size-adjust: 100%;
}

a,
img,
label {
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
}

input:focus {
  outline: 0;
}

html,
body {
  margin: 0;
  width: 100%;
}

h4 {
  margin: 0;
  padding-top: 20px;
  padding-bottom: 10px;
}

body {
  font-family: 'Helvetica Neue', Helvetica, Arial, 'PingFang SC',
    'Hiragino Sans GB', 'Heiti SC', 'Microsoft YaHei', 'WenQuanYi Micro Hei',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  word-break: break-all;
}

body.hide-scrollbar {
  & .v-route__view::-webkit-scrollbar,
  & .v-swipe__content::-webkit-scrollbar,
  & .v-scroll-view__scroller::-webkit-scrollbar {
    display: none;
  }
}

body.custom-scrollbar {
  & .v-route__view,
  & .v-swipe__content,
  & .v-scroll-view__scroller {
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
