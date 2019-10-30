import itable from '@/components/Table/index.vue'
export default {
    components:{
        itable
    },
    data(){
        return{
          content:''
        }
    },
    methods:{
        search(){
            alert('查询')
        },
        getvalue(){
          console.log(document.getElementById('project_id').value);
        }
    },
    created(){
      let params = {isNeedParam:'1',templateId:'0'}
      this.$get(this.GLOBAL.API_GET_PINT_HTML,params).then(res=>{
          // if(res.data.success){
            this.content = res.data
          // }
          console.log(res.data);
      })
    }
  }
