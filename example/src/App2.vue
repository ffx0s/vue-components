<template>
  <div class="test">
    <Badge value="123" />
    <div class="box">12334534</div>
  </div>
</template>

<script>
import Badge from 'lvan/badge'

export default {
  components: {
    Badge
  }
}
</script>

<style lang="postcss">
@import '~lvan/styles/index.css';
.test {
  color: var(--aaa);
  & .box {
    color: #ccc;
  }
}
</style>
