import tableprops from '@/libs/tablelistprops.js'
import { throws } from 'assert';

export default {
    props: {
        attribute: String,
        permissions_type:null,
        paramsobj:null,
    },
    components: {
    },
    data() {
        return {
            Modalform:{project_name:''},
            modalflag:false,
            tableprop: tableprops,
            tableData: [],
            data:[],
            ModalRule:{},
            tableColumns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
            ],
            total: 0,
            currentPage: 1,
            param:{},
            parentParam:{},
            querylist:[],
            optionMap:{},
            pageSize:0,
            cascaderdata:[],
            Cascaderarr:[],
        }
    },
    methods: {
        changePage(pagesize) {//切换页码
            this.pageSize=pagesize;
            let obj={
                permissions_type:this.permissions_type,
                relevance_id:this.$route.query.id,
                relevance_type:this.$route.query.relevance_type,
            }
            let params = {
                pageSize: 10,
                pageNo: pagesize,
                permissions_type:this.permissions_type,
                relevance_id:this.$route.query.id,
                relevance_type:this.$route.query.relevance_type,
                ...this.getParam(),
            }
            
            this.$get(this.tableprop.tableprops[this.attribute].gettablelist, params).then(res => {
                if (res.data.success) {
                    this.tableData = res.data.data.result||[];
                    this.total = res.data.data.totalCount;
                    this.nowpage = pagesize;
                    this.currentPage = pagesize
                    this.$store.state.tableselect.selectdata = [];
                    this.tableData.map(item=>{
                        if(item.permissions_id){
                            item._checked=true;
                        }else{
                            item._checked=false;
                        }
                    });
                }
            })
        },
        // getlist(){
        //     let params={
        //         permissions_type:this.permissions_type,
        //         relevance_id:this.$route.query.id,
        //         relevance_type:this.$route.query.relevance_type,
        //     }
        //     this.$get(this.GLOBAL.API_QUERY_ACTPERMISS,params).then(res=>{
        //         if(res.data.success){
        //               this.data.map(temp=>{
        //                 if(res.data.data.result.length>0){
        //                   res.data.data.result.map(item=>{
        //                     if(item.PROJECT_ID==temp.project_id){
        //                         temp.process='可见'
        //                     }else{
        //                         temp.process='不可见'
        //                     }
        //                     })   
        //                 }else{
        //                     temp.process='不可见'
        //                 }
                         
        //             })
        //             this.tableData=this.data;
        //         }
        //       })
        // },
        HandleData(status,row,res){
            let  datatable =JSON.parse(JSON.stringify(this.tableData))
            datatable.forEach(ele => {
                if(ele[this.paramsobj.valueid] == row[this.paramsobj.valueid] &&status){
                    ele.permissions_id =   res.permissions_id;
                } 
                if(ele[this.paramsobj.valueid]  == row[this.paramsobj.valueid] && !status){
                    ele.permissions_id =   null
                } 
            });
            this.tableData = datatable;
            this.tableData.map(item=>{
                if(item.permissions_id){
                    item._checked=true;
                }else{
                    item._checked=false;
                }
            })
        },
        rowClick(data,index){
             this.$refs.table.toggleSelect(index);
         },
        selectRow(selection,row) {//表格选中事件
            let params={
               [this.paramsobj.idName]:row[this.paramsobj.valueid],
               [this.paramsobj.Name]:row[this.paramsobj.valuename],
                permissions_type:this.permissions_type,
                relevance_id:this.$route.query.id,
                relevance_type:this.$route.query.relevance_type,
            }
           this.$post(this.GLOBAL.API_ADDEDIT_PROCESS,params).then(res=>{
            if(res.data.success){
                this.HandleData(1,row,res.data.data)
            }
          })
        },
        selectcancel(selection,row){
            let params={
                permissions_id:row.permissions_id,
            }
           this.$post(this.GLOBAL.API_DELETE_PROCESSMANAGE,params).then(res=>{
            if(res.data.success){
                this.HandleData(0,row)
                }
          })
        },
         selectAll(data){
             let params=[];
             data.map(item=>{
                 if(!item.permissions_id){
                  params.push( {[this.paramsobj.idName]:item[this.paramsobj.valueid],
                                [this.paramsobj.Name]:item[this.paramsobj.valuename],
                                permissions_type:this.permissions_type,
                                relevance_id:this.$route.query.id,
                                relevance_type:this.$route.query.relevance_type},) 
                 }
             })
            this.$post(this.GLOBAL.API_ADDALL_PROCESS,params).then(res=>{
                if(res.data.success){
                    this.changePage(this.pageSize)
                    // this.tableData.map(item=>{
                    //     item._checked=true;
                    // })
                }
              })
        },
        selectcancelAll(data){//取消全选
            let arr=[];
            this.tableData.map(item=>{
                if(item.permissions_id){
                    arr.push(item.permissions_id)
                }
            });
            let params={
                ids:arr.join(',')
            }
          this.$post(this.GLOBAL.APIDELETEALL_PROCESS,params).then(res=>{
              if(res.data.success){
                this.tableData.map(item=>{
                        item._checked=false;
                        item.permissions_id=null;
                })
              }
            })
        },
        changevalue(val,name){
            let param=''
           if(val.length!=1){
               param=val[1];
            }else{
              param=val[0];
            }
            this.Cascaderarr.push({val:param,name:name});
          },
        getOptions(){
            const param = {}
            const list = this.tableprop.tableprops[this.attribute].querylist
            const url = this.GLOBAL.API_DIC_GETBYCODE;    //获取字典表数据 (下拉框使用)
            if(list && list.length){
                list.map(item => {
                    param[item.name] = ''
                    if (item.type=='select') {   //下拉框类型
                        if (item.codetype) {    //需要从字典表获取下拉框值
                            this.$post(url,{codetype:item.codetype}).then(res=>{
                                if(res.status == 200){
                                    const ret = res.data
                                    if (ret.success) {
                                        const options = ret.data.map(item => ({label:item.name,value:item.key}))
                                        options.unshift({value:"",label:'全部'})
                                        this.optionMap = {
                                            ...this.optionMap,
                                            [item.name]:options
                                        }
                                    } else {
                                        // this.$Message.error(ret.message)
                                    }
                                }
                            })
                        } else if (item.getOption) {   //自定义方法
                            const p = new Promise(async (resolve,reject) => {
                                const ret = await item.getOption()
                                if (ret) resolve(ret)
                            })
                            p.then(options => {
                                this.optionMap = {
                                    ...this.optionMap,
                                    [item.name]:options
                                }
                            }).catch(()=>{
                                this.optionMap = {
                                    ...this.optionMap,
                                    [item.name]:[]
                                }
                            })

                        } else {
                            const options = item.options ? item.options : []
                            options.unshift({value:"",label:'全部'})
                            this.optionMap = {
                                ...this.optionMap,
                                [item.name]: options
                            }
                        }
                    } else if (item.type=='cascader') {
                        param[item.name] = []
                        if (item.codetype) {    //需要从字典表获取下拉框值
                            this.$post(url,{codetype:item.codetype}).then(res=>{
                                if(res.data.success){
                                   this.cascaderdata=JSON.parse(JSON.stringify(res.data.data).replace(/name/g,'label').replace(/key/g,'value'))
                                }
                            })
                        }
                    }else if (item.type=='daterange') {
                        param[item.name+'_start'] = ''
                        param[item.name+'_end'] = ''
                    }
                })
                this.querylist = list
                this.param = param;
            }
        },
        search(obj = {}){   //搜索
            this.parentParam = obj;   //父级传来的查询条件参数  比如组织 groupId
            this.changePage(1)
        },
        getParam(){
           // console.log('查询参数',JSON.parse(JSON.stringify(this.param)))
             const param = { ...this.parentParam}
             const list = this.tableprop.tableprops[this.attribute].querylist
             if(list && list.length){
                 list.map(item => {
                     if (item.type=='daterange') {  //当为时间段类型时
                         param[item.name+'_start'] = this.param[item.name+'_start']
                         param[item.name+'_end'] = this.param[item.name+'_end']
 
                     }else if(item.type=='cascader'){
                        this.Cascaderarr.map(temp=>{
                          if(temp.name==item.name){
                               param[item.name] = temp.val;                                
                            }
                        })
                    } else {
                         param[item.name] = this.param[item.name]
                     }
                 })
             }
             return param
         },
         reset(){
            const list = this.tableprop.tableprops[this.attribute].querylist
            if(list && list.length){
                list.map(item => {
                    if (item.type=='daterange') {  //当为时间段类型时
                        // param[item.start] = ''
                        // param[item.end] = ''
                        this.param[item.name] = ['','']
                    } else {
                        this.param[item.name] = ''
                    }
                })
            }
            this.changePage(1)
        },
    },
    created() {
        this.param='';
        this.modalflag=true;
        this.$store.state.tableselect.rowtabledata = []
        this.tableColumns = [{ type: 'selection', width: 60, align: 'center' }]
        this.tableColumns = this.tableColumns.concat(this.tableprop.tableprops[this.attribute].cloumn)
        this.tableprop.tableprops[this.attribute].gettablelist && this.changePage(1)
        this.getOptions()
    },
    activated(){
        this.search()
      }
}