
import itable from '@/components/Table/index.vue'
export default {
    components:{
        itable
    },
    data(){
      return {
        single:false,
        queryForm:{
            single:''
        },
        ruleCustom:{},
        dataList:[
          {
            title:'长盈1号集合资金信托计划（第1期）',
            btnList:[{title:'立项审议'},{title:'立项审议'}]
          }
        ]
      }
    },
    methods:{
      projectnav(){
        this.$router.push({
          name: 'projectnav'
      });
      }
    },
    created(){
  
    }
  }
  