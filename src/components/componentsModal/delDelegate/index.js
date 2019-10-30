export default {
    data(){
        return{
          parentData:{},
          modalflag:false,
          formflag:true,
          loading:false,
        }
    },
    methods:{
        getdeleteModal(data){      // 进入删除页面
            this.modalflag=true;
            this.parentData = data;
            console.log('ID' + data.sard_id);
        },
        confirm(){					// 点击确认删除
          this.loading=true;
            let url=this.parentData.url;
            let params={
                sard_id: this.parentData.sard_id
            }
              this.$post(url,params).then(res=>{
                this.loading=false;
                if(res.data.success){
                    this.$Message.success('收回权限成功');
                    this.$emit('changpage');
                    this.modalflag=false;
                }
             }).catch(()=>{ this.loading=false })  
            
        },
        Close(){
            this.modalflag=false;
        },
	}
}