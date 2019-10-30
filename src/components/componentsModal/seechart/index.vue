<style lang="less">
</style>
<template>
    <div v-if='modalflag'>
      <Modal v-model="modalflag" width="800">
          <p slot="header" style="color:blue;text-align:center">
              <Icon type="ios-information-circle"></Icon>
              <span>查看审批流程</span>
          </p>
          <div style="align:center" >
                 <img :src="'data:image/png;base64,'  + image"  width="760" >
          </div>
          <div slot="footer"></div>
      </Modal>
    </div>
</template>
<script src='./index.js'></script>
