import itable from '@/components/Table/index.vue'
import { setTimeout } from 'timers';

export default {
    nmae:'infoReview',
    components:{
        itable
    },
    data(){
      return {
        queryForm:{
            model1: '',
            model2: '',
            select:'',
        },
        ruleCustom:{},
        tableData: [   {
           'name':'1233'
        }],
        tableColumns: [
            {
                title: 'Name',
                key: 'name'
            }
        ],
        total:100,
        currentPage:1
      }
    },
    methods:{
        changePage (pagesize) {//切换页码

        },
        selectRow(selection,row){//多选模式
            // selection：已选项数据
            // row：刚选择的项数据
        }
    },
    created(){

    }
  }
