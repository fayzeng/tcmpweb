<template>
    <div v-if="isShow">
      <Modal :title="title" v-model="isShow"   >
          <div slot="footer" class="buttoncenter">
              <Button  size='small' @click="cancel">取消</Button>
              <Button type="warning"  class="resetbutton" @click="reset">重置</Button>
              <Button type="success" size='small' :loading='loading' @click="ok">保存</Button>
          </div>
          <Form  ref="formValidate" :model="param" :label-width="80" :rules="ruleValidate">
              <FormItem label="常用语" prop="content">
                 <Input type="textarea" style="width: 300px" v-model="param.content" />
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
            loading:false,
            param:{
                content:'',
            },
            ruleValidate:{
                content:[{required: true, message: '常用语不能为空', trigger: 'blur'}],
            },
            title:'新增',
            roleId:'',
            type:'',   //type==1时为修改，为空时为新增
        }
    },
    methods:{
        reset(){
            this.param={
                  content:'',
              }
        },
        showModal(type){

            if (type) { //修改
                this.title = '修改常用语信息'
                this.type = 1
                if (!this.$store.state.tableselect.selectdata || !this.$store.state.tableselect.selectdata[0]) {
                    this.$Message.error('请选择一个常用语')
                    return
                }
                if (this.$store.state.tableselect.selectdata.length>1) {
                    this.$Message.error('仅能选择一个常用语')
                    return
                }

                let obj = JSON.parse(JSON.stringify(this.$store.state.tableselect.selectdata[0]));
                this.isShow = true

                this.getData(obj.tcw_id)
            } else {
                this.isShow = true

                this.title = '新增常用语'
                this.type = ''
                this.param ={content :''}
            }

        },
        getData(tcw_id){
            const url = this.GLOBAL.API_COMMONWORD_FINDBYID
            this.$get(url,{tcw_id}).then(res=>{
                if(res.status == 200){
                    const ret = res.data
                    if (ret.success) {
                        const obj = ret.data
                        this.param = {
                            tcw_id : obj.tcw_id,
                            content: obj.content
                        }
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
            const url = !this.type ? this.GLOBAL.API_COMMONWORD_ADD : this.GLOBAL.API_COMMONWORD_UPDATE
            this.loading=true;
            this.$post(url,this.param).then(res=>{
                this.loading=false;
                if(res.status == 200){
                    const ret = res.data
                    if (ret.success) {
                        this.isShow = false
                        this.$Message.success(this.type ? '修改成功' : '新增成功');
                        this.$emit('changpage')
                    } else {
                    }
                }
            }).catch(()=>{ this.loading=false })
        },
        cancel(){
            this.isShow = false
        }
    },
    created(){

    }

}
</script>
