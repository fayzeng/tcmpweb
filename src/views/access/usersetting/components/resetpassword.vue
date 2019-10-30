<template>
     <Modal v-model="modalflag" width="300" title="提示信息">
          <p style="text-align:center">是否确认重置密码</p>
         <div slot="footer" class='buttoncenter'>
            <Button   @click="Close">取消</Button>
            <Button type="success" :loading='loading' @click="confirm">保存</Button>
        </div>
    </Modal>
</template>
<script src='./index.js'></script>
</template>
<style>

</style>
<script>
export default {
    data(){
        return{
            modalflag:false,
            loading:false,
        }
    },
    methods:{
        getresetpassword(){
            this.modalflag=true;

        },
        confirm(){
               this.loading=true;
          let arr=[];
          this.$store.state.tableselect.selectdata.map((item,ind)=>{
              arr.push(item.userId)
          })
          arr=arr.join(',')
          let params={
              userIds:arr
          }
          this.$post(this.GLOBAL.API_RESETPWD,params).then(res=>{
               this.loading=false;
             if(res.data.success){
                this.modalflag=false;
                this.$Message.success('重置密码成功')
            }
          }).catch(()=>{ this.loading=false })
        },
        Close(){
            this.modalflag=false;
        },
    }

}
</script>
