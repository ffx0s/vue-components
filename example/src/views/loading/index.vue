<template>
  <div>
    <Navbar title="Loading" />
    <div class="app--spacing">
      <h4>默认</h4>
      <Loading />
      <h4>颜色</h4>
      <Loading color="#ccc" />
      <h4>大小</h4>
      <Loading size="20" />
      <h4>描边宽度</h4>
      <Loading strokeWidth="5" />
    </div>
  </div>
</template>

<script>
import Loading from 'muvc/loading'

export default {
  components: {
    Loading
  }
}
</script>
