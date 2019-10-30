<style lang="less">
</style>
<template>
    <div v-if="modalflag">
      <Modal v-model="modalflag" width="360">
          <p slot="header" style="color:#f60;text-align:center">
              <Icon type="ios-information-circle"></Icon>
              <span>删除</span>
          </p>
          <div style="text-align:center">
              <p>确认删除吗？</p>
          </div>
          <div slot="footer" class="buttoncenter">
              <Button type="error" size="small" :loading='loading' @click="confirm" >确认</Button>
              <Button   size="small"   @click="Close">关闭</Button>
          </div>
      </Modal>
    </div>
</template>
<script src='./index.js'></script>
