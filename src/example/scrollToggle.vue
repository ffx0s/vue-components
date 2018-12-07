<template>
<div>
  <ScrollToggle>
    <header
      class="nav"
    >
      <strong>ScrollToggle top</strong>
    </header>
  </ScrollToggle>

  <ScrollToggle position="bottom" style="z-index: 5">
    <header
      class="nav"
    >
      <strong>ScrollToggle bottom</strong>
    </header>
  </ScrollToggle>
</div>
</template>

<script>
import ScrollToggle from '@/components/scrollToggle'

export default {
  components: {
    ScrollToggle
  }
}
</script>

<style>
.nav {
  width:100%;
  height:45px;
  line-height:45px;
  color:#fff;
  background:#409eff;
}
</style>
