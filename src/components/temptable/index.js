import tableprops from '@/libs/tablelistprops.js'

export default {
    props: {
        attribute: String,
        editid:null,
        disabled:Boolean
    },
    data() {
        return {
            tableprop: tableprops,
            tableData: [],
            tableColumns: [
                // {
                //     type: 'selection',
                //     width: 60,
                //     align: 'center'
                // },
            ],
            total: 0,
            currentPage: 1,
            param:{},
            querylist:[],
            optionMap:{},
            selectdata:[],
        }
    },
    methods: {
        changePage(pagesize, param = {}) {//切换页码
            let params = {
                pageSize: 10,
                pageNo: pagesize,
                ...param
            }
              if(this.editid){
                console.log(this.editid);
                  params.account_id=this.editid
                  this.$get(this.tableprop.tableprops[this.attribute].gettablelist, params).then(res => {
                      if (res.data.success) {
                        console.log(res.data.data.result);
                          this.$store.state.tableselect.tableData = res.data.data.result;
                          this.total = res.data.data.totalCount
                          this.$store.state.tableselect.temptabledata = []
                      }
                  })
              }

        },
        rowClick(data,index){
            // console.log(data,index)
             this.$refs.table.toggleSelect(index);
         },
        selectRow(selection) {//表格选中事件
            this.$store.state.tableselect.temptabledata = selection;
        },
        checkselect() {//验证表格是否选中一条数据
            this.$store.state.tableselect.temptabledata.length != 1 && this.$Message.warning('请选择一条数据进行操作')
            return this.$store.state.tableselect.temptabledata.length == 1 ? true : false
        },
        getselectdata(code){
            this.$get(this.GLOBAL.API_DIC_GETBYCODE,{codetype:code}).then(res=>{
                if(res.data.success){
                    this.selectdata=  res.data.data;
                }
            })
        },
        getinput(Columns){
            Columns.map((item,ind)=>{
                if(item.title=='操作'){
                    item.render=(h,params) => {
                      if(!this.disabled){
                        return h('Button', {
                                   props: {
                                       type: 'error',
                                       size: 'small'
                                   },
                                   on: {
                                       click: () => {
                                           this.remove(params.index)
                                       }
                                   }
                               },'删除')
                             }
                       }
                }else if(item.title=='联系人类型'){
                    item.render=(h,params) => {
                        return h('Select', {
                            props:{
                                value:  this.$store.state.tableselect.tableData[params.index][item.key],
                                disabled:this.disabled
                            },
                            style: {
                               width:"100%"
                            },
                            on: {
                                    'on-change':(event) => {
                                        this.$store.state.tableselect.tableData[params.index][item.key]=event;
                                        // this.$store.state.tableselect.tableData=this.tableData;
                                    }
                            },
                        },
                        this.selectdata.map(temp=>{
                            return [h(
                            "Option",
                            {
                              props: {
                                value: temp.key,
                                key: temp.key
                              }
                            },temp.name)]
                        })
                      );
                    }
                }else{
                    item.render=(h,params) => {
                     return h('Input',{
                           props: {
                            value:this.$store.state.tableselect.tableData[params.index][item.key],
                            size:'small',
                            disabled:this.disabled
                            },
                            on: {
                                'on-blur': (event) => {
                                      this.$store.state.tableselect.tableData[params.index][item.key] = event.target.value;
                                    // this.$store.state.tableselect.tableData=this.tableData;
                                },
                            },
                        })
                    }
                }


            })
        },
        addList(){
            this.$store.state.tableselect.tableData.push({})
        },
        remove(index){
            this.$store.state.tableselect.tableData.splice(index,1)
        },
    },
    created() {
        this.$store.state.tableselect.temptabledata = []
        // this.tableColumns = [{ type: 'selection', width: 60, align: 'center' }]
        this.tableColumns = this.tableColumns.concat(this.tableprop.tableprops[this.attribute].cloumn);
        this.tableprop.tableprops[this.attribute].gettablelist && this.changePage(1)
        this.getselectdata('CONTRACT_TYPE')
        this.getinput(this.tableColumns)
    }
}
