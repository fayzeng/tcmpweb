export default {
    data(){
        return{
          loading:false,
          modalflag:false,
          // accountflag:false,
          formItem:{
            tittle:'',
            // model_type:'',
            processDefinitionId:'',
            service_code:'',
            text:''
          },
          typearr:[
            {
              label:'银行账户',
              key:'TAccountBankCreateService'
            },
            {
              label:'资金账户',
              key:'TAccountCapitalCreateService'
            },
            {
              label:'股东账户',
              key:'TAccountFundPrintService'
            },
            {
              label:'基金账户',
              key:'TAccountShareholderCreateService'
            }
          ],
          rules: {
            tittle: [
              { required: true, message: '请输入标题', trigger: 'change' }
            ],
            model_type: [
              { required: true, message: '请选择类型', trigger: 'change' }
            ],
            text: [
                { required: true, message: '请输入正文', trigger: 'change' }
            ],
        }
        }
    },
    methods:{
      confirm(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
           this.loading =true
          //  this.formItem.service_code = this.formItem.model_type
            this.$post(this.GLOBAL.API_APPROVE_START,this.formItem).then(res=>{
              if(res.data.success){
                  this.loading =false
                  this.$Message.success(res.data.message)
                  this.modalflag = false
              }else{
                  this.loading =false
              }
            }) 
          }
      })
      
         
      },
      openmodel(id){
        this.formItem={
          tittle:'',
          // model_type:'',
          processDefinitionId:'',
          service_code:'',
          text:''
        }
        // this.$post(this.GLOBAL.API_GET_STARTFOEM,{processDefinitionId:id}).then(res=>{
        //   if(res.data.data){
        //     this.accountflag = true
        //   }else{
        //     this.accountflag = false
        //   }
        // })
        this.formItem.processDefinitionId = id
        this.modalflag = true
      }
    }
}