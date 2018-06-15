<template>
  <div id="app">
    <ScrollToggle />
    <ScrollView />
    <Validator />
  </div>
</template>

<script>
import ScrollView from '@/example/scrollView'
import ScrollToggle from '@/example/scrollToggle'
import Validator from '@/example/validator'

export default {
  name: 'app',
  components: {
    ScrollView,
    ScrollToggle,
    Validator
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
