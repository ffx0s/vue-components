<template>
  <div>
    <Navbar title="NavBar" />
    <br />
    <Navbar
      title="颜色修改"
      titleColor="#ffffff"
      background="#444"
      backIconColor="#ffffff"
    >
    </Navbar>
    <br />
    <Navbar title="两侧内容修改">
      <div @click="$toast('返回')" slot="left">返回</div>
      <img
        @click="$toast('删除')"
        slot="right"
        src="../../assets/icon-delete.svg"
        style="width:20px;height:20px;"
      />
    </Navbar>
    <br />
    <Navbar title="高度修改" height="60" />
  </div>
</template>

<script>
export default {
  name: 'page-navbar'
}
</script>
