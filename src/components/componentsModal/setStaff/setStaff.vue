<template>
    <div v-if='isShow'>
      <Modal title="员工角色管理"  width="760" v-model="isShow" >
          <div>
              <Transfer
              :list-style="{ width:'300px',height:'500px'}"
              :titles="['未选角色','已选角色']"
              :data="sourceData"
              :target-keys="targetKeys"
              :render-format="renderItem"
              @on-change="handleChange"
              :filter-method="filterMethod"
              filterable
              ></Transfer>
          </div>
           <div slot="footer">
          </div>
      </Modal>
    </div>
</template>
<script>
export default {
    data(){
        return {
            isShow:false,
            sourceData: [
            ],
            targetKeys:[],
            roleId:''
        }
    },
    methods:{
        showModal(){
            if (!this.$store.state.tableselect.selectdata || !this.$store.state.tableselect.selectdata[0]) {
                this.$Message.error('请选择一个角色')
                return
            }
            if (this.$store.state.tableselect.selectdata.length>1) {
                this.$Message.error('仅能选择一个角色')
                return
            }
            let role = JSON.parse(JSON.stringify(this.$store.state.tableselect.selectdata[0]));
            this.roleId = role.roleId;
            this.getUsers(role.roleId)
            this.isShow = true
        },
        async getUsers(roleId){
            const url = this.GLOBAL.API_ROLE_USERLIST
            let param={isThisRole:1,roleId}
            //获取当前角色下的用户
            let res = await this.$get(url,param)
            let selected = []
            if (res.status == 200) {
                const ret=res.data
                if (ret.success) {
                    selected = ret.data
                } else {
                    console.log(ret.message)
                }
            }
            param = {roleId}
            let alluser = []
            //获取全部用户
            res = await this.$get(url,param)
            if (res.status == 200) {
                const ret=res.data
                if (ret.success) {
                    alluser = ret.data
                } else {
                    console.log(ret.message)
                }
            }
            alluser.map((item,index) => item.key = item.userId)
            this.sourceData = alluser
            this.targetKeys = selected.map(item => item.userId)
        },
        renderItem(item) {
            return item.name;
        },
        handleChange (newTargetKeys,direction,moveKeys) {
            console.log(newTargetKeys,direction,moveKeys)
            const param = {
                roleId:this.roleId,
                userIds: moveKeys.join(',')
            }
            if (direction==='left') {
                param.isThisRole = 1   //把用户退出该角色
            } else {
                param.isThisRole = 0    //把用户加入该角色
            }
            const url = this.GLOBAL.API_ROLE_SETSTAFF
            this.$post(url,param).then(res=>{
                if (res.status==200) {
                    const ret = res.data
                    if (ret.success) {
                        this.$Message.success('分配成功')
                        this.targetKeys = newTargetKeys;
                    } else {
                    }
                }
            })
        },
        filterMethod (data, query) {
            return data.name.indexOf(query) > -1;
        },
    }

}
</script>
