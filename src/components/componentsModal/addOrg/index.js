import moment from 'moment'
import selectModal from '@/components/componentsModal/selectModal/index.vue';

export default {
    components:{
      selectModal
    },
    data(){
      return {
        isEdit:true,
        modaltitle:'',
        modalflag:false,
        loading:false,
        single:false,
        showinfo:'',
        Modalform:{
            groupCode:'',groupName:'',type:'',pid:'',mGroupName:'',header:'',leader:'',isVirtual:'0',describe:'',
            com_name:'',jrxkzh:'',symjzc:'',symxtzzc:'',sjmjzc:'',sjmfxzb:'',shxydm:'',reg_capital:'',reg_area:'',establish_date:'',oper_state:'',legal_name:'',address:'',zipcode:'',describe:'',
        },
        ModalRule:{
          groupCode: [
            { required: true, message: ' ', trigger: 'blur' }
          ],
          groupName: [
            { required: true, message: ' ', trigger: 'blur' }
          ],
          header: [
            { required: true, message: ' ', trigger: 'blur' }
          ],
        },
        typeList:[],
        pidList:[],
        directorList:[],
        userList:[],
        groupId:"",
        flag:false,
        propname:'',
        pName:'',  //上级名称
        mGroupName:'',  //主管组织名称
        headerName:'', //责任人
        leaderName:'', //分管领导
        assistLeaderName:'',//协管领导
      }
    },
    methods:{
        getaddOrgModal(status,groupId,flag){
          this.flag=flag;
          this.groupId=groupId;
          this.getuserList();
          this.getpidList();
          this.modalflag=true;
          if(status==1){
            this.Modalform={ groupCode:'',groupId:'',pid:'',pName:'',type:'',mGroupId:'',mGroupName:'',header:'',leader:'',assistLeader:'',isVirtual:'0',describe:''}
            this.Reset()
            if(flag){
              this.modaltitle='新增公司'
              //this.showinfo='companyName';
            }else{
              this.modaltitle='新增部门'
              //this.showinfo='dpidName';
            }
          }else{
            if(flag){
              this.modaltitle='修改公司信息'
                this.$post(this.GLOBAL.API_COMPANY_INFO,{id:groupId}).then(res=>{
                  if(res.data.success){
                    this.Modalform=res.data.data;
                    this.isEdit=res.data.data.isEdit;

                  }
              })
            }else{
                 this.modaltitle='修改部门信息'
                 this.$post(this.GLOBAL.API_QUERY_ID,{groupId:this.$store.state.tableselect.selectdata[0].groupId}).then(res=>{
                  if(res.data.success){
                      this.Modalform=res.data.data;
                      this.headerName=this.Modalform.headerName;
                      this.leaderName=this.Modalform.leaderName;
                      this.assistLeaderName=this.Modalform.assistLeaderName;
                  }
                })
            }

          }
          this.gettypeList()
        },
        getdirectorList(groupId){
            this.$post(this.GLOBAL.API_SUPGROUP,{groupId:groupId}).then(res=>{
                if(res.data.success){
                    this.directorList=res.data.data;
                }
            })
        },
        gettypeList(){
          this.$post(this.GLOBAL.API_CODETYPE,{codetype:'GROUP_TYPE',pid:''}).then(res=>{
            if(res.data.success){
                this.typeList=res.data.data;
            }
         })
        },
        getpidList(){
          this.$post(this.GLOBAL.API_QUERY_PID).then(res=>{
            if (res.data.success) {
              this.pidList = res.data.data;
            }
          })
        },
        getuserList(){
          this.$post(this.GLOBAL.API_USERLIST).then(res=>{
            if (res.data.success) {
              this.userList = res.data.data.result
            }
          })
        },
        selectedpid(i){
          this.getdirectorList(i)
        },
        confirm(name){
          if(!this.Modalform.groupCode&&!this.flag){
            this.$Message.error('请输入部门编号')
          }else if(!this.Modalform.groupName&&!this.flag){
            this.$Message.error('请输入部门名称')
          }else{
            this.loading=true;
            if(this.modaltitle=='新增部门'||this.modaltitle=='新增公司'){
              let url='';
              if(this.flag){
                 url=this.GLOBAL.API_ADD_INFO;
                 this.Modalform.pid='root';
              }else{
                 url=this.GLOBAL.API_ADD_SAVE;
              }
              this.$post(url,this.Modalform).then(res=>{
                this.loading=false 
                if(res.data.success){
                  this.modalflag=false;
                  this.$Message.success('保存成功')
                  this.$emit('updateaddtree',this.Modalform.pid,res.data.data);
                }
              }).catch(()=>{ this.loading=false })
            }else if(this.modaltitle=='修改部门信息'||this.modaltitle=='修改公司信息'){
                let params={
                  groupCode:this.Modalform.groupCode,
                  groupName:this.Modalform.groupName,
                  type:this.Modalform.type,
                  pName:this.pName,
                  mGroupId:this.Modalform.mGroupId,
                  mGroupName:this.Modalform.mGroupName,
                  header:this.Modalform.header,
                  leader:this.Modalform.leader,
                  assistLeader:this.Modalform.assistLeader,
                  isVirtual:this.Modalform.isVirtual,
                  groupId:this.Modalform.groupId,
                  pid:this.Modalform.pid,
                  describe:this.Modalform.describe,
                };
                if(this.flag){
                   let params1={
                    com_name:this.Modalform.com_name,
                    jrxkzh:this.Modalform.jrxkzh,
                    symjzc:this.Modalform.symjzc,
                    symxtzzc:this.Modalform.symxtzzc,
                    sjmjzc:this.Modalform.sjmjzc,
                    sjmfxzb:this.Modalform.sjmfxzb,
                    shxydm:this.Modalform.shxydm,
                    reg_capital:this.Modalform.reg_capital,
                    reg_area:this.Modalform.reg_area,
                    establish_date:this.Modalform.establish_date?moment(this.Modalform.establish_date).format('YYYYMMDD'):'',
                    oper_state:this.Modalform.oper_state,
                    legal_name:this.Modalform.legal_name,
                    address:this.Modalform.address,
                    zipcode:this.Modalform.zipcode,
                    describe:this.Modalform.describe,
                    company_id:this.groupId
                   }
                  this.$post(this.GLOBAL.API_EDIT_SAVEINFO,params1).then(res=>{
                    if(res.data.success){
                      this.loading=false 
                      this.modalflag=false;
                      this.$Message.success('保存成功')
                      this.$emit('updatedittree',this.groupId);
                    }
                  }).catch(()=>{ this.loading=false })
                }else{
                  this.$post(this.GLOBAL.API_EDIT_SAVE,params).then(res=>{
                    if(res.data.success){
                      this.loading=false 
                      this.modalflag=false;
                      this.$Message.success('保存成功')
                      this.$emit('updatedittree',this.groupId);
                      // console.log(this.groupId)
                    }
                  }).catch(()=>{ this.loading=false })
                }
            }
          }
        },
        Close(){
            this.modalflag=false;
        },
        Reset(){
          this.Modalform={
            groupCode:'',groupName:'',type:'',pName:'',mGroupName:'',isVirtual:'',describe:'',
            com_name:'',jrxkzh:'',symjzc:'',symxtzzc:'',sjmjzc:'',sjmfxzb:'',shxydm:'',reg_capital:'',reg_area:'',establish_date:'',oper_state:'',legal_name:'',address:'',zipcode:'',describe:'',
          }
          this.headerName='';
          this.leaderName='';
          this.assistLeaderName=''
        },
        search(type){
          const param = {}
          let isPage = true;    //选择modal中 table是否分页
          if (type=='1') { //上级组织
            this.propname = 'organize_type1'
            isPage = true
          } else if (type=='2') { //主管组织
            this.propname = 'organize_type2'
            isPage = false
            param.groupId = this.Modalform.pid
          } else if (type=='3') { //负责人
            this.propname = 'organize_type3'
            isPage = true
          } else if (type=='4') { //分管领导
            this.propname = 'organize_type4'
            isPage = true
          } else if (type=='5') { //协管领导
            this.propname = 'organize_type5'
            isPage = true
          }
          console.log('param',param)
          this.$refs.selectModal.showModal(param, isPage);
        },
        updatedata(obj, propname){
            if (propname=='organize_type1'){ //上级组织
                this.Modalform.pid = obj.groupId;
                this.pName = obj.groupName;
                this.Modalform.pName = obj.groupName;
            } else if(propname=='organize_type2'){ //主管组织
                this.Modalform.mGroupId = obj.groupId
                this.mGroupName = obj.groupName;
                this.Modalform.mGroupName = obj.groupName;
            } else if(propname=='organize_type3'){ //负责人
                this.Modalform.header = obj.userId
                this.headerName = obj.name;
            } else if(propname=='organize_type4'){ //分管领导
                this.Modalform.leader = obj.userId
                this.leaderName = obj.name;
            }else if(propname=='organize_type5'){ //协管领导
              this.Modalform.assistLeader = obj.userId
              this.assistLeaderName = obj.name;
          }
            console.log(this.Modalform)
        },
    },
    created(){
    }
  }
