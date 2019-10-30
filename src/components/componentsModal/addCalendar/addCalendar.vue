<template>
    <div v-if='isShow'>
      <Modal :title="title" v-model="isShow"   >
          <div slot="footer">
              <Button   size='small' @click="cancel">取消</Button>
              <Button type="primary" size='small' @click="ok">保存</Button>
          </div>
          <Form  ref="formValidate" :model="param" :label-width="80" :rules="ruleValidate">
              <FormItem label="标题" prop="title">
                 <Input style="width: 300px" v-model="param.title" />
              </FormItem>
              <FormItem label="内容正文" prop="content">
                 <Input style="width: 300px" v-model="param.content" />
              </FormItem>
              <FormItem label="类型" prop="type">
                 <Select style="width: 300px" v-model="param.type" >
                     <Option value="0" >到期的项目</Option>
                     <Option value="1" >要提交的报告</Option>
                 </Select>
              </FormItem>
              <FormItem label="被提醒人ID" prop="receive_man">
                 <Select style="width: 300px" v-model="param.receive_man" >
                     <Option value="" >全部</Option>
                     <Option v-for="item in userList" :value="item.userId" :key="item.userId" >{{item.name}}</Option>
                 </Select>
              </FormItem>
              <FormItem label="提醒日期" prop="warn_date">
                 <DatePicker type="date" style="width: 300px" v-model="param.warn_date" />
              </FormItem>
              <FormItem label="重复提醒多少天" prop="warn_day_count">
                 <Input style="width: 300px" v-model="param.warn_day_count" />
              </FormItem>

          </Form>
      </Modal>
    </div>
</template>
<script>
export default {
    data(){
        return {
            isShow:false,
            param:{
                title:'',
                content:'',
                type:'',
                receive_man:'',
                warn_date:'',
                warn_day_count: '1',
            },
            ruleValidate:{
                title:[{required: true, message: '标题不能为空', trigger: 'blur'}],
                content:[{required: true, message: '提醒内容不能为空', trigger: 'blur'}],
                type:[{required: true, message: '类型不能为空', trigger: 'blur'}],
                warn_day_count:[{required: true, message: '重复天数不能为空'}],
            },
            title:'新增',
            loading:true,
            sw_id:'',
            userList:[],
            type:'',   //type==1时为修改，为空时为新增
        }
    },
    methods:{
        showModal(type){
            console.log(this.$refs)

            if (type) { //修改
                this.title = '修改日历提醒信息'
                this.type = 1
                if (!this.$store.state.tableselect.selectdata || !this.$store.state.tableselect.selectdata[0]) {
                    this.$Message.error('请选择一项')
                    return
                }
                if (this.$store.state.tableselect.selectdata.length>1) {
                    this.$Message.error('仅能选择一项')
                    return
                }

                let obj = JSON.parse(JSON.stringify(this.$store.state.tableselect.selectdata[0]));
                this.isShow = true
                this.getData(obj.sw_id)
            } else {
                this.isShow = true
                this.title = '新增日历提醒'
                this.type = ''
                this.param = {
                    title:'',
                    content:'',
                    type:'',
                    receive_man:'',
                    warn_date:'',
                    warn_day_count:1,
                }
            }
            this.getUsers()


        },
        getUsers(){   //获取被提醒人list
            const url = this.GLOBAL.API_USERLIST
            this.userList = []
            this.$get(url,{pageSize:1000}).then(res=>{
                if(res.status == 200){
                    const ret = res.data
                    if (ret.success) {
                        const list = ret.data.result.map(item => {
                            item.userId = item.userId.toString()
                            return item
                        })
                        this.userList = list
                        this.param = {...this.param}
                    }
                }
            })
        },
        getData(sw_id){
            const url = this.GLOBAL.API_CALENDAR_FINDBYID
            this.$post(url,{sw_id}).then(res=>{
                if(res.status == 200){
                    const ret = res.data
                    if (ret.success) {
                        const obj = ret.data
                        // this.param.sw_id = obj.sw_id
                        this.sw_id = obj.sw_id
                        this.param.title = obj.title
                        this.param.content = obj.content
                        this.param.type = obj.type
                        this.param.receive_man = obj.receive_man
                        this.param.warn_date = obj.warn_date
                        this.param.warn_day_count = obj.warn_day_count

                    } else {
                    }
                }
            })

        },
        ok(){
            this.$refs['formValidate'].validate((valid) => {
                if (valid) {
                    this.postdata()
                } else {
                }
            })
        },
        postdata(){
            const url = !this.type ? this.GLOBAL.API_CALENDAR_ADD : this.GLOBAL.API_CALENDAR_UPDATE
            const params = {
                ...this.param
            }
            if (this.type) {
                params.sw_id = this.sw_id
            }
            this.$post(url,params).then(res=>{
                if(res.status == 200){
                    const ret = res.data
                    if (ret.success) {
                        this.isShow = false
                        this.$Message.success(this.type ? '修改成功' : '新增成功');
                        this.$emit('changpage')
                    } else {
                    }
                }
            })
        },
        cancel(){
            this.isShow = false
        }
    },
    created(){

    }

}
</script>
