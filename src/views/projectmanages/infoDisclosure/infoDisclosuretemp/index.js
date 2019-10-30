import deletemodal from'@/components/componentsModal/deleteModal/deleteModal.vue'
export default {
    name:'infoDisclosuretemp',
    components:{
      deletemodal,
    },
    data(){
      return {
        inforarr:[],
        modalflag:false,
        checkAllGroup:[],
        addtypeflag:false,
        typename:'',
        addttemplate:false,
        typelist:[],
        isenablelist:[{key:'0',value:'否'},{key:'1',value:'是'}],
        isenable:'0',
        createType:'',
        tempName:'',
        param_fileid:[],
        typeid:'',
        rule:{
          name: [
              { required: true, message: ' ', trigger: 'focus' }
          ],
        },
        url:this.fileURL +  '?sys_tokenId=' +  sessionStorage.getItem('cookieaccess_token'),
      }
    },
    methods:{
        // paramError(){
        //
        // },
        // paramSuccess(){
        //
        // },
      contentError(){
          this.$Message.error('上传失败')
      },
      contentSuccess(response, file, fileList){
          console.log(response);
          this.param_fileid.push(response.data)
          this.$Message.success('上传成功')
      },
      addtemp(){
          let params ={
            create_type:this.createType,
            param_fileid:this.param_fileid.join(','),
            temp_name:this.tempName,
            isenable:this.isenable,
            type_id:this.typeid
          }
          this.$post(this.GLOBAL.API_SAVEINFOPUBTEMP,params).then(res=>{
              if(res.data.success){
                  this.addttemplate = false
                  this.getinfopubtemplate()
              }
          })
      },
      addtype(ele){
          this.typename = ''
          this.addtypeflag  = true
      },
      confirmtype(){
        this.$post(this.GLOBAL.API_SAVE_INFOPUBTTYPE,{typename:this.typename}).then(res=>{
            if(res.data.success){
                this.$Message.success('保存成功')
                this.addtypeflag  = false
                this.getinfopubtemplate()
            }
        })
      },
      deltype(){
          if(this.checkAllGroup.length!=1){
              this.$Message.error('请选择一条数据进行操作')
          }else{
            this.$refs.deletemodal.showModal({
                url: this.GLOBAL.API_DEL_INFOPUBTEMP,
                parameterName: 'id',
                deleteId: this.checkAllGroup[0],
                pageName: 'infoDisclosuretemp',
            })
          }
      },
      typemanage(){
          this.modalflag = true
      },
      add(obj){
          this.createType=''
          this.param_fileid=[]
          this.tempName=''
          this.typeid = obj.id
          this.addttemplate = true
      },
      edit(ele){
          this.$get(this.GLOBAL.API_INFO_INFOPUBTTEMP,{id:ele.id}).then(res=>{

          })
      },
      updatedelete(){
        this.getinfopubtemplate()
        this.checkAllGroup =[]
      },
      deltemplate(ele){
        console.log(ele);
        this.$refs.deletemodal.showModal({
            url: this.GLOBAL.API_DEL_INFOPUBT,
            parameterName: 'id',
            deleteId: ele.id,
            pageName: 'infoDisclosuretemp',
        })
      },
      checkenable(ele,flag){
          console.log(ele);
          console.log(flag);
      },
      getinfopubtemplate(){
          let params ={pageSize: 10,pageNo: 1,}
          this.$get(this.GLOBAL.API_GET_INFOPUBETMPLATE,params).then(res=>{
              if(res.data.success){
                  let arr =res.data.data.result
                  arr.forEach(ele=>{
                      ele.templates.forEach(son=>{
                          son.isenable = son.isenable == 1  ? true : false
                          son.isdeault = son.isdeault == 1  ? '是' : '否'
                      })
                  })
                  console.log(arr);
                  this.inforarr = arr
              }
          })
      }
    },
    created(){
      this.getinfopubtemplate()
    }
  }
