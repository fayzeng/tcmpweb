<template>
    <div v-if="modalflag">
         <Modal v-model="modalflag" class-name="modalclass" width="90%"  title="选择">
              <userpage ref="userpage" tableattr='usersettings'></userpage>
              <div slot="footer">
                  <Button   @click="Close">取消</Button>
                  <Button type="primary" @click="confirm('Modalform')">保存</Button>
              </div>
          </Modal>
    </div>
</template>
<script src='./index.js'></script>
<style lang="less">
    .modalclass{
         .ivu-modal{
             height: 1000px;
             .ivu-modal-content{
                 height: 100%;
                 .ivu-modal-body{
                     height: 90%;
                 }
             }
         }
    }
</style>