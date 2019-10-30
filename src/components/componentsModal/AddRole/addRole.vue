<template>
    <div  v-if='isShow'>
      <Modal :title="title" v-model="isShow"   >
          <div class="buttoncenter" slot="footer">
              <Button   size='small' @click="cancel">取消</Button>
              <Button type="warning" size='small' @click="Reset">重置</Button>
              <Button type="success" size='small' :loading='loading' @click="ok">保存</Button>
          </div>
          <Form  ref="formValidate" :model="param" :label-width="80" :rules="ruleValidate">
              <FormItem label="角色名称" prop="roleName">
                 <Input style="width: 300px" v-model="param.roleName" />
              </FormItem>
              <FormItem label="角色描述" prop="roleInfo">
                 <Input style="width: 300px" v-model="param.roleInfo" />
              </FormItem>
              <!-- <FormItem label="欢迎界面" prop="welcomePage">
                 <Input style="width: 300px" v-model="param.welcomePage" />
              </FormItem> -->
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
                roleName:'',
                roleInfo:'',
                roleId:'',
                welcomePage:'',
            },
            ruleValidate:{
                roleName:[{required: true, message: ' ', trigger: 'blur'}],
                roleInfo:[{required: true, message: ' ', trigger: 'blur'}],
                welcomePage:[],
            },
            title:'新增角色',
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
                    } else {
                    }
                }
            })

        },
        ok(){
            if(!this.param.roleName){
                this.$Message.error('请填写角色名称')
            }else if(!this.param.roleInfo){
                this.$Message.error('请填写角色描述')
            }else{
                        this.postdata()
            }
        },
        postdata(){
            const url = !this.type ? this.GLOBAL.API_ROLE_ADD : this.GLOBAL.API_ROLE_UPDATE
            const param = {roleName:this.param.roleName,roleInfo:this.param.roleInfo,welcomePage:this.param.welcomePage}
            if (this.type)  param.roleId = this.param.roleId
            if (!param.roleName || !param.roleInfo) {
                this.$Message.warning('请填写角色名称和角色描述')
                return;
            }
            this.loading=true;
            this.$post(url,param).then(res=>{
                this.loading=false
                if(res.status == 200){
                    const ret = res.data
                    if (ret.success) {
                        this.isShow = false
                        this.$Message.success(this.type ? '修改成功' : '新增成功');
                        this.$emit('changpage')
                    } else {
                    }
                }
            }).catch(()=>{ this.loading=false });
        },
        Reset(){
             this.param.roleName = '';
             this.param.roleInfo = '';
        },
        cancel(){
            this.isShow = false
        }
    },
    created(){

    }

}
</script>
