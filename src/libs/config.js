 let  api ={
      API_UPLOAD_FIEL:'tcmp/manage/file-manage!upload.action',//上传文件
      API_LOGIN : 'tcmp/manage/system-manage!login.action',//登录
      API_MENULIST : 'tcmp/manage/menu-manage!queryAllTreeMenu.action',//获取菜单树
      API_MENUSINGLE:'tcmp/manage/menu-manage!queryById.action',//根据id获取菜单详情
      API_DELETEMENU:'tcmp/manage/menu-manage!delete.action',//删除菜单
      API_ADD_MENU : 'tcmp/manage/menu-manage!save.action',//添加菜单
      API_EDIT_MENU :'tcmp/manage/menu-manage!alter.action',
      API_ROLE_ADD :'tcmp/manage/role-manage!save.action',//新增角色
      API_ROLE_UPDATE : 'tcmp/manage/role-manage!alter.action',//修改角色
      API_USERLIST:'tcmp/manage/user-manager!list.action',//获取所有用户
      API_QUESTUSERLIST:'tcmp/manage/user-manager!listAllSelectUser.action', // 快速获取所有用户
      queryAllGroup:'tcmp/manage/group-manage!queryAllGroup.action',//查询所有机构
      API_ADD_USERSAVE:'tcmp/manage/user-manager!save.action',//添加用户信息
      API_RESETPWD:'tcmp/manage/user-manage!resetPwd.action',//修改密码，重置密码
      API_TOALTER:'/tcmp/manage/user-manager!toAlter.action',//根据id查用户信息
      API_ROLE_LIST:'/tcmp/manage/role-manage!list.action',//查询角色
      API_ROLE_SETSTAFF:'tcmp/manage/user-manage!setUsersByRole.action' ,//为用户分配角色
      API_DELETE_USER:'tcmp/manage/user-manage!delete.action',//删除用户
      API_EDITUSER:'tcmp/manage/user-manager!alter.action',//修改用户信息
      API_STATUS_SET:'tcmp/manage/user-manage!setFlag.action',//状态设置
      API_USER_SETAUTH : 'tcmp/manage/user-manage!setMenuByUser.action' ,//角色分配权限
      APT_TOSETROLEBYUSER:'tcmp/manage/user-manager!toSetRoleByUser.action',//为用户分配角色
      API_ROLE_USERLIST : 'tcmp/manage/user-manage!queryUsersByRole.action' ,//根据角色id查用户
      APT_SET_USER:'tcmp/manage/user-manager!toSetRoleByUser.action',//去为用户分配角色
      API_SETROLE_USER:'tcmp/manage/user-manager!setRoleByUser.action',//为用户分配角色
      API_GET_TEMPLIST : '/tcmp/templateForm/template-manage!listTemplate.action' ,//获取模板列表
      API_ADD_TEMPLATE : '/tcmp/templateForm/template-manage!addTemplate.action',//新增模板
      API_DELETE_TMPLATE : '/tcmp/templateForm/template/template-manage!delete.action',//新增模板
      API_GET_TEMP_INFO : '/tcmp/templateForm/template-manage!quaryTemplate.action',//获取模板详情
      API_QUERY_ID : 'tcmp/manage/group-manage!queryById.action',//根据部门id查信息
      API_DELETE_DEPARTMENT:'tcmp/manage/group-manage!delete.action',//删除部门
      API_ADD_SAVE:'tcmp/manage/group-manage!save.action',//新增部门
      API_EDIT_SAVE:'tcmp/manage/group-manage!alter.action',//修改部门信息
      API_SELECT_ALL:'tcmp/manage/group-manage!queryAll.action',//主管下拉
      API_QUERY_TREELIST:'tcmp/manage/group-manage!queryGroupTree.action',//查询所有部门
      API_QUERYID_DPIDPOST:'tcmp/manage/grade-manage!queryByGroupId.action',//查询部门下的岗位
      API_GET_TEMP_FIELDLIST : '/tcmp/templateField/template-manage!queryBytemplateid.action' ,//根据模板获取详细字段
      API_GET_FIELD_INFO : '/tcmp/templateField/template-manage!queryTemplateField.action',//根据id获取字段详情
      API_ROLE_SETAUTH : 'tcmp/manage/role-manage!setMenuByRole.action' ,//角色分配权限
      API_ROLE_GETAUTHTREE : 'tcmp/manage/action-manage!queryMenuActionsTree.action'  ,//获取菜单权限树
      API_SAVE_FIELD : '/tcmp/templateField/template-manage!addTemplateField.action',//保存字段
      API_GET_FEILDCODE_LIST : '/tcmp/templateList/template-manage!queryByfieldid.action',//获取下拉框值
      API_SAVE_FEILDCODE : '/tcmp/templateList/template-manage!addTemplateList.action',//批量保存下拉字段
      API_QUERYLIST_POST:'tcmp/manage/grade-manage!list.action',//岗位设置列表查询
      API_TASK_TODOLIST:'tcmp/workflow/task-todolist.action',//待办查询
      API_ROLE_COPY :'tcmp/manage/action-manage!roleCopy.action' ,//角色复制
      API_ROLE_QUERY :'tcmp/manage/action-manage!queryAll.action' ,//获取所有角色 下拉框
      API_TASK_INFO :'tcmp/workflow/task-processingpage.action' ,//获取 任务的处理页面信息
      API_TASK_HISTORY :'tcmp/workflow/task-queryHistory.action' ,// 获取历史处理记录
      API_TASK_OUTCOMES :'tcmp/workflow/getoutcomes.action' ,// 获取某任务节点的所有出口名复制
      API_TASK_COMPLETE :'tcmp/workflow/task-complete.action' ,// 完成任务
      API_GROUP_LIST :'tcmp/manage/team-manage!list.action' ,// 群组列表分页查询
      API_GROUP_ADD :'tcmp/manage/team-manage!save.action' ,// 新增群组
      API_GROUP_UPDATE :'tcmp/manage/team-manage!alert.action' ,// 修改群组
      API_ROLE_DELETE :'tcmp/manage/role-manage!delete.action' ,// 删除角色
      API_GROUP_DELETE :'tcmp/manage/team-manage!delete.action' ,// 删除群组
      API_ROLE_QUERYBYID :'tcmp/manage/role-manage!queryById.action' ,// 获取角色 根据id
      API_DIC_GETBYCODE : 'tcmp/manage/dic-manage!getByCodeType.action'  ,//根据类型查询字典
      API_ADD_POST:'tcmp/manage/grade-manage!save.action',//新增岗位
      API_QUERYID_POST:'tcmp/manage/grade-manage!toAlert.action',//根据id查询岗位信息
      API_EDIT_POST:'tcmp/manage/grade-manage!alert.action',//修改岗位信息
      API_DELETE_POST:'tcmp/manage/grade-manage!delete.action',//删除岗位信息
      API_USER_MANAGE:'tcmp/manage/grade-manage!setUsersByGrade.action',//为岗位分配用户
      API_POST_USER:'tcmp/manage/grade-manage!toSetUsersByGrade.action',//去为岗位分配用户
      API_DELETE_FIELD_LIST : '/tcmp/templateList/template/template-manage!delete.action',//删除下拉字段的属性值
      API_LISTALL:'tcmp/manage/action-manage!listall.action',//查询菜单下所有按钮
      API_ADD_POWER:'tcmp/manage/action-manage!save.action',//添加权限
      API_QUERYID_POWER:'tcmp/manage/action-manage!queryById.action',//根据id获取
      API_EDIT_POWER:'tcmp/manage/action-manage!alter.action',//修改权限
      API_DELETE_POWER:'tcmp/manage/action-manage!delete.action',//删除
      API_GET_USER_MENU : '/tcmp/manage/menu-manage!queryMenuTreeByToken.action' ,//获取左侧菜单
      API_GET_USER_BTB : '/tcmp/manage/action-manage!queryLoginUserButton.action',//获取用户按钮
      API_ACCOUNT_QUERYPAGE:'tcmp/account/taccountmanagement-manage!listTAccountManagement.action',//账户管理分页查询
      API_SUPGROUP:'tcmp/manage/group-manage!querySupGroup.action',//组织机构主管组织下拉
      API_CODETYPE:'tcmp/manage/dic-manage!getByCodeType.action',//部门分类下拉
      API_DELETE_FIELD:'tcmp/templateField/template/template-manage!delete.action',//模板配置删除
      API_ADD_ACCOUNT:'tcmp/account/taccountmanagement-manage!addTAccountManagement.action',//账户管理新增修改
      API_DIC_LIST:'tcmp/manage/dic-manage!list.action',//字典分页查询
      API_DIC_FINDBYID: 'tcmp/manage/dic-manage!getById.action',//字典查询 根据id
      API_DIC_UPDATE: 'tcmp/manage/dic-manage!alter.action' ,//字典修改
      API_DIC_ADD: 'tcmp/manage/dic-manage!save.action' ,//字典新增
      API_DIC_DELETE: 'tcmp/manage/dic-manage!delete.action' ,//字典删除
      API_DELETE_ACCOUNT:'tcmp/account/taccountmanagement-manage!deleteTAccountManagement.action',//账户管理删除
      API_QUERYID_ACCOUNT:'tcmp/account/taccountmanagement-manage!queryTAccountManagement.action',//账户管理按id查询
      API_COMPANY_INFO:'tcmp/frame/company-manage!queryCompany.action',//公司信息
      API_EDIT_SAVEINFO:'tcmp/frame/company-manage!saveCompany.action',//公司信息修改保存
      API_ADD_INFO:'tcmp/frame/company-manage!addCompany.action',//新增公司信息
      API_WORK_LIST : '/tcmp/workflow/model-list.action',//获取审批设计列表
      API_ADDDELOY : '/tcmp/workflow/model-deploy.action',//新增部署
      API_EDITDELOY : '/tcmp/workflow/model-modify-deploy.action',//修改部署
      API_GET_MODELID: '/tcmp/workflow/modle-create.action',//创建获取id
      API_DEL_MODEL : '/tcmp/workflow/model-delete.action' ,//删除审批流
      API_QUERY_PROJECT:'tcmp/projectframe/project-manage!listProject.action',//项目管理分页查询
      API_GET_DELOY_LIST : '/tcmp/workflow/process-list.action',//获取流程列表
      API_GET_QUERY_LIST : '/tcmp/workflow/process-select-list.action',//快速获取流程列表
      API_QUERY_PID:'tcmp/manage/group-manage!listGroup.action',//查询上级组织
      API_ORG_TABLELIST:'tcmp/manage/group-manage!list.action',//组织机构分页查询
      API_GET_APPIMAGE :'tcmp/workflow/resource-read.action',//获取审批流程图
      API_NOTICE_LIST:'tcmp/notice/noticeentity-manage!listNoticeEntity.action',//公告查询分页
      API_NOTICE_ADD:'tcmp/notice/noticeentity-manage!addNoticeEntity.action',//新增公告
      API_NOTICE_UPDATE:'tcmp/notice/noticeentity-manage!saveNoticeEntity.action',//修改公告
      API_NOTICE_DELETE:'tcmp/notice/noticeentity-manage!deleteNoticeEntity.action',//删除公告
      API_NOTICE_FINDBYID:'tcmp/notice/noticeentity-manage!queryNoticeEntity.action',//查询公告by ID
      API_GET_STARTFOEM:'tcmp/workflow/get-startform.action',//启动路程获取表单信息
      API_APPROVE_START:'tcmp/workflow/task-start.action',//启动流程
      API_UPLOAD_REMARK:'tcmp/workflow/task-addComment.action',//上传评论
      API_GET_REMARK:'tcmp/workflow/task-queryComment.action',//获取评论
      API_CALENDAR_LIST: 'tcmp/warn/tcommonwarnmanagement-manage!listTCommonWarnManagement.action', //日历提醒管理 分页查询
      API_CALENDAR_DELETE: 'tcmp/warn/tcommonwarnmanagement-manage!deleteTCommonWarnManagement.action', //日历提醒管理 删除
      API_CALENDAR_ADD: 'tcmp/warn/tcommonwarnmanagement-manage!addTCommonWarnManagement.action', //日历提醒管理 新增
      API_CALENDAR_UPDATE: 'tcmp/warn/tcommonwarnmanagement-manage!saveTCommonWarnManagement.action', //日历提醒管理 修改
      API_CALENDAR_FINDBYID: 'tcmp/warn/tcommonwarnmanagement-manage!queryTCommonWarnManagementByID.action', //日历提醒管理 根据id获取提醒
      API_COPY_TEMP:'tcmp/templateForm/template/template-manage!copy.action',//复制模板
      API_BUSINESS_QUERY:'tcmp/business/tbusinessdepartment-manage!listTBusinessDepartment.action',//营业部查询
      API_ADD_BUSINESS:'tcmp/business/tbusinessdepartment-manage!addTBusinessDepartment.action',//营业部新增
      API_BUSINESS_QUERYID:"tcmp/business/tbusinessdepartment-manage!queryTBusinessDepartment.action",//营业部id查询
      API_DELETD_BUSINESS:"tcmp/business/tbusinessdepartment-manage!deleteTBusinessDepartment.action",//营业部删除
      API_TEMP_TABLE:"tcmp/account/tcontactinformation-manage!listTContactInformation.action",//模板里面的table
      API_GET_TEMPLATE:'/tcmp/workflow/get-form.action',
      API_COMMONWORD_FINDBYID:'tcmp/word/tcommonwordmanagement-manage!queryTCommonWordManagementById.action', //根据id查询常用语
      API_COMMONWORD_ADD:'tcmp/word/tcommonwordmanagement-manage!addTCommonWordManagement.action', //新增常用语
      API_COMMONWORD_UPDATE:'tcmp/word/tcommonwordmanagement-manage!saveTCommonWordManagement.action', //修改常用语
      API_COMMONWORD_LIST:'tcmp/word/tcommonwordmanagement-manage!listTCommonWordManagement.action', //分页查询常用语
      API_COMMONWORD_DELETE:'tcmp/word/tcommonwordmanagement-manage!deleteTCommonWordManagement.action', //删除常用语
      API_SHAREHOLDER_LIST:'tcmp/companyholder/companyholdermanager-manage!listCompanyholderManager.action', //分页查询股东信息
      API_SHAREHOLDER_ADD:'tcmp/companyholder/companyholdermanager-manage!addCompanyholderManager.action', // 新增股东
      API_SHAREHOLDER_UPDATE:'tcmp/companyholder/companyholdermanager-manage!saveCompanyholderManager.action', //修改股东
      API_SHAREHOLDER_DELETE:'tcmp/companyholder/companyholdermanager-manage!deleteCompanyholderManager.action', //删除股东
      API_SHAREHOLDER_FINDBYID:'tcmp/companyholder/companyholdermanager-manage!queryCompanyholderManager.action', //查询股东 根据id
      API_BACKFILE:'/tcmp/workflow/archive-list.action',//归档
      API_ROLE_SETAUTH_BATCH:'tcmp/manage/role-manage!setMenusAndActionsByRole.action',// 给角色批量设置权限
      API_USER_SETAUTH_BATCH:'tcmp/manage/user-manage!setMenusAndActionsByUser.action',// 给用户批量设置权限
      API_ADDTEMPLIST:'tcmp/templateList/template-manage!addTemplateList.action',//批量新增修改
      API_DELETETEMP:'tcmp/templateList/template/template-manage!delete.action',//删除字典模板
      API_ROLE_SETAUTH_BATCH:'tcmp/manage/role-manage!setMenusAndActionsByRole.action',// 给角色批量设置权限
      API_USER_SETAUTH_BATCH:'tcmp/manage/user-manage!setMenusAndActionsByUser.action',// 给用户批量设置权限
      API_EDIT_CATEGORY:'tcmp/workflow/model-modify-category.action',//修改审批分类
      API_INVEST_LIST:'tcmp/asset/assetinfo-manage!listAssetInfo.action',//抵质押物 担保物 标的物查询
      API_INVEST_ADD:'tcmp/asset/assetinfo-manage!addAssetInfo.action',//添加抵质押物 担保物 标的物
      API_INVEST_UPDATE:'tcmp/asset/assetinfo-manage!saveAssetInfo.action',//修改抵质押物 担保物 标的物
      API_INVEST_CUSTLIST:'tcmp/customer/tcustomerinfo-manage!listTcustomerInfo.action',//对手方分页查询
      API_INVEST_CUSTADD:'tcmp/customer/tcustomerinfo-manage!addTcustomerInfo.action',//添加 对手方
      API_INVEST_CUSTUPDATE:'tcmp/customer/tcustomerinfo-manage!saveTcustomerInfo.action',//修改 对手方
      API_INVEST_FINDCUSTBYID:'tcmp/customer/tcustomerinfo-manage!queryTcustomerInfo.action',//查 对手方 byID
      API_ADD_PROJECT:'tcmp/projectframe/project-manage!updateProject.action',//添加项目   projectframe/project-manage!saveProject.action
      API_GET_INFO_PROJECT:'tcmp/projectframe/project-manage!queryProject.action',//获取项目详情
      API_INVEST_FINDBYID:'tcmp/asset/assetinfo-manage!queryAssetInfo.action',//根据id查询 抵质押物 担保物 标的物
      API_PRODUCT_QUERYALL:'tcmp/asset/assetinfo-manage!queryAssetInfoByProductId.action',//根据产品信息 所有
      API_UPLOAD_FILE:'tcmp/workflow/task-attachment.action',//上传附件
      API_GET_FILE:'tcmp/workflow/task-queryAttachment.action',//获取附件
      API_DWONLOAD:'tcmp/manage/file-manage!download.action',//附件下载
      API_LOG_QUERYLIST:'tcmp/bizlog/file-manage!querylist.action',//日志管理分页查询
      API_LOG_QUERYID:'tcmp/bizlog/file-manage!query.action',//日志管理查看详情
      API_OPERATION_LOG:'tcmp/manage/log-manage!list.action',//操作日志分页查询
      API_FILE_LIST:'tcmp/manage/file-manage!querylist.action',//文件管理文件列表
      API_COMMON_PHRASES:'tcmp/word/tcommonwordmanagement-manage!listTCommonWordManagement.action',//常用语分页查询
      API_GET_COUNTERSIGN:'/tcmp/workflow/get-countersign.action',//获取节点会签人员
      API_GET_IMAGE:'tcmp/workflow/process-trace-auto.action',//获取流程图
      API_DELETE_PROJECT:'tcmp/frame/project-manage!delete.action',//删除项目
      API_REVIEW_PROJECT:'tcmp/frame/project-manage!audit.action',//项目复核
      API_REVIEW_ESTAUDIT_PROJECT:'tcmp/frame/project-manage!estAudit.action',//成立复核
      API_DEL_FILE:'tcmp/manage/file-manage!invalidForId.action',//作废文件
      API_PROJECT_STATUS:'tcmp/frame/project-manage!alertStatus.action',//项目状态更改
      API_HISTORY_TABLE:'tcmp/workflow/task-queryApprovalHistory.action',//获取审批记录
      API_GET_HTML:'tcmp/requestform/getRequestformHtml!show.action',//根据ID，返回一个html报表内容
      API_RUNNING_LIST:'tcmp/workflow/task-runningList.action',//事物列表
      API_QUESTRUNNING_LIST:'tcmp/workflow/task-querySelectProcess.action',//快速获取事物列表
      API_QUERY_MYTASK:'tcmp/workflow/task-queryAllMyTask.action',//我的处理
      API_QUERY_MYSTART:'tcmp/workflow/task-queryAllMyStart.action',//我的发起
      API_QUERY_PORCESS:'tcmp/workflow/task-queryAllPorcess.action',//流程实例监控
      API_QUERY_TASK:'tcmp/workflow/task-queryAllTask.action',//流程节点监控
  	  API_DELEGATION_ADD:'tcmp/delegation/delegate-manage!addDelegate.action',//委托管理 新增
  	  API_DELEGATION_DEL:'tcmp/delegation/delegate-manage!delDelegate.action',//委托管理 收回授权
  	  API_DELEGATION_LIST:'tcmp/delegation/delegate-manage!listDelegate.action',//委托管理 分页查询
  	  API_DELEGATION_QUERY:'tcmp/delegation/delegate-manage!queryDelegate.action',//委托管理 按ID进行查询
  	  API_DELEGATION_SAVE:'tcmp/delegation/delegate-manage!saveDelegate.action',//委托管理 保存修改
      API_QUERY_LISTTYPE:'tcmp/workflow/task-queryProcessListType.action',//流程监控
      API_TASK_ASSIGNEE:'tcmp/workflow/task-assignee.action',//更改处理人
      API_PROCESS_STATUS:'tcmp/workflow/task-suspendProcessInstance.action',//流程状态
      API_QUERY_PARAM:'tcmp/table/usertable-manage!list.action',//系统参数设置列表
      API_ADD_PARAM:'tcmp/table/usertable-manage!save.action',//系统参数设置新增
      API_DELETE_PARAM:'tcmp/table/usertable-manage!delete.action',//系统参数设置删除
      API_QUERYID_PARAM:'tcmp/table/usertable!querystableid.action',//系统参数设置单条查询
      API_GET_ESTAUDIT :'tcmp/projectframe/project-manage!listEstAudit.action',//成立复核列表
      API_GET_UPDATEEST: 'tcmp/projectframe/project-manage!updateEstProject.action',//成立变更
      API_FILEMANAGE_UPLOAD:'tcmp/manage/file-manage!upload.action',//流程里的文档管理上传文件
      API_TREE_LIST:'tcmp/fileType/tfiletype-manage!fileTreeTFileType.action',//文档类型管理的树形
      API_QUERYID_TREE:'tcmp/fileType/tfiletype-manage!queryTFileType.action',//根据id查询
      API_ADD_TREE:'tcmp/fileType/tfiletype-manage!addTFileType.action',//文档类型管理新增
      API_DELETE_TREE:'tcmp/fileType/tfiletype-manage!deleteTFileType.action',//文档类型管理删除
      API_EDITSAVE_TREE:'tcmp/fileType/tfiletype-manage!saveTFileType.action',//文档类型管理修改保存
      API_DELETE_FILE:'tcmp/manage/file-manage!delete.action',//文档删除
      API_CHEKPWD:'tcmp/manage/user-manage!checkPwd.action',//密码验证
      API_QUERY_ACTPERMISS:'tcmp/permissions/sysactpermissions-manage!listSysActPermissions.action',//项目/流程权限管理列表查询
      API_UPLOADID:'tcmp/manage/file-manage!updatechanges.action',//文档管理新增
      API_QUERY_PROCESS:'tcmp/workflow/task-queryProcessListByUser.action',//查看流程列表
      API_QUERYID_FILE:'tcmp/manage/file-manage!queryForId.action',//文档管理根据id查询
      API_ADDEDIT_PROCESS:'tcmp/permissions/sysactpermissions-manage!addSysActPermissions.action',//项目/流程权限管理新增修改
      API_DELETE_PROCESSMANAGE:'tcmp/permissions/sysactpermissions-manage!deleteSysActPermissions.action',//项目/流程权限管理删除
      API_USER_UPLOAD:'tcmp/manage/file-manage!uploadImage.action',//用户上传签名
      API_PROJECTLIT_PROCESS:'tcmp/permissions/project-manage!listProject.action',//项目/流程权限管理 项目查询
      API_ADDALL_PROCESS:'tcmp/permissions/sysactpermissions-manage!addSysActPermissionsMore.action',//项目/流程批量新增
      APIDELETEALL_PROCESS:'tcmp/permissions/sysactpermissions-manage!deleteSysActPermissionsMore.action',//项目/流程批量删除
      API_QUERYLIST_GROUP:'tcmp/permissions/group-manage!list.action',//项目/流程管理 机构查询列表
      API_QUERYLIST_PROCESS:'tcmp/permissions/model-list.action',//项目/流程管理 流程查询列表
      API_GET_INFOPUBETMPLATE:'tcmp/projectframe/infopubtemplate-manage!listPage.action',
      API_LOGIN_OUT:'tcmp/manage/user-manager!loginOut.action',//登出接口
      API_GET_INFOPUBETMPLATE:'tcmp/projectframe/infopubtemplate-manage!listPage.action',//信息披露列表
      API_ADD_CALENDER:'tcmp/warn/tcommonwarnmanagement-manage!addTCommonWarnManagement.action',//新增日历提醒
      API_QUERYID_CALENDER:'tcmp/warn/tcommonwarnmanagement-manage!queryTCommonWarnManagementByID.action',//日历提醒按id查询
      API_EDITSAVE_CALENDER:'tcmp/warn/tcommonwarnmanagement-manage!saveTCommonWarnManagement.action',//日历提醒修改保存
      API_DELETE_CALENDER:'tcmp/warn/tcommonwarnmanagement-manage!deleteTCommonWarnManagement.action',//批量删除提醒
      API_DEL_INFOPUBTEMP:'tcmp/projectframe/infopubtemptype-manage!delete.action',//删除息披露类型
      API_DEL_INFOPUBT:'tcmp/projectframe/infopubtemplate-manage!delete.action',//删除信息披露模板
      API_INFO_INFOPUBTTEMP:'tcmp/projectframe/infopubtemplate-manage!queryTemplate.action',//单条查询披露模板
      API_SAVE_INFOPUBTTYPE :'tcmp/projectframe/infopubtemptype-manage!save.action',//保存类型
      API_SAVEINFOPUBTEMP:'tcmp/projectframe/infopubtemplate-manage!save.action',//上传披露模板
      API_GET_PUBTLIST:'tcmp/projectframe/infopubtemplate-manage!listPage.action',//获取信息披露文档列表
      API_GET_PINT_HTML:'tcmp/projectframe/infopubtemplate-manage!readRaq.action',//获取信息披露文档详细
      API_ALL_DELETE_UPDATE:'tcmp/projectframe/project-manage!updateProject.action',//监管报送里所有的删除
      API_ALL_AUDIT:'tcmp/account/taccountmanagement-manage!auditTAccountManagement.action',//账户管理所有复核
      API_BUSINESS_REVIEW:'tcmp/business/tbusinessdepartment-manage!auditTBusinessDepartment.action',//营业部复核
      API_REVOKE:'tcmp/workflow/task-revoke.action',//流程实例监控撤回
      API_STATE_CHANGE:'tcmp/account/taccountmanagement-manage!updateAccountFlag.action',//账户状态变更
      API_PROJECT_SETUP:'tcmp/projectframe/project-manage!setUp.action',//项目成立
      API_COOPERATION_DELETE:'/projectframe/projectcooperation-manage!deleteByProjectId.action',//第三方机构合作信息删除
      API_INVEST_DELETE:'projectframe/projectinvest-manage!deleteByProjectId.action',//投资顾问
      API_EST_CHANGE:'tcmp/projectframe/project-manage!updateEstProject.action',//成立变更 变更按钮
}
export default api ;
