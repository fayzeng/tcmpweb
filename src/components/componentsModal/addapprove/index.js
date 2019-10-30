export default {
    data(){
        return{
          flag:false,
          modelId:'',
          modalflag:false,
          code:['PROCESS_CATEGORY','SYS_ACT_TYPE'],
          formItem:{
            type:[],
            sys_act_type:"",
            key:'',
          },
          values:[],
          typearr:[],
          acttypearr:[],
          rules: {
            type: [
              { required: true, message: ' ', trigger: 'focus' }
            ],
            sys_act_type: [
              { required: true, message: ' ', trigger: 'focus' }
            ],
            key: [
              { required: true, message: ' ', trigger: 'change' }
            ],
        }
        }
    },
    methods:{
      Reset(){
        this.formItem={
          type:'',
          sys_act_type:"",
          key:''
        }
      },
      changevalue(value, selectedData){
        if(value.length==2){
           this.formItem.type=value[1];
        }else{
          this.formItem.type=value[0];
        }
      },
      confirm(name){
        if(this.flag){
          if(!this.formItem.type){
            this.$Message.error('请选择工作流分类')
          }else if(this.formItem.sys_act_type.length<1){
            this.$Message.error('请选择入口')
          }else if(!this.formItem.key){
            this.$Message.error('请输入键值')
          }else{
           this.$post(this.GLOBAL.API_EDIT_CATEGORY,{category:this.formItem.type,modelId:this.modelId,sys_act_type:this.formItem.sys_act_type,key:this.formItem.key}).then(res=>{
                if(res.data.success){
                    this.$Message.success('修改成功')
                    this.modalflag =false;
                    this.$emit('changpage')
                }
            }) 
          }
        }else{
            if(!this.formItem.type){
              this.$Message.error('请选择工作流分类')
            }else if(!this.formItem.sys_act_type||this.formItem.sys_act_type.length<1){
              this.$Message.error('请选择入口')
            }else if(!this.formItem.key){
              this.$Message.error('请输入键值')
            }else{
              this.$router.push({ name: 'workflowseting',query:{type:this.formItem.type,sys_act_type:this.formItem.sys_act_type,key:this.formItem.key}})
            }
             
        }
      },
      openmodel(rowdata) {
        this.formItem.type =''
        this.formItem.sys_act_type =''
        this.formItem.key =''
        this.modelId = '';
        this.values=[];
        this.code.map(item=>{
           this.$get(this.GLOBAL.API_DIC_GETBYCODE,{codetype:item}).then(res=>{
                if(res.data.success){
                  if(item=='PROCESS_CATEGORY'){
                   // this.typearr = res.data.data;
                   this.typearr=JSON.parse(JSON.stringify(res.data.data).replace(/name/g,'label').replace(/key/g,'value'))
                   
                  }else if(item=='SYS_ACT_TYPE'){
                    this.acttypearr = res.data.data;
                  } 
                } 
           })
        })
        setTimeout(() => {
           if(rowdata){
            this.formItem.type =rowdata.category;
            this.formItem.sys_act_type=rowdata.sys_act_type;
            this.formItem.key=rowdata.key;
            this.modelId = rowdata.id;
            this.typearr.map(item=>{
              if(item.value==rowdata.category){
                this.values.push(item.value);
              }else{
                item.children.map(temp=>{
                  if(temp.value==rowdata.category){
                    this.values.push(item.value)
                    this.values.push(temp.value)
                  }
                }) 
              }
            })
            this.flag =true;
          }else{
            this.flag =false
          }
          this.modalflag = true;
        }, 150);
       
      }
    }
}