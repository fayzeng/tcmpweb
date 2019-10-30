import tableprops from '@/libs/tablelistprops.js'
import deletemodal from '../componentsModal/deleteModal/deleteModal.vue'
import delDelegate from '../componentsModal/delDelegate/delDelegate.vue'   // 点击委托管理的删除按钮
import Newannouncement from '../componentsModal/Newannouncement/index.vue'
import Addrole from '../componentsModal/AddRole/addRole.vue'
import setStaffModal from '@/components/componentsModal/setStaff/setStaff.vue';
import copyAuthModal from '@/components/componentsModal/copyAuth/copyAuth.vue';
import setAuthModal from '@/components/componentsModal/setAuth/setAuth.vue';
import addUser from '../componentsModal/addUser/index.vue'
import resetpassword from '@/views/access/usersetting/components/resetpassword'
import setUser from '@/components/componentsModal/setUser/index.vue'
import addtemplate from '../componentsModal/addtemplate/index.vue'
import setGroup from '@/components/componentsModal/groupData/groupData.vue';
import groupSetStaff from '@/components/componentsModal/groupSetStaff/groupSetStaff.vue';
import groupSetAuth from '@/components/componentsModal/groupSetAuth/groupSetAuth.vue';
import addpost from '@/components/componentsModal/addPost/index.vue';
import userManage from '@/components/componentsModal/userManage/index.vue';
import setStatus from '@/components/componentsModal/setStatus/index.vue';
import newdic from '@/components/componentsModal/Newdictionary/index.vue';
import condeploy from '@/components/componentsModal/condeploy/index.vue'
import addOrgModal from '@/components/componentsModal/addOrg/addOrg.vue';
import seechart from '@/components/componentsModal/seechart/index.vue';
import noticedata from '@/components/componentsModal/noticeData/noticeData.vue';
import launchmodel from '@/components/componentsModal/launchmodel/index.vue';
import addcalendar from '@/components/componentsModal/addCalendar/addCalendar.vue';
import tipsModal from '@/components/componentsModal/tipsModal/index.vue';
import commonword from '@/components/componentsModal/commonWords/commonWords.vue';
import backfile from '@/components/componentsModal/backfile/index.vue';
import addapprove from '@/components/componentsModal/addapprove/index.vue';
import addDelegate from '@/components/componentsModal/addDelegate/index.vue';      // 点击添加授权按钮
import uploadapprove from '@/components/componentsModal/uploadapprove/index.vue';
import addpledge from '@/components/componentsModal/addPledge/addPledge.vue';
import addcustomer from '@/components/componentsModal/addCustomer/addCustomer.vue';
import addguarantee from '@/components/componentsModal/addGuarantee/addGuarantee.vue';
import addsubjectmatter from '@/components/componentsModal/addSubjectmatter/addSubjectmatter.vue';
import Seelog from '@/components/componentsModal/Seelog/index.vue';
import reviewModal from '@/components/componentsModal/reviewModal/index.vue'
import tableModal from '@/components/componentsModal/tableModal/index.vue'
import paramsetModal from '@/components/componentsModal/paramsetModal/index.vue'
import filemanageModal from '@/components/componentsModal/filemanageModal/index.vue'
import withdrawModal from '@/components/componentsModal/withdrawModal/index.vue'
import StatechangeModal from '@/components/componentsModal/StatechangeModal/index.vue'
import projectestablish from '@/components/componentsModal/projectestablish/index.vue'



import moment from 'moment'
import { throws } from 'assert';

