<template>
    <div v-if='modalflag'>
       <Modal title="温馨提示" width='400' v-model="modalflag">
         <p>是否确定项目成立？</p>
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
                project_id:this.$store.state.tableselect.selectdata[0].project_id
            }
            this.$post(this.GLOBAL.API_PROJECT_SETUP,params).then(res=>{
              if(res.data.success){
                  this.modalflag=false;
                  this.$Message.success('项目成立成功')
                  this.$emit('changpage')
              }
            })
        },
    }
}
</script>
