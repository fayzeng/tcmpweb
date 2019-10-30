import addcompoent from './addcompoent/addcompoent.vue'
import temptable from '@/components/temptable/index.vue'
import moment from 'moment'
export default {
    props: {
        tempId: null,
        keyid:null
    },
    components:{
      addcompoent,
      temptable,
    },
    data(){
      return{
          editid:'',
          template_id:'',
          Interfaceinfo:'',
          tableshow:'',
          fieldarr:[],
          project_id:'',
          isActive:'',
          fieldData:[],
          rule:{
              mustInput: [{ required: true,trigger: "focus" }]
          },
          inputval:'',
      }
    },
    methods:{
        ChildFun(){
            let saveobj ={}
            for (let i = 0; i < this.fieldarr.length; i++) {
                if(this.fieldarr[i].enabled == 1 && !this.fieldarr[i].field_value && this.fieldarr[i].conceal=='1'){
                    this.$Message.error(this.fieldarr[i].field_name +'不能为空')
                    return false
                }else{
                    if(this.fieldarr[i].field_value && this.fieldarr[i].conceal=='1'){
                        if(this.fieldarr[i].field_type==8){
                            saveobj[this.fieldarr[i].field_code] = this.fieldarr[i].field_value.replace(/$s?|(,*)/g, '')
                        }else{
                            saveobj[this.fieldarr[i].field_code] = this.fieldarr[i].field_value
                        }
                    }
                }
            }
            if(this.$route.query.type){
                saveobj.menu_type=this.$route.query.type;
            }
            // if(this.$route.query.id){
            //     saveobj[this.Interfaceinfo.key_code]=this.$route.query.id;
            // }
            if(this.$store.state.tableselect.open_id){
                saveobj.account_opener=this.$store.state.tableselect.open_id;//开户人
            }
            if(this.$store.state.tableselect.seller_id){
                saveobj.seller_id=this.$store.state.tableselect.seller_id;//销户人
            }
            if(this.$store.state.tableselect.project_id){
                saveobj.project_id=this.$store.state.tableselect.project_id;//项目id
            }
            if(this.$store.state.tableselect.manager_id){
                saveobj.manager_id=this.$store.state.tableselect.manager_id;//高级分管领导
            }
            if(this.$store.state.tableselect.project_manager_id){
                saveobj.project_manager_id=this.$store.state.tableselect.project_manager_id;//信托经理
            }
            if(this.$store.state.tableselect.group_id){
                saveobj.group_id=this.$store.state.tableselect.group_id;//部门
            }
            if(this.$store.state.tableselect.tableData.length>0){
                saveobj.list=this.$store.state.tableselect.tableData;//列表
            }
            for (var index in saveobj){
                if(saveobj[index]==true){
                   saveobj[index]=1;
                  if(index=='cortified_mail_remark'){
                    saveobj[index]=this.inputval;
                   }
                }else if(saveobj[index]==false){
                   saveobj[index]=0;
                }
                if(saveobj[index] instanceof Array){
                    saveobj[index]=saveobj[index].join(',')
                }
           }
           return saveobj;
        },
      add(){//新增
          this.$store.state.tableselect.tableData =[]
          this.tableshow =true
          this.$get(this.GLOBAL.API_GET_TEMP_FIELDLIST,{template_id:this.template_id}).then(res=>{
              if(res.data.success){
                  let arr = []
                  this.fieldarr = res.data.data
                  res.data.data.forEach(ele => {
                      if(this.$route.query.projectid){
                          if(ele.field_code=='project_name'){
                              ele.field_value=this.$route.query.projectname;
                              this.project_id=this.$route.query.projectid;
                              ele.field_type= 1;
                          }
                      }
                      if(ele.field_type == 6 || ele.field_type == 7 || ele.field_type == 8 ){
                          if(ele.default_value){
                              ele.field_value = Number(ele.default_value)
                          }else{
                              ele.field_value = null
                          }
                          }else if(ele.field_type==5){//多级联动
                              ele.field_value = []
                          }else{
                              if(ele.default_value){
                              ele.field_value = ele.default_value
                          }
                      }
                      if(ele.library_code && ele.field_type != 17){
                          if(ele.library_code=='business_department_name'){
                              this.$get(this.GLOBAL.API_BUSINESS_QUERY).then(res=>{
                                  if(res.data.success){
                                      ele.codelist = res.data.data.result;
                                  }
                                  })
                          }else{
                              if(!ele.parent_id && ele.field_type == 5 ){
                                  this.$get(this.GLOBAL.API_DIC_GETBYCODE,{codetype:ele.library_code}).then(res=>{
                                      if(res.data.success){
                                          ele.codelist = res.data.data;
                                      }
                                  })
                              }else if( ele.field_type == 21){
                                  ele.field_value = []
                                  this.$get(this.GLOBAL.API_DIC_GETBYCODE,{codetype:ele.library_code}).then(res=>{
                                      if(res.data.success){
                                          ele.codelist = res.data.data;
                                      }
                                  })
                              }
                          }
                      }
                      if(ele.field_type == 12){
                          ele.fieldarr = []
                          arr.push(ele)
                      }else{
                          arr[arr.length-1].fieldarr.push(ele)
                      }
                     this.isActive  =  'tab_'+arr[0].field_id
                  });
                  this.fieldData = arr
                  this.$store.state.app.fieldarr =res.data.data
              }
          })
      },
      edit(){//修改
        this.$store.state.tableselect.tableData =[]
          this.$get(this.GLOBAL.API_GET_TEMP_FIELDLIST,{template_id:this.template_id}).then(res=>{
              if(res.data.success){
                let arr =[]
                  this.$get(this.Interfaceinfo.update_interface,{[this.Interfaceinfo.key_code]:this.editid}).then(data=>{
                      if(data.data.success){
                          let obj = data.data.data;
                          res.data.data.forEach(ele => {
                              if(ele.library_code){
                                  if(ele.library_code=='business_department_name'){
                                      this.$get(this.GLOBAL.API_BUSINESS_QUERY).then(res=>{
                                          if(res.data.success){
                                              ele.codelist = res.data.data.result;
                                          }
                                        })
                                  }else{
                                      if(!ele.parent_id && ele.field_type == 5 ){
                                        this.$get(this.GLOBAL.API_DIC_GETBYCODE,{codetype:ele.library_code}).then(res=>{
                                              if(res.data.success){
                                                  ele.codelist = res.data.data;
                                                  this.linkage(ele)
                                              }
                                          })
                                      }
                                      else if( ele.field_type == 21){
                                          ele.field_value = []
                                          this.$get(this.GLOBAL.API_DIC_GETBYCODE,{codetype:ele.library_code}).then(res=>{
                                              if(res.data.success){
                                                  ele.codelist = res.data.data;
                                              }
                                          })
                                      }
                                  }
                              }
                              if(ele.field_type == 12){
                                  ele.fieldarr = []
                                  arr.push(ele)
                              }else{
                                  arr[arr.length-1].fieldarr.push(ele)
                              }
                              if(obj instanceof Array){
                                  obj.map(item=>{
                                      for(let key in item){
                                        if(ele.field_type==18){//复选框
                                            if(obj[key]=='1'){
                                                 ele.field_value=true;
                                             }else{
                                                 ele.field_value=false;
                                             }
                                         }else {
                                             ele.field_value = obj[key]
                                             if(ele.field_type==8&&ele.field_value){//金额
                                                 ele.field_value=this.means.comdify(ele.field_value)
                                             }
                                             if(ele.field_type==21){//多选
                                                 ele.field_value=ele.field_value?ele.field_value.split(','):[];
                                             }
                                             if(ele.library_code=='business_department_name'){
                                                 ele.field_value=Number(ele.field_value)
                                             }
                                             if(ele.field_type==9){//时间
                                                 ele.field_value=ele.field_value?moment(ele.field_value,'YYYYMMDD').format('YYYY-MM-DD'):new Date()
                                             }
                                             if(ele.field_type==22){//其他回执
                                                 this.Handleinputval(ele)
                                             }
                                             // if(ele.field_name=='开户人'){//开户人
                                             //     this.Handleopener(ele)
                                             // }
                                             if(ele.library_list){
                                                 this.controllibrary(ele);   //下拉变化控制其它字段是否隐藏
                                              }
                                         }
                                      }
                                  })
                              }else{
                                for(let key in obj){
                                  if(ele.field_code == key){
                                      if(ele.field_type==18){//复选框
                                         if(obj[key]=='1'){
                                              ele.field_value=true;
                                          }else{
                                              ele.field_value=false;
                                          }
                                      }else {
                                          ele.field_value = obj[key]
                                          if(ele.field_type==8&&ele.field_value){//金额
                                              ele.field_value=this.means.comdify(ele.field_value)
                                          }
                                          if(ele.field_type==21){//多选
                                              ele.field_value=ele.field_value?ele.field_value.split(','):[];
                                          }
                                          if(ele.library_code=='business_department_name'){
                                              ele.field_value=Number(ele.field_value)
                                          }
                                          if(ele.field_type==9){//时间
                                              ele.field_value=ele.field_value?moment(ele.field_value,'YYYYMMDD').format('YYYY-MM-DD'):new Date()
                                          }
                                          if(ele.field_type==22){//其他回执
                                              this.Handleinputval(ele)
                                          }
                                          // if(ele.field_name=='开户人'){//开户人
                                          //     this.Handleopener(ele)
                                          // }
                                          if(ele.library_list){
                                              this.controllibrary(ele);   //下拉变化控制其它字段是否隐藏
                                           }
                                      }
                                  }
                              }  
                              }
                              

                      });
                      }
                     this.isActive  =  'tab_'+arr[0].field_id
                  })
                  this.fieldData = arr
                  this.fieldarr = res.data.data
                  this.$store.state.app.fieldarr =res.data.data
              }
          })
      },
      controllibrary(arr){
        var xi=[];
        var index=0;
        arr.library_list.map(temp=>{
            temp.operation_id?temp.operation_id.split(',').map(oper => {
                this.fieldarr.forEach((ele,ind)=>{
                    if(oper==ele.field_id){
                         if(arr.field_value == temp.library_value){
                             ele.conceal = temp.conceal_flag;
                             xi[index]=ele.field_name;
                             index++;
                         }else{
                            var xyz=0;
                            xi.forEach((ele123,ind123)=>{
                                if(ele123==ele.field_name)xyz=1;
                            });
                              if(temp.conceal_flag==1&&xyz==0){
                                    ele.conceal=0;
                                }else{
                                    ele.conceal=1;
                                }
                        }
                    }
                })
        }):'';
    })
    },
      addsave(){//保存
          let saveobj ={}
          for (let i = 0; i < this.fieldarr.length; i++) {
              if(this.fieldarr[i].enabled == 1 && !this.fieldarr[i].field_value && this.fieldarr[i].conceal==1){
                  this.$Message.error(this.fieldarr[i].field_name +'不能为空')
                  return false
              }else{
                  if(this.fieldarr[i].field_value && this.fieldarr[i].conceal=='1'){
                      if(this.fieldarr[i].field_type==8){
                          saveobj[this.fieldarr[i].field_code] = this.fieldarr[i].field_value.replace(/$s?|(,*)/g, '')
                      }else if(this.fieldarr[i].field_type==22){
                          if(this.fieldarr[i].field_value==true){
                              saveobj[this.fieldarr[i].field_code]=this.inputval;
                          }
                      }else if(this.fieldarr[i].field_type==18){
                          saveobj[this.fieldarr[i].field_code] =  this.fieldarr[i].field_value ? '1' : '0'
                      }else if(this.fieldarr[i].field_type==4 ||  this.fieldarr[i].field_type==21){
                          if(this.fieldarr[i].field_value.length){
                              saveobj[this.fieldarr[i].field_code] = this.fieldarr[i].field_value.join(',')
                          }
                      }else if(this.fieldarr[i].field_type==9){
                        if(this.fieldarr[i].field_value instanceof Date){
                            saveobj[this.fieldarr[i].field_code] =moment(this.fieldarr[i].field_value).format('YYYYMMDD')
                        }else  if(this.fieldarr[i].field_value.indexOf('-') !=-1){
                            saveobj[this.fieldarr[i].field_code]=  this.fieldarr[i].field_value.replace(/-/g, '');
                        }
                      }else {
                          saveobj[this.fieldarr[i].field_code] = this.fieldarr[i].field_value
                      }
                  }
              }
          }
          if(this.$route.query.type){
              saveobj.menu_type=this.$route.query.type;
          }
          if(this.$route.query.id){
              saveobj[this.Interfaceinfo.key_code]=this.$route.query.id;
          }
          if(this.$store.state.tableselect.open_id){
              saveobj.account_opener=this.$store.state.tableselect.open_id;//开户人
          }
          if(this.$store.state.tableselect.seller_id){
              saveobj.seller_id=this.$store.state.tableselect.seller_id;//销户人
          }
          if(this.$store.state.tableselect.project_id){
              saveobj.project_id=this.$store.state.tableselect.project_id;//项目id
          }
          if(this.$store.state.tableselect.manager_id){
              saveobj.manager_id=this.$store.state.tableselect.manager_id;//高级分管领导
          }
          if(this.$store.state.tableselect.project_manager_id){
              saveobj.project_manager_id=this.$store.state.tableselect.project_manager_id;//信托经理
          }
          if(this.$store.state.tableselect.group_id){
              saveobj.group_id=this.$store.state.tableselect.group_id;//部门
          }
          if(this.$store.state.tableselect.tableData.length>0){
              saveobj.list=this.$store.state.tableselect.tableData;//列表
          }
          this.$post(this.Interfaceinfo.create_interface,saveobj).then(res=>{
              if(res.data.success){
                  this.$Message.success('保存成功')
                  window.history.go(-1)
              }
          })
      },
      goback(){
          window.history.go(-1)
      },
      linkage(data){
            // if(data.child){
              // for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < this.fieldarr.length; j++) {
                        if(data.field_id == this.fieldarr[j].parent_id){//判断当前下拉要控制的某个子级
                            this.fieldarr[j].field_value = null// 这一级一变化下级值清空
                            if(data.field_value){ // 如果这一级选择了值 调取下一级的数组
                                this.$get(this.GLOBAL.API_DIC_GETBYCODE,{codetype:this.fieldarr[j].library_code,pid:data.field_value}).then(res=>{
                                    if(res.data.success){
                                        this.fieldarr[j].codelist = res.data.data
                                    }
                                })
                            }else{
                                this.fieldarr[j].codelist = []//如果这一级清空了值 把下级清空
                            }
                        }
                      }
                // }
            // }

        },
      Handleinputval(ele){//处理其他回执
            if(ele.field_value){
                this.inputval=ele.field_value;
                  ele.field_value=true;
              }else{
                ele.field_value=false;
                this.inputval='';
              }
        },
    },
    created(){
        this.template_id = this.$route.query.template_id||this.tempId;
        if(this.keyid){
          this.editid = this.keyid
        }else {
          this.editid =  this.$route.query.id
        }
        this.$get(this.GLOBAL.API_GET_TEMP_INFO,{template_id:this.template_id}).then(res=>{
            if(res.data.success){
                this.Interfaceinfo=res.data.data;
                if(this.editid){
                  this.tableshow =true
                  this.edit()
                }else{
                    this.tableshow =true
                    this.add()
                }
            }
          })
    },
}
