import deleteModal from '@/components/componentsModal/deleteModal/deleteModal.vue'
import addType from '@/components/componentsModal/addType/index.vue'
import newaddModal from './components/newaddModal.vue'
export default {
    components: {
        deleteModal,
        newaddModal,
        addType
    },
    data() {
        return {
            treedata: [],
            selectionList:[],
            fileinfo: {
                type_name: '',
                pid: '',
                mark: ''
            },
            id: '',
            total:0,
            currentPage:1,
            pagesize:10,
            tableData:[],
            tableColumns:[
                { type: 'selection', width: 60, align: 'center' },
                {title: '权限名',key:'actionName'},
                {title: 'url',key:'actionPath'},
                {title: '类型',key:'actionType', render: (h, params) => {
                    var name = ''
                    if(params.row.actionType == 2){
                        name = '按钮'
                    }else{
                        name = '权限'
                    }
                    return h('div',[
                        h('span', {
        
                        }, name)
                    ]); 
                }
            },
            ]
        }
    },
    methods: {
        addType(){
            this.id && this.id != 0 ? this.$refs.addType.showModal('新增', this.id) : this.$Message.error('请选择节点,根节点不可新增')
        },
        editType(){
            this.id && this.id != 0&& this.selectionList.length==1? this.$refs.addType.showModal('修改', this.id,this.selectionList) : this.$Message.error('请选择一条数据进行操作')
        },
        deleteType(){
            this.id && this.id != 0&& this.selectionList.length==1? this.$refs.deleteModal.getdeleteModal({url: this.GLOBAL.API_DELETE_POWER,
                deleteId: this.selectionList,
                parameterName: 'actionids',
                pageName: 'systemmenutable'}) : this.$Message.error('请选择一条数据进行操作')
        },
        // updateList(sft_id){
        //  this.getList(sft_id)
        // },
        // getList(sft_id){
        //     let params={
        //         sft_id:sft_id,
        //     }
        //     this.$get(this.GLOBAL.API_LISTALL, params).then(res => {
        //         if (res.data.success) {
        //             this.tableData = res.data.data
        //         }
        //     })
        // },
        changePage(val) {//切换页码
            this.currentPage=val;
        },
        selectRow(selection){
            this.selectionList=selection;
        },
        newaddFun() {
            this.id ? this.$refs.newaddModal.getnewaddModal('新增', this.fileinfo) : this.$Message.error('请选择父级节点')
        },
        editFun() {
            this.id && this.id != 5 ? this.$refs.newaddModal.getnewaddModal('修改', this.fileinfo) : this.$Message.error('请选择节点,根节点不可修改')
        },
        deleteFun() {
            if (this.id) {
                let ChildData = {
                    url: this.GLOBAL.API_DELETE_TREE,
                    deleteId: this.id,
                    parameterName: 'sft_id',
                    pageName: 'filetypemanage'
                }
                this.$refs.deleteModal.getdeleteModal(ChildData);
            } else {
                this.$Message.error('请选择节点')
            }
        },
        updatedelete(id) {
            this.treedelete(this.treedata, id)
            //this.getList(this.id)
        },
        updateaddtree(pid, id) {
            this.treeadd(this.treedata, pid, id)
        },
        treeadd(arr, pid, id) {
            let params = {
                sft_id: id
            }
            if (pid == 5) {
                this.$get(this.GLOBAL.API_QUERYID_TREE, params).then(res => {
                    if (res.data.success) {
                        arr[0].expand = true
                        !arr[0].children && (arr[0].children =[])
                        arr[0].children.push({ checked: false, expand: false, sft_id: res.data.data.sft_id, title: res.data.data.type_name, children: [] })
                        
                    }
                })
                return false
            } else {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].sft_id == pid) {
                        this.$get(this.GLOBAL.API_QUERYID_TREE, params).then(res => {
                            if (res.data.success) {
                                arr[i].expand = true
                                arr[0].expand = true
                                !arr[0].children && (arr[0].children =[])
                                arr[i].children.push({ checked: false, expand: false,sft_id: res.data.data.sft_id, title: res.data.data.type_name, children: [] })
                                
                            }
                        })
                        return false
                    } else {
                        if (arr[i].children && arr[i].children.length) {
                            this.treeadd(arr[i].children, pid, id)
                        }
                    }
                }
            }

        },
        treedelete(arr, id) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].sft_id == id) {
                    arr.splice(i, 1)
                    return false
                } else {
                    if (arr[i].children && arr[i].children.length) {
                        this.treedelete(arr[i].children, id)
                    }
                }
            }
        },
        updatedittree(id) {
            this.edittree(this.treedata, id)
        },
        edittree(arr, id) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].sft_id == id) {
                    this.$get(this.GLOBAL.API_QUERYID_TREE, { sft_id: id }).then(res => {
                        if (res.data.success) {
                            arr[i].title = res.data.data.type_name
                            arr[i].sft_id = res.data.data.sft_id
                            this.fileinfo = res.data.data
                        }
                    })
                    return false
                } else {
                    if (arr[i].children && arr[i].children.length) {
                        this.edittree(arr[i].children, id)
                    }
                }
            }
        },
        selecttree(data) {
            console.log(data)
            this.id = data[0] ? data[0].sft_id : '';
            let params = {
                sft_id: data[0] ? data[0].sft_id : ''
            }
            if (data[0] && data[0].sft_id == 0) {
                this.fileinfo = {sft_id:data[0].sft_id}
            }
            if (data[0] && data[0].sft_id != 0) {
                this.$get(this.GLOBAL.API_QUERYID_TREE, params).then(res => {
                    if (res.data.success) {
                        this.fileinfo = res.data.data
                    }
                })
            }
        },
        gettreedata() {
            this.$get(this.GLOBAL.API_TREE_LIST).then(res => {
                if (res.data.success) {
                    res.data.data[0].expand = true
                    this.treedata = JSON.parse(JSON.stringify(res.data.data).replace(/type_name/g,"title"))
                }
            })
        }
    },
    created() {
        this.gettreedata()
    }
}
