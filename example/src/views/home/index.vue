<template>
  <div>
    <RadioGroup v-model="animatedType">
      <Group title="路由切换动画">
        <Cell tag="label" clickable>
          <Radio slot="title" tag="div" name="animatedType" label="ios">
            IOS
          </Radio>
        </Cell>
        <Cell tag="label" clickable>
          <Radio slot="title" tag="div" name="animatedType" label="android">
            Android
          </Radio>
        </Cell>
        <Cell tag="label" clickable>
          <Radio slot="title" tag="div" name="animatedType" label="fade">
            Fade
          </Radio>
        </Cell>
      </Group>
    </RadioGroup>

    <Group title="组件">
      <Cell title="Tab" to="/tab" isLink />
      <Cell title="TabView" to="/tab2" isLink value="Header + PullRefresh" />
      <Cell title="ImageViewer" to="/imageViewer" isLink />
      <Cell title="PullRefresh" to="/pullRefresh" isLink />
      <Cell title="InfiniteScroll" to="/infiniteScroll" isLink />
      <Cell title="ScrollView" to="/scrollView" isLink />
      <Cell title="Headroom" to="/headroom" isLink />
      <Cell title="Swipe" to="/swipe" isLink />
      <Cell title="SwipeCell" to="/swipeCell" isLink />
      <Cell title="Picker" to="/picker" isLink />
      <Cell title="Button" to="/button" isLink />
      <Cell title="Cell" to="/cell" isLink />
      <Cell title="Loading" to="/loading" isLink />
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
      <Cell title="Ring" to="/ring" isLink />
    </Group>

    <Group title="表单">
      <Cell title="Validator" to="/validator" isLink />
      <Cell title="Checkbox" to="/checkbox" isLink />
      <Cell title="Switch" to="/switch" isLink />
      <Cell title="Radio" to="/radio" isLink />
      <Cell title="Field" to="/field" isLink />
    </Group>

    <Group title="其它">
      <Cell title="1px" to="/1px" isLink />
      <Cell title="Touch gestures" to="/touch" isLink />
    </Group>
  </div>
</template>

<script>
import Group from 'lvan/cell/group'
import Cell from 'lvan/cell'
import RadioGroup from 'lvan/radio/group'
import Radio from 'lvan/radio'

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
