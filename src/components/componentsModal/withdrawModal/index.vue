<template>
    <div v-if='modalflag'>
       <Modal title="温馨提示" width='400' v-model="modalflag">
         <p>是否确定撤回？</p>
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
            flag:Number,
            parentdata:{},
        }
    },
    methods:{
        showModal(data){
          this.parentdata=data;
          this.modalflag=true;
        },
        confirm(){
                 this.$post(this.GLOBAL.API_REVOKE,{taskId:this.$store.state.tableselect.selectdata[0].taskId}).then(res=>{
                    if(res.data.success){
                        this.modalflag=false;
                        this.$Message.success('撤回成功')
                        this.$emit('changpage')
                    }
                  })
          }
          

        },
}
</script>
