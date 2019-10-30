<template>
  <div v-if="modalflag">
    <Modal v-model="modalflag" width="300" mini-height='300px'>
             <p slot="header" style="text-align:center">
              <Icon type="ios-information-circle"></Icon>
              <span>提示语</span>
          </p>
          <div style="text-align:center">
              <p>是否确认执行此操作？</p>
          </div>
        <div slot="footer">
            <Button type="primary" :loading='loading' @click="confirm">确认</Button>
            <Button   @click="Close">关闭</Button>
        </div>
    </Modal>
  </div>
</template>
<script>
export default {
    data(){
      return{
          modalflag:false,
          flag:'',
          status:'',
          loading:false,
      }
    },
    methods:{
     showModal(flag,status){
         this.flag=flag;
         this.status=status;
         this.modalflag=true;
     },
     confirm(){
         this.loading=true;
         if(this.status=='userstatus'){
                let arr=[];
                this.$store.state.tableselect.selectdata.map((item,ind)=>{
                    arr.push(item.userId)
                })
                arr=arr.join(',')
                let params={
                    flag:this.flag,
                    userIds:arr
                }
                this.$post(this.GLOBAL.API_STATUS_SET,params).then(res=>{
                     this.loading=false;
                    if(res.data.success){
                        this.modalflag=false;
                        this.$Message.success(res.data.message);
                        this.$emit('changpage')
                    }
                }).catch(()=>{ this.loading=false })
         }else if(this.status=='status'){
            let params={
                project_id:this.$store.state.tableselect.selectdata[0].project_id,
                project_status:this.flag,
            }
            this.$post(this.GLOBAL.API_PROJECT_STATUS,params).then(res=>{
                     this.loading=false;
                if(res.data.success){
                    this.modalflag=false;
                    this.$emit('changpage')
                }
            }).catch(()=>{ this.loading=false })  
         }else if(this.status=='processstatus'){
            let params={
                processInstanceId:this.$store.state.tableselect.selectdata[0].processInstanceId,
                suspendFlag:this.flag,
            }
            this.$get(this.GLOBAL.API_PROCESS_STATUS,params).then(res=>{
                     this.loading=false;
                if(res.data.success){
                    this.modalflag=false;
                    this.$emit('changpage')
                }
            }).catch(()=>{ this.loading=false })  
         }
        
    
     },
     
     Close(){
         this.modalflag=false;
     },
    }
}
</script>
