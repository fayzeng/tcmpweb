import tableprops from '@/libs/tablelistprops.js'

export default {
    props: {
        attribute: String,
    },
    components: {
    },
    data() {
        return {
            modalflag:false,
            tableprop: tableprops,
            tableData: [],
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
            selection:[],
            param:{},
            querylist:[],
            optionMap:{},
            paramFromParent:{},  //父组件带来的参数
        }
    },
    methods: {
        showModal(param, isPage){
            this.isPage = isPage
            setTimeout(() => {
                    this.modalflag=true;
                    // this.$store.state.tableselect.rowtabledata = []
                    this.tableColumns = [{ type: 'selection', width: 60, align: 'center' }]
                    console.log(this.tableprop.tableprops[this.attribute])
                    console.log(this.attribute)
                    this.tableColumns = this.tableColumns.concat(this.tableprop.tableprops[this.attribute].cloumn)
                    this.querylist = this.tableprop.tableprops[this.attribute].querylist
                    this.getOptions()
                    this.paramFromParent = param
                    this.tableprop.tableprops[this.attribute].gettablelist && this.changePage(1)
            }, 0);
        },
        changePage(pageNo,param) {//切换页码
            let params = this.isPage ? {
                pageSize: 10,
                pageNo,
                ...param,
                ...this.paramFromParent,
            } : { ...param, ...this.paramFromParent }
            this.$get(this.tableprop.tableprops[this.attribute].gettablelist, params).then(res => {
                if (res.data.success) {
                    if  (this.isPage) {
                        this.tableData = res.data.data.result
                        this.total = res.data.data.totalCount
                    } else {
                        this.tableData = res.data.data
                    }
                }
            })
        },
        selectRow(selection) {//表格选中事件
            console.log('selected:',selection)
            this.selection = selection
        },
        confirm(){
            if(this.attribute == 'countersign'){
              if(this.selection.length >=1){
                  this.modalflag=false;
                  let arr  = JSON.parse(JSON.stringify(this.selection))
                  this.$emit('updatedata', arr, this.attribute);
              }else {
                  this.$Message.warning('请至少选择一条数据进行操作')
              }
            }else  if(this.selection.length ==1){
                this.modalflag=false;
                const obj = JSON.parse(JSON.stringify(this.selection[0]))
                this.$emit('updatedata', obj, this.attribute);
           }else {
               this.$Message.warning('请选择一条数据进行操作')
           }
        },
        Close(){
            this.modalflag=false;
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
            console.log('查询参数',JSON.parse(JSON.stringify(this.param)))
            const param = { ...obj}
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
            this.changePage(1,param)
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
        }
    },
    created() {


    },
}
