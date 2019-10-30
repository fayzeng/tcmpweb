<template>
  <div v-if='isShow'>
    <Modal title="权限设置" v-model="isShow"  >
        <div slot="footer" class="buttoncenter" >
            <Button   size='small' @click="cancel">取消</Button>
            <Button type="success" size='small' :loading="loading" @click="ok">保存</Button>
        </div>
        <Tree :data="data2"  ref="tree"  @on-check-change='checktree' check-strictly  multiple show-checkbox   ></Tree>
    </Modal>
  </div>
</template>
<script>
export default {
    data(){
        return {
            data2:[],
            isShow:false,
            roleId:'',
            userId:'',
            loading:false,
        }
    },
    methods:{
        checkedchang(status,item){
            if(item.children && item.children.length ){
                item.children.forEach(ele=>{
                  ele.checked =status
                  if(ele.children && ele.children.length){
                      this.checkedchang(status,ele)
                  }
                })
            }
        },
        checktree(arr,item){
            this.checkedchang(item.checked,item)
        },
        showModal(id){
            this.data2 =[]
            let obj='';
            if(id){
               obj = JSON.parse(JSON.stringify(this.$store.state.tableselect.selectdata[0]));
               this.userId = obj.userId
            }else{
               obj = JSON.parse(JSON.stringify(this.$store.state.tableselect.selectdata[0]));
               this.roleId = obj.roleId
            }
            this.getAuth()
            this.isShow = true

        },
        async getAuth(){
            const url = this.GLOBAL.API_ROLE_GETAUTHTREE
            let res='';
            if(this.userId){
               res = await this.$get(url,{userId:this.userId})
            }else{
               res = await this.$get(url,{roleId:this.roleId})
            }
            if (res.status==200) {
                const ret = res.data

                if (ret.success) {
                      let data = JSON.stringify(ret.data).replace(/name/g,'title').replace(/actions/g,'children').replace(/actionName/g,'title')
                      this.data2 = JSON.parse(data)
                }
            }
        },
        cancel(){
            this.isShow = false
        },
        ok(){ //保存
            const menuIds = []
            const actionIds = []
            let treecheckarr =this.$refs.tree.getCheckedNodes()
            console.log(treecheckarr);
            treecheckarr.forEach(ele=>{
              if(ele.actionId){
                  actionIds.push(ele.actionId)
              }else if(ele.actionId==0 ){
                  actionIds.push(0)
              }else if(ele.id){
                  menuIds.push(ele.id)
              }
            })
            let param = {}
            let url = ''
            if (this.userId) {
                param = {
                    userId: this.userId,
                    menuIds:  menuIds.length ?  menuIds.join(',') : 'null',
                    actionIds: actionIds.length ?  actionIds.join(',') : 'null',
                }
                url = this.GLOBAL.API_USER_SETAUTH_BATCH    // 给用户批量设置权限
            } else {
                param = {
                    roleId: this.roleId,
                    menuIds:  menuIds.length ?  menuIds.join(',') : 'null',
                    actionIds: actionIds.length ?  actionIds.join(',') : 'null',
                }
                url = this.GLOBAL.API_ROLE_SETAUTH_BATCH    // 给角色批量设置权限
            }
            this.loading = true;
            this.$post(url,param).then(res => {
                this.loading=false
                if (res.status==200) {
                    const ret = res.data
                    if (ret.success) {
                        this.$Message.success('配置成功')
                    } else {
                    }
                }
            }).catch(()=>{ this.loading=false })
        }
    }
}
</script>
