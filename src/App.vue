<template>
  <div id="app">
    <ScrollToggle>
      <header
        style="width:100%;height:45px;line-height:45px;border-bottom:1px solid #eaeaea;background:#fff;"
      >
        <strong>ScrollToggle top</strong>
      </header>
    </ScrollToggle>

    <h4>ScrollView X</h4>
    <ScrollView
      scrollX
      style="margin: 0 auto;width:300px;height:100px;border: 1px solid #2c3e50;"
    >
      <div 
        :key="i"
        v-for="i in [1, 2, 3, 4, 5, 6, 7]"
        style="float:left;margin-right:10px;width:100px;height:100px;background:#eaeaea;"
      >
        {{i}}
      </div>
    </ScrollView>

    <h4>ScrollView Y</h4>
    <ScrollView style="margin:0 auto;width: 100px;height: 300px; border: 1px solid #2c3e50;">
      <div 
        :key="i"
        v-for="i in [1, 2, 3, 4, 5, 6, 7]"
        style="width:100px;height:100px;background:#eaeaea;margin-bottom:10px;"
      >
        {{i}}
      </div>
    </ScrollView>
    
    <ScrollToggle position="bottom">
      <header
        style="width:100%;height:45px;line-height:45px;border-top:1px solid #eaeaea;background:#fff;"
      >
        <strong>ScrollToggle bottom</strong>
      </header>
    </ScrollToggle>
  </div>
</template>

<script>
import ScrollView from '@/components/scrollView'
import ScrollToggle from '@/components/scrollToggle'

export default {
  name: 'app',
  components: {
    ScrollView,
    ScrollToggle
  }
}
</script>

<style>
html, body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 2000px;
}
</style>