export default {
    props: {
        attribute: String,
        state:String,
        target_industry:String,
        project_status:String,
        project_flag:String,
        buttonarr:null,
        proc_Inst_Id:null,
    },
    components: {
        tableModal,
        deletemodal,
        delDelegate,
        Newannouncement,
        Addrole,
        setStaffModal,
        copyAuthModal,
        setAuthModal,
        addUser,
        resetpassword,
        setUser,
        addtemplate,
        setGroup,
        groupSetStaff,
        groupSetAuth,
        addpost,
        userManage,
        setStatus,
        newdic,
        condeploy,
        addOrgModal,
        seechart,
        noticedata,
        launchmodel,
        addcalendar,
        tipsModal,
        commonword,
        backfile,
        addDelegate,
        addapprove,
        addpledge,
        addcustomer,
        addguarantee,
        addsubjectmatter,
        Seelog,
        uploadapprove,
        reviewModal,
        paramsetModal,
        filemanageModal,
        withdrawModal,
        StatechangeModal,
        projectestablish,

    },
    data() {
        return {
            // pagesize:10,
            spinShow:false,
            statusList:[{name:'冻结',flag:'5'},{name:'解除',flag:'3'},{name:'废除',flag:'7'},{name:'终止',flag:'6'}],
            userstatusList:[{name:'注销',flag:'0'},{name:'正常',flag:'1'},{name:'锁定',flag:'2'},{name:'解锁',flag:'3'}],
            processstatusList:[{name:'挂起',flag:'1'},{name:'激活',flag:'2'},{name:'结束',flag:'3'}],
            buttonarr1: [
                // { code: 'addrole', actionType:'2', name: '新增角色' },
                // { code: 'editrole', actionType:'2', name: '修改角色' },
                // { code: 'setStaff', actionType:'2', name: '员工设置' },
                // { code: 'copyAuth', actionType:'2', name: '权限复制' },
                // { code: 'setAuth', actionType:'2', name: '权限设置' },
                // { code: 'adduser', actionType:'2', name: '新增用户' },
                // { code: 'edituser', actionType:'2', name: '修改用户' },
                // { code: 'deleteuser', actionType:'2', name: '删除用户' },
                // { code: 'reset', actionType:'2', name: '重置密码' },
                // { code: 'setuser', actionType:'2', name: '角色设置' },
                // { code: 'addtemplate', actionType:'2', name: '新增模板' },
                // { code: 'edittemplate', actionType:'2', name: '修改模板' },
                // // {code:'deletetemplate',actionType:'2', name:'删除模板'},
                // { code: 'setfield', actionType:'2', name: '配置模板字段' },
                // { code: 'todolist', actionType:'2', name: '待办处理' },
                // { code: 'addgroup', actionType:'2', name: '新增群组' },
                // { code: 'editgroup', actionType:'2', name: '修改群组' },
                // { code: 'deleterole', actionType:'2', name: '删除角色' },
                // { code: 'deletegroup', actionType:'2', name: '删除群组' },
                // { code: 'groupSetStaff', actionType:'2', name: '群组用户设置' },
                // { code: 'groupSetAuth', actionType:'2', name: '群组权限分配' },
                  // { code: 'addpost', actionType:'2', name: '新增岗位' },
                // { code: 'editpost', actionType:'2', name: '修改岗位' },
                // { code: 'deletepost', actionType:'2', name: '删除岗位' },
                // { code: 'userManage', actionType:'2', name: '用户管理' },
                // { code: 'datapower', actionType:'2', name: '数据权限' },
                // { code: 'usercopy', actionType:'2', name: '权限复制' },
               // { code: 'addshareholderaccount', actionType:'2', name: '开户登记' },
               // { code: 'deleteshareholderaccount', actionType:'2', name: '删除' },
               // { code: 'editshareholderaccount', actionType:'2', name: '修改' },
               // { code: 'addcapitalaccount', actionType:'2', name: '开户登记' },
               // { code: 'editcapitalaccount', actionType:'2', name: '修改' },
               // { code: 'deletecapitalaccount', actionType:'2', name: '删除' },
               // { code: 'deletefundaccount', actionType:'2', name: '删除' },
               // { code: 'openfundaccount', actionType:'2', name: '开户' },
               // { code: 'editfundaccount', actionType:'2', name: '修改' },
               // { code: 'addbankaccount', actionType:'2', name: '新增' },
               // { code: 'deletebankaccount', actionType:'2', name: '删除' },
               // { code: 'addbusinessaccount', actionType:'2', name: '新增' },
               // { code: 'editbusinessaccount', actionType:'2', name: '修改' },
               // { code: 'deletebusinessaccount', actionType:'2', name: '删除' },
               // { code: 'addInterbankaccount', actionType:'2', name: '新增' },
               // { code: 'editInterbankaccount', actionType:'2', name: '修改' },
               // { code: 'deleteInterbankaccount', actionType:'2', name: '删除' },
               // { code: 'Launchproject', actionType:'2', name: '发起项目流程' },
               // { code: 'seehandelRecord', actionType:'2', name: '查看' },流程监控页面查看
               // { code: 'Changehandler', actionType:'2', name: '查看' },流程实例监控更改处理人
               // { code: 'deleteparam', actionType:'2', name: '删除' },系统参数设置删除
               // { code: 'addparam', actionType:'2', name: '删除' },系统参数设置新增
               // { code: 'deleteInfrastructure', actionType:'2', name: '删除' },基础建设项目信息删除

            ],
            buttonarr2:[],
            tableprop: tableprops,
            tableData: [],
            tableColumns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
            ],
            total: 0,
            currentPage: 1,
            buttonCode: {},
            param:{},
            querylist:[],
            optionMap:{},
            nowpage:1,
            parentParam:{},
            cascaderdata:[],
            values:[],
            queryparameter:'',
            Cascaderarr:[],
        }
    },
    methods: {
      searchtable(){
          this.$Spin.show();
          this.changePage(1)
      },
        changePage(pageNo) {//切换页码
            let params = {
                pageSize: 10,
                pageNo: pageNo,
                ...this.getParam()
            }
          //  console.log('params' + JSON.stringify(params));
            if(this.state){
                params.project_status = this.state
            }
            if(this.target_industry){
                params.target_industry = this.target_industry
            }
            if(this.project_flag){
                params.project_flag = this.project_flag
            }
            if(this.proc_Inst_Id){
                params.proc_Inst_Id = this.proc_Inst_Id
            }
            this.$get(this.tableprop.tableprops[this.attribute].gettablelist, params).then(res => {
                if (res.data.success) {
                    this.$Spin.hide();
                    this.tableData = res.data.data.result;
                    this.$store.state.tableselect.tableDatas=this.tableData||[];
                    this.total = res.data.data.totalCount
                    this.nowpage = pageNo
                    this.currentPage = pageNo
                    this.$store.state.tableselect.selectdata = []
                }else{
                  this.$Spin.hide();
                }
            }).catch(ele=>{
              this.$Spin.hide();
            })
        },
        setStatus(status,flag){
            this.$store.state.tableselect.selectdata.length < 1 && this.$Message.warning('请至少选择一条数据进行操作') || this.$refs.setStatus.showModal(flag,status)
        },
        button2click(code){
           // console.log(code);
            this.buttonCode[code].call();
            // console.log(flag)
            // this.$store.state.tableselect.selectdata.length < 1 && this.$Message.warning('请至少选择一条数据进行操作') || this.$refs.setStatus.showModal(flag)
        },
        rowClick(data,index){//表格点击一行
           // console.log(data,index)
            this.$refs.table.toggleSelect(index);
        },
        selectRow(selection) {//表格选中事件
            this.$store.state.tableselect.selectdata = selection;
        },
        checkselect() {//验证表格是否选中一条数据
            this.$store.state.tableselect.selectdata.length != 1 && this.$Message.warning('请选择一条数据进行操作')
            return this.$store.state.tableselect.selectdata.length == 1 ? true : false
        },
        checkMutSelect(){ //验证多选，至少选一条数据
            if (this.$store.state.tableselect.selectdata.length >0){
                return true
            }  else {
                this.$Message.warning('请选择至少一条数据进行操作')
                return false
            }
        },
        downloadwork(){
          window.open(this.baseURL + 'tcmp/workflow/model-export.action?sys_tokenId=' + sessionStorage.getItem('cookieaccess_token') +'&modelId=' + this.$store.state.tableselect.selectdata[0].id )
        },
        buttonClick(type) {    //点击按钮触发
            this.buttonCode[type].call();
        },
        getbuttonlist(){
            // this.tableprop.tableprops[this.attribute].menuid &&    this.$get(this.GLOBAL.API_GET_USER_BTB,{menuId:this.tableprop.tableprops[this.attribute].menuid }).then(res=>{
            //     if(res.data.success){
            //         this.buttonarr = res.data.data
            //     }
            // })
            JSON.parse(sessionStorage.getItem('menuMap'))[this.attribute] && this.$get(this.GLOBAL.API_GET_USER_BTB,{menuId:JSON.parse(sessionStorage.getItem('menuMap'))[this.attribute] }).then(res=>{
                if(res.data.success){
                if(res.data.data){
                  res.data.data.forEach(ele => {
                        if(ele.name.indexOf('新增') != -1){
                            ele.icon = "md-add"
                        }else if(ele.name.indexOf('删除') != -1){
                            ele.icon = "ios-backspace-outline"
                        }else if(ele.name.indexOf('修改') != -1){
                            ele.icon = "ios-build"
                        }else if(ele.name.indexOf('设置') != -1){
                            ele.icon = "ios-cog-outline"
                        }else if(ele.name.indexOf('分配') != -1){
                            ele.icon = "md-funnel"
                        }else if(ele.name.indexOf('复制') != -1){
                            ele.icon = "md-copy"
                        }else if(ele.name.indexOf('发布') != -1){
                            ele.icon = "ios-cloud-circle-outline"
                        }else if(ele.name.indexOf('微调') != -1){
                            ele.icon = "ios-cloud-circle-outline"
                        }else if(ele.name.indexOf('配置') != -1){
                            ele.icon = "ios-cloud-circle-outline"
                        }else if(ele.name.indexOf('开户') != -1){
                            ele.icon = "md-add"
                        }else if(ele.name.indexOf('销户') != -1){
                            ele.icon = "md-remove"
                        }else if(ele.name.indexOf('密码') != -1){
                            ele.icon = "md-lock"
                        }else if(ele.name.indexOf('权限') != -1){
                            ele.icon = "ios-personadd"
                        }else if(ele.name.indexOf('用户') != -1){
                            ele.icon = "ios-people-outline"
                        }else if(ele.name.indexOf('查看') != -1){
                            ele.icon = "md-eye"
                        }else if(ele.name.indexOf('发起') != -1){
                            ele.icon = "md-brush"
                        }else if(ele.name.indexOf('归档') != -1){
                            ele.icon = 'md-ionic'
                        }else if(ele.name.indexOf('上传') != -1){
                            ele.icon = "md-arrow-up"
                        }else if(ele.name.indexOf('下载') != -1){
                            ele.icon = 'md-arrow-down'
                        }else if(ele.name.indexOf('作废') != -1){
                            ele.icon = 'md-trash'
                        }else if(ele.name.indexOf('处理') != -1){
                            ele.icon = 'md-redo'
                        }

                    });
                    let arr1 =[]
                    let arr2 =[]
                   
                    if(this.$store.state.tableselect.permituploadfileFlag=='true'){
                        for (let i = 0; i <  res.data.data.length; i++) {
                            if(i<8){
                                arr1.push(res.data.data[i])
                            }else{
                                arr2.push(res.data.data[i])
                            }

                      }
                    }else{
                        for (let i = 0; i <  res.data.data.length; i++) {
                            if(i<8&&res.data.data[i].name=='作废'){
                                arr1.push(res.data.data[i])
                            }

                    }
                    }
                    this.buttonarr1 = arr1
                    this.buttonarr2 = arr2  
                }


                }
            })

        },
        buttonBindClick() {    //绑定按钮点击事件
            this.buttonCode = {
                'adduser': () => this.$refs.addUser.getaddUser(1),
                'edituser': () => this.checkselect() && this.$refs.addUser.getaddUser(0),
                'deleteuser': () => this.$store.state.tableselect.selectdata.length < 1 && this.$Message.warning('请至少选择一条数据进行操作') || this.$refs.deletemodal.getdeleteModal({
                    url: this.GLOBAL.API_DELETE_USER,
                    parameterName: 'userIds',
                    pageName: 'usersetting',
                    deleteId: this.$store.state.tableselect.selectdata
                }),
                'reset': () => this.$store.state.tableselect.selectdata.length < 1 && this.$Message.warning('请至少选择一条数据进行操作') || this.$refs.resetpassword.getresetpassword(),
                'setuser': () => this.checkselect() && this.$refs.setUser.getsetUser({ url: this.GLOBAL.APT_SET_USER, parameterName: 'userId', parameter: this.$store.state.tableselect.selectdata[0].userId }),
                'addrole': () => this.$refs.addrole.showModal(),
                'editrole': () => this.$refs.addrole.showModal(1),
                'setStaff': () => this.$refs.setStaffModal.showModal(),
                'copyAuth': () => this.$refs.copyAuthModal.showModal('角色权限复制'),
                'setAuth': () => this.checkselect() && this.$refs.setAuthModal.showModal(),
                'addtemplate': () => this.$refs.addtemplate.openmodel('新增模板'),
                'deletetemplate': () => this.checkselect() && this.$refs.deletemodal.getdeleteModal({
                    url: this.GLOBAL.API_DELETE_TMPLATE,
                    parameterName: 'template_id',
                    pageName: 'templateseting',
                    deleteId: this.$store.state.tableselect.selectdata[0].template_id
                }),
                'edittemplate': () => this.checkselect() && this.$refs.addtemplate.openmodel('修改模板'),
                'setfield': () => this.checkselect() && this.$router.push({ name: 'setfield', query: { id: this.$store.state.tableselect.selectdata[0].template_id } }),
                'todolist': () => this.checkselect() && this.$router.push({ name: 'handleflow', query: { id: this.$store.state.tableselect.selectdata[0].taskId, processid: this.$store.state.tableselect.selectdata[0].processid } }),
                'addgroup': () => this.$refs.setGroup.showModal('add'),
                'editgroup': () => this.$refs.setGroup.showModal('update'),
                'deleterole':() => this.$store.state.tableselect.selectdata.length < 1 && this.$Message.warning('请至少选择一条数据进行操作') || this.$refs.deletemodal.showModal({
                    url: this.GLOBAL.API_ROLE_DELETE,
                    parameterName: 'roleids',
                    deleteId: this.$store.state.tableselect.selectdata.map(item=> item.roleId).join(',')
                }),
                'deletegroup':() => this.$store.state.tableselect.selectdata.length < 1 && this.$Message.warning('请至少选择一条数据进行操作') || this.$refs.deletemodal.showModal({
                    url: this.GLOBAL.API_GROUP_DELETE,
                    parameterName: 'teamCodes',
                    deleteId: this.$store.state.tableselect.selectdata.map(item=> item.teamCode).join(',')
                }),
                'groupSetStaff':()=> this.$refs.groupSetStaff.showModal(),
                'groupSetAuth': ()=> this.$refs.groupSetAuth.showModal(),
                'addpost':()=>this.$refs.addpost.showModal(1),
                'editpost':()=> this.checkselect() && this.$refs.addpost.showModal(0),
                'deletepost':() => this.$store.state.tableselect.selectdata.length < 1 && this.$Message.warning('请至少选择一条数据进行操作') || this.$refs.deletemodal.getdeleteModal({
                    url: this.GLOBAL.API_DELETE_POST,
                    parameterName: 'gradeIds',
                    pageName: 'postsetting',
                    deleteId: this.$store.state.tableselect.selectdata
                }),
                'userManage':() => this.checkselect() && this.$refs.userManage.showModal({ url: this.GLOBAL.API_POST_USER, parameterName: 'gradeId', parameter: this.$store.state.tableselect.selectdata[0].gradeId }),
                'datapower':()=>this.checkselect() && this.$refs.setAuthModal.showModal('userId'),
                'usercopy': () => this.$refs.copyAuthModal.showModal('用户权限复制'),
                'newdic':()=>this.$refs.newdic.getNewdictionary(),
                'editdic':()=>this.$refs.newdic.getNewdictionary(1),
                'deletedic':() => this.$store.state.tableselect.selectdata.length < 1 && this.$Message.warning('请至少选择一条数据进行操作') || this.$refs.deletemodal.showModal({
                    url: this.GLOBAL.API_DIC_DELETE,
                    parameterName: 'dics',
                    deleteId: this.$store.state.tableselect.selectdata.map(item=> item.dicId).join(','),
                }),
                'addshareholderaccount':()=>this.$router.push({name: 'newedit', query:{template_id:139,url:this.GLOBAL.API_ADD_ACCOUNT,type:'2'}}),
                'editshareholderaccount':()=>this.checkselect()&&this.$router.push({name: 'newedit', query:{template_id:139,url:this.GLOBAL.API_ADD_ACCOUNT,type:'2',id:this.$store.state.tableselect.selectdata[0].account_id,parameterName:'account_id',infourl:this.GLOBAL.API_QUERYID_ACCOUNT,}}),
                'deleteshareholderaccount':() => this.checkselect()&& this.$refs.deletemodal.showModal({
                    url: this.GLOBAL.API_DELETE_ACCOUNT,
                    parameterName: 'account_id',
                    deleteId: this.$store.state.tableselect.selectdata[0].account_id
                }),
                'addcapitalaccount':()=>this.$router.push({name: 'newedit', query:{template_id:140,url:this.GLOBAL.API_ADD_ACCOUNT,type:'3'}}),
                'editcapitalaccount':()=>this.checkselect()&&this.$router.push({name: 'newedit', query:{template_id:140,url:this.GLOBAL.API_ADD_ACCOUNT,type:'3',id:this.$store.state.tableselect.selectdata[0].account_id,parameterName:'account_id',infourl:this.GLOBAL.API_QUERYID_ACCOUNT,}}),
                'deletecapitalaccount':() => this.checkselect()&& this.$refs.deletemodal.showModal({
                    url: this.GLOBAL.API_DELETE_ACCOUNT,
                    parameterName: 'account_id',
                    deleteId: this.$store.state.tableselect.selectdata[0].account_id
                }),
                'openfundaccount':()=>this.$router.push({name: 'newedit', query:{template_id:142,url:this.GLOBAL.API_ADD_ACCOUNT,type:'4'}}),
                'editfundaccount':()=>this.checkselect()&&this.$router.push({name: 'newedit', query:{template_id:142,url:this.GLOBAL.API_ADD_ACCOUNT,type:'4',id:this.$store.state.tableselect.selectdata[0].account_id,parameterName:'account_id',infourl:this.GLOBAL.API_QUERYID_ACCOUNT,}}),
                'deletefundaccount':() => this.checkselect()&& this.$refs.deletemodal.showModal({
                    url: this.GLOBAL.API_DELETE_ACCOUNT,
                    parameterName: 'account_id',
                    deleteId: this.$store.state.tableselect.selectdata[0].account_id
                }),
                'addbankaccount':()=>this.$router.push({name: 'newedit', query:{template_id:126,url:this.GLOBAL.API_ADD_ACCOUNT,type:'1'}}),
                'editbankaccount':()=>this.checkselect()&&this.$router.push({name: 'newedit', query:{template_id:126,url:this.GLOBAL.API_ADD_ACCOUNT,parameterName:'account_id',type:'1', id:this.$store.state.tableselect.selectdata[0].account_id,parameterName:'account_id',infourl:this.GLOBAL.API_QUERYID_ACCOUNT,}}),
                'deletebankaccount':() => this.checkselect()&& this.$refs.deletemodal.showModal({
                    url: this.GLOBAL.API_DELETE_ACCOUNT,
                    parameterName: 'account_id',
                    deleteId: this.$store.state.tableselect.selectdata[0].account_id
                }),
                'bankaccountreview':()=>this.checkselect() && this.$refs.reviewModal.showModal({url:this.GLOBAL.API_ALL_AUDIT,statusname:'audit_status',keyname:'account_id',keyval:this.$store.state.tableselect.selectdata[0].account_id}),
                'addInterbankaccount':()=>this.$router.push({name: 'newedit', query:{template_id:141,url:this.GLOBAL.API_ADD_ACCOUNT,type:'5'}}),
                'editInterbankaccount':()=>this.checkselect()&&this.$router.push({name: 'newedit', query:{template_id:141,url:this.GLOBAL.API_ADD_ACCOUNT,type:'5', id:this.$store.state.tableselect.selectdata[0].account_id,parameterName:'account_id',infourl:this.GLOBAL.API_QUERYID_ACCOUNT,}}),
                'deleteInterbankaccount':() => this.checkselect()&& this.$refs.deletemodal.showModal({
                    url: this.GLOBAL.API_DELETE_ACCOUNT,
                    parameterName: 'account_id',
                    deleteId: this.$store.state.tableselect.selectdata[0].account_id
                }),
                'addbusinessaccount':()=>this.$router.push({name: 'newedit', query:{template_id:4,url:this.GLOBAL.API_ADD_BUSINESS}}),
                'editbusinessaccount':()=>this.checkselect()&&this.$router.push({name: 'newedit', query:{template_id:4,url:this.GLOBAL.API_ADD_BUSINESS,id:this.$store.state.tableselect.selectdata[0].business_department_id,parameterName:'business_department_id',infourl:this.GLOBAL.API_BUSINESS_QUERYID,}}),
                'deletebusinessaccount':() => this.checkselect()&& this.$refs.deletemodal.showModal({
                    url: this.GLOBAL.API_DELETD_BUSINESS,
                    parameterName: 'business_department_id',
                    deleteId: this.$store.state.tableselect.selectdata[0].business_department_id
                }),
                'Businessreview':()=>this.checkselect() && this.$refs.reviewModal.showModal({url:this.GLOBAL.API_BUSINESS_REVIEW,statusname:'营业部',keyname:'business_department_id',keyval:this.$store.state.tableselect.selectdata[0].business_department_id}),
                'addDelegate': ()=> this.$refs.addDelegate.openmodel(),
                'addworkflow':()=> this.$refs.addapprove.openmodel(),
                'editcategory':()=>this.checkselect() && this.$refs.addapprove.openmodel(this.$store.state.tableselect.selectdata[0]),
                'editworkflow':()=> this.checkselect() &&  this.$router.push({ name: 'workflowseting',query:{id:this.$store.state.tableselect.selectdata[0].id}}),
                'adddeploy':() => this.checkselect() && this.$refs.condeploy.openmodel(this.$store.state.tableselect.selectdata[0].id,1),
                'updeploy':() => this.checkselect() && this.$refs.condeploy.openmodel(this.$store.state.tableselect.selectdata[0].id,2),
                'delmodel':() => this.checkselect() && this.$refs.deletemodal.getdeleteModal({
                    url: this.GLOBAL.API_DEL_MODEL,
                    parameterName: 'modelId',
                    pageName: 'workflowseting',
                    deleteId: this.$store.state.tableselect.selectdata[0].id
                }),
                'delDelegate':() =>this.checkselect() && this.$refs.delDelegate.getdeleteModal({			// 删除委托
                    url: this.GLOBAL.API_DELEGATION_DEL,
                    sard_id: this.$store.state.tableselect.selectdata[0].sard_id
                }),
                'editDelegate':() =>this.checkselect() && this.$refs.addDelegate.openmodel({			// 修改委托
                    sard_id: this.$store.state.tableselect.selectdata[0].sard_id
                }),
                'adddepartment':()=>this.$refs.addOrgModal.getaddOrgModal(1,'1',this.$store.state.tableselect.company),
                'deletedepartment':()=>this.checkselect() && this.$refs.deletemodal.getdeleteModal({
                    url:this.GLOBAL.API_DELETE_DEPARTMENT,
                    deleteId:this.$store.state.tableselect.selectdata[0].groupId,
                    parameterName:'groupId',
                    pageName:'organization'}),
                'editdepartment':()=>this.checkselect() && this.$refs.addOrgModal.getaddOrgModal(0,this.$store.state.tableselect.selectdata[0].groupId,this.$store.state.tableselect.selectdata[0].pid=='root'?true:false),
                'viewchart':() => this.checkselect() && this.$refs.seechart.openmodel(this.$store.state.tableselect.selectdata[0].processid),
                'launch':() => this.checkselect() && this.$refs.launchmodel.openmodel(this.$store.state.tableselect.selectdata[0].processid),
                'addnotice':() => this.$refs.noticedata.showModal(),
                'editnotice':() => this.$refs.noticedata.showModal(1),
                'deletenotice':() => this.checkMutSelect()&&this.$refs.deletemodal.showModal({
                    url: this.GLOBAL.API_NOTICE_DELETE,
                    parameterName: 'sn_id',
                    deleteId: this.$store.state.tableselect.selectdata.map(item=> item.sn_id).join(','),
                }),
                'addCalendar':() => this.$refs.addCalendar.showModal(),
                'editCalendar':() => this.$refs.addCalendar.showModal(1),
                'deletCalendar':() => this.checkMutSelect()&& this.$refs.deletemodal.showModal({
                    url: this.GLOBAL.API_CALENDAR_DELETE,
                    parameterName: 'sw_id',
                    deleteId: this.$store.state.tableselect.selectdata.map(item=> item.sw_id).join(','),
                }),

                'Copytemplate':()=>this.checkselect() && this.$refs.tipsModal.showModal(),
                'addCommonWord':() => this.$refs.commonword.showModal(),    //常用语新增
                'editCommonWord':() => this.$refs.commonword.showModal(1),       //常用语修改
                 //常用语删除
                'deleteCommonWord':() => this.checkMutSelect() && this.$refs.deletemodal.showModal({
                    url: this.GLOBAL.API_COMMONWORD_DELETE,
                    parameterName: 'tcw_id',
                    deleteId: this.$store.state.tableselect.selectdata.map(item=> item.tcw_id).join(','),
                }),
                'backFile':()=> this.checkselect() && this.$refs.backfile.openmodel(this.$store.state.tableselect.selectdata[0].processid),
                'addproject':() => this.$router.push({name: 'newedit', query:{template_id:206}}),//新增项目
                'editproject':() =>this.checkselect() && this.$router.push({name: 'newedit', query:{template_id:206,id:this.$store.state.tableselect.selectdata[0].project_id}}),//修改项目
                'delproject':()=>this.checkselect() && this.$refs.deletemodal.getdeleteModal({
                    url:this.GLOBAL.API_DELETE_PROJECT,
                    deleteId:this.$store.state.tableselect.selectdata[0].project_id,
                    parameterName:'project_id',
                    pageName:'projectList'}),//项目删除
                'projectreview':()=>this.checkselect() && this.$refs.reviewModal.showModal({url:this.GLOBAL.API_REVIEW_PROJECT,statusname:'flag',keyname:'project_id',keyval:this.$store.state.tableselect.selectdata[0].project_id}),//项目复核
                'addPledge':() => this.$refs.addpledge.showModal(),  //新增抵质押物
                'editPledge':() => this.$refs.addpledge.showModal(1),  //修改抵质押物
                'addGuarantee':() =>this.$refs.addguarantee.showModal(),   //新增担保物
                'editGuarantee':() =>this.$refs.addguarantee.showModal(1),   //修改担保物
                'addSubjectmatter':() => this.$refs.addsubjectmatter.showModal(),   //新增标的物
                'editSubjectmatter':() => this.$refs.addsubjectmatter.showModal(1),   //修改标的物
                'addCustomer':() => this.$refs.addcustomer.showModal(),    //新增对手方
                'editCustomer':() => this.$refs.addcustomer.showModal(1),    //修改对手方
                'Launchproject':() =>this.checkselect() && this.$router.push({name: 'launchproject', query:{id:this.$store.state.tableselect.selectdata[0].project_id,project_name:this.$store.state.tableselect.selectdata[0].project_name}}),//发起项目流程
                'Seelog':() =>  this.checkselect() && this.$refs.Seelog.showModal(),//查看日志
                'donwloadwork':() =>  this.checkselect() && this.downloadwork(),//下载工作流
                'uploadwork':() => this.$refs.uploadapprove.openmodel(),//上传工作流

                'downloadfiel':() => this.checkselect() && window.open(this.baseURL +this.GLOBAL.API_DWONLOAD+'?sys_tokenId=' +  sessionStorage.getItem('cookieaccess_token')+'&fileId=' +this.$store.state.tableselect.selectdata[0].fileId),//文件下载
                'placefile':() => this.checkselect(),//文件归档
                'destruction':() => this.checkselect() && this.$refs.deletemodal.getdeleteModal({
                    url:this.GLOBAL.API_DEL_FILE,
                    deleteId:this.$store.state.tableselect.selectdata[0].fileId,
                    parameterName:'fileId',
                    pageName:'file'}),//文件销毁
                'Changehandler':() =>this.checkselect() && this.$refs.tableModal.showModal('','更改处理人'),
                'addparam':() => this.$refs.paramsetModal.showModal(),//系统参数设置新增
                'editparam':() =>this.checkselect() &&  this.$refs.paramsetModal.showModal(this.$store.state.tableselect.selectdata[0].table_Id),//系统参数设置修改
                'deleteparam':()=>this.checkselect() && this.$refs.deletemodal.getdeleteModal({
                    url:this.GLOBAL.API_DELETE_PARAM,
                    deleteId:this.$store.state.tableselect.selectdata[0].table_Id,
                    parameterName:'TableId',
                    pageName:'parameter'}),//系统参数设置删除
                 'addremind':() =>this.$router.push({name:'addcalendar'}),
                 'addfile':() =>this.$refs.filemanageModal.showModal(),//文档管理新增
                 'Infrastructureadd':() =>this.checkselect() && this.$router.push({name: 'newedit', query:{template_id:221,id:this.$store.state.tableselect.selectdata[0].project_id}}),//基础建设项目信息新增
                 'realestateadd':() =>this.checkselect() && this.$router.push({name: 'newedit', query:{template_id:215,id:this.$store.state.tableselect.selectdata[0].project_id}}),//房地产信息新增
                 'target_industry':() =>this.checkselect() && this.$router.push({name: 'newedit', query:{template_id:216,id:this.$store.state.tableselect.selectdata[0].project_id}}),//非地产非基建项目新增
                 'investment':() =>this.checkselect() && this.$router.push({name: 'newedit', query:{template_id:217,id:this.$store.state.tableselect.selectdata[0].project_id}}),//投资顾问合同信息新增
                 'cooperationadd':() =>this.checkselect() && this.$router.push({name: 'newedit', query:{template_id:218,id:this.$store.state.tableselect.selectdata[0].project_id}}),//第三方
                 'citicpreregistration':() =>this.checkselect() && this.$router.push({name: 'newedit', query:{template_id:224,id:this.$store.state.tableselect.selectdata[0].project_id}}),//中信登预登记信息新增
                 'citicregister':() =>this.checkselect() && this.$router.push({name: 'newedit', query:{template_id:223,id:this.$store.state.tableselect.selectdata[0].project_id}}),//中信登存续登记信息新增
                 'review':() =>this.checkselect() && this.$refs.reviewModal.showModal({url:this.GLOBAL.API_REVIEW_ESTAUDIT_PROJECT,statusname:'flag',keyname:'project_id',keyval:this.$store.state.tableselect.selectdata[0].project_id}),//成立复核
                 'editfile':()=>this.checkselect() && this.$refs.filemanageModal.showModal(this.$store.state.tableselect.selectdata[0].fileId),//文档管理修改
                 'powermanage':()=>this.checkselect() && this.$router.push({name: 'powermanage', query:{id:this.$store.state.tableselect.selectdata[0].userId,relevance_type:'1'}}),///用户里面的流程权限管理
                 'roleProcess':()=>this.checkselect() && this.$router.push({name: 'powermanage', query:{id:this.$store.state.tableselect.selectdata[0].roleId,relevance_type:'2'}}),//角色里面的流程权限管理
                 'deleteInfrastructure':()=>this.checkselect() && this.$refs.deletemodal.getdeleteModal({
                    url:this.GLOBAL.API_ALL_DELETE_UPDATE,
                    deleteId:this.$store.state.tableselect.selectdata[0].project_id,
                    parameterName:'project_id',
                    pageName:'Infrastructure',
                    template_id:'221'}),
                 'withdraw':()=>this.checkselect()&&this.$refs.withdrawModal.showModal(),//流程实例监控撤回
                 'SalesAccount':()=>this.checkselect()&&this.$refs.StatechangeModal.showModal(2),//销户登记
                 'SalesAccountreview':()=>this.checkselect()&&this.$refs.StatechangeModal.showModal(3),//销户复核
                 'Accountinvalidation':()=>this.checkselect()&&this.$refs.StatechangeModal.showModal(5),//账户作废
                 'projectestablish':()=>this.checkselect()&&this.$refs.projectestablish.showModal(),//项目成立
                 'realestatedelete':()=>this.checkselect() && this.$refs.deletemodal.getdeleteModal({
                    url:this.GLOBAL.API_ALL_DELETE_UPDATE,
                    deleteId:this.$store.state.tableselect.selectdata[0].project_id,
                    parameterName:'project_id',
                    pageName:'Infrastructure',
                    template_id:'215'}),//房地产
                 'target_industrydelete':()=>this.checkselect() && this.$refs.deletemodal.getdeleteModal({
                    url:this.GLOBAL.API_ALL_DELETE_UPDATE,
                    deleteId:this.$store.state.tableselect.selectdata[0].project_id,
                    parameterName:'project_id',
                    pageName:'Infrastructure',
                    template_id:'216'}),//非地产非基建项目
                'investmentdelete':()=>this.checkselect() && this.$refs.deletemodal.getdeleteModal({
                    url:this.GLOBAL.API_INVEST_DELETE,
                    deleteId:this.$store.state.tableselect.selectdata[0].project_id,
                    parameterName:'project_id',
                    pageName:'Infrastructure',
                    template_id:'217'}),//投资顾问合同信息
                'cooperationdelete':()=>this.checkselect() && this.$refs.deletemodal.getdeleteModal({
                    url:this.GLOBAL.API_COOPERATION_DELETE,
                    deleteId:this.$store.state.tableselect.selectdata[0].project_id,
                    parameterName:'project_id',
                    pageName:'Infrastructure',
                    template_id:'218'}),//第三方
                'citicpreregistrationdelete':()=>this.checkselect() && this.$refs.deletemodal.getdeleteModal({
                    url:this.GLOBAL.API_ALL_DELETE_UPDATE,
                    deleteId:this.$store.state.tableselect.selectdata[0].project_id,
                    parameterName:'project_id',
                    pageName:'Infrastructure',
                    template_id:'224'}),//预登记
                'citicregisterdelete':()=>this.checkselect() && this.$refs.deletemodal.getdeleteModal({
                    url:this.GLOBAL.API_ALL_DELETE_UPDATE,
                    deleteId:this.$store.state.tableselect.selectdata[0].project_id,
                    parameterName:'project_id',
                    pageName:'Infrastructure',
                    template_id:'223'}),//存续登记
                }
        },
        updateaddtree(pid,id){
            this.changePage(1)
            this.$emit('updateaddtree',pid,id);
        },
        updatedelete(id){
            this.changePage(1)
            this.$emit('updatedelete',id);
        },
        updatedittree(id){
            this.changePage(1)
            this.$emit('updatedittree',id);
        },
        changevalue(val,name){
            let param=''
           if(val.length!=1){
               param=val[1];
            }else{
              param=val[0];
            }
            this.Cascaderarr.push({val:param,name:name});
          },
        getOptions(){
            const param = {}
            const list = this.tableprop.tableprops[this.attribute].querylist
            const url = this.GLOBAL.API_DIC_GETBYCODE;    //获取字典表数据 (下拉框使用)
            if(list && list.length){
                list.map(item => {
                    param[item.name] = ''
                    if (item.type=='select') {   //下拉框类型
                        if (item.codetype) {    //需要从字典表获取下拉框值
                            this.$post(url,{codetype:item.codetype}).then(res=>{
                                if(res.status == 200){
                                    const ret = res.data
                                    if (ret.success) {
                                        const options = ret.data.map(item => ({label:item.name,value:item.key}))
                                        options.unshift({value:"",label:'全部'})
                                        this.optionMap = {
                                            ...this.optionMap,
                                            [item.name]:options
                                        }
                                    } else {
                                        // this.$Message.error(ret.message)
                                    }
                                }
                            })
                        } else if (item.getOption) {   //自定义方法
                            const p = new Promise(async (resolve,reject) => {
                                const ret = await item.getOption()
                                if (ret) resolve(ret)
                            })
                            p.then(options => {
                                this.optionMap = {
                                    ...this.optionMap,
                                    [item.name]:options
                                }
                            }).catch(()=>{
                                this.optionMap = {
                                    ...this.optionMap,
                                    [item.name]:[]
                                }
                            })

                        } else {
                            const options = item.options ? item.options : []
                            options.unshift({value:"",label:'全部'})
                            this.optionMap = {
                                ...this.optionMap,
                                [item.name]: options
                            }
                        }
                    } else if (item.type=='cascader') {
                        param[item.name] = []
                        if (item.codetype) {    //需要从字典表获取下拉框值
                            this.$post(url,{codetype:item.codetype}).then(res=>{
                                if(res.data.success){
                                   this.cascaderdata=JSON.parse(JSON.stringify(res.data.data).replace(/name/g,'label').replace(/key/g,'value'))
                                }
                            })
                        }
                    }else if (item.type=='daterange') {
                        param[item.name+'_start'] = ''
                        param[item.name+'_end'] = ''
                    }
                })
                this.querylist = list
                this.param = param;
            }
        },
        search(obj = {}){   //搜索
            this.parentParam = obj;   //父级传来的查询条件参数  比如组织 groupId
            this.changePage(1)
        },
        getParam(){
         //  console.log('查询参数',JSON.parse(JSON.stringify(this.param)))
            const param = { ...this.parentParam}
            const list = this.tableprop.tableprops[this.attribute].querylist
            if(list && list.length){
                list.map(item => {
                    if (item.type=='daterange') {  //当为时间段类型时
                        param[item.name+'_start'] = this.param[item.name+'_start']
                        param[item.name+'_end'] = this.param[item.name+'_end']
                    } else if(item.type=='cascader'){
                        this.Cascaderarr.map(temp=>{
                          if(temp.name==item.name){
                               param[item.name] = temp.val;                                
                            }
                        })
                    } else {
                        param[item.name] = this.param[item.name]
                    }
                })
            }
            return param
        },
        reset(){
            const list = this.tableprop.tableprops[this.attribute].querylist
            if(list && list.length){
                list.map(item => {
                    if (item.type=='daterange') {  //当为时间段类型时
                        // param[item.start] = ''
                        // param[item.end] = ''
                        this.param[item.name] = ['','']
                    } else {
                        this.param[item.name] = ''
                    }
                })
            }
            this.changePage(1)
        }
    },
    // mounted(){
    //       document.getElementById('flagmodel').innerHTML = ``
    // },
    created() {
        this.$store.state.tableselect.selectdata = []
        this.buttonBindClick();
        this.tableColumns = [{ type: 'selection', width: 60, align: 'center' }]
        this.tableColumns = this.tableColumns.concat(this.tableprop.tableprops[this.attribute].cloumn)
        this.tableprop.tableprops[this.attribute].gettablelist && this.changePage(1)
        if(this.buttonarr){
            this.buttonarr1=this.buttonarr;
        }else{
            this.getbuttonlist()
        }
        this.getOptions()

    },
    activated(){
      this.search()
    }
}
