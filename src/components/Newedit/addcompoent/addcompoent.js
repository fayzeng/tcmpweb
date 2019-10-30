import tableModal from '@/components/componentsModal/tableModal/index.vue'
import tabletreeModal from '@/components/componentsModal/tabletreeModal/index.vue'
import moment from 'moment'
export default{
    components:{
      tabletreeModal,
      tableModal
    },
    props:{
      item:Object,
    },
    data(){
        return{
          fieldarr:[],
          tabletype:'',
        }
    },
    methods:{
        onfocus(item){//金额加逗号
            this.fieldarr.map(ele=>{
                if(ele.field_id==item.field_id){
                    ele.field_value=this.means.comdify(item?item.field_value.replace(/$s?|(,*)/g, ''):'')
                }
            })
        },
        selectbankname(item){
            if(item.copy_id){
                this.Handledata(item); //选第一个下拉 为其他input赋值
            }
            if(item.library_list){
                 this.controllibrary(item);   //下拉变化控制其它字段是否隐藏
            }
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
        Handledata(data){
                this.fieldarr.forEach(ele => {
                    data.copy_id.split(',').map(id=>{
                        if(ele.field_id==id){
                            data.codelist.map(temp=>{
                                if(temp.key==data.field_value){
                                    ele.field_value=temp.name;
                                }
                            })
                        }
                    })

               });
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
                               console.log(ele)
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
        Handleinputval(ele){//处理其他回执
            if(ele.field_value){
                this.inputval=ele.field_value;
                  ele.field_value=true;
              }else{
                ele.field_value=false;
                this.inputval='';
              }
        },
        Handleopener(ele){//处理开户人
            let arr = ele.field_value?ele.field_value.split(','):[];
            this.open_id=ele.field_value;
            this.$get(this.GLOBAL.API_USERLIST).then(res=>{
              if(res.data.success){
                  let namearr=[];
                  arr.map(item=>{
                      res.data.data.result.map(temp=>{
                          if(temp.userId==item){
                              namearr.push(temp.name);
                          }
                      })
                  })
                  ele.field_value=namearr.join(',')
              }
            })
        },
        searchtable(tabletype,value){//放大镜
          this.tabletype = tabletype
          if(tabletype=='ACCOUNT_OPENER_NAME'){
              this.$refs.tabletreeModal.showModal('开户人',value)
          }else if(tabletype=='SELLER_NAME'){
              this.$refs.tabletreeModal.showModal('销户人',value)
          }else if(tabletype=='PROJECT_MANAGER_NAME'){
              this.$refs.tabletreeModal.showModal('信托经理',value)
          }else if(tabletype=='MANAGER_NAME' ){
              this.$refs.tabletreeModal.showModal('分管高级人员',value)
          }else {
              this.$refs.tableModal.showModal()
          }
      },
        updateopen(data){//更新开户人
            this.fieldarr.forEach(ele => {
                if(ele.field_name=='开户人' && data.title=='开户人'){
                    let arr=[],open_id=[];
                    data.data.map(item=>{
                       arr.push(item.name);
                       open_id.push(item.userId)
                    })
                    ele.field_value=arr.join(',')
                    this.open_id=open_id.join(',')
                    this.$store.state.tableselect.open_id=open_id.join(',');
                    console.log(open_id.join(','))
                }else if(ele.field_name=='销户人' && data.title=='销户人'){
                    let arr=[],seller_id=[];
                    data.data.map(item=>{
                       arr.push(item.name);
                       seller_id.push(item.userId)
                    })
                    ele.field_value=arr.join(',')
                    this.seller_id=seller_id.join(',');
                    this.$store.state.tableselect.seller_id=seller_id.join(',');
                }else if(ele.field_name=='信托经理' && data.title=='信托经理'){
                    let arr=[],project_manager_id=[];
                    data.data.map(item=>{
                       arr.push(item.name);
                       project_manager_id.push(item.userId)
                    })
                    ele.field_value=arr.join(',')
                    this.project_manager_id=project_manager_id.join(',')
                    this.$store.state.tableselect.project_manager_id=project_manager_id.join(',')
                }else if(ele.field_name=='分管高级人员' && data.title=='分管高级人员'){
                    let arr=[],manager_id=[];
                    data.data.map(item=>{
                       arr.push(item.name);
                       manager_id.push(item.userId)
                    })
                    ele.field_value=arr.join(',')
                    this.manager_id=manager_id.join(',');
                    this.$store.state.tableselect.manager_id=manager_id.join(',');
                }
             });

        },
        updatedata(){//更新项目名称
          for (let i = 0; i < this.fieldarr.length; i++) {
              if(this.fieldarr[i].field_type == 17 &&this.fieldarr[i].field_code=='project_name'){
                  this.fieldarr[i].field_value=this.$store.state.tableselect.rowtabledata[0][this.fieldarr[i].field_code];
                  this.project_id=this.$store.state.tableselect.rowtabledata[0].project_id;
                  this.$store.state.tableselect.project_id=this.$store.state.tableselect.rowtabledata[0].project_id;
                  this.$store.state.tableselect.projectName=this.$store.state.tableselect.rowtabledata[0].project_name;
              }else if(this.fieldarr[i].field_type == 17 && this.fieldarr[i].field_code=='group_name'){
                  this.fieldarr[i].field_value=this.$store.state.tableselect.rowtabledata[0].groupName;
                  this.groupId=this.$store.state.tableselect.rowtabledata[0].groupId;
                  this.$store.state.tableselect.group_id=this.$store.state.tableselect.rowtabledata[0].groupId;
              }
          }
      }
    },
    created(){
      this.fieldarr =  this.$store.state.app.fieldarr
    }
}
