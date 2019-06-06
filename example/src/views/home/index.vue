<template>
  <div>
    <RadioGroup v-model="animatedType">
      <Group title="路由切换动画">
        <Cell clickable>
          <template slot="title">
            <Radio name="animatedType" label="ios">IOS</Radio>
          </template>
        </Cell>
        <Cell clickable>
          <template slot="title">
            <Radio name="animatedType" label="android">Android</Radio>
          </template>
        </Cell>
        <Cell clickable>
          <template slot="title">
            <Radio name="animatedType" label="fade">Fade</Radio>
          </template>
        </Cell>
      </Group>
    </RadioGroup>

    <Group title="组件">
      <Cell title="Tab" to="/tab" isLink />
      <Cell title="PullRefresh" to="/pullRefresh" isLink />
      <Cell title="InfiniteScroll" to="/infiniteScroll" isLink />
      <Cell title="ScrollView" to="/scrollView" isLink />
      <Cell title="Headroom" to="/headroom" isLink />
      <Cell title="Swipe" to="/swipe" isLink />
      <Cell title="SwipeCell" to="/swipeCell" isLink />
      <Cell title="Picker" to="/picker" isLink />
      <Cell title="Button" to="/button" isLink />
      <Cell title="Cell" to="/cell" isLink />
      <Cell title="Toast" to="/toast" isLink />
      <Cell title="Modal" to="/modal" isLink />
      <Cell title="Actionsheet" to="/actionsheet" isLink />
      <Cell title="Navbar" to="/navbar" isLink />
      <Cell title="Drawer" to="/drawer" isLink />
      <Cell title="Popup" to="/popup" isLink />
      <Cell title="TabBar" to="/tabBar" isLink />
      <Cell title="Badge" to="/badge" isLink />
      <Cell title="Notice" to="/notice" isLink />
      <Cell title="Skeleton" to="/skeleton" isLink />
      <Cell title="VirtualList" to="/virtualList" isLink value="Height" />
      <Cell
        title="VirtualList"
        to="/virtualList/variable"
        isLink
        value="Variable"
      />
      <Cell
        title="VirtualList"
        to="/virtualList/loadMore"
        isLink
        value="Variable + LoadMore"
      />
      <Cell title="ImageViewer" to="/imageViewer" isLink />
      <Cell title="Ring" to="/ring" isLink />
    </Group>

    <Group title="表单">
      <Cell title="Validator" to="/validator" isLink />
      <Cell title="Checkbox" to="/checkbox" isLink />
      <Cell title="Switch" to="/switch" isLink />
      <Cell title="Radio" to="/radio" isLink />
      <Cell title="Field" to="/field" isLink />
    </Group>

    <Group title="样式"> <Cell title="1px" to="/1px" isLink /> </Group>
  </div>
</template>

<script>
import Group from 'vue-components/cell/group'
import Cell from 'vue-components/cell'
import RadioGroup from 'vue-components/radio/group'
import Radio from 'vue-components/radio'

export default {
  name: 'page-home',
  components: {
    Group,
    Cell,
    RadioGroup,
    Radio
  },
  computed: {
    animatedType: {
      get() {
        return this.$store.state.page.routeAnimatedEffect
      },
      set(value) {
        this.$store.commit('page/routeAnimatedEffect', value)
      }
    }
  }
}
</script>
