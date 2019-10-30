import itable from '@/components/Table/index.vue'
export default {
    name:'usersetting',
    components:{
        itable   
    },
    props:{
        tableattr:String
    },
    data () {
        return {
            treedata:[],
            searchval:'',
            treeList:[],
            //tableattr:'usersetting'
        }
    },
    methods: {
        selecttree(data){
            let groupId=data[0]?data[0].groupId:(data.groupId?data.groupId:'')
            this.$refs.tablelist.search({groupId:groupId})
            window.sessionStorage.setItem('groupId',groupId)
            this.$store.state.tableselect.department.groupId=groupId;
            this.$store.state.tableselect.department.groupName=data[0]?data[0].title:'';
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
        opentreedata(){
            this.treedata = this.treeChangeExpand(this.treedata, true);
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
        }
    },
    created(){
     this.gettreedata(1)
    }
};
