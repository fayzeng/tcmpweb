import moment from 'moment'
import tableModal from '@/components/componentsModal/tableModal/index.vue';
export default {
  components: {
    tableModal
  },
  data() {
    return {
      modaltitle: '',
      modalflag: false,
      loading:false,
      field:2,
      Modalform: {
        description:'',gradeName:'',groupName:'',pid:'',groupId:'',gradeCode:'',pName:''
      },
      groupId:'',
      pid:'',
      pidList:[],
      ModalRule: {
        gradeName: [
            { required: true, message: '', trigger: 'focus' }
          ],
          groupName: [
            { required: true, message: ' ', trigger: 'blur' }
          ],
          gradeCode:[
            { required: true, message: '', trigger: 'focus' }
          ],
      },
      propname:'postsetting'
    }
  },
  methods: {
    showModal(status) {
      this.modalflag = true;
    //   this.$post(this.GLOBAL.API_QUERYLIST_POST, this.Modalform).then(res => {
    //     if (res.data.success) {
    //         this.pidList=res.data.data.result;
    //     }
    //   })
      if (status) {
        this.modaltitle = '新增岗位'
         this.Modalform = {description:'',gradeName:'',groupName:'',pid:'',groupId:'',gradeCode:'',pName:''};
      } else {
        this.modaltitle = '修改岗位信息'
        this.Modalform={description:'',gradeName:'',groupName:'',pid:'',groupId:'',gradeCode:''};
        let params = {
            gradeId: this.$store.state.tableselect.selectdata[0].gradeId
        }
        this.$post(this.GLOBAL.API_QUERYID_POST,params).then(res => {
          if (res.data.success) {
            this.Modalform = JSON.parse(JSON.stringify(res.data.data));
            this.Modalform.pid=res.data.data.pName;
            this.Modalform.pName=res.data.data.pName;
            this.pid=res.data.data.pid;
          }
        })
      }
    },
    search(field){
        if(field == '1'){
            this.propname = 'department'
        }else{
            this.propname = 'postsetting'
        }
        if(this.modaltitle=='新增岗位'){
            this.$refs.tableModal.showModal(field,'新增','',this.Modalform.groupId);
        }else if(this.modaltitle=='修改岗位信息'){
        //  console.log(this.$store.state.tableselect.selectdata[0].gradeId)
            this.$refs.tableModal.showModal(field,'修改',this.$store.state.tableselect.selectdata[0].gradeId,this.Modalform.groupId);
        }
        
    },
    updatedata(field){
        if(field=='groupId'){
            this.Modalform.groupName=this.$store.state.tableselect.rowtabledata[0].groupName;
            this.Modalform.groupId=this.$store.state.tableselect.rowtabledata[0].groupId;
        }else if(field=='pid'){
            this.Modalform.pid=this.$store.state.tableselect.rowtabledata[0].gradeName;
            this.Modalform.pName=this.$store.state.tableselect.rowtabledata[0].gradeName;
            
          //  console.log(this.$store.state.tableselect.rowtabledata[0])
            this.pid=this.$store.state.tableselect.rowtabledata[0].gradeId;
        }
    },
    confirm(name) {
      if(!this.Modalform.gradeName){
        this.$Message.error('请输入岗位名称')
      }else if(!this.Modalform.groupName){
        this.$Message.error('请选择所属部门')
      }else{
        this.loading=true;
        if (this.modaltitle == '新增岗位') {
              let params=this.Modalform
            this.$post(this.GLOBAL.API_ADD_POST, params).then(res => {
                this.loading=false;
              if (res.data.success) {
                this.loading=false;
                this.modalflag = false;
                this.$Message.success('保存成功')
                this.$emit('changpage')
              }
            }).catch(()=>{ this.loading=false })
          } else if (this.modaltitle == '修改岗位信息') {
                this.Modalform.pid=this.pid;
            this.$post(this.GLOBAL.API_EDIT_POST, this.Modalform).then(res => {
                this.loading=false;
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
    Reset(){
      this.Modalform= {
        description:'',gradeName:'',groupName:'',gradeCode:this.Modalform.gradeCode,pName:''
      }
    }
  },
  created() {
  }
}
