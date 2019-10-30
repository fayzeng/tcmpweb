import moment from 'moment'
import tableModal from '@/components/componentsModal/tableModal/index.vue';
export default {
  components: {
    tableModal
  },
  data() {
    return {
      url:this.baseURL + this.GLOBAL.API_FILEMANAGE_UPLOAD +  '?sys_tokenId=' +  sessionStorage.getItem('cookieaccess_token'),
      imgparam:{type:'1'},
      imgName: '',
      visible: false,
      uploadList: [],
      modaltitle: '',
      loading:false,
      istatusarr:[
        {value:'1',label:'是'},
        {value:'0',label:'否'}
      ],
      modalflag: false,
      single: false,
      postList:[],
      groupList:[],
      Modalform: {
        signId:null,name: '', userName: '', idNumber: '', isLeader: '0', status: '', phone: '', telPhone: '', qualification: '', effectiveDate: '',
        fax:'',certLevelName:'',certLevelNo:'',groupId:'',isDirector:'0'
      },
      ModalRule: {
        name: [
          { required: true, message: ' ', trigger: 'blur' }
        ],
        // name: [
        //   { required: true, message: '请输入姓名', trigger: 'focus' }
        // ],
        // groupId:[
        //   { required: true, message: '请选择部门', trigger: 'focus'}
        // ],
        // userName: [
        //   { required: true, message: '请输入员工号', trigger: 'focus'}
        // ],
        // telPhone: [
        //   // { required: false,validator: validatorMobilePhone},
        // ],
        // idNumber:[
        //   // {required: false, validator: validatorIdCard},
        // ]

      },
      propname:'',
      gradeName:'',
      groupName:'',
      userStatus:[],
      optionDate: {
        disabledDate (date) {
            return date && date.valueOf() < Date.now() - 86400000;
        }
      }
    }
  },
  methods: {
     handleError(){
       this.$Message.warning('上传失败');
     },
     handleView (name) {
         this.imgName = name;
         this.visible = true;
     },
     handleRemove (index) {
         this.uploadList.splice(index,1)
         this.Modalform.signId = null
     },
     handleSuccess (res, file) {
        this.Modalform.signId = res.data
     },
     handleFormatError (file) {
         this.$Message.warning('格式不正确');
     },
     handleBeforeUpload (file) {
       const reader = new FileReader()
       reader.readAsDataURL(file)
       reader.onload = () => {
         const _base64 = reader.result
         this.uploadList.push({status:'finished',name:file.name,url:_base64})
       }
     },
    reset(){
      this.uploadList =[]
      this.Modalform={
          signId:null,name: '', userName:this.Modalform.userName, idNumber: '', isLeader: '0', status: '', phone: '', telPhone: '', qualification: '', effectiveDate: '',
          fax:'',certLevelName:'',certLevelNo:'',groupId:'',isDirector:'0'
        }
      this.groupName=''
    },
    getaddUser(status) {
      this.getUserStatus()
      this.modalflag = true;
      this.groupName=this.$store.state.tableselect.department.groupName;
      if (status) {
        this.modaltitle = '新增员工'
         this.Modalform = { signId:null,name: '', userName: '', idNumber: '', isLeader:'0', status: '', phone: '', telPhone: '', qualification: '', effectiveDate: '',
           fax:'',certLevelName:'',certLevelNo:'',groupId:this.$store.state.tableselect.department.groupId,isDirector:'0',};
      console.log(this.Modalform.groupId,this.$store.state.tableselect.department.groupId)
          this.uploadList = []
      } else {
        this.modaltitle = '修改员工信息'
        let params = {
          userId: this.$store.state.tableselect.selectdata[0].userId
        }
        this.$post(this.GLOBAL.API_TOALTER,params).then( async res => {
          if (res.data.success) {
            this.uploadList = []
            res.data.data.userId=String(res.data.data.userId)
            let obj = res.data.data
            this.gradeName = obj.gradeName
            this.groupName = obj.groupName
            this.Modalform =  {signId:obj.signId,userId:obj.userId, name: obj.name, userName: obj.userName, idNumber: obj.idNumber, isLeader:obj.isLeader, status: obj.status, phone: obj.phone, telPhone: obj.telPhone, qualification: obj.qualification, effectiveDate: obj.effectiveDate?moment(obj.effectiveDate,'YYYYMMDD').format('YYYY-MM-DD'):new Date(),
             fax:obj.fax,certLevelName:obj.certLevelName,certLevelNo:obj.certLevelNo,groupId:obj.groupId,gradeId:obj.gradeId,isDirector:obj.isDirector};
             if(this.Modalform.signId){
                // this.$get(this.baseURL + 'tcmp/manage/file-manage!showImg.action',{fileId:1402})
                this.uploadList.push({status:'finished',name:'签名',url:this.baseURL + 'tcmp/manage/file-manage!showImg.action' + '?sys_tokenId=' +  sessionStorage.getItem('cookieaccess_token') + '&fileId=' + this.Modalform.signId})
                console.log(this.uploadList[0].url);
             }
          }
        })
      }
    },
    validatorCard(){
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if(!this.Modalform.idNumber){
          this.$Message.error('身份证号不能为空')
          return false
      }else if(reg.test(this.Modalform.idNumber) === false){
            this.$Message.error('请输入正确的身份证号')
          return false
      } else {
        return true
      }
    },
    validatorPhone(){
      if(!this.Modalform.telPhone){
          this.$Message.error('手机号码不能为空')
          return false
      }else if(!(/^1[3456789]\d{9}$/.test(this.Modalform.telPhone))){
          this.$Message.error('请输入正确的手机号码')
          return false
      } else {
          return true
      }
    },
    confirm(name) {
      if(!this.Modalform.name){
        this.$Message.error('用户姓名不能为空')
      }else if(!this.Modalform.userName){
        this.$Message.error('登录帐号不能为空')
      }else if(!this.validatorCard()){
      }else if(!this.validatorPhone()){
      }else if(!this.groupName){
        this.$Message.error('所属部门不能为空')
      }else{
            this.loading=true;
            if(this.Modalform.effectiveDate instanceof Date){
                this.Modalform.effectiveDate =moment(this.Modalform.effectiveDate).format('YYYYMMDD')
            }else  if(this.Modalform.effectiveDate.indexOf('-') !=-1){
                this.Modalform.effectiveDate=  this.Modalform.effectiveDate.replace(/-/g, '');
            }
            if (this.modaltitle == '新增员工') {
              this.$post(this.GLOBAL.API_ADD_USERSAVE, this.Modalform).then(res => {
                this.loading=false
                if (res.data.success) {
                  this.modalflag = false;
                  this.$Message.success('保存成功')
                  this.$emit('changpage')
                }
              }).catch(()=>{ this.loading=false })
            } else if (this.modaltitle == '修改员工信息') {
              this.$post(this.GLOBAL.API_EDITUSER, this.Modalform).then(res => {
                 this.loading=false
                if (res.data.success) {
                  this.modalflag = false;
                  this.$Message.success('保存成功')
                  this.$emit('changpage')
                }
              }).catch(()=>{ this.loading=false })
            }
        }
    },
    Close() {
      this.modalflag = false;
    },
    search(field){
      if(field == '1'){
          this.propname = 'department'
      }else{
          this.propname = 'sonpost'     //根据部门查询部门下的岗位
          if (!this.Modalform.groupId) {
            this.$Message.warning('请先选择部门')
            return;
          }
      }
      if(this.modaltitle=='新增员工'){
          this.$refs.tableModal.showModal(field,'新增',this.Modalform.groupId);
      }else if(this.modaltitle=='修改员工信息'){
          this.$refs.tableModal.showModal(field,'修改',this.$store.state.tableselect.selectdata[0].groupId);
      }

    },
    updatedata(field){
      if(field=='groupId'){
          this.Modalform.groupId=this.$store.state.tableselect.rowtabledata[0].groupId;
          this.groupName=this.$store.state.tableselect.rowtabledata[0].groupName;
      }
      else if(field=='pid'){
          this.Modalform.gradeId=this.$store.state.tableselect.rowtabledata[0].gradeId;
          this.gradeName=this.$store.state.tableselect.rowtabledata[0].gradeName;
      }
  },
  getUserStatus(){
    const url = this.GLOBAL.API_DIC_GETBYCODE
    this.$post(url,{codetype:'USER_STATUS'}).then(res=>{
      if(res.status == 200){
          const ret = res.data
          if (ret.success) {
              const options = ret.data.map(item => ({label:item.name,value:item.key}))
              this.userStatus = options   //状态
          } else {
              // this.$Message.error(ret.message)
          }
      }
  })
  }
  },
  created() {

  }
}
