<template>
    <div v-if='modalflag'>
      <Modal title="温馨提示" width='400' v-model="modalflag">
         <p>是否确定复制模板？</p>
            <div slot="footer" class="buttoncenter">
                  <Button   @click="Close">取消</Button>
                  <Button type="success" :loading='loading' @click="confirm('Modalform')">确定</Button>
            </div>
      </Modal>
    </div>
</template>
<script>
export default {
    data(){
        return{
            modalflag:false,
            loading:false,
        }
    },
    methods:{
        showModal(){
            this.modalflag=true;
        },
        confirm(){
            this.loading=true;
             this.$post(this.GLOBAL.API_COPY_TEMP,{template_id:this.$store.state.tableselect.selectdata[0].template_id}).then(res=>{
                 this.loading=false;
                if(res.data.success){
                   this.modalflag=false;
                   this.$Message.success('复制成功')
                   this.$emit('changpage')
                }
             }).catch(()=>{ this.loading=false })
        },
        Close(){
                   this.modalflag=false;
        }
    }
}
</script>
