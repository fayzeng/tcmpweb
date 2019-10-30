export default {
    data(){
        return{
          modalflag:false,
          id:'',
          type:'1'
        }
    },
    methods:{
      confirm(){
          let url = ''
          if(this.type == 1){
            url = this.GLOBAL.API_ADDDELOY
          }else{
            url = this.GLOBAL.API_EDITDELOY
          }
          this.$post(url,{modelId:this.id}).then(res=>{
            if(res.data.success){
                this.$Message.success(res.data.message)
                this.modalflag = false
            }
        })
      },
      openmodel(id,type){
        this.id = id
        this.type = type
        this.modalflag = true
    
      

      }
    }
}