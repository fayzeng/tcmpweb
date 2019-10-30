<template>
  <div id="app" ref='app'>
       <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
    created() {
      console.log(sessionStorage.getItem('user'))
    },
}
</script>

<style lang="less">
@import './app.less';
</style>
