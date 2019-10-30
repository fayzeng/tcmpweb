import itable from '@/components/Table/index.vue'
import addOrgModal from '@/components/componentsModal/addOrg/addOrg.vue';
import deleteModal from '@/components/componentsModal/deleteModal/deleteModal.vue'

export default {
    name: 'organize',
    components:{
        itable,
        addOrgModal,
        deleteModal,
    },
  data(){
    return {
      showinfo:'',
      groupId:'',
      treedata:[],
      groupinfo:{groupCode:'',groupName:'',type:'',mGroupId:'',header:'',leader:'',isVirtual:'',},
      directorList:[],
      tableData:[],
      tableColumns:[
        {title: '岗位',key:'gradeName' },
        {title: '部门',key:'groupName' },
        {title: '上级岗位',key:'pid' },
        {title: '描述',key:'description'}
      ],
      datainfo:{
        input1:''
      },
      searchval:'',
      treeList:[],
    }
  },
  methods:{
    selecttree(data){
          this.groupId=data[0]?data[0].groupId:''
          let groupId=data[0]?data[0].groupId:(data.groupId?data.groupId:'')
          this.$refs.tablelist.search({pid:groupId})
        //   if(this.treedata.length==0){
        //     this.showinfo=data[0]?'companyName':''
        //     this.$post(this.GLOBAL.API_COMPANY_INFO,{id:data[0].groupId}).then(res=>{
        //       if(res.data.success){
        //         this.datainfo=res.data.data;
        //       }
        //   })
        //   }else{
        //      this.showinfo=data[0]?'dpidName':''
        //     this.$post(this.GLOBAL.API_QUERY_ID,{groupId:data[0].groupId}).then(res=>{
        //       if(res.data.success){
        //         this.datainfo=res.data.data;
        //       }
        //    })
        //   }
        //   this.$post(this.GLOBAL.API_QUERYID_DPIDPOST,{groupId:data[0].groupId}).then(res=>{
        //     if(res.data.success){
        //       this.tableData=res.data.data;
        //     }
        // })
    },
    deleteFun(){
      if(this.groupId){
        let ChildData={
            url:this.GLOBAL.API_DELETE_DEPARTMENT,
            deleteId:this.groupId,
            parameterName:'groupId',
            pageName:'organization'
            }
            this.$refs.deleteModal.getdeleteModal(ChildData);
        }else{
            this.$Message.error('请选择节点')
        }
    },
    updatedelete(id){
      this.treedelete(this.treedata,id)
      this.groupId=''
    },
    treedelete(arr,id){
      for(let i = 0;i<arr.length;i++){
          if(arr[i].groupId == id){
              arr.splice(i,1)
              return false
          }else{
              if(arr[i].children && arr[i].children.length){
                  this.treedelete(arr[i].children,id)
              }
          }
      }
    },
    showAddOrgModal(){
       //this.$refs.addOrgModal.getaddOrgModal(1,this.groupId,this.showinfo)
    },
    updateaddtree(pid,id){
       this.treeadd(this.treedata,pid,id)
    },
   treeadd(arr,pid,id){
    for(let i = 0;i<arr.length;i++){
        if(arr[i].groupId == pid){
            let params ={
              groupId:id
            }
            this.$get(this.GLOBAL.API_QUERY_ID,params).then(res=>{
                if(res.data.success){
                    arr[i].expand = true
                    arr[i].children.push({checked:false,expand:false,groupId:res.data.data.groupId,title:res.data.data.groupName,children:[]})
                }
              })
            return false
        }else{
            if(arr[i].children && arr[i].children.length){
                this.treeadd(arr[i].children,pid,id)
            }
        }
    }
},
    editFun(){
      this.groupId ? this.$refs.addOrgModal.getaddOrgModal(0,this.groupId,this.showinfo) : this.$Message.error('请选择父级节点')
    },
    updatedittree(id){
      this.edittree(this.treedata,id)
    },
    edittree(arr,id){
      for(let i = 0;i<arr.length;i++){
          if(arr[i].groupId == id){
              this.$get(this.GLOBAL.API_QUERY_ID,{groupId:id}).then(res=>{
                  if(res.data.success){
                      arr[i].title=res.data.data.groupName
                      arr[i].groupId=res.data.data.groupId
                      this.groupinfo=res.data.data;
                    //  this.datainfo=res.data.data;
                    // this.datainfo.isVirtual=this.datainfo.isVirtual=='1'?'是':'否';
                  }
              })
              return false
          }else{
              if(arr[i].children && arr[i].children.length){
                  this.edittree(arr[i].children,id)
              }
          }
      }
    },
    gettreeList(arr){
      for(let i =0; i<arr.length;i++){
          if(arr[i].title){
              this.treeList.push({groupId:arr[i].groupId,title:arr[i].title})
              if(arr[i].children && arr[i].children.length ){
                  this.gettreeList(arr[i].children)
              }
          }
      }
  },
    treeselected(arr,id){
        arr.map((item,ind)=>{
            if(item.groupId==id){
                this.$set(item,'selected',true)
                this.$set(item,'expand',true)
                this.selecttree(item)
            }
            if(item.groupId!=id){
                this.$set(item,'selected',false)
                this.$set(item,'expand',true)
            }
            if(item.children && item.children.length ){
                this.treeselected(item.children,id)
            }

        })
    },
    changeval(){
        this.treeselected(this.treedata,this.searchval)
    },
    opentreedata(){
      this.treedata = this.treeChangeExpand(this.treedata, true);
    },
    treeChangeExpand(treeData, flag) {
      for (var i = 0; treeData && i < treeData.length; i++) {
          this.$set(treeData[i],'expand',flag); //重要！用set方法
        if (treeData[i].children) {
          treeData[i].children = this.treeChangeExpand(treeData[i].children,flag);
        }
      }
      return treeData;
    },
    shrink(){
      this.treedata = this.treeChangeExpand(this.treedata, false);
    },
    Refresh(){
      this.gettreedata(0)
    },
    gettreedata(status){
      this.$post(this.GLOBAL.API_QUERY_TREELIST).then(res=>{
          if(res.data.success){
           this.treedata =JSON.parse(JSON.stringify(res.data.data).replace(/groupName/g,"title"))
           if(status){
            this.gettreeList(this.treedata)
           }
           this.opentreedata()
          }
      })
    },
  },
  created(){
    this.gettreedata(1)
    this.$post(this.GLOBAL.API_QUERY_TREELIST).then(res=>{
       if(res.data.success){
          this.treedata =JSON.parse(JSON.stringify(res.data.data).replace(/groupName/g,"title"));
          if(this.treedata.length==0){
            this.showinfo='companyName';
            this.$store.state.tableselect.company=true;
          }else{
            this.showinfo='dpidName';
            this.$store.state.tableselect.company=false;
          }
          this.opentreedata()
       }
    })
  }
}
