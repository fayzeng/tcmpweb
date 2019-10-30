import _API from '../../libs/config.js'
let formlabels={
    Businesslog:{
        formitem:[
            {label:'关联业务',key:'biz_id'},
            {label:'关联业务名称',key:'biz_name'},
            {label:'日期',key:'log_date'},
            {label:'日志id',key:'log_id'},
            {label:'ip地址',key:'log_ip'},
            {label:'项目id',key:'project_id'},
            {label:'项目名称',key:'project_name'},
            {label:'操作人',key:'user_name'},
            {label:'日志内容',key:'log_message'},
        ],
        Interface:_API.API_LOG_QUERYID,
    }
}

export default {
    formlabels
}
