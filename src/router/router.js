import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => { require(['@/views/login/login.vue'], resolve); }
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: resolve => { require(['@/views/main-components/lockscreen/components/locking-page.vue'], resolve); }
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: '首页', name: 'home_index', component: resolve => { require(['@/views/home/index.vue'], resolve); } },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: resolve => { require(['@/views/own-space/own-space.vue'], resolve); } },
        { path: 'message', title: '消息中心', name: 'message_index', component: resolve => { require(['@/views/message/message.vue'], resolve); } },
        { path: 'detailpage', title: '事务中心', name: 'detailpage', component: resolve => { require(['@/views/affaircore/components/detailpage/index.vue'], resolve); } },
        { path: 'setfield', title: '字段配置', name: 'setfield', component: resolve => { require(['@/components/setfield/index.vue'], resolve); } },
        { path: 'handleflow', title: '处理流程', name: 'handleflow', component: resolve => { require(['@/views/handleflow/index.vue'], resolve); } },
        { path: 'projectnav', title: '项目导航', name: 'projectnav', component: resolve => { require(['@/views/projectmanages/components/projectnav/index.vue'], resolve); } },
        { path: 'newedit', title: '新增/修改', name: 'newedit', component: resolve => { require(['@/components/Newedit/index.vue'], resolve); } },
        { path: 'workflowseting', title: '工作流设计', name: 'workflowseting', component: resolve => { require(['@/components/workflowset/index.vue'], resolve); } },
        { path: 'approveluch', title: '启动流程', name: 'approveluch', component: resolve => { require(['@/components/luchwork/index.vue'], resolve); } },
        { path: 'launchproject', title: '项目流程', name: 'launchproject', component: resolve => { require(['@/components/launchproject/index.vue'], resolve); } },
        { path: 'seenotice', title: '公告详情', name: 'seenotice', component: resolve => {   require([ '@/views/notice/seenotice.vue' ], resolve);} },
        { path: 'seepage', title: '日志查看', name: 'seepage', component: resolve => {   require([ '@/components/seepage/index.vue' ], resolve);} },
        { path: 'seeApproval', title: '查看工作流', name: 'seeApproval', component: resolve => {   require([ '@/components/seeApproval/index.vue' ], resolve);} },
        { path: 'addcalendar', title: '新增日历提醒', name: 'addcalendar', component: resolve => {   require([ '@/views/access/calendar/addcalendar.vue' ], resolve);} },
        { path: 'powermanage', title: '流程权限管理', name: 'powermanage', component: resolve => {   require([ '@/components/powermanage/index.vue' ], resolve);} },
        { path: 'details', title: '查看详情', name: 'details', component: resolve => {   require([ '@/components/details/index.vue' ], resolve);} },
    ]
};
// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
    path: '/affaircores',
      icon: 'android-notifications',
      name: 'affaircores',
      title: '事务中心',
      component: Main,
      children: [
        {
          path: 'affaircore', title: '事务中心', name: 'affaircore', component: resolve => {
            require([ '@/views/affaircore/index.vue' ], resolve);
          }
        },
      ]
  },
  {
    path: '/access',
    icon: 'android-person',
    name: 'access',
    title: '系统管理',
    component: Main,
    children: [
      {
        path: 'organize', title: '组织机构设置', name: 'organize', component: resolve => {
          require([ '@/views/access/organization/index.vue' ], resolve);
        }
      },
      {
        path: 'systemmenu', title: '菜单权限管理', name: 'systemmenu', component: resolve => {
          require([ '@/views/powermanages/systemmenu/index.vue' ], resolve);
        }
      },
      {
        path: 'role', title: '角色管理', name: 'role', component: resolve => {
          require([ '@/views/access/role/index.vue' ], resolve);
        }
      },
      {
        path: 'group', title: '群组管理', name: 'group', component: resolve => {
          require([ '@/views/access/group/index.vue' ], resolve);
        }
      },
      {
        path: 'access_shareholde', title: '股东管理', name: 'access_shareholde', component: resolve => {
          require([ '@/views/access/shareholde/index.vue' ], resolve);
        }
      },
      {
        path: 'postsetting', title: '岗位设置', name: 'postsetting', component: resolve => {
          require([ '@/views/access/postsetting/index.vue' ], resolve);
        }
      },
      {
        path: 'usersetting', title: '用户设置', name: 'usersetting', component: resolve => {
          require([ '@/views/access/usersetting/index.vue' ], resolve);
        }
      },
      {
        path: 'calendar', title: '日历提醒', name: 'calendar', component: resolve => {
          require([ '@/views/access/calendar/addcalendar.vue' ], resolve);
        }
      },
    ]
  },
  {
    path: '/projectmanages',
    icon: 'ios-folder',
    name: 'projectmanages',
    title: '项目管理',
    component: Main,
    children: [
      {
        path: 'projectList', title: '项目管理', name: 'projectList', component: resolve => {
          require([ '@/views/projectmanages/projectmanage/index.vue' ], resolve);
        }
      },
      {
        path: 'projectestablish', title: '项目成立', name: 'projectestablish', component: resolve => {
          require([ '@/views/projectmanages/projectestablish/index.vue' ], resolve);
        }
      },
        {
          path: 'filemanage', title: '文档管理', name: 'filemanage', component: resolve => {
            require([ '@/views/projectmanages/filemanages/filemanage/index.vue' ], resolve);
          }
        },
        {
          path: 'filetypemanage', title: '文档类型管理', name: 'filetypemanage', component: resolve => {
            require([ '@/views/projectmanages/filemanages/filetypemanage/index.vue' ], resolve);
          }
        },
      {
        path: 'Infrastructure', title: '基础建设项目信息', name: 'Infrastructure', component: resolve => {
          require([ '@/views/projectmanages/Infrastructure/index.vue' ], resolve);
        }
      },
      {
        path: 'investment', title: '投资顾问合同信息', name: 'investment', component: resolve => {
          require([ '@/views/projectmanages/investment/index.vue' ], resolve);
        }
      },
      {
        path: 'target_industry', title: '非地产非基建项目', name: 'target_industry', component: resolve => {
          require([ '@/views/projectmanages/target_industry/index.vue' ], resolve);
        }
      },
      {
        path: 'cooperation', title: '信托三方机构合作信息', name: 'cooperation', component: resolve => {
          require([ '@/views/projectmanages/cooperation/index.vue' ], resolve);
        }
      },
      {
        path: 'citicpreregistration', title: '中信登预登记', name: 'citicpreregistration', component: resolve => {
          require([ '@/views/projectmanages/citicpreregistration/index.vue' ], resolve);
        }
      },
      {
        path: 'citicregister', title: '中信登存续登记', name: 'citicregister', component: resolve => {
          require([ '@/views/projectmanages/citicregister/index.vue' ], resolve);
        }
      },
      {
        path: 'realestate', title: '房地产信息', name: 'realestate', component: resolve => {
          require([ '@/views/projectmanages/realestate/index.vue' ], resolve);
        }
      },
      {
        path: 'infoReview', title: '项目信息复核', name: 'infoReview', component: resolve => {
          require([ '@/views/projectmanages/infoReview/index.vue' ], resolve);
        }
      },
      {
        path: 'Fileinfomanage', title: '文档信息管理', name: 'Fileinfomanage', component: resolve => {
          require([ '@/views/projectmanages/Fileinfomanage/index.vue' ], resolve);
        }
      },
      {
        path: 'establishreview', title: '成立复核', name: 'establishreview', component: resolve => {
          require([ '@/views/projectmanages/establishreview/index.vue' ], resolve);
        }
      },
      {
        path: 'establishchange', title: '成立变更', name: 'establishchange', component: resolve => {
          require([ '@/views/projectmanages/establishchange/index.vue' ], resolve);
        }
      },
      {
        path: 'infoDiscloList', title: '信息披露', name: 'infoDiscloList', component: resolve => {
          require([ '@/views/projectmanages/infoDisclosure/infoDiscloList/index.vue' ], resolve);
        }
      },
      {
        path: 'infoDisclosuretemp', title: '信息披露模板管理', name: 'infoDisclosuretemp', component: resolve => {
          require([ '@/views/projectmanages/infoDisclosure/infoDisclosuretemp/index.vue' ], resolve);
        }
      },
    ]
  },
  {
    path: '/Workflowmanages',
    icon: 'network',
    name: 'Workflowmanages',
    title: '工作流管理',
    component: Main,
    children: [
      {
        path: 'workflow', title: '工作流管理', name: 'workflow', component: resolve => {
          require([ '@/views/workflow/workflowset/index.vue' ], resolve);
        }
      },
	  {
	    path: 'delegate', title: '委托管理', name: 'delegate', component: resolve => {
	  		  require([ '@/views/workflow/delegateManagement/index.vue' ], resolve);
	    }
	  },
      {
        path: 'approve', title: '工作流发起', name: 'approve', component: resolve => {
          require([ '@/views/workflow/approve/index.vue' ], resolve);
        }
      },
      {
        path: 'ProcessMonitor', title: '流程监控', name: 'ProcessMonitor', component: resolve => {
          require([ '@/views/Workflowmanages/ProcessMonitor/index.vue' ], resolve);
        }
      },
      {
        path: 'ProcessList', title: '流程列表', name: 'ProcessList', component: resolve => {
          require([ '@/views/Workflowmanages/ProcessList/index.vue' ], resolve);
        }
      },
      {
        path: 'taskMonitor', title: '任务监控', name: 'taskMonitor', component: resolve => {
          require([ '@/views/Workflowmanages/taskMonitor/index.vue' ], resolve);
        }
      },
      {
        path: 'EntrustMonitor', title: '委托监控', name: 'EntrustMonitor', component: resolve => {
          require([ '@/views/Workflowmanages/EntrustMonitor/index.vue' ], resolve);
        }
      },
      {
        path: 'Wholeprocess', title: '全部流程', name: 'Wholeprocess', component: resolve => {
          require([ '@/views/Workflowmanages/Wholeprocess/index.vue' ], resolve);
        }
      },
      {
        path: 'MyLaunch', title: '我的发起', name: 'MyLaunch', component: resolve => {
          require([ '@/views/Workflowmanages/MyLaunch/index.vue' ], resolve);
        }
      },
      {
        path: 'MyHandle', title: '我的处理', name: 'MyHandle', component: resolve => {
          require([ '@/views/Workflowmanages/MyHandle/index.vue' ], resolve);
        }
      },
      {
        path: 'ExampleMonitor', title: '流程实例监控', name: 'ExampleMonitor', component: resolve => {
          require([ '@/views/Workflowmanages/ExampleMonitor/index.vue' ], resolve);
        }
      },
      {
        path: 'nodeMonitor', title: '流程节点监控', name: 'nodeMonitor', component: resolve => {
          require([ '@/views/Workflowmanages/nodeMonitor/index.vue' ], resolve);
        }
      },
      {
        path: 'seeprocess', title: '查看流程', name: 'seeprocess', component: resolve => {
          require([ '@/views/Workflowmanages/seeprocess/index.vue' ], resolve);
        }
      },
    ]
  },
  {
    path: '/systemsetting',
      icon: 'android-settings',
      name: 'systemsetting',
      title: '系统设置',
      component: Main,
      children: [
        {
          path: 'commonlanguage', title: '常用语管理', name: 'commonlanguage', component: resolve => {
            require([ '@/views/commonlanguage/index.vue' ], resolve);
          }
        },
        {
          path: 'dictionaries', title: '数据字典设置', name: 'dictionaries', component: resolve => {
            require([ '@/views/systemsetting/dictionaries/index.vue' ], resolve);
          }
        },
        {
          path: 'parameter', title: '系统参数设置', name: 'parameter', component: resolve => {
            require([ '@/views/systemsetting/parameter/index.vue' ], resolve);
          }
        },
        {
          path: 'onlineusers', title: '在线用户信息', name: 'onlineusers', component: resolve => {
            require([ '@/views/systemsetting/onlineusers/index.vue' ], resolve);
          }
        }
      ]
  },
  {
    path: '/account',
      icon: 'card',
      name: 'account',
      title: '账户管理',
      component: Main,
      children: [
        {
          path: 'bankaccount', title: '银行账户管理', name: 'bankaccount', component: resolve => {
            require([ '@/views/account/bankaccount/index.vue' ], resolve);
          }
        },
        {
          path: 'fundaccount', title: '基金账户管理', name: 'fundaccount', component: resolve => {
            require([ '@/views/account/fundaccount/index.vue' ], resolve);
          }
        },
        {
          path: 'shareholderaccount', title: '股东帐户管理', name: 'shareholderaccount', component: resolve => {
            require([ '@/views/account/shareholderaccount/index.vue' ], resolve);
          }
        },
        {
          path: 'capitalaccount', title: '资金帐户管理', name: 'capitalaccount', component: resolve => {
            require([ '@/views/account/capitalaccount/index.vue' ], resolve);
          }
        },
        {
          path: 'Interbankaccount', title: '银行间债券管理', name: 'Interbankaccount', component: resolve => {
            require([ '@/views/account/Interbankaccount/index.vue' ], resolve);
          }
        },
        {
          path: 'businessaccount', title: '营业部管理', name: 'businessaccount', component: resolve => {
            require([ '@/views/account/businessaccount/index.vue' ], resolve);
          }
        },
      ]
  },
  {
    path: '/templateset',
      icon: 'android-notifications',
      name: 'templateset',
      title: '模板设置',
      component: Main,
      children: [
        {
          path: 'templateseting', title: '模板设置', name: 'templateseting', component: resolve => {
            require([ '@/views/templateset/index.vue' ], resolve);
          }
        },
      ]
  },
  {
    path: '/todolist',
      icon: 'android-notifications',
      name: 'todolist',
      title: '待办列表',
      component: Main,
      children: [
        {
          path: 'todolisting', title: '待办列表', name: 'todolisting', component: resolve => {
            require([ '@/views/todolist/index.vue' ], resolve);
          }
        },
      ]
  },
  {
    path: '/noticelist',
      icon: 'android-notifications',
      name: 'noticelist',
      title: '公告管理',
      component: Main,
      children: [
        {
          path: 'notice', title: '公告管理', name: 'notice', component: resolve => {
            require([ '@/views/notice/notice.vue' ], resolve);
          }
        },
      ]
  },
  {
    path: '/invest',
      icon: 'android-notifications',
      name: 'invest',
      title: '投资管理',
      component: Main,
      children: [
        {
          path: 'pledge', title: '抵质押物', name: 'pledge', component: resolve => {
            require([ '@/views/invest/pledge/pledge.vue' ], resolve);
          }
        },
        {
          path: 'guarantee', title: '担保物', name: 'guarantee', component: resolve => {
            require([ '@/views/invest/guarantee/guarantee.vue' ], resolve);
          }
        },
        {
          path: 'subjectmatter', title: '标的物', name: 'subjectmatter', component: resolve => {
            require([ '@/views/invest/subjectmatter/subjectmatter.vue' ], resolve);
          }
        },
        {
          path: 'customer', title: '对手方管理', name: 'customer', component: resolve => {
            require([ '@/views/invest/customer/customer.vue' ], resolve);
          }
        },
      ]
  },
  {
    path: '/logmanages',
      icon: 'android-notifications',
      name: 'logmanages',
      title: '日志管理',
      component: Main,
      children: [
        {
          path: 'Businesslog', title: '业务日志管理', name: 'Businesslog', component: resolve => {
            require([ '@/views/logmanages/Businesslog/index.vue' ], resolve);
          }
        },
        {
          path: 'operationlog', title: '操作日志', name: 'operationlog', component: resolve => {
            require([ '@/views/logmanages/operationlog/index.vue' ], resolve);
          }
        },
      ]
  },
  // {
  //   path: '/filemanages',
  //     icon: 'android-notifications',
  //     name: 'filemanages',
  //     title: '文档管理',
  //     component: Main,
  //     children: [
  //       {
  //         path: 'filemanage', title: '文档管理', name: 'filemanage', component: resolve => {
  //           require([ '@/views/filemanages/filemanage/index.vue' ], resolve);
  //         }
  //       },
  //     ]
  // },
];
// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    locking,
    ...appRouter,
];
