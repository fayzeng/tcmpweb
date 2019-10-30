
<template>
  <div v-if="modalflag">
    <Modal v-model="modalflag" :mask-closable='false' :closable='false' width="700" :title="modaltitle">
       <filemanage ref="filemanage" :filetype='filetype' :modaltitle='modaltitle'></filemanage>
            <div class="buttoncenter" slot="footer">
                <Button   @click="Close">取消</Button>
                <Button type="warning" @click="Reset">重置</Button>
                <Button type="primary" :loading="loading" @click="confirm('Modalform')">保存</Button>
            </div>
    </Modal>
    <!-- <tableModal ref="tableModal" @updatedata='updatedata' :attribute='propname'></tableModal> -->
  </div>
</template>
<script src='./index.js'></script>
