<template>
    <div  v-if='isShow'>
      <Modal :title="title" v-model="isShow"   >
          <div slot="footer">
              <Button   size='small' @click="cancel">取消</Button>
              <Button type="primary" size='small' @click="ok">保存</Button>
          </div>
          <Form  ref="formValidate" :model="param" :label-width="80" :rules="ruleValidate">
              <FormItem label="股东名称" prop="roleName">
                 <Input style="width: 300px" v-model="param.roleName" />
              </FormItem>
              <FormItem label="股东类型" prop="roleInfo">
                 <Input style="width: 300px" v-model="param.roleInfo" />
              </FormItem>
              <FormItem label="关联关系" prop="roleInfo">
                 <Input style="width: 300px" v-model="param.roleInfo" />
              </FormItem>
              <FormItem label="证件类型" prop="roleInfo">
                 <Input style="width: 300px" v-model="param.roleInfo" />
              </FormItem>
              <FormItem label="证件号码" prop="roleInfo">
                 <Input style="width: 300px" v-model="param.roleInfo" />
              </FormItem>
              <FormItem label="持股比例" prop="roleInfo">
                 <Input style="width: 300px" v-model="param.roleInfo" />
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
                relation_type:'1', //1、股东 2、高管 3、关联企业
                roleName:'',
                roleInfo:'',
                roleId:'',
                welcomePage:'',
            },
            ruleValidate:{
                roleName:[{required: true, message: '角色名称不能为空', trigger: 'blur'}],
                roleInfo:[{required: true, message: '角色描述不能为空', trigger: 'blur'}],
                welcomePage:[],
            },
            title:'新增角色',
            loading:true,
            roleId:'',
            type:'',   //type==1时为修改，为空时为新增
        }
    },
    methods:{
        showModal(type){

            if (type) { //修改
                this.title = '修改角色信息'
                this.type = 1
                if (!this.$store.state.tableselect.selectdata || !this.$store.state.tableselect.selectdata[0]) {
                    this.$Message.error('请选择一个角色')
                    return
                }
                if (this.$store.state.tableselect.selectdata.length>1) {
                    this.$Message.error('仅能选择一个角色')
                    return
                }

                let role = JSON.parse(JSON.stringify(this.$store.state.tableselect.selectdata[0]));
                this.isShow = true
                 
                this.getData(role.roleId)
            } else {
                this.isShow = true
                 
                this.title = '新增角色'
                this.type = ''
                this.param.roleName = ''
                this.param.roleInfo = ''
                this.param.roleId = ''
                this.param.welcomePage = ''
            }

        },
        getData(roleId){

            const url = this.GLOBAL.API_ROLE_QUERYBYID
            this.$get(url,{roleId}).then(res=>{
                if(res.status == 200){
                    const ret = res.data
                    if (ret.success) {
                        const role = ret.data
                        this.param.roleName = role.roleName
                        this.param.roleInfo = role.roleInfo
                        this.param.welcomePage = role.welcomePage
                        this.param.roleId = roleId
                        console.log(this.param)
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
            const url = !this.type ? this.GLOBAL.API_ROLE_ADD : this.GLOBAL.API_ROLE_UPDATE
            const param = {roleName:this.param.roleName,roleInfo:this.param.roleInfo,welcomePage:this.param.welcomePage}
            if (this.type)  param.roleId = this.param.roleId
            if (!param.roleName || !param.roleInfo) {
                this.$Message.warning('请填写角色名称和角色描述')
                return;
            }
            this.$post(url,param).then(res=>{
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
