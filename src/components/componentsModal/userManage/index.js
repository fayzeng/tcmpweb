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
        showModal(data){
            this.modalflag=true;  
            let params={
                [data.parameterName]:data.parameter
            } 
            this.$post(data.url,params).then(res=>{
                if(res.data.success){
                    this.userData=JSON.parse(JSON.stringify(res.data.data.allUsers).replace(/userId/g,"key"));
                    let arr=[]
                    res.data.data.users.map((item,ind)=>{
                        arr.push(item.userId)
                    })
                    this.targetKeys=arr;
                }
              })              
        },
        renderItem(item) {
            return item.name;
        },
        handleChange (newTargetKeys,direction, moveKeys) {
            this.targetKeys = newTargetKeys;
            let params={
                gradeId:this.$store.state.tableselect.selectdata[0].gradeId
            }
            if(direction=='left'){
                params.flag='1'
                params.userIds=moveKeys.join(',')
            }else if(direction=='right'){
                params.flag='0'
                params.userIds=this.targetKeys.join(',')
            }
            this.$post(this.GLOBAL.API_USER_MANAGE,params).then(res=>{
                if(res.data.success){
                    this.$Message.success('保存成功');
                }
              }) 
        },
        filterMethod (data, query) {
            return data.name.indexOf(query) > -1;
        }
}
}