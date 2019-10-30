
export default {
    components:{
    },
    data(){
      return {
        modalflag:false,
        loading:false,
        param:{
          codetype:'',
          description:'',
          dicinfo:[]
        },
        ruleValidate:{
            codetype:[{required: true, message: ' ' , trigger: 'blur'}],
            description:[{required: true, message: ' ', trigger: 'blur'}],
            dicKey:[{required: true, message: ' ', trigger: 'blur'}],
            dicValue:[{required: true, message: ' ', trigger: 'blur'}],
            // orders:[{required: true, message: '排序字段不能为空', trigger: 'blur'}],
        },
        type:'',    //type有值为修改 否则为新增
        title:'新增字典'
      }
    },
    methods:{
        reset(){
          this.param={
            codetype:'',
            description:'',
            dicinfo:[{orders:'',dicKey:'',dicValue:''}]
          }
        },
        addinfo(){
          this.param.dicinfo.push({orders:'',dicKey:'',dicValue:''})
        },
        getNewdictionary(type){
          if (type) { //修改
              this.title = '修改字典信息'
              this.type = 1
              if (!this.$store.state.tableselect.selectdata || !this.$store.state.tableselect.selectdata[0]) {
                  this.$Message.error('请选择一个字典项')
                  return
              }
              if (this.$store.state.tableselect.selectdata.length>1) {
                  this.$Message.error('仅能选择一个字典项')
                  return
              }

              let dic = JSON.parse(JSON.stringify(this.$store.state.tableselect.selectdata[0]));
              this.modalflag=true;
              this.getData(dic.codetype)
          } else {
              this.modalflag=true;
              this.title = '新增字典'
              this.type = ''
              this.param={
                codetype:'',
                description:'',
                dicinfo:[{orders:'',dicKey:'',dicValue:''}]
              }
          }

        },
        async getData(codetype){
            const url = this.GLOBAL.API_DIC_LIST
            const res = await this.$get(url,{codetype:codetype,pageSize: 10000,pageNo: 1})
            if (res.status==200) {
              const ret = res.data;
              if (ret.success) {
                this.param = {
                  // dicId: ret.data.dicId,
                  codetype: ret.data.result[0].codetype,
                  description: ret.data.result[0].description ? ret.data.result[0].description : '' ,
                  dicinfo:ret.data.result
                  // dicKey: ret.data.dicKey,
                  // dicValue: ret.data.dicValue,
                  // orders: ret.data.orders== null ? '' : ret.data.orders.toString()
                }
              } else {
              }
            }
        },
        confirm(){
            if(!this.param.codetype){
                this.$Message.error('请选择字典类型')
            }else if(!this.param.description){
               this.$Message.error('请输入字典描述')
            }else{
              this.postdata()
            }
        },
        postdata(){  //提交数据
          let url = '#'
          let param = {}
          this.loading=true;
          this.param.dicinfo.forEach(ele=>{
              param.codetype = this.param.codetype
              param.description = this.param.description
              if(ele.dicId){
                 url =this.GLOBAL.API_DIC_UPDATE
                 param.dicId = ele.dicId
                 param.orders = ele.orders
                 param.dicKey =ele.dicKey
                 param.dicValue = ele.dicValue
              }else{
                url =this.GLOBAL.API_DIC_ADD
                param.orders = ele.orders
                param.dicKey =ele.dicKey
                param.dicValue = ele.dicValue
              }
              this.$post(url,param).then(res=>{
                this.loading=false;
                if (res.status==200) {
                  const ret = res.data
                    if (ret.success) {
                        // this.modalflag=false;
                        this.$Message.info('保存成功');
                        this.$emit('changpage')
                    } else {
                    }
                }
              }).catch(()=>{ this.loading=false })
          })
        },
        Close(){
            this.modalflag=false;
        },
    },
    created(){
    }
  }
