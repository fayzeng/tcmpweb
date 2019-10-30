import Newedit from '../Newedit/index.vue'
import filemanage from '@/views/projectmanages/filemanages/filemanage/index.vue'
export default {
    components:{
        Newedit,
        filemanage
    },
    data(){
        return{
            tabflag:'表单录入',
            tabbigflag:'流程基本信息',
            Panelvalue:[1,2,3,4],
            url:this.fileURL +  '?sys_tokenId=' +  sessionStorage.getItem('cookieaccess_token'),
            comeout:'',
            image:'',
            taskId:'',
            businessKey:"",
            buttonluch:[],
            message:'',
            template_id:"",
            tempdata:'',
            neweditshow:false,
            processDefinitionId:null,
            text:'',
            title:'',
            fileidarr:[],
            filename:[],
            filetype:'',
            showfile:true,
            paramobj:{
                projectName:'',
                projectId:'',
                departmentid:'',
                proc_Inst_Id:''
            },
            flag:false,
            rule:{
                // title: [
                //     { required: true, message: ' ', trigger: 'blur' }
                // ],
                // text: [
                //     { required: true, message: ' ', trigger: 'blur', type: 'string', },
                // ],
            },
        }
    },
    methods: {
        tabchange(name){
            this.tabflag  = name
        },
        tabclick(name){
            this.tabbigflag  = name
        },
        handleSuccess(res,file){
            this.filetype=file.name.split('.')[1];
            this.filename.push(file.name);
            if(res.success){
                this.fileidarr.push(res.data)
                this.$Message.success(res.message)
            }
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
        handleBeforeUpload(){},
        handleFormatError(file){
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: '文件 ' + file.name + ' 格式不正确，请上传.ppt,.docx,.xls,.xlsx文件。'
            })
        },
        back(){
            let filearr=this.$store.state.tableselect.tableDatas;
            if(filearr.length!=0&&filearr[0].fileId){
                filearr.map(item=>{
                      this.$post(this.GLOBAL.API_DELETE_FILE,{fileId:item.fileId}).then(res => {
                            if (res.data.success) {
                               window.history.go(-1)
                            }
                        })
                        
                })   
            }else{
              window.history.go(-1)
            }
        },
        luch(node){
            this.comeout=node;
            if(!this.title){
                this.$Message.error('请输入标题')
            }else {
                var params ={
                    outcome:this.comeout,
                    processDefinitionId:this.processDefinitionId,
                    taskId:this.taskId,
                    service_code:this.tempdata.service_code ? this.tempdata.service_code : ' ' ,
                    text:this.text,
                    tittle:this.title,
                    businessKey:this.businessKey,
                    url:this.fileidarr.join(','),
                    attachmentType:this.filetype,
                    attachmentName:this.filename.join(','),
                    message:this.message,
                }
                if(this.neweditshow){
                  if(this.$refs.Newedit.ChildFun()){
                      if(!this.comeout){
                          this.$Message.error('请选择提交节点')
                      }else{
                          let fieldobj =  Object.assign(this.$refs.Newedit.ChildFun(),params);
                          fieldobj.list=this.$store.state.tableselect.tableData;
                          this.$post(this.GLOBAL.API_TASK_COMPLETE,fieldobj).then(res=>{
                              if (res.data.success) {
                                  window.history.go(-1)
                                  this.$Message.success('提交成功')
                              }
                          })
                      }
                  }
                }else{
                    if(!this.comeout){
                        this.$Message.error('请选择提交节点')
                    }else{
                       this.$post(this.GLOBAL.API_TASK_COMPLETE,params).then(res=>{
                            if (res.data.success) {
                                window.history.go(-1)
                                this.$Message.success('提交成功')
                            }
                        })
                    }

                }
            }
        },
        getapproveinfo(){
            this.$get(this.GLOBAL.API_GET_APPIMAGE,{processDefinitionId:this.$route.query.processid,resourceType:'image'}).then(res=>{
                if(res.data.success){
                    this.image = res.data.data
                }
            })
            this.$post(this.GLOBAL.API_GET_STARTFOEM,{processDefinitionId:this.$route.query.processid}).then(res=>{
                if(res.data.success){
                    this.$post(this.GLOBAL.API_APPROVE_START,{processDefinitionId:this.$route.query.processid,service_code:res.data.data?res.data.data.service_code:null}).then(res=>{
                        if(res.data.success){
                            this.taskId = res.data.data.taskId;
                            this.processDefinitionId = res.data.data.processinstanceId;
                            this.businessKey=res.data.data.businessKey;
                            this.paramobj.proc_Inst_Id=res.data.data.processinstanceId;
                            this.paramobj.projectId=res.data.data.businessKey;
                            this.flag=true;
                            this.$post(this.GLOBAL.API_TASK_OUTCOMES,{taskId:this.taskId}).then(res=>{
                                if(res.data.success){
                                    this.buttonluch =res.data.data;
                                }
                            });
                            this.$post(this.GLOBAL.API_GET_TEMPLATE,{taskId:this.taskId}).then(res=>{
                                if(res.data.success){
                                    if(res.data.data){
                                      this.template_id =res.data.data.template_id;
                                      this.tempdata=res.data.data;
                                      this.neweditshow =true
                                    }
                                }
                            })
                        }
                    })
                }
            })
        },
        getuserinfo(){
            this.$post(this.GLOBAL.API_TOALTER,{userId:window.sessionStorage.getItem('userid')}).then(res=>{
                if(res.data.success){
                    this.paramobj.departmentid=res.data.data.groupId;
                }
            })
        }
    },
    created() {
        this.getapproveinfo()
        this.getuserinfo()
    }
}
