import userpage from '@/views/access/usersetting/index.vue'
export default {
    name:'tabletreeModal',
    components:{
        userpage,
    },
    data(){
        return{
            modalflag:false,
            title:'',
            value:'',
        }
    },
    methods:{
        showModal(title,value){
            this.title=title;
            this.value=value;
            this.modalflag=true;
        },
        confirm(){
            if(this.title=='开户人'){
                this.modalflag=false;
                this.$emit('updateopen',{data:this.$store.state.tableselect.selectdata,title:'开户人'});
            }else if(this.title=='销户人'){
                this.modalflag=false;
                this.$emit('updateopen',{data:this.$store.state.tableselect.selectdata,title:'销户人'});
            }else if(this.title=='信托经理'){
                if(this.$store.state.tableselect.selectdata.length>1){
                    this.$Message.warning('请选择一条数据进行操作')
                }else{
                    this.modalflag=false;
                    this.$emit('updateopen',{data:this.$store.state.tableselect.selectdata,title:'信托经理'});
                }
            }else if(this.title=='分管高级人员'){
                if(this.$store.state.tableselect.selectdata.length>1){
                    this.$Message.warning('请选择一条数据进行操作')
                }else{
                    this.modalflag=false;
                    this.$emit('updateopen',{data:this.$store.state.tableselect.selectdata,title:'分管高级人员'});
                }
            }
        },
        Close(){
            this.modalflag=false;
        }
    }
}