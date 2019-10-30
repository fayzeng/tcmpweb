<style lang="less">
</style>
<template>
  <div v-if="modalflag">
    <Modal v-model="modalflag" width="360">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>部署发布</span>
        </p>
        <div style="text-align:center">
            <p>您确定要部署发布吗</p>
        </div>
        <div slot="footer" class="buttoncenter">
            <Button type="error" size="small" @click="confirm" >确认</Button>
            <Button   size="small" @click="modalflag = false">关闭</Button>
        </div>
    </Modal>
  </div>
</template>
<script src='./index.js'></script>
