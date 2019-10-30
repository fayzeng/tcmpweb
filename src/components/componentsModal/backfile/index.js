export default {
    data(){
        return{
          modalflag:false,
          id:''
        }
    },
    methods:{
      confirm(){
          this.$post(this.GLOBAL.API_BACKFILE,{processDefinitionId:this.id}).then(res=>{
              if(res.data.success){
                  this.$Message.success(res.data.message)
                  this.$emit('changpage')
                  this.modalflag=false
              }
          })
      },
      openmodel(id){
        this.id = id
        this.modalflag = true
      }
    }
}