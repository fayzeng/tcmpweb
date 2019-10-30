import tableModal from '@/components/componentsModal/tableModal/index.vue'

export default {
    components:{
        tableModal
    },
    props:{
        modaltitle:null,
       // paramobj:null,
        filetypes:null,
    },
    data(){
        return{
            url:this.baseURL + this.GLOBAL.API_FILEMANAGE_UPLOAD +  '?sys_tokenId=' +  sessionStorage.getItem('cookieaccess_token'),
            projectId:'',
            departmentid:'',
            formItem:{
                projectName:"",filetype:'',classification:'',department:'',proc_Inst_Id:'',description:'',documentcontent:'',
            },
            formRule:{
                projectName: [  { required: true, message: ' ', trigger: 'change' }],
                filetype: [  { required: true, message: ' ', trigger: 'focus' }],
                department: [  { required: true, message: ' ', trigger: 'change' }],
            },
            propname:'projectList',
            fileidarr:[],
            filetype:[],
            filename:[],
            classificationList:[],
            filetypeList:[],
            codetype:['CLASSIFICATION'],
            treedata:[],
            paramobj:this.$store.state.tableselect.paramobj,
            projectName:this.$store.state.tableselect.projectName,
            projectID:this.$store.state.tableselect.project_id,
        }
    },
    methods:{
        getformItem(){
            // this.formItem.projectId=this.projectId||this.formItem.projectId;
            // this.formItem.departmentid=this.departmentid||this.formItem.departmentid;
            // this.formItem.filestate=(this.$route.name=='filemanage')?'1':'2';
            // this.formItem.typeid=this.fileidarr.join(',')
            let obj={
                projectId:this.projectId||this.formItem.projectId,
                department:this.formItem.department,
                departmentid:this.departmentid||this.formItem.departmentid,
                filetype:this.formItem.filetype,
                classification:this.formItem.classification,
                description:this.formItem.description,
                documentcontent:this.formItem.documentcontent,
                proc_Inst_Id:this.formItem.proc_Inst_Id,
                typeid:this.fileidarr.join(','),
                filestate:this.$route.name=='filemanage'?'1':'2',
            }
            if(this.modaltitle=='修改文档信息'){
                obj.fileId=this.formItem.fileId;
               if(this.formItem.fileName){
                  this.fileidarr.push(this.formItem.fileId); 
               }
                obj.typeid=this.fileidarr.join(',');
            }
            return obj;
        },
        getparam(){
            let obj={
                projectId:this.paramobj.projectId,
                department:this.paramobj.department,
                departmentid:this.paramobj.departmentid,
                filetype:this.formItem.filetype,
                classification:this.formItem.classification,
                description:this.formItem.description,
                documentcontent:this.formItem.documentcontent,
                proc_Inst_Id:this.paramobj.proc_Inst_Id,
                typeid:this.fileidarr.join(','),
                filestate:this.$route.name=='filemanage'?'1':'2',
            }
            if(this.modaltitle=='修改文档信息'){
                obj.fileId=this.formItem.fileId;
                if(this.formItem.fileName){
                    this.fileidarr.push(this.formItem.fileId); 
                 }
                  obj.typeid=this.fileidarr.join(',');
            }
            this.$store.state.tableselect.fileparamobj=obj;
            return obj;
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
        handleBeforeUpload(file){
        },
        handleFormatError(file){
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: '文件 ' + file.name + ' 格式不正确，请上传.ppt,.docx,.xls,.xlsx文件。'
            })
        },
        deletefilelist(){
            this.formItem.fileName='';
        },
        search(field){
            if(field == '3'){
                this.propname = 'projectList'
            }else{
                this.propname = 'department'
            }
            if(this.modaltitle=='新增文档'){
                this.$refs.tableModal.showModal(field,'新增','');
            }else if(this.modaltitle=='修改文档信息'){
                this.$refs.tableModal.showModal(field,'修改',this.$store.state.tableselect.selectdata[0].gradeId);
            }else{
                this.$refs.tableModal.showModal(field);
            }
        },
        updatedata(data){
            if(data=='project_id'){
                this.formItem.projectName=this.$store.state.tableselect.rowtabledata[0].project_name;
                this.projectId=this.$store.state.tableselect.rowtabledata[0].project_id;
            }else if(data=='department'){
                this.formItem.department=this.$store.state.tableselect.rowtabledata[0].groupName;
                this.departmentid=this.$store.state.tableselect.rowtabledata[0].groupId;
            }
        },
        getselectList(){
            this.codetype.map(item=>{
              this.$get(this.GLOBAL.API_DIC_GETBYCODE,{codetype:item}).then(res=>{
                if(res.data.success){
                  if(item=='CLASSIFICATION'){
                    this.classificationList = res.data.data;
                  }
                }  
             })  
            })
            
        },
        gettreedata(status){
            this.$get(this.GLOBAL.API_TREE_LIST).then(res=>{
                if(res.data.success){
                    this.treedata =JSON.parse(JSON.stringify(res.data.data).replace(/type_name/g,"title"))
                    if(status){
                        this.gettreeList(this.treedata)
                    }
                }
            })
        },
        gettreeList(arr){
            for(let i =0; i<arr.length;i++){
                if(arr[i].title){
                    this.filetypeList.push({sft_id:arr[i].sft_id,title:arr[i].title})
                    if(arr[i].children && arr[i].children.length ){
                        this.gettreeList(arr[i].children)
                    }
                }
            }
        },
    },
    created() {
        this.getselectList()
        this.gettreedata(1)
        this.formItem.filetype=this.$store.state.tableselect.singletreedata?this.$store.state.tableselect.singletreedata.sft_id:'';
        if(this.modaltitle=='修改文档信息'){
           this.$get(this.GLOBAL.API_QUERYID_FILE,{fileId:this.$store.state.tableselect.selectdata[0].fileId}).then(res=>{
                    if(res.data.success){
                        this.formItem=res.data.data;
                        this.formItem.filetype=Number(this.formItem.filetype)
                    }  
            })  
        }
    }
}
        
      
