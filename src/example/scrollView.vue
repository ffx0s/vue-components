<template>
<div>
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
</div>
</template>

<script>
import ScrollView from '@/components/scrollView'

export default {
  components: {
    ScrollView
  }
}
</script>
