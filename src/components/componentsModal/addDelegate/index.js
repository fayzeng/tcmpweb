import moment from 'moment'
import { SelectPage } from 'v-selectpage'
export default {
	components: {
        'v-selectpage': SelectPage
   },
    data(){
        return{
          flag:false,
          modelId:'',
          modalflag:false,				// 控制面板的显示隐藏
          code:'',
          formItem:{
            extentName:'',				// 授权人
            extentNamed:"",				// 被授权人
            extentType:'',				// 授权类型
            thingName: '',				// 事物名
            process: '',				// 流程名
            startDate: '',				// 开始时间
            endDate: '',				// 结束时间
            processId:'',				// 流程名ID
            thingNameId: '',			//事物名ID
            title:''					// 标题名
            
          },
          typearr:[],
          acttypearr:[],
          rules: {
	            startDate:[{type:'date',required: true, message: '开始日期不能为空', trigger: 'blur'}],
                endDate:[{type:'date',required: true, message: '截止日期不能为空', trigger: 'blur'}],      
       	  },
       	  Type:[],							// 授权类型
       	  dis:{								// 控制事物名和流程名
       	  	thingName: true,
       	  	process: true,
       	  },
       	  allPeople:[],						// 后台获取所有用户
       	  sard_id:'',						// 页面传过来的ID
       	  processType:[],					// 所有的流程类型
       	  thingType:[],						// 所有的事物类型
          formTitle:{						// 表单的标题显示
          	people:[{title: '姓名',data: 'name'},{title: '工号',data: 'userName'}],
          	peopled:[{title: '姓名',data: 'name'},{title: '工号',data: 'userName'}],
          	thinfName:[{title: '事物名',data: 'tittle'},{title: '项目名',data: 'project_name'}],
          	processName:[{title: '流程名',data: 'processname'},{title: '流程ID',data: 'processid'}],
          },
          serch:{
          	serThing:'',
          }
        }
    },
   mounted(){
// 	if(localStorage.getItem('tcmType')){
// 		this.$get(this.GLOBAL.API_DIC_GETBYCODE,{codetype:'A1019'}).then(res=>{				// 获取所有的委托类型	
//	            if(res.data.success){
//	            	this.Type = res.data.data;
//	            	localStorage.setItem('tcmType', JSON.stringify(this.Type));
//	            }  
//     	})
// 	}else{
// 		
// 	}
   	
   },
    methods:{
//    handleReset (name) {
//      this.$refs[name].resetFields();
//    },
      confirm(){
          if(!this.formItem.extentName){
            this.$Message.error('请选择授权人');
            return false;
          }else if(!this.formItem.extentNamed){
            this.$Message.error('请选择被授权人');
            return false;
          }else if(!this.formItem.extentType){
            this.$Message.error('请选择类型');
            return false;
          }else if(!this.formItem.startDate){
            this.$Message.error('请选择开始日期');
            return false;
          }else if(!this.formItem.endDate){
            this.$Message.error('请选择结束日期');
            return false;
          }
          else{
          	const url = this.modelId ? this.GLOBAL.API_DELEGATION_SAVE : this.GLOBAL.API_DELEGATION_ADD;
           this.$post(url,{
           	 assignee_id: this.formItem.extentName,
           	 attorney_id: this.formItem.extentNamed,
           	 date_start: moment(this.formItem.startDate).format('YYYYMMDD'),
           	 date_end:  moment(this.formItem.endDate).format('YYYYMMDD'),
           	 delegate_type: this.formItem.extentType,
           	 proc_def_id: this.formItem.processId ? this.formItem.processId : '',
           	 proc_inst_id: this.formItem.thingNameId ? this.formItem.thingNameId : '',
           	 proc_inst_name: this.formItem.thingName ? this.formItem.thingName : '',
           	 process_name: this.formItem.process ? this.formItem.process : '',
           	 sard_id: this.modelId ? this.modelId.sard_id : ''
           	 
           }).then(res=>{
                if(res.data.success){
                    this.$Message.success(this.modelId ? '修改成功' : '增加成功');
                    this.modalflag =false;
                    this.$emit('changpage');
                }
            }) 
          }
      },
      openmodel(rowdata) {	// 打开添加授权或者修改授权页面
      	var tcmType = JSON.parse(localStorage.getItem('tcmType'));
      	var tcmPeople = JSON.parse(localStorage.getItem('tcmPeople'));
      	var tcmThing = JSON.parse(localStorage.getItem('tcmThing'));
      	var tcmProcess = JSON.parse(localStorage.getItem('tcmProcess'));
      	if(tcmType){
      		this.Type = tcmType;
      	}else{
      		this.$get(this.GLOBAL.API_DIC_GETBYCODE,{codetype:'A1019'}).then(res=>{				// 获取所有的委托类型	
	            if(res.data.success){
	            	this.Type = res.data.data;
	            	localStorage.setItem('tcmType', JSON.stringify(this.Type));
	            }  
       		})
      	}
      	if(tcmPeople){
//    		console.log('有联系人' + JSON.stringify(tcmPeople));
      		this.allPeople = tcmPeople;
      	}else{
//    		console.log('没有联系人');
      		this.$get(this.GLOBAL.API_QUESTUSERLIST,{pageSize: 1000}).then(res=>{						// 获取联系人的方式
      			console.log('联系人' + JSON.stringify(res));
	            if(res.data.success){
	            	this.allPeople = res.data.data;
	            	localStorage.setItem('tcmPeople', JSON.stringify(this.allPeople));
	            }      
       		})
      	}
       	if(tcmThing){
      		this.thingType = tcmThing;
      	}else{
	      		this.$get(this.GLOBAL.API_QUESTRUNNING_LIST,{pageSize: 10}).then(res=>{						// 获取所有的事物方式
	       		console.log('事物方式' + JSON.stringify(res))
	            if(res.data.success){
	            	this.thingType = res.data.data.result;
	            	localStorage.setItem('tcmThing', JSON.stringify(this.thingType));
	            }      
            
       		})
      	}
      	if(tcmProcess){
      		this.processType = tcmProcess;
      	}else{
	      	this.$get(this.GLOBAL.API_GET_QUERY_LIST,{sys_act_type: '', pageSize: 1000}).then(res=>{						// 获取所有的流程方式
	      		console.log('流程方式' + JSON.stringify(res))
	            if(res.data.success){
	            	this.processType = res.data.data.result;
	            	localStorage.setItem('tcmProcess', JSON.stringify(this.processType));
	            }      
       		})
      	}
       	
       	
      	this.modelId = rowdata;
        this.formItem.extentName =''
        this.formItem.extentNamed =''
        this.formItem.extentType = '';
        this.formItem.processId = '';	
        this.formItem.thingNameId = '';	
        this.formItem.process = '';	
        this.formItem.thingName = '';	
        this.formItem.startDate = '';
        this.formItem.endDate = '';
        if(rowdata){
        	this.title = '修改委托';
        	if (!this.$store.state.tableselect.selectdata || !this.$store.state.tableselect.selectdata[0]) {
                this.$Message.error('请选择一项')
                return
            }
            if (this.$store.state.tableselect.selectdata.length>1) {
                this.$Message.error('仅能选择一项')
                return
            }
            this.modalflag = true;
            this.$nextTick(() => {this.getData(rowdata);} );
            
        }else{
        	this.dis = {								
       	  		thingName: true,
       	  		process: true,
       	  },
        	this.title = '添加委托';
        	this.modalflag = true;
        }
        
      },
      chooseType(data){          // 授权类型选中事件
      	if(data.length>0){
      		if(data[0].key == '00'){     // 当选中类型为全部时
    		this.formItem.processId = '';
			this.formItem.thingNameId = '';
			this.dis.thingName = true;
			this.dis.process = true;
			this.formItem.thingName = '';
			this.formItem.process = '';
			} 
			else if(data[0].key == '10'){       // 当选中类型为流程时
				this.dis.thingName = true;
				this.dis.process = false;
				this.formItem.thingNameId = '';
				this.formItem.thingName = '';
			} else if(data[0].key == '11'){		// 当选中类型为事物时
				this.dis.process = true;
				this.dis.thingName = false;
				this.formItem.processId = '';
				this.formItem.process = '';
				
			}
      	}
      	
      },
      chooseName(data){					// 选择授权人
      	if(this.formItem.extentName == this.formItem.extentNamed){
      		this.$Message.error('授权人要和被授权人不一致');
      		if(data == 'a'){
      			this.formItem.extentName = '';
      		}else{
      			this.formItem.extentNamed = '';
      		}
      		
      	}
      },
      getThing(data){				// 选择事物事件
      	console.log('aa');
      	if(data.length>0){
      		this.formItem.thingName = data[0].tittle;
      	}
      	
      },
       getThings(val){				// 选择事物事件
//    	console.log('事物名返回的值' + JSON.stringify(val));
      	this.formItem.thingName = val.label;
//    	if(data.length>0){
//    		this.formItem.thingName = data[0].tittle;
//    	}
      	
      },
      getProcess(data){	// 选择流程事件
//    	console.log('bb');
//    	console.log('流程名' + JSON.stringify(data));
      	if(data.length>0){
      		this.formItem.process = data[0].processname;
      	}
      	
      },
      getData(rowdata){				// 修改委托是获取数据填充	
      	let url = this.GLOBAL.API_DELEGATION_QUERY;   // 根据ID查询订单接口
      	let params = {sard_id: rowdata.sard_id};
      	this.$get(url, params).then(res => {
      		if(res.status == 200){
      			const ret = res.data;
      			if(ret.success){
      				const obj = ret.data;
      				this.sergetThing(obj.proc_inst_name);
      				this.formItem.extentName = obj.assignee_id;
      				this.formItem.extentNamed = obj.attorney_id;
      				this.formItem.extentType = obj.delegate_type;
      				this.formItem.startDate = moment(obj.date_start.toString(), 'YYYYMMDD').format('YYYY-MM-DD');
      				this.formItem.endDate = moment(obj.date_end.toString(), 'YYYYMMDD').format('YYYY-MM-DD');
      				this.formItem.processId = obj.proc_def_id;
      				this.formItem.thingNameId = obj.proc_inst_id;
      			}
      		}
      	})
      	
      },
      sergetThing(data){						// 获取事物方式
      	this.$get(this.GLOBAL.API_QUESTRUNNING_LIST,{pageSize: 10, title:data}).then(res=>{						// 获取所有的事物方式
//	       		console.log('事物方式' + JSON.stringify(res))
	            if(res.data.success){
	            	this.thingType = res.data.data.result;
//	            	localStorage.setItem('tcmThing', JSON.stringify(this.thingType));
	            }      
            
       	})
      },
      changeThing(query){				// 事物名搜索方式发生改变
      	this.serch.serThing = query;
//    	console.log('搜索框事件改变' + query);
      	this.sergetThing(query);
      },
      

    }
}

