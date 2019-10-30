export default {
    data(){
        return{
          parentData:{},
          modalflag:false,
          userData: [
          ],
          targetKeys:[],
        }
    },
    methods:{
        getsetUser(data){
            this.modalflag=true;  
            let params={
                [data.parameterName]:data.parameter
            } 
            this.$post(data.url,params).then(res=>{
                if(res.data.success){
                    this.userData=JSON.parse(JSON.stringify(res.data.data.allRoles).replace(/roleId/g,"key"));
                    let arr=[]
                    res.data.data.userRoles.map((item,ind)=>{
                        arr.push(item.roleId)
                    })
                    this.targetKeys=arr;
                }
              })              
        },
        renderItem(item) {
            return item.roleName;
        },
        handleChange (newTargetKeys,direction, moveKeys) {
            this.targetKeys = newTargetKeys;
            let params={
                userId:this.$store.state.tableselect.selectdata[0].userId
            }
            if(direction=='left'){
                params.isThisUser='1'
                params.roleIds=moveKeys.join(',')
            }else if(direction=='right'){
                params.isThisUser='0'
                params.roleIds=this.targetKeys.join(',')
            }
            this.$post(this.GLOBAL.API_SETROLE_USER,params).then(res=>{
                if(res.data.success){
                    this.$Message.success('保存成功');
                }
              }) 
        },
        filterMethod (data, query) {
            return data.roleName.indexOf(query) > -1;
        }
}
}