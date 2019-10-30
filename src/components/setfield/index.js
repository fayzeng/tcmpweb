// import {guarantee} from '@/libs/tablelistprops.js'
import draggable from 'vuedraggable'
export default {
    components:{
        draggable
    },
    data(){
        return {
            fieldarr:[],
            codelist:[],
            value:'1',
            fieldinfo:{},
            selectarr:[],
            id:'',
            copy_id:[],
            fieldtypearr:[
                {key:'1',value:'单行文本'},
                {key:'2',value:'多行文本'},
                {key:'3',value:'单选'},
                {key:'4',value:'多选'},
                {key:'5',value:'多级联动'},
                {key:'6',value:'整数'},
                {key:'7',value:'小数'},
                {key:'8',value:'金额'},
                {key:'9',value:'日期'},
                // {key:'10',value:'图片'},
                // {key:'11',value:'附件'},
                {key:'12',value:'分割线'},
                {key:'13',value:'电话'},
                {key:'14',value:'邮件'},
                // {key:'15',value:'自动编号'},
                // {key:'16',value:'计算字段'},
                 {key:'17',value:'放大镜选择框'},
                 {key:'18',value:'复选框'},
                 {key:'19',value:'下拉选择'},
                 {key:'20',value:'table表格'},
                 {key:'21',value:'多选框'},
                 {key:'22',value:'复选带文本'},
                 {key:'23',value:'省份城市'},
            ]
        }
    },
    methods:{
        addfield(){//新增字段
            this.retract()
            this.fieldinfo.field_type ='1'
        },
        typeselect(){
            if(this.fieldinfo.field_type == 3 || this.fieldinfo.field_type == 4){
                if(this.fieldinfo.field_id){
                  this.selectarr=[]
                  this.getselectarr()
                }

            }
        },
        deletearr(id,index){
            if(id){
               this.$post(this.GLOBAL.API_DELETETEMP,{list_id:id}).then(res=>{
                        if(res.data.success){
                            this.fieldinfo.library_list.splice(index,1)
                            if(this.fieldinfo.library_list.length==0){
                                this.fieldinfo.library_list.push({field_id:this.fieldinfo.field_id})
                            }
                        }
                    })
             }else{
                    this.fieldinfo.library_list.splice(index,1)
             }
            if(this.fieldinfo.library_list.length==0){
                this.fieldinfo.library_list.push({field_id:this.fieldinfo.field_id})
             }

        },
        addselectarr(index){//新增下拉选项
           // this.selectarr.splice(index+1,0,{field_id:this.fieldinfo.field_id,list_value:'' })
           if(this.fieldinfo.library_list.length<this.codelist.length){
             this.fieldinfo.library_list.push({field_id:this.fieldinfo.field_id})
           }
        },
        savefieldlibrary(){
            this.$post(this.GLOBAL.API_ADDTEMPLIST,this.fieldinfo.library_list).then(res=>{
                if(res.data.success){
                    this.$Message.success('保存成功')
                    this.fieldset(this.fieldinfo.field_id)
                }
            })
        },
        getselectarr(){//获取单选下拉
            this.$get(this.GLOBAL.API_GET_FEILDCODE_LIST,{field_id:this.fieldinfo.field_id}).then(res=>{
                if(res.data.success){
                   this.selectarr = res.data.data
                   if(!this.selectarr.length){
                       this.selectarr.push({field_id:this.fieldinfo.field_id,list_value:'' })
                   }
                }
            })
        },
        fieldset(id){
            this.id=id;
            this.$get(this.GLOBAL.API_GET_FIELD_INFO,{field_id:id}).then(res=>{
                if(res.data.success){
                    this.fieldinfo = res.data.data;
                    if(this.fieldinfo.copy_id){
                         this.fieldinfo.copy_id=this.turnNumber(this.fieldinfo.copy_id)
                    }
                   if(res.data.data.library_list.length==0){
                       res.data.data.library_list.push({conceal_flag:'',library_value:'',operation_id:'',field_id:res.data.data.field_id})
                       console.log(res.data.data.library_list)
                   }else{
                        res.data.data.library_list.map(item=>{
                            item.operation_id=item.operation_id?item.operation_id.split(','):'';
                            item.operation_id=item.operation_id?item.operation_id.map(Number):'';
                        })
                   }
                   // if(this.fieldinfo.parent_id){
                   //  this.fieldinfo.parent_id=this.turnNumber(this.fieldinfo.parent_id)
                   // }
                   if(res.data.data.library_code&&res.data.data.field_type==3){
                        this.$get(this.GLOBAL.API_DIC_GETBYCODE,{codetype:res.data.data.library_code}).then(res=>{
                            if(res.data.success){
                                this.codelist = res.data.data;
                            }
                        })
                   }
                    if(this.fieldinfo.field_type == 3 || this.fieldinfo.field_type == 4){
                        this.selectarr=[]
                        this.getselectarr()
                    }
                }
            })
        },
        turnNumber(data){
            data=data ? data.toString().split(','):'';
            data=data ? data.map(Number):'';
            return data;
        },
        retract(){
            this.fieldinfo = {}
        },
        savefield(){
            if(!this.fieldinfo.template_id){
                this.fieldinfo.template_id = this.$route.query.id
            }
            this.$post(this.GLOBAL.API_SAVE_FIELD,this.fieldinfo).then(res=>{
                if(res.data.success){
                    this.$Message.success('保存成功')
                    this.gettempfieldlist()
                    if(this.fieldinfo.field_type == 3 || this.fieldinfo.field_type == 4 ){  //保存下拉值
                        this.$post(this.GLOBAL.API_SAVE_FEILDCODE,this.selectarr).then(res=>{
                            if(res.data.success){
                                this.$Message.success('保存成功')
                            }
                        })
                    }
                    this.fieldarr.forEach(ele => {
                        if(ele.field_id == this.fieldinfo.field_id){
                            ele.field_name = this.fieldinfo.field_name
                        }
                    });
                }
            })
        },
        deletefield(){
            let params={
                field_id:this.id,
            }
            this.$post(this.GLOBAL.API_DELETE_FIELD,params).then(res=>{
                if(res.data.success){
                    this.$Message.success('删除成功');
                    this.fieldinfo.field_type=''
                    this.gettempfieldlist()
                }
            })
        },
        gettempfieldlist(){
            this.$get(this.GLOBAL.API_GET_TEMP_FIELDLIST,{template_id:this.$route.query.id}).then(res=>{
                if(res.data.success){
                    this.fieldarr = res.data.data
                }
            })
        }
    },
    created(){
      this.gettempfieldlist()
    }
}
