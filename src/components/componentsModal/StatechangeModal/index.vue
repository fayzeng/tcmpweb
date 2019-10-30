<template>
    <div v-if='modalflag'>
       <Modal title="温馨提示" width='400' v-model="modalflag">
         <p>是否确定账户状态变更？</p>
            <div class="buttoncenter" slot="footer">
                  <Button type="warning" @click="modalflag=false">取消</Button>
                  <Button type="success" @click="confirm">确定</Button>
            </div>
       </Modal>
    </div>
</template>
<script>
export default {
    data(){
        return{
            modalflag:false,
            parentdata:{},
        }
    },
    methods:{
        showModal(data){
          this.parentdata=data;
          this.modalflag=true;
        },
        confirm(){
          let params={
              account_flag:this.parentdata,
              account_id:this.$store.state.tableselect.selectdata[0].account_id,
          }
            this.$post(this.GLOBAL.API_STATE_CHANGE,params).then(res=>{
              if(res.data.success){
                  this.modalflag=false;
                  this.$Message.success('变更成功')
                  this.$emit('changpage')
              }
            })
        },
    }
}
</script>
