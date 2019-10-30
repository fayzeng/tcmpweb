import _API from './config.js'
import axios from 'axios'
import {router} from '../router/index';
let arr=[];
let tableprops = {
  infoDiscloList:{//审批流发起
      cloumn:[
          {title: '姓名',key:'lastName' },
          {title: '邮件',key:'email'},
          ],
      gettablelist:_API.API_GET_PUBTLIST,
      querylist:[]
  },
    countersign:{//审批流发起
        cloumn:[
            {title: '姓名',key:'lastName' },
            {title: '邮件',key:'email'},
            ],
        gettablelist:_API.API_GET_COUNTERSIGN,

        querylist:[]
    },
    approve:{//审批流发起
        cloumn:[
            {title:'部署id',key:'processid'},
            {title: '名称',key:'processname' },
            {title: '版本',key:'version'},
            {title: '说明',key:' processdesc'},
            {title: '部署日期',key:'deploymenttime'}
            ],
        gettablelist:_API.API_GET_DELOY_LIST,

    },
    workflow:{//审批流设计
        cloumn:[
            {title:'id',key:'id'},
            {title: '名称',key:'name' },
            {title: '键',key:'key'},
            {title: '分类',key:'categoryName'},
            {title: '创建日期',key:'createTime'}
            ],
        gettablelist:_API.API_WORK_LIST,
        querylist:[
            {label:'名称',name:'name',type:'input'},
            {label:'工作流类型',name:'category',codetype:'PROCESS_CATEGORY',type:'cascader'},
        ]

    },
    delegate:{//委托管理列表
    	cloumn:[
            {title:'委托人',key:'assignee_name'},
            {title: '受托人',key:'attorney_name' },
            {title: '授权类型',key:'delegate_type_name'},
            {title: '开始时间',key:'date_start'},
            {title: '结束时间',key:'date_end'},
            {title: '流程名',key:'process_name'},
            {title: '事务名',key:'proc_inst_name'},
            {title: '状态',key:'status_name'},
            ],
        gettablelist:_API.API_DELEGATION_LIST,
        querylist:[
            {label:'委托人',name:'assignee_name',type:'input'},
			{label:'委托人工号',name:'assignee_code',type:'input'},
            {label:'受托人',name:'attorney_name',type:'input'},
			{label:'受托人工号',name:'attorney_code',type:'input'},
            {label:'授权类型',name:'delegate_type', codetype:'A1019',  type:'select'},
			{label:'事物名',name:'proc_inst_name',type:'input'},
			{label:'流程名',name:'process_name',type:'input'},

        ]

    },
    templateseting:{//模板设置
        cloumn:[
            {title:'模板id',key:'template_id'},
            {title:'模板名称',key:'template_name'},
            // {title: '业务类型',key:'business_type' },
            // {title: '要素模板标识',key:'characteristic'},
            // {title: '是否默认',key:' default_flag'},
            // {title: '模板代码',key:'model_code'},
            // {title: '是否启用',key:'inuse'},
            // {title: '菜单代码',key:'template_code'},
            {title: '备注',key:'remark'},
            ],
        gettablelist:_API.API_GET_TEMPLIST,
        querylist:[
            {label:'模板名称',name:'template_name',type:'input'},
            {label:'模板id',name:'template_id',type:'input'},
        ],
        menuid:'402882986b4a6ef2016b4ad3926f0005'
    },
    postsetting:{//岗位
        cloumn:[
            {title: '岗位',key:'gradeName' },
            {title: '岗位编号',key:'gradeCode'},
            {title: '部门',key:'groupName' },
            {title: '上级岗位',key:'pName' },
            {title: '描述',key:'description'},

            ],
        gettablelist:_API.API_QUERYLIST_POST,

        menuid:'402882986b4adaee016b4adbdfc60001',
        querylist:[
            {label:'岗位名称',name:'gradeName',type:'input'},
            {label:'岗位编号',name:'gradeCode',type:'input'},
            {label:'部门名称',name:'groupName',type:'input'},
            {label:'上级岗位名称',name:'pGrageName',type:'input'},

        ]
    },
    usersetting:{//用户设置列表
        cloumn:[
            {title: '工号', key:'userName'},
            {title: '姓名',key:'name'},
            {title: '部门', key:'groupName'},
            {title: '角色', key:'roleName'},
            {title: '账号状态', key:'flag'},
            {title: '员工状态', key:'status'},
            {title: '账号有效期',key:'effectiveDate'},
            ],
        gettablelist:_API.API_USERLIST,

        menuid:'402882986b4adaee016b4adc13350002',
        querylist:[
            {label:'用户名',name:'name',type:'input'},
            {label:'员工状态',name:'status',codetype:'USER_STATUS',type:'select'},
            {label:'账号状态',name:'flag',codetype:'USER_LOCKSTATUS',type:'select'},
            {label:'员工号',name:'userName',type:'input'},
            {label:'用户部门',name:'groupName',type:'input'},
            // {label:'用户岗位',name:'gradeName',type:'input'},
        ]
    },
    usersettings:{//用户设置列表
        cloumn:[
            {title: '工号', key:'userName'},
            {title: '姓名',key:'name'},
            {title: '部门', key:'groupName'},
            {title: '最近登录', key:'最近登录'},
            {title: '账号有效期',key:'effectiveDate'},
            ],
        gettablelist:_API.API_USERLIST,
        menuid:'402882986b4adaee016b4adc13350002',
        querylist:[
            {label:'用户名',name:'name',type:'input'},
            {label:'员工状态',name:'status',codetype:'USER_STATUS',type:'select'},
            {label:'账号状态',name:'flag',codetype:'USER_LOCKSTATUS',type:'select'},
            {label:'员工号',name:'userName',type:'input'},
            {label:'用户部门',name:'groupName',type:'input'},
            // {label:'用户岗位',name:'gradeName',type:'input'},
        ]
    },
    role:{//角色
        cloumn:[
            {title: '角色名', key: 'roleName'},
            {title: '角色描述', key: 'roleInfo'},
            {title: '欢迎界面', key: 'welcomePage'},
            ],
        gettablelist:_API.API_ROLE_LIST,

        menuid:'402882986b4a6ef2016b4ad6994b0008',
        querylist:[
            {label:'角色名',name:'roleName',type:'input'},
            // {label:'角色描述',name:'roleInfo',type:'input'},
            // {label:'日期',name:'daterange',start:'startTime',end:'endTime',type:'daterange'},
            // {label:'test1',name:'name1',type:'select',codetype:'TEAM_TYPE'},
            // {label:'test3',name:'name3',type:'select',options:[{label:1,value:1}]},
        ]
    },
    Fileinfomanage:{//文档信息管理
        cloumn:[
            {title:'文档类型',key:'name'},
            {title:'文件名称',key:'name'},
            {title:'文档状态',key:'name'},
            {title:'上传人',key:'name'},
            {title:'上传时间',key:'name'},
            {title:'文档密级',key:'name'},
            {title:'文件大小',key:'name'},
            {title:'最后修改人',key:'name'},
            {title:'最后修改时间',key:'name'},
            {title:'流程实例号',key:'name'},
            ],
        gettablelist:'',

    },
    establishreview:{//成立复核
        cloumn:[
            {title:'项目编号',key:'project_code'},
            {title:'项目名称',key:'project_name'},
            {title:'类型',key:'property_type'},
            {title:'项目阶段',key:'project_flag'},
            {title:'成立状态',key:'est_status'},
            {title:'生成方式',key:'create_type'},
            {title:'成立时间',key:'start_date'},
            {title:'募集金额',key:'raise_amount'},
            {title:'募集份额',key:'raise_share'},
            ],
        gettablelist:_API.API_GET_ESTAUDIT,

    },
    establishchange:{//成立变更
        cloumn:[
            {title:'项目编号',key:'project_id'},
            {title:'项目名称',key:'project_name'},
            {title:'项目类型',key:'project_type'},
            {title:'部门',key:'name'},
            {title:'信托经理',key:'name'},
            {title:'项目阶段',key:'project_flag'},
            {title:'成立状态',key:'est_status'},
            {title:'成立规模',key:'name'},
            ],
        gettablelist:_API.API_GET_ESTAUDIT,
        getbuttonlist:[
            {label:'项目编号',name:'project_id',type:'input'},
            {label:'项目名称',name:'project_name',type:'input'},

        ],
    },
    organizepost:{//组织结构列表
        cloumn:[
            {title:'岗位',key:'岗位'},
            {title:'上级岗位',key:'上级岗位'},
            {title:'备注',key:'备注'},
            ],
        gettablelist:'',

    },
    dictionaries:{//数据字典列表
        cloumn:[
            {title:'类型',key:'codetype'},
            {title:'类型说明',key:'description'},
            {title:'key',key:'dicKey'},
            {title:'value',key:'dicValue'},
            {title:'排序',key:'orders'},
            ],
        gettablelist: _API.API_DIC_LIST,

        querylist:[
            {label:'类型',name:'codetype',type:'input'},
            {label:'类型说明',name:'description',type:'input'},

        ]
    },
    parameter:{//系统参数设置
        cloumn:[
            {title:'参数id',key:'table_Id'},
            {title:'类别名称',key:'type_Name'},
            {title:'字段英文',key:'columnen'},
            {title:'字段中文',key:'columncn'},
            {title:'参数值',key:'default_Value'},
            {title:'创建人',key:'input_Name'},
            {title:'录入时间',key:'input_Date'},
            {title:'录入人账号',key:'input_User_Id'},
            {title:'所属组织',key:'organisation'},
            {title:'平台标识',key:'platIdentity'},
            {title:'参数值验证正则',key:'regularverification'},
            {title:'修改人iD',key:'update_Id'},
            {title:'修改人',key:'update_Name'},
            {title:' 修改时间',key:'update_Date'},
            ],
        gettablelist:_API.API_QUERY_PARAM,

    },
    businesslog:{
        cloumn:[
            {title:'项目编号',key:'project_id'},
            {title:'项目名称',key:'project_name'},
            {title:'日志详情',key:'日志详情'},
            {title:'操作时间',key:'操作时间'},
            {title:' IP地址',key:'IP地址'},
            ],
        gettablelist:'',

    },
    onlineusers:{
        cloumn:[
            {title:'用户账号',key:'用户账号'},
            {title:'姓名',key:'姓名'},
            {title:'登录时间',key:'登录时间'},
            {title:'组织名称',key:'组织名称'},
            {title:' IP地址',key:'IP地址'},
            ],
        gettablelist:'',

    },
    commonlanguage:{
        cloumn:[
            {title:'常用语',key:'content'},
            {title:'创建时间',key:'input_time'},
            {title:'创建人',key:'input_man_name'},
            {title:'最后修改时间',key:'update_time'},
            {title:' 最后修改人',key:'update_man'},
            ],
        gettablelist:_API.API_COMMONWORD_LIST,

        querylist:[
            {label:'内容',name:'content',type:'input'},
            {label:'发布人姓名',name:'input_man_name',type:'input'},
            {label:'最后更新人',name:'update_man',type:'input'},
        ]
    },
    bankaccount:{//银行账户管理
        cloumn:[
            {title:'银行账号',
            render: (h, params) => {
                return h('span', [
                  h('a', {
     　　　　　　　　on: {
     　　　　　　　　　　'click': (val) => {
                           router.push(
                             {
                                name: 'details',
                                // query:{}
                               }
                             )
   　　　　　　　　　　      }
           　　　　　　　　}
                       },params.row.account_number,)
               　　　　])
               　　}
             },
            {title:'所属项目名称',key:'project_name'},
            {title:'账户类型',key:'account_type'},
            {title:'银行名称',key:'bank_name'},
            {title:'支行名称',key:'branch_name'},
            {title:'开户人',key:'account_opener_name'},
            {title:'开户日期 ',key:'account_createtime'},
            {title:'帐户状态',key:'account_flag'},
            ],
        gettablelist:_API.API_ACCOUNT_QUERYPAGE+'?menu_type=1',

        querylist:[
            {label:'项目编号',name:'project_id',type:'input'},
            {label:'所属项目名称',name:'project_name',type:'input'},
          //  {label:'产品代码',name:'fund_code',type:'input'},
            {label:'银行名称',name:'bank_name',type:'select',codetype:'BANK_NAME'},
            {label:'银行名称(支行)',name:'branch_name',type:'input'},
            {label:'账户状态',name:'account_flag',type:'select',codetype:'ACCOUNT_FLAG'},
            {label:'银行账号',name:'account_number',type:'input'},
            {label:'银行账户类型',name:'account_type',type:'select',codetype:'ACCOUNT_TYPE'},
          //  {label:'所属账套',name:'ledger_id',type:'select',codetype:'LEDGER_ID'},
           // {label:'账户归属',name:'account_belong',type:'select',codetype:'ACCOUNT_BELONG'},
          //  {label:'账户性质',name:'account_nature',type:'select',codetype:'ACCOUNT_NATURE'},
        ]
    },
    fundaccount:{//基金账户管理
        cloumn:[
            {title:'项目编号',key:'project_id'},
            {title:'项目名称',key:'project_name'},
            {title:'基金账户名称',
            render: (h, params) => {
                return h('span', [
                  h('a', {
     　　　　　　　　on: {
     　　　　　　　　　　'click': (val) => {
                           router.push(
                             {
                                name: 'details',
                                // query:{}
                               }
                             )
   　　　　　　　　　　      }
           　　　　　　　　}
                       },params.row.account_name,)
               　　　　])
               　　}
             },
            {title:'基金账号',key:'account_number'},
           // {title:'业务部门',key:'银行名称'},
           // {title:'项目经理',key:'开户人'},
            {title:'基金公司 ',key:'securities_company_name'},
            {title:'投资顾问',key:'investment_adviser'},
            {title:' 开户人',key:'account_opener_name'},
            ],
        gettablelist:_API.API_ACCOUNT_QUERYPAGE+'?menu_type=4',

        querylist:[
            {label:'项目编号',name:'project_id',type:'input'},
            {label:'项目名称',name:'project_name',type:'input'},
            {label:'项目账户名称',name:'account_name',type:'input'},
            {label:'基金账号',name:'account_number',type:'input'},
            {label:'基金公司',name:'securities_company_name',type:'input'},
            {label:'投资顾问',name:'investment_adviser',type:'input'},
        ]
    },
    shareholderaccount:{//股东账户管理
        cloumn:[
            {title:'项目编号',key:'project_id'},
            {title:'项目名称',key:'project_name'},
            {title:'股东账号',
            render: (h, params) => {
                return h('span', [
                  h('a', {
     　　　　　　　　on: {
     　　　　　　　　　　'click': (val) => {
                           router.push(
                             {
                                name: 'details',
                                // query:{}
                               }
                             )
   　　　　　　　　　　      }
           　　　　　　　　}
                       },params.row.account_number,)
               　　　　])
               　　}
             },
            {title:'股东账户名称',key:'account_name'},
            //{title:' 业务部门',key:'银行名称'},
           // {title:'基金公司',key:'securities_company_name'},
          //  {title:'开户人 ',key:'account_opener_name'},
            {title:' 开户时间',key:'account_createtime'},
            {title:' 账户状态',key:'account_flag'},
            {title:' 账户执行状态',key:'audit_status'},
            ],
        gettablelist:_API.API_ACCOUNT_QUERYPAGE+'?menu_type=2',

        querylist:[
            {label:'所属信托项目',name:'project_name',type:'input'},
            {label:'账户状态',name:'account_flag',type:'select',codetype:'ACCOUNT_FLAG'},
            {label:'股东姓名',name:'account_name',type:'input'},
            {label:'股东账号',name:'account_number',type:'input'},
        ]
    },
    capitalaccount:{//资金账户管理
        cloumn:[
            {title:'资金账号',
            render: (h, params) => {
                return h('span', [
                  h('a', {
     　　　　　　　　on: {
     　　　　　　　　　　'click': (val) => {
                           router.push(
                             {
                                name: 'details',
                                // query:{}
                               }
                             )
   　　　　　　　　　　      }
           　　　　　　　　}
                       },params.row.account_number,)
               　　　　])
               　　}
             },
            {title:'账户状态',key:'account_flag'},
            {title:'所属项目',key:'project_name'},
            {title:'第三方存管账号',key:'third_party_deposit_account'},
            {title:'银行名称',key:'bank_name'},
            {title:'开户人 ',key:'account_opener_name'},
            {title:'开户日期',key:'account_createtime'},
            {title:' 营业部名称',key:'business_department_name'},
            ],
        gettablelist:_API.API_ACCOUNT_QUERYPAGE+'?menu_type=3&account_id=',
        querylist:[
            {label:'所属项目',name:'project_name',type:'input'},
            {label:'营业部名称',name:'business_department_name',type:'input'},
           // {label:'项目阶段',name:'fund_code',type:'select'},
           // {label:'项目状态',name:'fund_code',type:'select'},
            {label:'账户状态',name:'account_flag',type:'select',codetype:'ACCOUNT_FLAG'},
            {label:'银行名称',name:'bank_name',type:'select',codetype:'BANK_NAME'},
            {label:'账户姓名',name:'account_name',type:'input'},
            {label:'销户日期',name:'account_closedate',start:'startTime',end:'endTime',type:'daterange'},
            {label:'开户日期',name:'account_createtime',start:'startTime',end:'endTime',type:'daterange'},
           // {label:'是否有开户回单',name:'open_receipt',type:'select',codetype:'OPEN_RECEIPT'},
         //   {label:'是否有销户回单',name:'close_receipt',type:'select',codetype:'CLOSE_RECEIPT'},
          //  {label:'项目部门',name:'fund_code',type:'select'},
          //  {label:'产品代码',name:'fund_code',type:'input'},
           // {label:'归档日期',name:'daterange',start:'startTime',end:'endTime',type:'daterange'},
          //  {label:'归档状态',name:'fund_code',type:'select'},
            {label:'开户人',name:'account_opener_name',type:'input'},
            {label:'销户人',name:'seller_name',type:'input'},
            {label:'资金账号',name:'account_number',type:'input'},
        ]
    },
    Interbankaccount:{//银行间债券管理
        cloumn:[
            {title:'项目编号',key:'project_id'},
            {title:'项目所属名称',key:'project_name'},
            {title:'债券账号',
            render: (h, params) => {
                return h('span', [
                  h('a', {
     　　　　　　　　on: {
     　　　　　　　　　　'click': (val) => {
                           router.push(
                             {
                                name: 'details',
                                // query:{}
                               }
                             )
   　　　　　　　　　　      }
           　　　　　　　　}
                       },params.row.account_number,)
               　　　　])
               　　}
             },
            {title:'银行名称',key:'bank_name'},
            {title:'托管机构',key:'trusteeship'},
            {title:'账户全称',key:'account_name'},
            {title:'账户简称',key:'account_alias'},
            // {title:'资金账户名称',key:'account_name'},
            {title:'账户状态',key:'account_flag'},
            ],
        gettablelist:_API.API_ACCOUNT_QUERYPAGE+'?menu_type=5&account_id=',

        querylist:[
            {label:'项目编号',name:'project_id',type:'input'},
            {label:'所属项目名称',name:'project_name',type:'input'},
            {label:'托管机构',name:'trusteeship',type:'select',codetype:'ACCOUNT_FLAG'},
            {label:'债券账号',name:'account_number',type:'input'},
            {label:'账户全称',name:'account_name',type:'input'},
            {label:'账户简称',name:'account_alias',type:'input'},
        ]
    },
    businessaccount:{//营业部管理
        cloumn:[
            {title:'营业部编号',key:'business_number'},
            {title:'营业部名称',
            render: (h, params) => {
                return h('span', [
                  h('a', {
     　　　　　　　　on: {
     　　　　　　　　　　'click': (val) => {
                           router.push(
                             {
                                name: 'details',
                                // query:{}
                               }
                             )
   　　　　　　　　　　      }
           　　　　　　　　}
                       },params.row.business_name,)
               　　　　])
               　　}
             },
            {title:'营业部地址',key:'business_adress'},
            {title:'所属券商编号',key:'account_id'},
            {title:' 所属券商名称',key:'bank_name'},
            {title:'金融机构编码',key:'financial_coding'},
            {title:' 主要联系人',key:'account_createtime'},
            {title:' 联系人电话',key:'帐户状态'},
            {title:'电子邮件',key:'project_name'},
            {title:'手机',key:'银行名称'},
            {title:' 传真号码',key:'bank_name'},
            {title:'复核状态',key:'audit_status'},
            {title:' 复核备注',key:'account_createtime'},
            {title:' 复核人',key:'audit_user'},
            ],
        gettablelist:_API.API_BUSINESS_QUERY,

        querylist:[
            {label:'营业部编号',name:'business_number',type:'input'},
            {label:'营业部名称',name:'business_name',type:'select',getOption :async ()=>{
               await axios.get(_API.API_BUSINESS_QUERY).then(res=>{
                    if(res.data.success){
                        arr=JSON.parse(JSON.stringify(res.data.data.result).replace(/business_department_id/g,"value"));
                        arr=JSON.parse(JSON.stringify(arr).replace(/business_name/g,"label"));
                    }
                })
                  return arr
            }},
            {label:'复核状态',name:'audit_status',type:'select',codetype:'AUDIT_STATUS'},
        ]
    },
    group:{//群组
        cloumn:[
            {title:'群组名称',key:'teamName'},
            {title:'创建人',key:'createUserName'},
            {title:'群组类型',key:'teamType'},
            {title:'群组用途',key:'teamUseType'},
            {title:'备注',key:'description'},
            ],
        gettablelist: _API.API_GROUP_LIST,

        menuid:'402882986b4a6ef2016b4ad8278f0009',
        querylist:[
            {label:'创建人',name:'createUserName',type:'input'},
            {label:'群组名称',name:'teamName',type:'input'},
            // {label:'日期',name:'daterange',start:'startTime',end:'endTime',type:'daterange'},

        ]
    },
    Workflowmanage:{//工作流管理
        cloumn:[
            {title:'序号',key:'群组名称'},
            {title:'流程名称',key:'创建人'},
            {title:'流程描述',key:'账户类型'},
            {title:'发起时间',key:'银行名称'},
            {title:' 结束时间',key:'银行名称'},
            {title:' 持续时间',key:'银行名称'},
            ],
        gettablelist:'',

    },
    WorkflowDesign:{//工作流设计
        cloumn:[
            {title:'流程标题',key:'群组名称'},
            {title:'流程编码',key:'创建人'},
            {title:'版本',key:'账户类型'},
            {title:'流程分类',key:'银行名称'},
            {title:'表单名称',key:'银行名称'},
            {title:' 流程描述',key:'银行名称'},
        ],
        gettablelist:'',

    },
    ProcessList:{//流程列表
        cloumn:[
            {title:'流程状态',key:'群组名称'},
            {title:'流程名称',key:'name'},
            {title:'项目名称',key:'project_name'},
            {title:'当前节点',key:'账户类型'},
            {title:'当前处理人',key:'assignee',tooltip:true,},
            {title:'开始时间',key:'银行名称'},
            {title:' 最后处理时间',key:'银行名称'},
        ],
        gettablelist:_API.API_RUNNING_LIST,
    },
    MyLaunch:{//我的发起
        cloumn:[
            {title:'标题',
            render: (h, params) => {
              return h('span', [
                h('a', {
   　　　　　　　　on: {
   　　　　　　　　　　'click': (val) => {
                         router.push(
                           {
                              name: 'seeApproval',
                              query:{id: params.row.taskId, processid: params.row.processInstanceId}
                             }
                           )
 　　　　　　　　　　      }
         　　　　　　　　}
                   },params.row.tittle,)
           　　　　])
           　　}
          },
            // {title:'节点ID',
            //  key:'activityId'
            // },
            {title:'节点名称',key:'activityName'},
            {title:'当前处理人',
             //key:'assignee',
             tooltip:true,
        },
            {title:'流程ID',key:'processDefinitionId'},
            {title:'流程名称',key:'processDefinitionName'},
            {title:'流程实例ID',key:'processInstanceId'},
            {title:' taskID',key:'taskId'},
            {title:'激活状态',key:'supensionState'},
            {title:'流程状态',key:'processType'},
        ],
        gettablelist:_API.API_QUERY_MYSTART,
        querylist:[
            {label: '标题',name:'tittle',type:'input'},
            {label: '流程ID',name:'processDefinitionId',type:'input'},
            {label:'流程名称',name:'processDefinitionName',type:'input'},
            {label: '流程实例ID',name:'processInstanceId',type:'input'},
            {label: '流程状态',name:'processType',codetype:'PROCESSTYPE',type:'select'},
        ]
    },
    MyHandle:{//我的处理
        cloumn:[
            {title:'标题',
                render: (h, params) => {
                return h('span', [
                    h('a', {
    　　　　　　　　on: {
    　　　　　　　　　　'click': (val) => {
                            router.push(
                            {
                                name: 'handleflow',
                                query:{id: params.row.taskId, processid: params.row.processInstanceId}
                                }
                            )
    　　　　　　　　　　      }
            　　　　　　　　}
                    },params.row.tittle,)
            　　　　])
            　　}
            },
            // {title:'节点ID',
            //   key:'activityId'
            // },
            {title:'节点名称',key:'activityName'},
       //     {title:'节点类型',key:'activityType'},
            {title:'当前处理人',key:'assignee',tooltip:true,},
            {title:'持续处理时间',key:'durationInMillis'},
            {title:'结束时间',key:'endTime'},
            {title:'流程ID',key:'processDefinitionId'},
            {title:'流程名称',key:'processDefinitionName'},
            {title:'流程实例ID',key:'processInstanceId'},
            {title:'节点状态',key:'processType'},
            {title:'开始时间',key:'startTime'},
            {title:' taskID',key:'taskId'},
        ],
        gettablelist:_API.API_QUERY_MYTASK,
        querylist:[
            {label: '标题',name:'tittle',type:'input'},
            {label: '流程ID',name:'processDefinitionId',type:'input'},
            {label:'流程名称',name:'processDefinitionName',type:'input'},
            {label: '流程实例ID',name:'processInstanceId',type:'input'},
            {label: '节点状态',name:'processType',codetype:'PROCESSTYPE',type:'select'},
        ]
    },
    ProcessMonitor:{//流程监控
        cloumn:[
            {title:'流程ID',key:'processid'},
            {title:'流程名称',key:'processname'},
            {title:'版本号',key:'version'},
            {title:'工作流分类',key:'category'},
            {title:'结束数量',key:'endCount'},
            {title:'挂起数量',key:'hangCount'},
            {title:'运行数量',key:'runCount'},
            {title:'中止数量',key:'suspendCount'},
        ],
        gettablelist:_API.API_QUERY_LISTTYPE,
        querylist:[
            {label:'工作流分类',name:'category',codetype:'PROCESS_CATEGORY',type:'select'},
            {label: '流程ID',name:'processDefinitionId',type:'input'},
            {label:'流程名称',name:'processDefinitionName',type:'input'},

          //  {label: '流程实例ID',name:'processInstanceId',type:'input'},
        ]
    },
    ExampleMonitor:{//流程实例监控
        cloumn:[
                {title:'标题',
                render: (h, params) => {
                return h('span', [
                    h('a', {
    　　　　　　　　on: {
    　　　　　　　　　　'click': (val) => {
                            router.push(
                            {
                                name: 'seeApproval',
                                query:{id: params.row.taskId, processid: params.row.processInstanceId}
                                }
                            )
    　　　　　　　　　　      }
            　　　　　　　　}
                    },params.row.tittle,)
            　　　　])
            　　}
            },
          //  {title:'节点ID',key:'activityId'},
            {title:'节点名称',key:'activityName'},
            {title:'当前处理人',
             key:'assignee',
              tooltip:true,
           },
            {title:'机构',key:'group_name'},
            {title:'流程ID',key:'processDefinitionId'},
            {title:'流程名称',key:'processDefinitionName'},
            {title:'流程实例ID',key:'processInstanceId'},
            {title:'流程状态',key:'processType'},
            {title:'项目ID',key:'project_id'},
            {title:'项目名称',key:'project_name'},
            {title:'激活状态',key:'supensionState'},
            {title:'taskID',key:'taskId'},
        ],
        gettablelist:_API.API_QUERY_PORCESS,
        querylist:[
            {label: '流程ID',name:'processDefinitionId',type:'input'},
            {label:'流程名称',name:'processDefinitionName',type:'input'},
            {label: '流程实例ID',name:'processInstanceId',type:'input'},
            {label: '流程状态',name:'processType',codetype:'PROCESSTYPE',type:'select'},
            {label:'项目ID',name:'project_id',type:'input'},
            {label: '项目名称',name:'project_name',type:'input'},
            {label: '标题',name:'tittle',type:'input'},
        ]

    },
    nodeMonitor:{//流程节点监控
        cloumn:[
             {title:'标题',
                render: (h, params) => {
                return h('span', [
                    h('a', {
    　　　　　　　　on: {
    　　　　　　　　　　'click': (val) => {
                            router.push(
                            {
                                name: 'seeApproval',
                                query:{id: params.row.taskId, processid: params.row.processInstanceId}
                                }
                            )
    　　　　　　　　　　      }
            　　　　　　　　}
                    },params.row.tittle,)
            　　　　])
            　　}
            },
           // {title:'节点ID',key:'activityId'},
            {title:'节点名称',key:'activityName'},
            //{title:'节点类型',key:'activityType'},
            {title:'持续处理时间',key:'durationInMillis'},
            {title:'结束时间',key:'endTime'},
            {title:'当前处理人',
               key:'assignee',
               tooltip:true,
            },
            {title:'该节点处理人',
              key:'thisAssignee',
              tooltip:true,
            },
            {title:'机构',key:'group_name'},
            {title:'流程ID',key:'processDefinitionId'},
            {title:'流程名称',key:'processDefinitionName'},
            {title:'流程实例ID',key:'processInstanceId'},
            {title:'节点状态',key:'processType'},
            {title:'项目ID',key:'project_id'},
            {title:'项目名称',key:'project_name'},
            {title:'开始时间',key:'startTime'},
            {title:'taskID',key:'taskId'},
            {title:'正文',key:'text'},
        ],
        gettablelist:_API.API_QUERY_TASK,
        querylist:[
            {label: '流程ID',name:'processDefinitionId',type:'input'},
            {label:'流程名称',name:'processDefinitionName',type:'input'},
            {label: '流程实例ID',name:'processInstanceId',type:'input'},
            {label: '节点状态',name:'processType',codetype:'PROCESSTYPE',type:'select'},
            {label:'项目ID',name:'project_id',type:'input'},
            {label: '项目名称',name:'project_name',type:'input'},
            {label: '标题',name:'tittle',type:'input'},
        ]

    },
    seeprocess:{//流程实例监控
        cloumn:[
                {title:'标题',
                render: (h, params) => {
                return h('span', [
                    h('a', {
    　　　　　　　　on: {
    　　　　　　　　　　'click': (val) => {
                            router.push(
                            {
                                name: 'seeApproval',
                                query:{id: params.row.taskId, processid: params.row.processInstanceId}
                                }
                            )
    　　　　　　　　　　      }
            　　　　　　　　}
                    },params.row.tittle,)
            　　　　])
            　　}
            },
          //  {title:'节点ID',key:'activityId'},
            {title:'节点名称',key:'activityName'},
            {title:'当前处理人',
            //key:'assignee'
                render: (h, params) => {
                    return h('div', [
                    h('a', {
                        style: {
                            display: 'inline-block',
                            width: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            color:'#4C5362'
                        },
                        domProps: {
                            title: params.row.assignee
                        }
                    }, params.row.assignee)
                ]);
               }
           },
            {title:'机构',key:'group_name'},
            {title:'流程ID',key:'processDefinitionId'},
            {title:'流程名称',key:'processDefinitionName'},
            {title:'流程实例ID',key:'processInstanceId'},
            {title:'流程状态',key:'processType'},
            {title:'项目ID',key:'project_id'},
            {title:'项目名称',key:'project_name'},
            {title:'激活状态',key:'supensionState'},
            {title:'taskID',key:'taskId'},
        ],
        gettablelist:_API.API_QUERY_PROCESS,
        querylist:[
            {label: '流程ID',name:'processDefinitionId',type:'input'},
            {label:'流程名称',name:'processDefinitionName',type:'input'},
            {label: '流程实例ID',name:'processInstanceId',type:'input'},
            {label: '流程状态',name:'processType',codetype:'PROCESSTYPE',type:'select'},
            {label:'项目ID',name:'project_id',type:'input'},
            {label: '项目名称',name:'project_name',type:'input'},
            {label: '标题',name:'tittle',type:'input'},
        ]

    },
    taskMonitor:{//任务监控
        cloumn:[
            {title:'流程实例号',key:'群组名称'},
            {title:'任务名称',key:'创建人'},
            {title:'流程类型',key:'账户类型'},
            {title:'状态',key:'账户类型'},
            {title:'处理人',key:'账户类型'},
            {title:'任务开始时间',key:'银行名称'},
            {title:' 任务结束时间',key:'银行名称'},
            {title:' 任务持续时间',key:'银行名称'},
         ],
        gettablelist:'',

    },
    EntrustMonitor:{//委托监控
        cloumn:[
            {title:'委托人',key:'群组名称'},
            {title:'代理人',key:'创建人'},
            {title:'委托方式',key:'账户类型'},
            {title:'代理人身份',key:'账户类型'},
            {title:'委托状态',key:'账户类型'},
            {title:'任务号',key:'银行名称'},
            {title:'委托开始时间',key:'银行名称'},
            {title:' 委托结束时间',key:'银行名称'},
            {title:' 创建人',key:'银行名称'},
         ],
        gettablelist:'',

    },
    Wholeprocess:{//全部流程
        cloumn:[
            {title:'流程编号',key:'群组名称'},
            {title:'流程标题',key:'创建人'},
            {title:'当前处理人',key:'账户类型'},
            {title:'当前节点',key:'账户类型'},
            {title:'最后处理时间',key:'账户类型'},
            {title:'最后处理人',key:'银行名称'},
            {title:'状态',key:'银行名称'},
         ],
        gettablelist:'',

    },
    todolisting:{//待办列表
        cloumn:[
            {title:'ID',key:'taskId'},
            {title:'项目',key:'project_name'},
            {title:'流程名称',key:'name'},
            {title:'标题',key:'tittle'},
            // {title:'当前处理人',key:'taskassignee'},
            {title:'任务状态',key:'taskname'},
            {title:'创建人',key:'createassignee'},
            {title:'创建时间',key:'tasktime'},
            {title:'最后处理人',key:'taskLastAssignee'},
         ],
        gettablelist:_API.API_TASK_TODOLIST,
        querylist:[
            {label:'流程名称',name:'name',type:'input'},
            {label:'项目名称',name:'project_name',type:'input'},
            {label:'标题',name:'tittle',type:'input'},
        ]
    },
    department:{//所属部门
        cloumn:[
            {title:'部门名称',key:'groupName'},
            {title:'部门编号',key:'groupCode'},
         ],
        gettablelist:_API.API_ORG_TABLELIST,
        querylist:[
            {label:'部门名称',name:'groupName',type:'input'},
            {label:'部门编号',name:'groupCode',type:'input'},
        ]
    },
    investment:{//投资顾问
      cloumn:[
          {title:'项目编号',key:'project_code'},
          {title:'所属部门',key:'group_name'},
          {title:'项目经理',key:'project_manager_name'},
          {title:'项目名称',key:'project_name'},
          {title:'项目简称',key:'short_name'},
          {title:'项目类别',key:' project_type'},
          {title:'项目状态',key:'project_status'},
          {title:'项目阶段',key:'project_flag'},
       ],
      gettablelist:_API.API_QUERY_PROJECT,
      querylist:[
          {label:'项目编号',name:'project_code',type:'input'},
          {label:'项目名称',name:'project_name',type:'input'},
          {label:'项目类别',name:'project_type',codetype:'X2115',type:'select'},
          {label:'项目状态',name:'project_status',codetype:'X1037',type:'select'},
          {label:'项目阶段',name:'project_flag',codetype:'PROJECT_FLAG',type:'select'},
      ]
    },
    realestate:{//房地产信息
      cloumn:[
          {title:'项目编号',key:'project_code'},
          {title:'所属部门',key:'group_name'},
          {title:'项目经理',key:'project_manager_name'},
          {title:'项目名称',key:'project_name'},
          {title:'项目简称',key:'short_name'},
          {title:'项目类别',key:' project_type'},
          {title:'项目状态',key:'project_status'},
          {title:'项目阶段',key:'project_flag'},
       ],
      gettablelist:_API.API_QUERY_PROJECT,
      querylist:[
          {label:'项目编号',name:'project_code',type:'input'},
          {label:'项目名称',name:'project_name',type:'input'},
          {label:'项目类别',name:'project_type',codetype:'X2115',type:'select'},
          {label:'项目状态',name:'project_status',codetype:'X1037',type:'select'},
          {label:'项目阶段',name:'project_flag',codetype:'PROJECT_FLAG',type:'select'},
      ]
    },
    cooperation:{//信托三方机构合作信息
      cloumn:[
          {title:'项目编号',key:'project_code'},
          {title:'所属部门',key:'group_name'},
          {title:'项目经理',key:'project_manager_name'},
          {title:'项目名称',key:'project_name'},
          {title:'项目简称',key:'short_name'},
          {title:'项目类别',key:' project_type'},
          {title:'项目状态',key:'project_status'},
          {title:'项目阶段',key:'project_flag'},
       ],
      gettablelist:_API.API_QUERY_PROJECT,
      querylist:[
          {label:'项目编号',name:'project_code',type:'input'},
          {label:'项目名称',name:'project_name',type:'input'},
          {label:'项目类别',name:'project_type',codetype:'X2115',type:'select'},
          {label:'项目状态',name:'project_status',codetype:'X1037',type:'select'},
          {label:'项目阶段',name:'project_flag',codetype:'PROJECT_FLAG',type:'select'},
      ]
    },
    target_industry:{//非地产非基建项目
      cloumn:[
          {title:'项目编号',key:'project_code'},
          {title:'所属部门',key:'group_name'},
          {title:'项目经理',key:'project_manager_name'},
          {title:'项目名称',key:'project_name'},
          {title:'项目简称',key:'short_name'},
          {title:'项目类别',key:' project_type'},
          {title:'项目状态',key:'project_status'},
          {title:'项目阶段',key:'project_flag'},
       ],
      gettablelist:_API.API_QUERY_PROJECT,
      querylist:[
          {label:'项目编号',name:'project_code',type:'input'},
          {label:'项目名称',name:'project_name',type:'input'},
          {label:'项目类别',name:'project_type',codetype:'X2115',type:'select'},
          {label:'项目状态',name:'project_status',codetype:'X1037',type:'select'},
          {label:'项目阶段',name:'project_flag',codetype:'PROJECT_FLAG',type:'select'},
      ]
    },
    citicregister:{//中信登存续登记
      cloumn:[
          {title:'项目编号',key:'project_code'},
          {title:'所属部门',key:'group_name'},
          {title:'项目经理',key:'project_manager_name'},
          {title:'项目名称',key:'project_name'},
          {title:'项目简称',key:'short_name'},
          {title:'项目类别',key:' project_type'},
          {title:'项目状态',key:'project_status'},
          {title:'项目阶段',key:'project_flag'},
       ],
      gettablelist:_API.API_QUERY_PROJECT,
      querylist:[
          {label:'项目编号',name:'project_code',type:'input'},
          {label:'项目名称',name:'project_name',type:'input'},
          {label:'项目类别',name:'project_type',codetype:'X2115',type:'select'},
          {label:'项目状态',name:'project_status',codetype:'X1037',type:'select'},
          {label:'项目阶段',name:'project_flag',codetype:'PROJECT_FLAG',type:'select'},
      ]
    },
    citicpreregistration:{//中信登预登记
      cloumn:[
          {title:'项目编号',key:'project_code'},
          {title:'所属部门',key:'group_name'},
          {title:'项目经理',key:'project_manager_name'},
          {title:'项目名称',key:'project_name'},
          {title:'项目简称',key:'short_name'},
          {title:'项目类别',key:' project_type'},
          {title:'项目状态',key:'project_status'},
          {title:'项目阶段',key:'project_flag'},
       ],
      gettablelist:_API.API_QUERY_PROJECT,
      querylist:[
          {label:'项目编号',name:'project_code',type:'input'},
          {label:'项目名称',name:'project_name',type:'input'},
          {label:'项目类别',name:'project_type',codetype:'X2115',type:'select'},
          {label:'项目状态',name:'project_status',codetype:'X1037',type:'select'},
          {label:'项目阶段',name:'project_flag',codetype:'PROJECT_FLAG',type:'select'},
      ]
    },
    Infrastructure:{//基础建设项目信息
      cloumn:[
          {title:'项目编号',key:'project_code'},
          {title:'所属部门',key:'group_name'},
          {title:'项目经理',key:'project_manager_name'},
          {title:'项目名称',key:'project_name'},
          {title:'项目简称',key:'short_name'},
          {title:'项目类别',key:' project_type'},
          {title:'项目状态',key:'project_status'},
          {title:'项目阶段',key:'project_flag'},
       ],
      gettablelist:_API.API_QUERY_PROJECT,
      querylist:[
          {label:'项目编号',name:'project_code',type:'input'},
          {label:'项目名称',name:'project_name',type:'input'},
          {label:'项目类别',name:'project_type',codetype:'X2115',type:'select'},
          {label:'项目状态',name:'project_status',codetype:'X1037',type:'select'},
          {label:'项目阶段',name:'project_flag',codetype:'PROJECT_FLAG',type:'select'},
      ]
    },
    projectList:{//项目管理
        cloumn:[
            {title:'项目编号',key:'project_code'},
            {title:'所属部门',key:'group_name'},
            {title:'项目经理',key:'project_manager_name'},
            {title:'项目名称',
            render: (h, params) => {
                return h('span', [
                  h('a', {
     　　　　　　　　on: {
     　　　　　　　　　　'click': (val) => {
                           router.push(
                             {
                                name: 'details',
                                // query:{}
                               }
                             )
   　　　　　　　　　　      }
           　　　　　　　　}
                       },params.row.project_name,)
               　　　　])
               　　}
             },
            {title:'项目简称',key:'short_name'},
            {title:'项目类别',key:'project_type'},
            {title:'项目状态',key:'project_status'},
            {title:'项目阶段',key:'project_flag'},
         ],
        gettablelist:_API.API_QUERY_PROJECT,

        querylist:[
            {label:'项目编号',name:'project_code',type:'input'},
            {label:'项目名称',name:'project_name',type:'input'},
            {label:'项目类别',name:'project_type',codetype:'X2115',type:'select'},
            {label:'项目状态',name:'project_status',codetype:'X1037',type:'select'},
            {label:'项目阶段',name:'project_flag',codetype:'PROJECT_FLAG',type:'select'},
        ]
    },
    projectestablish:{//项目成立
        cloumn:[
            {title:'项目编号',key:'project_code'},
            {title:'所属部门',key:'group_name'},
            {title:'项目经理',key:'project_manager_name'},
            {title:'项目名称',
            render: (h, params) => {
                return h('span', [
                  h('a', {
     　　　　　　　　on: {
     　　　　　　　　　　'click': (val) => {
                           router.push(
                             {
                                name: 'details',
                                // query:{}
                               }
                             )
   　　　　　　　　　　      }
           　　　　　　　　}
                       },params.row.project_name,)
               　　　　])
               　　}
             },
            {title:'项目简称',key:'short_name'},
            {title:'项目类别',key:'project_type'},
            {title:'项目状态',key:'project_status'},
            {title:'项目阶段',key:'project_flag'},
         ],
        gettablelist:_API.API_QUERY_PROJECT,

        querylist:[
            {label:'项目编号',name:'project_code',type:'input'},
            {label:'项目名称',name:'project_name',type:'input'},
            {label:'项目类别',name:'project_type',codetype:'X2115',type:'select'},
            {label:'项目状态',name:'project_status',codetype:'X1037',type:'select'},
            {label:'项目阶段',name:'project_flag',codetype:'PROJECT_FLAG',type:'select'},
        ]
    },
    organize:{//组织机构
        cloumn:[
            {title:'部门编号',key:'groupCode'},
            {title:'部门名称',key:'groupName'},
            {title:'部门分类',key:'type'},
            {title:'主管组织',key:'mGroupName'},
            {title:'负责人',key:'header'},
            {title:'分管领导',key:'leader'},
            {title:'是否虚拟',key:'isVirtual'},
            {title:'协管领导',key:'assistLeader'},
         ],
        gettablelist:_API.API_ORG_TABLELIST,

        querylist:[
            {label:'部门编号',name:'groupCode',type:'input'},
            {label:'部门名称',name:'groupName',type:'input'},
            {label:'主管部门',name:'mGroupName',type:'input'},
            {label:'上级部门',name:'pGroupName',type:'input'},
            {label:'部门类型',name:'type',type:'select',codetype:'GROUP_TYPE'},

        ]
    },
    notice:{   //公告管理
        cloumn:[
            {title:'标题',key:'title',
            render: (h, params) => {
                 return h('span', [
                   h('a', {
      　　　　　　　　on: {
      　　　　　　　　　　'click': (val) => {
                            console.log(params.row.title);
                            router.push(
                              {
                                 name: 'seenotice',
                                 query:{id:params.row.sn_id}
                                }
                              )
    　　　　　　　　　　      }
            　　　　　　　　}
                      },params.row.title,)
              　　　　])
              　　}
              },
            {title:'创建人',key:'input_man_name'},
            {title:'状态',key:'valid_name'},
            {title:'有效截止日期',key:'valid_date'},
         ],
        gettablelist:_API.API_NOTICE_LIST,

        querylist:[
            {label:'标题',name:'title',type:'input'},

        ]
    },
    tempbankaccount:{   //模板新增
        cloumn:[
            {title:'联系人类型',key:'contract_type'},
            {title:'银行联系人',key:'contract_name'},
            {title:'银行联系部门',key:'contacts_dept'},
            {title:'银行联系电话',key:'contract_phone'},
            {title:'电子邮件',key:'email'},
            {title:'手机号码',key:'phone'},
            {title:'传真号码',key:'fax_no'},
            {title:'联系地址',key:'adress'},
            {title:'联系类型',key:'relationship_type'},
            {title:'备注',key:'remark'},
            {title:'操作',key:'valid_date'},
         ],
        gettablelist:_API.API_TEMP_TABLE,

        querylist:[
        ]
    },
    tempcapitalaccount:{   //模板新增资金
        cloumn:[
            {title:'券商联系人',key:'contract_name'},
            {title:'券商联系部门',key:'contacts_dept'},
            {title:'券商联系电话',key:'contract_phone'},
            {title:'电子邮件',key:'email'},
            {title:'手机号码',key:'phone'},
            {title:'传真号码',key:'fax_no'},
            {title:'联系地址',key:'adress'},
            {title:'备注',key:'remark'},
            {title:'操作',key:'valid_date'},
         ],
        gettablelist:_API.API_TEMP_TABLE,

        querylist:[
        ]
    },
    tempfundaccount:{   //模板新增基金
        cloumn:[
            {title:'基金联系人',key:'contract_name'},
            {title:'基金联系部门',key:'contacts_dept'},
            {title:'基金联系电话',key:'contract_phone'},
            {title:'电子邮件',key:'email'},
            {title:'客服电话',key:'phone'},
            {title:'传真号码',key:'fax_no'},
            {title:'联系地址',key:'adress'},
            {title:'备注',key:'remark'},
            {title:'操作',key:'valid_date'},
         ],
        gettablelist:_API.API_TEMP_TABLE,

        querylist:[
        ]
    },
    calendar:{   //日历提醒
        cloumn:[
            {title:'内容正文',key:'content'},
            {title:'被提醒人ID',key:'receive_man'},
            {title:'标题',key:'title'},
            {title:'类型',key:'type'},
            {title:'提醒日期',key:'warn_date'},
            {title:'重复天数',key:'warn_day_count'},
         ],
        gettablelist:_API.API_CALENDAR_LIST,

        querylist:[
            {label:'标题',name:'title',type:'input'},
        ]
    },
    sonpost:{// 获取部门下的岗位
        cloumn:[
            {title: '岗位',key:'gradeName' },
            {title: '岗位编号',key:'gradeCode'},
            {title: '部门',key:'groupName' },
            {title: '上级岗位',key:'pName' },
            {title: '描述',key:'description'},

            ],
        gettablelist:_API.API_QUERYID_DPIDPOST,

        querylist:[
        ]
    },
    organize_type1:{//组织结构新增修改 上级组织选择table
        cloumn:[
            {title:'部门编号',key:'groupCode'},
            {title:'部门名称',key:'groupName'},
            {title:'部门分类',key:'type'},
            {title:'主管组织',key:'mGroupName'},
            {title:'负责人',key:'header'},
            {title:'分管领导',key:'leader'},
            {title:'是否虚拟',key:'isVirtual'},
         ],
        gettablelist:_API.API_ORG_TABLELIST,

        querylist:[
            {label:'部门编号',name:'groupCode',type:'input'},
            {label:'部门名称',name:'groupName',type:'input'},
            {label:'主管部门',name:'mGroupName',type:'input'},
            {label:'上级部门',name:'pGroupName',type:'input'},
            {label:'部门类型',name:'type',type:'select',codetype:'GROUP_TYPE'},

        ]
    },
    organize_type2:{//组织结构新增修改 主管组织选择table
        cloumn:[
            {title:'部门编号',key:'groupCode'},
            {title:'部门名称',key:'groupName'},
            {title:'部门分类',key:'type'},
            {title:'主管组织',key:'mGroupName'},
            {title:'负责人',key:'header'},
            {title:'分管领导',key:'leader'},
            {title:'是否虚拟',key:'isVirtual'},
         ],
        gettablelist:_API.API_SUPGROUP,

        querylist:[
            {label:'部门编号',name:'groupCode',type:'input'},
            {label:'部门名称',name:'groupName',type:'input'},
            {label:'主管部门',name:'mGroupName',type:'input'},
            {label:'上级部门',name:'pGroupName',type:'input'},
            {label:'部门类型',name:'type',type:'select',codetype:'GROUP_TYPE'},

        ]
    },
    organize_type3:{ //组织结构新增修改 负责人选择table
        cloumn:[
            {title: '工号', key:'userName'},
            {title: '姓名',key:'name'},
            {title: '部门', key:'groupName'},
            ],
        gettablelist:_API.API_USERLIST,

        querylist:[
            {label:'用户名',name:'name',type:'input'},
            {label:'员工状态',name:'status',codetype:'USER_STATUS',type:'select'},
            {label:'账号状态',name:'flag',codetype:'USER_LOCKSTATUS',type:'select'},
            {label:'员工号',name:'userName',type:'input'},
            {label:'用户部门',name:'groupName',type:'input'},
            // {label:'用户岗位',name:'gradeName',type:'input'},
        ]
    },
    organize_type4:{ //组织结构新增修改 分管领导选择table
        cloumn:[
            {title: '工号', key:'userName'},
            {title: '姓名',key:'name'},
            {title: '部门', key:'groupName'},
            ],
        gettablelist:_API.API_USERLIST,

        querylist:[
            {label:'用户名',name:'name',type:'input'},
            {label:'员工状态',name:'status',codetype:'USER_STATUS',type:'select'},
            {label:'账号状态',name:'flag',codetype:'USER_LOCKSTATUS',type:'select'},
            {label:'员工号',name:'userName',type:'input'},
            {label:'用户部门',name:'groupName',type:'input'},
            // {label:'用户岗位',name:'gradeName',type:'input'},
        ]
    },
    organize_type5:{ //组织结构新增修改 协管领导选择table
        cloumn:[
            {title: '工号', key:'userName'},
            {title: '姓名',key:'name'},
            {title: '部门', key:'groupName'},
            ],
        gettablelist:_API.API_USERLIST,

        querylist:[
            {label:'用户名',name:'name',type:'input'},
            {label:'员工状态',name:'status',codetype:'USER_STATUS',type:'select'},
            {label:'账号状态',name:'flag',codetype:'USER_LOCKSTATUS',type:'select'},
            {label:'员工号',name:'userName',type:'input'},
            {label:'用户部门',name:'groupName',type:'input'},
            // {label:'用户岗位',name:'gradeName',type:'input'},
        ]
    },
    pledge:{ //抵质押物
        cloumn:[
            {title: '名称', key:'asset_name'},
            {title: '开始日期',key:'start_date'},
            {title: '签约日期', key:'sign_date'},
            {title: '到期日期', key:'end_date'},
            {title: '资产性质', key:'asset_prop_name'},
            {title: '抵质押人', key:'cust_id_name'},
            {title: '入库数量', key:'asset_count'},
            {title: '保管编号', key:'bgbh'},
            {title: '期初价值', key:'qcjz'},
            {title: '登记编号', key:'djbm'},
            {title: '评估价值', key:'asset_money'},
            ],
        gettablelist:_API.API_INVEST_LIST,

        querylist:[
            {label:'名称',name:'asset_name',type:'input'},
            // {label:'员工状态',name:'status',codetype:'USER_STATUS',type:'select'},
            // {label:'账号状态',name:'flag',codetype:'USER_LOCKSTATUS',type:'select'},
            // {label:'员工号',name:'userName',type:'input'},
            // {label:'用户部门',name:'groupName',type:'input'},
            // {label:'用户岗位',name:'gradeName',type:'input'},
        ]
    },
    guarantee:{ //担保物
        cloumn:[
            {title: '名称', key:'asset_name'},
            {title: '开始日期',key:'start_date'},
            {title: '签约日期', key:'sign_date'},
            {title: '到期日期', key:'end_date'},
            {title: '资产性质', key:'asset_prop_name'},
            {title: '抵质押人', key:'cust_id_name'},
            {title: '入库数量', key:'asset_count'},
            {title: '保管编号', key:'bgbh'},
            {title: '期初价值', key:'qcjz'},
            {title: '登记编号', key:'djbm'},
            {title: '评估价值', key:'asset_money'},
            ],
        gettablelist:_API.API_INVEST_LIST,

        querylist:[
            {label:'名称',name:'asset_name',type:'input'},

        ]
    },
    subjectmatter:{ //标的物
        cloumn:[
            {title: '名称', key:'asset_name'},
            {title: '开始日期',key:'start_date'},
            {title: '签约日期', key:'sign_date'},
            {title: '到期日期', key:'end_date'},
            {title: '资产性质', key:'asset_prop_name'},
            {title: '抵质押人', key:'cust_id_name'},
            {title: '入库数量', key:'asset_count'},
            {title: '保管编号', key:'bgbh'},
            {title: '期初价值', key:'qcjz'},
            {title: '登记编号', key:'djbm'},
            {title: '评估价值', key:'asset_money'},
            ],
        gettablelist:_API.API_INVEST_LIST,

        querylist:[
            {label:'名称',name:'asset_name',type:'input'},

        ]
    },
    customer:{ //对手方管理
        cloumn:[
            {title: '对手序号', key:'name'},
            {title: '对手简称',key:'short_name'},
            {title: '对手全称', key:'cust_name'},
            {title: '对手类型', key:'cust_type'},
            {title: '角色分类', key:'jsfl'},
            {title: '对手性别', key:'sex'},
            {title: '组织机构代码', key:'org_code'},
            {title: '金融机构代码', key:'jrjgdm'},
            {title: '中征码', key:'zzm'},
            {title: '证件类型', key:'jg_cert_type'},
            {title: '证件号码', key:'jg_cert_no'},
            {title: '企业特征', key:'qytz'},
            ],
        gettablelist:_API.API_INVEST_CUSTLIST,

        querylist:[
        ]
    },
    product_modal:{ //产品选择modal
        cloumn:[
            {title: '产品名称', key:'product_name'},
            {title: '产品简称',key:'short_name'},
            {title: '录入人', key:'input_man'},
            {title: '录入时间', key:'input_time'},
            {title: '成立时间', key:'check_time'},
        ],
        gettablelist:_API.API_PRODUCT_QUERYALL,

        querylist:[
        ]
    },
    Businesslog:{//业务日志管理
        cloumn:[
            {title: '项目名称',
            key:'project_name',
//             render: (h, params) => {
//                 return h('span', [
//                   h('a', {
//      　　　　　　　　on: {
//      　　　　　　　　　　'click': (val) => {
//                            router.push(
//                              {
//                                 name: 'seepage',
//                                 query:{id:params.row.log_id,parameterName:'log_id',parameter:'Businesslog'}
//                                }
//                              )
//    　　　　　　　　　　      }
//            　　　　　　　　}
//                      },params.row.project_name,)
//              　　　　])
//              　　}
            },
            {title: '关联业务名称',key:'biz_name'},
            {title: 'ip地址', key:'log_ip'},
            {
              title: '日志内容',
              render: (h, params) => {
                return h('span', [
                  h('a', {
                    style: {
                        display: 'inline-block',
                        width: '100%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    },
                    domProps: {
                        title: params.row.log_message
                    },
     　　　　　　　　on: {
     　　　　　　　　　　'click': (val) => {
                           router.push(
                             {
                                name: 'seepage',
                                query:{id:params.row.log_id,parameterName:'log_id',parameter:'Businesslog'}
                               }
                             )
   　　　　　　　　　　      }
           　　　　　　　　}
                     },params.row.log_message,)
             　　　　])
             　　}
            //   render: (h, params) => {
            //       return h('div', [
            //          h('a', {
            //              style: {
            //                  display: 'inline-block',
            //                  width: '100%',
            //                  overflow: 'hidden',
            //                  textOverflow: 'ellipsis',
            //                  whiteSpace: 'nowrap',
            //                  color:'#4C5362'
            //              },
            //              domProps: {
            //                  title: params.row.log_message
            //              }
            //          }, params.row.log_message)
            //      ]);
            //     }
            },
            {title: '日期', key:'log_date'},
            {title: '操作人', key:'user_name'},
        ],
        gettablelist:_API.API_LOG_QUERYLIST,

        querylist:[
            {label:'项目名称',name:'project_name',type:'input'},
            {label:'操作人',name:'user_name',type:'input'},
        ]
    },
    operationlog:{//操作日志管理
        cloumn:[
            {title: '账户名称', key:'userName'},
            {title: 'ip地址', key:'ip'},
            {title: '操作', key:'ect2'},
            {
              title: '日志内容',
              render: (h, params) => {
                  return h('div', [
                     h('a', {
                         style: {
                             display: 'inline-block',
                             width: '100%',
                             overflow: 'hidden',
                             textOverflow: 'ellipsis',
                             whiteSpace: 'nowrap',
                             color:'#4C5362'
                         },
                         domProps: {
                             title: params.row.message
                         }
                     }, params.row.message)
                 ]);
                }
            },
            {title: '操作时间', key:'logDate'},
            {title: '操作人', key:'name'},
        ],
        gettablelist:_API.API_OPERATION_LOG,
        querylist:[
            {label: '账户名称',name:'userName',type:'input'},
            {label:'操作人',name:'name',type:'input'},
            {label: '日期',name:'logDate',type:'date'},
            {label:'日志内容',name:'message',type:'input'},
        ]
    },
    filemanage:{//文档管理
        cloumn:[
            {title: '文档名称', key:'fileName'},
            {title: '文档类型', key:'filetypename'},
            {title: '文档状态',key:'filestate'},
            {title: '上传时间', key:'createTime'},
            {title: '文件大小', key:'filesize'},
        ],
        gettablelist:_API.API_FILE_LIST,

        querylist:[
            {label:'文档状态',name:'filestate',codetype:'FILE_STATE',type:'select'},
            {label:'文档名称',name:'fileName',type:'input'},
          //  {label:'文档类型',name:'filetype',type:'input'},
        //    {label:'项目编号',name:'project_id',type:'input'},
            {label:'项目名称',name:'projectName',type:'input'},
        ]
    },
    infoReview:{//项目信息复核
        cloumn:[
            {title:'项目编号',key:'project_code'},
            {title:'所属部门',key:'group_name'},
            {title:'项目经理',key:'project_manager_name'},
            {title:'项目名称',key:'project_name'},
            {title:'项目简称',key:'short_name'},
            {title:'项目类别',key:' project_type'},
            {title:'项目状态',key:'project_status'},
            {title:'项目阶段',key:'project_flag'},
         ],
        gettablelist:_API.API_QUERY_PROJECT,

        querylist:[
            {label:'项目编号',name:'project_code',type:'input'},
            {label:'项目名称',name:'project_name',type:'input'},
            {label:'项目类别',name:'project_type',codetype:'X2115',type:'select'},
            {label:'项目阶段',name:'project_flag',codetype:'PROJECT_FLAG',type:'select'},
           // {label:'项目状态',name:'project_status',type:'input'},
        ]
    },
    Templatemanage:{//项目模板管理
        cloumn:[
            {title: '业务类型', key:'filetype'},
            {title: '创建人',key:'filestate'},
            {title: '部门', key:'logDate'},
            {title: '创建时间', key:'IP'},
            {title: '要素模板标识', key:'ID'},
            {title: '最后修改人', key:'message'},
            {title: '最后修改时间', key:'ID'},
            {title: '备注', key:'message'},
            {title: '是否默认', key:'ID'},
            {title: '是否启用', key:'message'},
        ],
        gettablelist:_API.API_QUERY_PROJECT,

        querylist:[
            {label:'模板编号',name:'filestate',type:'input'},
            {label:'模板名称',name:'fileName',type:'input'},
            {label:'业务类型',name:'filetype',type:'input'},
        ]
    },
    userprojectmanage:{//项目模板管理
        cloumn:[
            {title:'项目编号',key:'project_code'},
            {title:'所属部门',key:'group_name'},
            {title:'项目经理',key:'project_manager_name'},
            {title:'项目名称',key:'project_name'},
            {title:'项目简称',key:'short_name'},
            {title:'项目类别',key:'project_type'},
            {title:'项目状态',key:'project_status'},
            {title:'项目阶段',key:'project_flag'},
            {title:'权限',key:'permissions_id',
            render:(h,params)=>{
                let permissions_id = params.row.permissions_id
                if(permissions_id){
                    permissions_id = '可见'
                }else{
                    permissions_id = '不可见'
                }
                return h('span',permissions_id)
            }
           },
         ],
        gettablelist:_API.API_PROJECTLIT_PROCESS,

        querylist:[
            {label:'项目编号',name:'project_code',type:'input'},
            {label:'项目名称',name:'project_name',type:'input'},
            {label:'项目类别',name:'project_type',codetype:'X2115',type:'select'},
            {label:'项目状态',name:'project_status',codetype:'X1037',type:'select'},
            {label:'项目阶段',name:'project_flag',codetype:'PROJECT_FLAG',type:'select'},
        ]
    },
    groupmanage:{//项目/流程权限管理 机构列表
        cloumn:[
            {title:'部门编号',key:'groupCode'},
            {title:'部门名称',key:'groupName'},
            {title:'部门分类',key:'type'},
            {title:'主管组织',key:'mGroupName'},
            {title:'负责人',key:'header'},
            {title:'分管领导',key:'leader'},
            {title:'是否虚拟',key:'isVirtual'},
            {title:'协管领导',key:'assistLeader'},
            {title:'权限',key:'permissions_id',
            render:(h,params)=>{
                let permissions_id = params.row.permissions_id
                if(permissions_id){
                    permissions_id = '可见'
                }else{
                    permissions_id = '不可见'
                }
                return h('span',permissions_id)
            }
           },
         ],
        gettablelist:_API.API_QUERYLIST_GROUP,

        querylist:[
            {label:'部门编号',name:'groupCode',type:'input'},
            {label:'部门名称',name:'groupName',type:'input'},
            {label:'主管部门',name:'mGroupName',type:'input'},
            {label:'上级部门',name:'pGroupName',type:'input'},
            {label:'部门类型',name:'type',type:'select',codetype:'GROUP_TYPE'},
        ]
    },
    processmanage:{//项目/流程权限管理 工作流列表
        cloumn:[
            {title:'id',key:'id'},
            {title: '名称',key:'name' },
            {title: '键',key:'key'},
            {title: '分类',key:'categoryName'},
            {title: '创建日期',key:'createTime'},
            {title:'权限',key:'permissions_id',
            render:(h,params)=>{
                let permissions_id = params.row.permissions_id
                if(permissions_id){
                    permissions_id = '可见'
                }else{
                    permissions_id = '不可见'
                }
                return h('span',permissions_id)
            }
           },
         ],
        gettablelist:_API.API_QUERYLIST_PROCESS,

        querylist:[
            {label:'名称',name:'name',type:'input'},
            {label:'工作流类型',name:'category',codetype:'PROCESS_CATEGORY',type:'cascader'},
          //  {label:'描述名称',name:'categoryName',type:'input'},
           // {label:'创建时间',name:'createTime',type:'date'},
           // {label:'键',name:'key',type:'input'},
        ]
    }
}
export default {
    tableprops
}
