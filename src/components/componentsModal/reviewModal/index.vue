<template>
    <div v-if='modalflag'>
       <Modal title="温馨提示" width='400' v-model="modalflag">
         <p>是否通过复核？</p>
            <div class="buttoncenter" slot="footer">
                  <Button type="warning" @click="adopt('0')">不通过</Button>
                  <Button type="success" @click="adopt('1')">通过</Button>
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
        adopt(status){
          let params={
            [this.parentdata.statusname]:status,
            [this.parentdata.keyname]:this.parentdata.keyval,
          }
          if(this.parentdata.statusname=='营业部'){
              if(status=='1'){
                 this.$post(this.parentdata.url,{[this.parentdata.keyname]:this.parentdata.keyval}).then(res=>{
                    if(res.data.success){
                        this.modalflag=false;
                        this.$Message.success('复核成功')
                        this.$emit('changpage')
                    }
                  })
              }else{
                    this.modalflag=false;
              }
          }else{
            this.$post(this.parentdata.url,params).then(res=>{
              if(res.data.success){
                  this.modalflag=false;
                  this.$Message.success('复核成功')
                  this.$emit('changpage')
              }
            })
          }
          

        },
    }
}
</script>
