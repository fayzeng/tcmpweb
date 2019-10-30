export default {
    data(){
        return{
          modalflag:false,
          image:null
        }
    },
    methods:{
      openmodel(id){
        this.$get(this.GLOBAL.API_GET_APPIMAGE,{processDefinitionId:id,resourceType:'image'}).then(res=>{
           if(res.data.success){
            this.modalflag =true
            this.image = res.data.data
           }
        })
      }
    }
}