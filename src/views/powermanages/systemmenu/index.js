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
            menuinfo: {
                menuName: '',
                menuUrl: '',
                orders: ''
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
        updateList(menuId){
         this.getList(menuId)
        },
        getList(menuId){
            let params={
                menuId:menuId,
            }
            this.$get(this.GLOBAL.API_LISTALL, params).then(res => {
                if (res.data.success) {
                    this.tableData = res.data.data
                }
            })
        },
        changePage(val) {//切换页码
            this.currentPage=val;
        },
        selectRow(selection){
            this.selectionList=selection;
        },
        newaddFun() {
            this.id ? this.$refs.newaddModal.getnewaddModal('新增', this.menuinfo) : this.$Message.error('请选择父级节点')
        },
        editFun() {
            this.id && this.id != 0 ? this.$refs.newaddModal.getnewaddModal('修改', this.menuinfo) : this.$Message.error('请选择节点,根节点不可修改')
        },
        deleteFun() {
            if (this.id) {
                let ChildData = {
                    url: this.GLOBAL.API_DELETEMENU,
                    deleteId: this.id,
                    parameterName: 'menuId',
                    pageName: 'systemmenu'
                }
                this.$refs.deleteModal.getdeleteModal(ChildData);
            } else {
                this.$Message.error('请选择节点')
            }
        },
        updatedelete(id) {
            this.treedelete(this.treedata, id)
            this.getList(this.id)
        },
        updateaddtree(pid, id) {
            this.treeadd(this.treedata, pid, id)
        },
        treeadd(arr, pid, id) {
            let params = {
                menuId: id
            }
            if (pid == 0) {
                this.$get(this.GLOBAL.API_MENUSINGLE, params).then(res => {
                    if (res.data.success) {
                        arr[0].expand = true
                        !arr[0].children && (arr[0].children =[])
                        arr[0].children.push({ checked: false, expand: false, id: res.data.data.menuId, title: res.data.data.menuName, children: [] })
                        
                    }
                })
                return false
            } else {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].id == pid) {
                        this.$get(this.GLOBAL.API_MENUSINGLE, params).then(res => {
                            if (res.data.success) {
                                arr[i].expand = true
                                arr[0].expand = true
                                !arr[0].children && (arr[0].children =[])
                                arr[i].children.push({ checked: false, expand: false, id: res.data.data.menuId, title: res.data.data.menuName, children: [] })
                                
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
                if (arr[i].id == id) {
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
                if (arr[i].id == id) {
                    this.$get(this.GLOBAL.API_MENUSINGLE, { menuId: id }).then(res => {
                        if (res.data.success) {
                            arr[i].title = res.data.data.menuName
                            arr[i].id = res.data.data.menuId
                            this.menuinfo = res.data.data
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
            this.id = data[0] ? data[0].id : '';
            let params = {
                menuId: data[0] ? data[0].id : ''
            }
            if (data[0] && data[0].id == 0) {
                this.menuinfo = {menuId:data[0].id}
            }
            if (data[0] && data[0].id != 0) {
                this.$get(this.GLOBAL.API_MENUSINGLE, params).then(res => {
                    if (res.data.success) {
                        this.menuinfo = res.data.data
                    }
                })
                this.$get(this.GLOBAL.API_LISTALL, params).then(res => {
                    if (res.data.success) {
                        this.total=0,
                        this.currentPage=1,
                        this.pagesize=10,
                        this.tableData = res.data.data
                        this.total=res.data.data.length;
                    }
                })
            }
        },
        gettreedata() {
            this.$get(this.GLOBAL.API_MENULIST).then(res => {
                if (res.data.success) {
                    res.data.data[0].expand = true
                    this.treedata = JSON.parse(JSON.stringify(res.data.data))
                }
            })
        }
    },
    created() {
        this.gettreedata()
    }
}
