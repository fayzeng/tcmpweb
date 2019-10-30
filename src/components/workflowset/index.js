export default {
    data () {
        return {
            modelid:'',
            url:this.baseURL + 'tcmp/manage/workflow/modeler.html?modelId=',
            token:sessionStorage.getItem('cookieaccess_token')
        }
    },
    methods: {
        closetab(){
            this.$router.push({name:'workflow'})
            this.$store.commit('removeTag', 'workflowseting');
        }
    },
    created() {
        if(this.$route.query.id){
            this.modelid = this.$route.query.id
        }else{
            let params ={}
            if(this.$route.query.type){
                params  ={category:this.$route.query.type,sys_act_type:this.$route.query.sys_act_type.join(','),key:this.$route.query.key}
            }
            this.$get(this.GLOBAL.API_GET_MODELID,params).then(res=>{
                if(res.data.success){
                    this.modelid = res.data.data
                }
            })
        }
        window.addEventListener('message',messageEvent=>{
            let data = messageEvent.data;
            if(data==1){
                this.closetab()
            }
        },false)
    },

}
