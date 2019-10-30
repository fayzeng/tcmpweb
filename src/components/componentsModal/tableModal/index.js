import tableprops from '@/libs/tablelistprops.js'
import { throws } from 'assert';

export default {
    props: {
        attribute: String,
    },
    components: {
    },
    data() {
        return {
            Modalform:{project_name:''},
            modalflag:false,
            tableprop: tableprops,
            tableData: [],
            ModalRule:{},
            field:'',
            title:'',
            id:'',
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
            groupId:'',
            optionMap:{},
        }
    },
    methods: {
        showModal(field,title,id,groupid){
           setTimeout(() => {
                this.param='';
                this.field=field;
                this.title=title;
                this.groupid=groupid;
                this.id=id;47
                this.modalflag=true;
                this.$store.state.tableselect.rowtabledata = []
                this.tableColumns = [{ type: 'selection', width: 60, align: 'center' }]
                this.tableColumns = this.tableColumns.concat(this.tableprop.tableprops[this.attribute].cloumn)
                this.tableprop.tableprops[this.attribute].gettablelist && this.changePage(1)
               this.getOptions()
           }, 0);
        },
        changePage(pagesize) {//切换页码
            let params = {
                pageSize: 10,
                pageNo: pagesize,
                ...this.getParam()
            }
            if (this.field==9) { //field==9时，代表请求部门下岗位，需要传groupId
                params.groupId = this.id
            }
            if(this.field==2){
                params.groupId=this.groupid;
            }
            this.tableData=[];
            this.$get(this.tableprop.tableprops[this.attribute].gettablelist, params).then(res => {
                if (res.data.success) {
                    if (this.field==9){
                        this.tableData=res.data.data
                    } else{
                        this.tableData = res.data.data.result
                        this.total = res.data.data.totalCount
                    }
                    this.$store.state.tableselect.rowtabledata = []
                }
            })
        },
        getlist(data){
            data.map((item,ind)=>{
                this.tableData.push(item);
               if(item.children.length>0){
                  this.getlist(item.children)
               }
            })
            
        },
        rowClick(data,index){
            // console.log(data,index)
             this.$refs.table.toggleSelect(index);
         },
        selectRow(selection) {//表格选中事件
            this.$store.state.tableselect.rowtabledata = selection;
        },
        checkselect() {//验证表格是否选中一条数据
            this.$store.state.tableselect.rowtabledata.length != 1 && this.$Message.warning('请选择一条数据进行操作')
            return this.$store.state.tableselect.rowtabledata.length == 1 ? true : false
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
                    } else if (item.type=='daterange') {
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
        confirm(){
           if(this.$store.state.tableselect.rowtabledata.length ==1){
             this.modalflag=false;
             if(this.field=='1'){
                this.$emit('updatedata','groupId');
             }else if(this.field=='2'){
                this.$emit('updatedata','pid');
             }else if(this.field=='3'){
                this.$emit('updatedata','project_id');
             }else if(this.field=='4'){
                this.$emit('updatedata','department');
             }else if(this.title=='更改处理人'){
                let params={
                    hiUserName:this.$store.state.tableselect.rowtabledata[0].userName,
                    taskId:this.$store.state.tableselect.selectdata[0].taskId,
                }
                this.$post(this.GLOBAL.API_TASK_ASSIGNEE, params).then(res => {
                    if (res.data.success) {
                        this.$emit('changpage')
                    }
                })
             }else{
                this.$emit('updatedata','pid');
             }
           }else {
               this.$Message.warning('请选择一条数据进行操作')
           }
        },
        Close(){
            this.modalflag=false;
        },
    },
    created() {

    },
}