import launchmodel from '@/components/componentsModal/launchmodel/index.vue';
import { log } from 'util';
export default {
    components:{
        launchmodel
    },
    props:{
        projectname:null,
        projectid:null,
    },
    data () {
        return {
            value1:['10','11','12','13','14','15','16','17'],
            approvearr:[],
            value2:[],
        }
    },
    methods: {
        lunch(item){
            this.$router.push({name:'approveluch',query:{processid:item.processid,projectname:this.projectname?this.projectname:'',projectid:this.projectid?this.projectid:''}})
            // this.$refs.launchmodel.openmodel(processid)
        },
    },
    created(){
        let params = {
            pageSize: 1000,
            pageNo: 1,
            sys_act_type:this.projectname?2:1
        }
        this.$get(this.GLOBAL.API_GET_DELOY_LIST,params).then(res=>{
            if(res.data.success){
                this.approvearr= res.data.data
            }
        })
    }
};
