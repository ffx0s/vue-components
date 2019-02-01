<template>
  <div id="app">
    <AnimatedRoute :effect="effect" />
    <!-- <router-view /> -->
    <Drawer
      class="page-drawer"
      :left="isLeft"
      selector=".animated-route"
      v-model="drawerShow"
    >
      <div class="page-drawer-close" @click="drawerShow = false">X</div>
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
import AnimatedRoute from '@/components/animatedRoute/index'
import Gruop from '@/components/cell/group'
import Cell from '@/components/cell'
import Drawer from '@/components/drawer'

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
          direction: this.$store.state.page.drawerDirection,
          show
        })
      }
    },
    isLeft: {
      get() {
        return this.$store.state.page.drawerDirection === 'left'
      }
    }
  }
}
</script>

<style lang="postcss">
@import './styles/1px.css';
@import './styles/animate.css';
@import './styles/color.css';

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
}

.text-center {
  text-align: center;
}

.page-spacing {
  padding: 15px;
}

.page-drawer {
  background-color: #2d2d2d;
  color: white;
  & .v-cell-left,
  & .v-group-title {
    color: #fff;
  }
  & .v-cell {
    background-color: #2d2d2d;
  }
  & .v-group .v-bd-y-top-bottom:before,
  & .v-group .v-bd-y-top-bottom:after,
  & .v-cell-content.v-bd-y-bottom:after {
    border-color: #4a4a4a;
  }
  & .v-cell-clickable {
    &:active {
      background-color: #4a4a4a;
    }
  }
  & .page-drawer-close {
    padding-right: 14px;
    text-align: right;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    cursor: pointer;
  }
}

.animated-route {
  background: var(--background);
}

.item {
  transition: all 0.7s;
}

.item-enter,
.item-leave-active {
  opacity: 0;
  transform: translateY(30px);
}

.item-leave-active {
  position: absolute;
}

.items {
  padding: 0 10px;
  margin: 0;
  margin-top: 10px;
  font-size: 0;
  list-style-type: none;
}
.items li {
  margin-bottom: 10px;
  width: 100%;
  height: 120px;
  line-height: 120px;
  background: #fff;
  border-radius: 4px;
  font-size: 16px;
  text-align: center;
}
</style>
