import filemanage from '@/components/filemanage/index.vue'
export default {
    components:{
        filemanage
    },
    data(){
        return{
            modalflag:false,
            loading:false,
            modaltitle:'',
            fileIdarr:[],
            paramsobj:{},
            filetype:this.$store.state.tableselect.singletreedata.sft_id
        }
    },
    methods: {
        showModal(id){
            this.modalflag=true;
            if(id){
                this.modaltitle='修改文档信息'
            }else{
                this.modaltitle='新增文档'
            }
        },
        confirm(){
            let params={};
            if(this.$store.state.tableselect.paramobj){
                 params=this.$refs.filemanage.getparam()
            }else{
                 params=this.$refs.filemanage.getformItem()
            }
            if(params.typeid){
                 this.$post(this.GLOBAL.API_UPLOADID, params).then(res => {
                        if (res.data.success) {
                            this.modalflag=false;
                            this.$emit('changpage')
                        }
                    }) 
            }else{
                this.$Message.error('请上传文件')
            }
        
        },
        Close(){
            if(this.$store.state.tableselect.paramobj){
                 this.paramsobj=this.$refs.filemanage.getparam()
            }else{
                 this.paramsobj=this.$refs.filemanage.getformItem()
            } 
            if(this.paramsobj.typeid){
                this.paramsobj.typeid.split(',').map(item=>{
                    if(item!=this.paramsobj.fileId){
                        this.$post(this.GLOBAL.API_DELETE_FILE,{fileId:item}).then(res => {
                                if (res.data.success) {
                                    this.modalflag=false;
                                }
                            }) 
                    }else{
                        this.modalflag=false;                        
                    }
                })   
            }else{
                this.modalflag=false;
            }
            
        },
        Reset(){

        }
    },
}