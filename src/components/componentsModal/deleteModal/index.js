export default {
    data(){
        return{
          title:'',
          parentData:{},
          modalflag:false,
          formflag:true,
          queryForm:{},
          ruleCustom:{},
          loading:false,
          paramobj:{},
        }
    },
    methods:{
        getdeleteModal(data){
            this.modalflag=true;
            if(data.deleteId.constructor === Array){
              let arr=[]
              if(data.pageName=='postsetting'){
                data.deleteId.map((item,ind)=>{
                  arr.push(item.gradeId)
                })
              }else if(data.pageName=='systemmenutable'){
                data.deleteId.map((item,ind)=>{
                  arr.push(item.actionId)
                })
              }else{
                data.deleteId.map((item,ind)=>{
                  arr.push(item.userId)
                })
              }
              data.deleteId=arr.join(',')
              this.parentData=data;
            }else{
              this.parentData=data?data:'';
            }
            if(data.pageName=='Infrastructure'){
              this.$get(this.GLOBAL.API_GET_TEMP_FIELDLIST,{template_id:data.template_id}).then(res=>{
                if(res.data.success){
                  res.data.data.map(item=>{
                    if(item.field_type!='12'&&item.conceal=='1'&&item.disable_flag=='0'){
                      this.paramobj[item.field_code]='null';
                    }
                  })
                }
             })
            }
        },
        confirm(){
          this.loading=true;
            let url=this.parentData.url;
            let params={
                [this.parentData.parameterName]:this.parentData.deleteId
            }
            if(this.parentData.pageName=='Infrastructure'){
              params=this.paramobj;
              params[this.parentData.parameterName]=this.parentData.deleteId
            }
              this.$post(url,params).then(res=>{
                this.loading=false;
                if(res.data.success){
                    this.treedata = res.data.data
                    this.$Message.success('删除成功');
                    this.modalflag=false;
                    this.$store.state.tableselect.selectdata = []
                  if( this.parentData.pageName=='infoDisclosuretemp' || this.parentData.pageName=='systemmenu'||this.parentData.pageName=='organization'||this.parentData.pageName=='systemmenutable'||this.parentData.pageName=='filetypemanage'){
                    this.$emit('updatedelete',this.parentData.deleteId);
                  }else{
                    this.$emit('changpage')
                  }
                }
             }).catch(()=>{ this.loading=false })

        },
        Close(){
            this.modalflag=false;
        },
        showModal(data){
            this.modalflag=true;
            this.parentData = {
              ...data
            }
        }
}
}
