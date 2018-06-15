<template>
<div>
  <ScrollToggle>
    <header
      style="width:100%;height:45px;line-height:45px;border-bottom:1px solid #eaeaea;background:#fff;"
    >
      <strong>ScrollToggle top</strong>
    </header>
  </ScrollToggle>

  <ScrollToggle position="bottom" style="z-index: 5">
    <header
      style="width:100%;height:45px;line-height:45px;border-top:1px solid #eaeaea;background:#fff;"
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
