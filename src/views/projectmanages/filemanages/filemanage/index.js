import itable from '@/components/Table/index.vue'

export default {
    name:'postsetting',
    components:{
        itable
    },
    props:{
        paramobj:null,
    },
    data () {
        return {
            treedata:[],
            searchval:'',
            treeList:[],
            flag:false,
        }
    },
    methods: {
        selecttree(data){
            console.log(data)
            this.$store.state.tableselect.singletreedata=data[0];
            let sft_id=data[0]?data[0].sft_id :( data?data.sft_id:'')
            this.$refs.tablelist.search({filetype:sft_id})
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
            this.$get(this.GLOBAL.API_TREE_LIST).then(res=>{
                if(res.data.success){
                    this.treedata =JSON.parse(JSON.stringify(res.data.data).replace(/type_name/g,"title"))
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
                    this.treeList.push({sft_id:arr[i].sft_id,title:arr[i].title})
                    if(arr[i].children && arr[i].children.length ){
                        this.gettreeList(arr[i].children)
                    }
                }
            }
        },
        treeselected(arr,id){
            arr.map((item,ind)=>{
                if(item.sft_id==id){
                    this.$set(item,'selected',true)
                    this.$set(item,'expand',true)
                    this.selecttree(item)
                }
                if(item.sft_id!=id){
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
     this.$store.state.tableselect.paramobj=this.paramobj;
     if(this.paramobj){
         this.flag=true;
     }else{
        this.flag=false;
     }
    }

};
