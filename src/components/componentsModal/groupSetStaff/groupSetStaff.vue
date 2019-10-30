<template>
    <div v-if='isShow'>
      <Modal title="群组用户设置" v-model="isShow"   >
          <div slot="footer">
          </div>
          <div>
              <Transfer
              :list-style="{ width:'200px',height:'500px'}"
              :data="sourceData"
              :target-keys="targetKeys"
              @on-change="handleChange"
              filterable
              ></Transfer>
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
            teamCode:''
        }
    },
    methods:{
        showModal(){
            if (!this.$store.state.tableselect.selectdata || !this.$store.state.tableselect.selectdata[0]) {
                this.$Message.error('请选择一个群组')
                return
            }
            if (this.$store.state.tableselect.selectdata.length>1) {
                this.$Message.error('仅能选择一个群组')
                return
            }
            let group = JSON.parse(JSON.stringify(this.$store.state.tableselect.selectdata[0]));
            this.teamCode = group.teamCode;
            this.getUsers(group.teamCode)
            this.isShow = true
        },
        async getUsers(teamCode){
            // const url = this.GLOBAL.API_ROLE_USERLIST
            const url ='tcmp/manage/team-manage!toSetUsersByTeam.action'

            let param={teamCode}
            //获取当前群组下的用户
            let res = await this.$get(url,param)
            if (res.status == 200) {
                const ret=res.data
                let arr =[]
                let selected =[]
                if (ret.success) {
                    ret.data.allUsers.forEach(ele=>{
                        if(ele.userId && ele.name ){
                          arr.push({key:ele.userId,label: ele.name})
                        }
                    })
                    ret.data.users.forEach(ele=>{
                        if(ele.userId && ele.name ){
                          selected.push(ele.userId)
                        }
                    })
                    this.sourceData =arr
                    this.targetKeys = selected
                }
            }
            // alluser.map((item,index) => {item.key = item.userId item.label = item.name} )
            // this.targetKeys = selected.map(item => item.userId)
        },
        handleChange (newTargetKeys,direction,moveKeys) {
            console.log(newTargetKeys,direction,moveKeys)
            const param = {
                teamCode:this.teamCode,
                userIds: moveKeys.join(',')
            }
            if (direction==='left') {
                param.flag = 1   //把用户退出该群组
            } else {
                param.flag = 0    //把用户加入该群组
            }
            const url = 'tcmp/manage/team-manage!setUsersByTeam.action'
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
    }
}
</script>
