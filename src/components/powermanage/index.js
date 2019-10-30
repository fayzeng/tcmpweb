import itable from '@/components/Table/index.vue'
import mergeTbaledata from '@/components/mergeTabledata/index.vue'
export default {
    components:{
        itable,
        mergeTbaledata
    },
    data(){
        return{
            buttonarr:[{ code: 'addparam', actionType:'2', name: '新增' }],
            permissions_type:'3',
            flag:'3',
            paramsobj1:{
                idName:'group_id',
                Name:'group_name',
                valuename:'groupName',
                valueid:'groupId'
            },
            paramsobj2:{
                idName:'proc_key',
                Name:'proc_def_name',
                valuename:'name',
                valueid:'key'
            },
            paramsobj3:{
                idName:'project_id',
                Name:'project_name',
                valuename:'project_name',
                valueid:'project_id'
            }
        }
    },
    methods: {
        changeTab(name){
            console.log(name)
            if(name=='项目权限'){
               this.permissions_type='3'
               this.flag='3'
            }else if(name=='机构权限'){
                this.permissions_type='1'
               this.flag='1'
             }else if(name=='工作流权限'){
                this.permissions_type='2'
                this.flag='2'
             }
        }
        // changePage(pageNo){
        //     let params = {
        //         pageSize: 10,
        //         pageNo: pageNo,
        //     }
        //     this.$get(this.GLOBAL.API_QUERY_PROJECT,params).then(res=>{
        //         if(res.data.success){
        //             this.data=res.data.data.result;
        //             this.total=res.data.data.totalCount
        //             this.getlist()
        //         }
        //       })
        // },
        // getlist(){
        //     let params={
        //         permissions_type:'3',
        //         relevance_id:this.$route.query.id,
        //         relevance_type:this.$route.query.relevance_type,
        //     }
        //     this.$get(this.GLOBAL.API_QUERY_ACTPERMISS,params).then(res=>{
        //         if(res.data.success){
        //               this.data.map(temp=>{
        //                 if(res.data.data.result.length>0){
        //                   res.data.data.result.map(item=>{
        //                     if(item.project_id==temp.project_id){
        //                         temp.process='可见'
        //                     }else{
        //                         temp.process='不可见'
        //                     }
        //                     })   
        //                 }else{
        //                     temp.process='不可见'
        //                 }
                         
        //             })
        //             this.data1=this.data;
        //         }
        //       })
        // },
        // selectRow(selection,row){
        //     let params={
        //         project_id:row.project_id,
        //         project_name:row.project_name,
        //         permissions_type:'3',
        //         relevance_id:this.$route.query.id,
        //         relevance_type:this.$route.query.relevance_type,
        //     }
        //    this.$post(this.GLOBAL.API_ADDEDIT_PROCESS,params).then(res=>{
        //     if(res.data.success){
        //         console.log(res)
        //     }
        //   })
        // },
        // selectcancel(selection,row){
        //     let params={
        //         permissions_id:row.project_id,
        //     }
        //    this.$post(this.GLOBAL.API_DELETE_PROCESSMANAGE,params).then(res=>{
        //     if(res.data.success){
        //     }
        //   })
        // },
        // selectAll(data){
        //    console.log(data)
        // },
        // selectcancelAll(data){
        //    console.log(data)
        // }
    },
    created() {
      //  this.changePage(1)
    },
}