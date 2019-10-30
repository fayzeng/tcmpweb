import Newedit from '@/components/Newedit/index.vue'
import selectModal from '@/components/componentsModal/selectModal/index.vue';
import filemanage from '@/views/projectmanages/filemanages/filemanage/index.vue'
export default {
    props: {
        flag:null,
    },
    components:{
        Newedit,
        selectModal,
        filemanage,
    },
    data () {
        return {
            paramobj:{
                projectId:'',
                department:'',
                proc_Inst_Id:''
            },
            single1:true,
            single2:true,
            single3:true,
            total:0,
            nowpage:1,
            currentPage:1,
            pagesize:10,
            filedobj:{
                account_number:''
            },
            showfag:false,
            image:'',
            neweditshow:false,
            name:'1',
            url:this.fileURL +  '?sys_tokenId=' +  sessionStorage.getItem('cookieaccess_token'),
            showPanel:['1','2','3','4'],
            history:[],
            columns:[
                {
                    title: '审批人',
                    key: 'assignee'
                },
                {
                    title: '审批意见',
                   // key: 'message'
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
                {
                    title: '节点名称',
                    key: 'activityName'
                },
                {
                    title: '文件列表',
                   // key: 'attachmentName',
                      render: (h, params) => {
                        let arr=[];
                        params.row.fileInfo?params.row.fileInfo.forEach((item)=>{
                            arr.push(h('a', {
                                style: {
                                    margin: '0 10px',
                                },
                                domProps: {
                                    title: item.fileName,
                                    href:this.baseURL +this.GLOBAL.API_DWONLOAD+'?sys_tokenId=' +  sessionStorage.getItem('cookieaccess_token')+'&fileId='+item.fileId,
                                    target:"_Blank"
                                }
                            }, item.fileName+';'))
                        }):'';
                        return h('div',arr)
                      }
                },
                // {
                //     title: '审批时间',
                //     key: 'endTime',
                //     render:(h,{row,column,index}) =>{
                //         return h('span',moment(column).format('YYYY-MM-DD HH:mm:ss'))
                //     }
                // }
            ],
            info: {tittle:'',text:'',businessKey:''},
            nodes:[],
            param:{
                comeout:'',
                processDefinitionId:'',
                taskId:'',
                message:'',
                assigneeList:''
            },
            temlpates:'',
            service_code:'',
            fileidarr:[],
            filename:[],
            filetype:'',
            filelist:[],
            filenamelist:[],
            DropdownList:[],
            filenamelists:[],
            html:'',
            multiInstanceFlag:true,
            muti_instance_type:'',
            selectlist:[],
            btnval:'',
            tabbigflag:"流程基本信息",
            tabflag:'表单录入',
        }
    },
    computed: {
        user(){
            return sessionStorage.getItem('user')
        }
    },
    methods: {
        tabclick(name){
            this.tabbigflag=name;
        },
        tabchange(name){
            this.tabflag=name;
            
        },
        updatedata(arr){
            this.param.assigneeList = ''
            let assignarr =[]
            arr?arr.forEach(ele=>{
                assignarr.push(ele.id)
            }):'';
            this.param.assigneeList  = assignarr.join(',');
            let params ={
                outcome:this.btnval,
                processDefinitionId:this.param.processDefinitionId,
                taskId:this.param.taskId,
                businessKey:this.info.businessKey,
                assigneeList:this.param.assigneeList,
                service_code:this.service_code,
                url:this.fileidarr.join(','),
                attachmentType:this.filetype,
                attachmentName:this.filename.join(','),
                message:this.param.message,
                muti_instance_type:this.muti_instance_type
              }
            if(this.temlpates){
                let fieldobj =  Object.assign(this.$refs.Newedit.ChildFun(),params);
                fieldobj.list=this.$store.state.tableselect.tableData;
                this.$post(this.GLOBAL.API_TASK_COMPLETE,fieldobj).then(res=>{
                    if (res.data.success) {
                        window.history.go(-1)
                        this.$Message.success('提交成功')
                    }
                })
            }else{
                this.$post(this.GLOBAL.API_TASK_COMPLETE,params).then(res=>{
                    if (res.data.success) {
                        window.history.go(-1)
                        this.$Message.success('提交成功')
                    }
                })
            }
        },
        GETCOUNTERSIGN(outname){
            this.$get(this.GLOBAL.API_GET_COUNTERSIGN,{taskId:this.param.taskId,outcome:outname,firstNameLike:''}).then(res=>{
                if(res.data.success){
                    if(res.data.data&&res.data.data.result && res.data.data.result.length){
                        this.$refs.selectModal.showModal({taskId:this.param.taskId,outcome:outname,firstNameLike:''}, true);
                    }else{
                            this.updatedata()
                    }

                }
            })
        },
        handleClickDropdown(name){
            this.param.message=name;
        },
        handleSuccess(res,file){
            this.filetype=file.name.split('.')[1];
            if(res.success){
                this.fileidarr.push(res.data)
                this.filename.push(file.name);
                this.$Message.success(res.message)
            }
        },
        handleFormatError(file){
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: '文件 ' + file.name + ' 格式不正确，请上传.ppt,.docx,.xls,.xlsx文件。'
            })
        },
        handleError(error, file, fileList){
            this.$Message.error('文件' +fileList.name+'上传失败')
        },
        handleremove(file){
            if(this.fileidarr.indexOf(file.response.data)!=-1){
                this.fileidarr.splice(this.fileidarr.indexOf(file.response.data),1);
            }
           if(this.filename.indexOf(file.name)!=-1){
                this.filename.splice(this.filename.indexOf(file.response.data),1);
            }
        },
        changtab(name){
            this.name = name
        },
        changeUser(){
            // this.$Message.warning('')
            // alert('此功能暂未开发')
        },
        // getremark(id){
        //     this.$post(this.GLOBAL.API_GET_REMARK,{taskId:id,type:1}).then(res=>{
        //         if(res.data.success){
        //             res.data.data.length && this.history.push(res.data.data[0])
        //             if(res.data.data[0]){
        //                 this.getfilelist(res.data.data[0].taskId)
        //             }
        //         }
        //     })

        // },
        getInfo(taskId) { //获取基本信息
            this.$post(this.GLOBAL.API_TASK_INFO,{taskId:taskId}).then(res=>{
            if(res.data.success){
                this.info = res.data.data;
                this.multiInstanceFlag=res.data.data.multiInstanceFlag;
                this.$store.state.tableselect.permituploadfileFlag=res.data.data.permituploadfileFlag;
                console.log(this.info.permituploadfileFlag)
                this.gethtml(this.param.processDefinitionId)
                // this.executionId
                this.$get(this.GLOBAL.API_GET_IMAGE,{processInstanceId:this.param.processDefinitionId}).then(res=>{
                    if(res.data.success){
                        this.image = res.data.data
                    }
                })
                this.showfag = true
            }
        })
        },
        // async getHistory(processid){ //获取审批历史记录
        //     const url = this.GLOBAL.API_TASK_HISTORY
        //     let res = await this.$post(url,{processinstanceId:processid});
        //     if (res.status==200) {
        //         const ret = res.data
        //         if (ret.success) {
        //            ret.data.result.forEach(ele => {
        //                 if(ele.taskId){
        //                     this.getremark(ele.taskId)
        //                 }
        //            });
        //             // this.history = ret.data ? ret.data.result : []
        //         } else {
        //         }
        //     }
        // },
        async getNextNodes(taskId){
            const url = this.GLOBAL.API_TASK_OUTCOMES
            let res = await this.$post(url,{taskId})
            if (res.status==200) {
                const ret = res.data
                if (ret.success) {
                    this.nodes = ret.data
                } else {
                }
            }
        },
        gettabledata(id){//获取审批记录的表格
            this.$post(this.GLOBAL.API_HISTORY_TABLE,{processinstanceId:id}).then(res=>{
                if (res.data.success) {
                    if(res.data.data){
                        this.history=res.data.data;
                    }
                }
            })
        },
        // getfilelist(id){
        //     this.$post(this.GLOBAL.API_GET_FILE,{taskId:id}).then(res=>{
        //        if(res.data.success){
        //          res.data.data.length && this.filelist.push(res.data.data[0])
        //          if(res.data.data[0]){
        //             res.data.data[0].attachmentName?res.data.data[0].attachmentName.split(',').map((item,ind)=>{
        //                 res.data.data[0].url?res.data.data[0].url.split(',').map((temp,index)=>{
        //                         if(ind==index){
        //                             this.filenamelist.push({name:item,id:temp,user:res.data.data[0].user,taskId:res.data.data[0].taskId})
        //                         }
        //                     }):''
        //                 }):'';
        //          }
        //        }
        //        let filenamelists=[]
        //        this.filenamelist.map(temp=>{
        //        this.filelist.map(item=>{
        //          if(item.url){
        //                 if(item.user==temp.user&&item.taskId==temp.taskId){
        //                     filenamelists.push(temp);
        //                     item.filenamelists=filenamelists;
        //                 }
        //               }
        //             })
        //         })
        //     })
        // },
        downLoad(item){
            window.open(this.baseURL +this.GLOBAL.API_DWONLOAD+'?sys_tokenId=' +  sessionStorage.getItem('cookieaccess_token')+'&fileId='+item.id)
        },
        gettemplate(id){
            this.$post(this.GLOBAL.API_GET_TEMPLATE,{taskId:id}).then(res=>{
                if (res.data.success) {
                    if(res.data.data){
                          this.neweditshow =true
                          this.temlpates = res.data.data.template_id;
                          this.service_code= res.data.data.service_code ? res.data.data.service_code  :''
                    }
                }
            })
        },
        getcommonphrases(){
            this.$get(this.GLOBAL.API_COMMON_PHRASES).then(res=>{
                if (res.data.success) {
                    this.DropdownList=res.data.data.result;
                }
            })
        },
        confirm(btnval){
            this.btnval=btnval;
            let params ={
                outcome:btnval,
                processDefinitionId:this.param.processDefinitionId,
                taskId:this.param.taskId,
                businessKey:this.info.businessKey,
                assigneeList:this.param.assigneeList,
                service_code:this.service_code,
                url:this.fileidarr.join(','),
                attachmentType:this.filetype,
                attachmentName:this.filename.join(','),
                message:this.param.message,
                muti_instance_type:this.muti_instance_type
              }
            if(this.temlpates){
                if(this.$refs.Newedit.ChildFun()){
                     if(this.multiInstanceFlag&&!this.muti_instance_type){
                        this.$Message.error('请选择会签类型')
                      }else{
                        let fieldobj =  Object.assign(this.$refs.Newedit.ChildFun(),params);
                        fieldobj.list=this.$store.state.tableselect.tableData;
                      //  if(this.nodes.length==1){
                            this.GETCOUNTERSIGN(btnval); 
                        // }else{
                        //    this.$post(this.GLOBAL.API_TASK_COMPLETE,fieldobj).then(res=>{
                        //         if (res.data.success) {
                        //             window.history.go(-1)
                        //             this.$Message.success('提交成功')
                        //         }
                        //     }) 
                        // }  
                    }
                }
            }else{
                  if(this.multiInstanceFlag&&!this.muti_instance_type){
                    this.$Message.error('请选择会签类型')
                  }else{
                     // if(this.nodes.length==1){
                          this.GETCOUNTERSIGN(btnval); 
                    //   }else{
                    //    this.$post(this.GLOBAL.API_TASK_COMPLETE,params).then(res=>{
                    //         if (res.data.success) {
                    //             window.history.go(-1)
                    //             this.$Message.success('提交成功')
                    //         }
                    //     })
                    //   }
                  
                  }
                
            }
        },
        changePage(val){
          this.currentPage=val;
          this.nowpage=val;
        },
        gethtml(id){
            let params={
                project_id:this.info.project_id,
                process_instance_id:id,
                requestform_id:1,
                idea_all:this.single2?'1':'0',
                idea_end:this.single3?'1':'0',
                service_information:this.single1?'1':'0',
            }
            this.$get(this.GLOBAL.API_GET_HTML,params).then(res=>{
                if (res.status==200) {
                    this.html=res.data;
                }
            })   
        },
        chnagesingle(){
            this.gethtml(this.param.processDefinitionId)
        },
        getselectlist(){
            this.$get(this.GLOBAL.API_DIC_GETBYCODE,{codetype:'MUTI_INSTANCE_TYPE'}).then(res=>{
                if(res.data.success){
                    this.selectlist=res.data.data;
                }  
           })
        },
        goback(){
            window.history.go(-1);
            this.$store.state.tableselect.permituploadfileFlag='true';
        }
    },
    created(){
        const {processid,id} = this.$route.query;
        this.param.processDefinitionId = processid
        this.param.taskId = id;
        this.paramobj.proc_Inst_Id=processid;
       // this.paramobj.projectId=res.data.data.businessKey;
        this.getInfo(id)
       // this.getHistory(processid)
        this.gettemplate(id)
        this.getNextNodes(id)
        this.getcommonphrases()
        this.gettabledata(processid)
        this.getselectlist()
        
    }
};
