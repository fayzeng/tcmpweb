export default {
    data(){
        return{
          url:this.baseURL + 'tcmp/workflow/model-add.action' +  '?sys_tokenId=' +  sessionStorage.getItem('cookieaccess_token'),
          flag:false,
          modelId:'',
          modalflag:false,
          code:['PROCESS_CATEGORY','SYS_ACT_TYPE'],
          formItem:{
            type:'',
            sys_act_type:"",
          },
          typearr:[],
          values:[],
          acttypearr:[],
          rules: {
            type: [
              { required: true, message: '请选择类型', trigger: 'change' }
            ],
        }
        }
    },
    methods:{
      changevalue(value, selectedData){
        if(value.length==2){
           this.formItem.type=value[1];
        }else{
          this.formItem.type=value[0];
        }
      },
      handleFormatError(){
        this.$Message.error('上传失败或文件类型不正确')
      },
      handleSuccess(){
        this.$Message.success('上传成功')
        this.modalflag =false
      },
      confirm(name){

      },
      openmodel(rowdata) {
        this.modalflag = true
        this.formItem.type =''
        this.formItem.sys_act_type =''
        this.modelId = '';
        this.code.map(item=>{
           this.$get(this.GLOBAL.API_DIC_GETBYCODE,{codetype:item}).then(res=>{
                if(res.data.success){
                  if(item=='PROCESS_CATEGORY'){
                  //  this.typearr = res.data.data;
                   this.typearr=JSON.parse(JSON.stringify(res.data.data).replace(/name/g,'label').replace(/key/g,'value'))
                  }else if(item=='SYS_ACT_TYPE'){
                    this.acttypearr = res.data.data;
                  }
                }
           })
        })
      }
    }
}
