<style lang="less">
</style>
<template>
    <div>
        <Modal
            v-model="modalflag"
            width="800px"
            :title="title"
            okText="确认"
            cancelText="关闭"
            @on-ok="confirm"
            @on-cancel="Close">
        <div class="operation"><a @click="newAdd">新增分类</a> <a @click="modify">修改分类</a> <a @click="deleteFun">删除分类</a></div>
            <Input v-model="searchvalue" placeholder="请输入关键字搜索" style="width:200px"/>
            <Tree :data="data1"></Tree>
        </Modal>
      <deleteModal ref="deleteModal"></deleteModal>  
      <newaddModal ref="newaddModal"></newaddModal>
    </div>
    
</template>
<script>
import deleteModal from '@/components/componentsModal/deleteModal/deleteModal.vue'
import newaddModal from './newaddModal.vue'
export default {
    components:{
        deleteModal,
        newaddModal
    },
    data(){
        return{
          searchvalue:'',
          title:'文档分类树',
          modalflag:false,
          formflag:true,
          queryForm:{},
          ruleCustom:{},
           data1: [
                 {
                    title: 'parent 1-1',
                    expand: true,
                    children: [
                        {
                            title: 'leaf 1-1-1'
                        },
                        {
                            title: 'leaf 1-1-2'
                        }
                    ]
                },
              {
                title: 'parent 1-2',
                expand: true,
                children: [
                    {
                        title: 'leaf 1-2-1'
                    },
                    {
                        title: 'leaf 1-2-1'
                    }
                ]
            }
                        
                ]
        }
    },
    methods:{
        getDocumentTypeManage(){
            this.modalflag=true;
        },
        newAdd(){
         this.$refs.newaddModal.getnewaddModal('新增');
        },
        modify(){
         this.$refs.newaddModal.getnewaddModal('修改');
        },
        deleteFun(){
         this.$refs.deleteModal.getdeleteModal();
        },
        confirm(){},
        Close(){},
    }
}

</script>