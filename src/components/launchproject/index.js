import approve from '@/views/workflow/approve/index.vue'
export default {
    components:{
        approve
    },
    data(){
       return{
           project_name:'',
           project_id:'',
       }
    },
    methods:{

    },
    created(){
        this.project_name=this.$route.query.project_name;
        this.project_id=this.$route.query.id;
    }
}