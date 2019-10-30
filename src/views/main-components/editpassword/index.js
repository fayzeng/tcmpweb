import md5 from 'js-md5';
export default {
    components:{
    },
    data(){
      const validatePassCheck = (rule, value, callback) => {
           if (!value) {
               callback(new Error(' '));
           } else if (value != this.Modalform.newPwd) {
               this.$Message.error('两次密码不一致')
           } else {
               callback();
           }
       };
      return {
        modalflag:false,
        Modalform:{newPwd:'',oldPwd:'',surePwd:''},
        ModalRule:{
            newPwd:{ required: true, message: ' ', trigger: 'blur' },
            oldPwd:{ required: true, message: ' ', trigger: 'blur' },
            surePwd:{  required: true, validator: validatePassCheck, trigger: 'blur' },
          }
      }
    },
    methods:{
        geteditpassword(){
            this.modalflag=true;
            this.Modalform={newPwd:'',oldPwd:'',surePwd:''}
        },
        confirm(){
            let params={
                newPwd:md5(this.Modalform.newPwd),
                oldPwd:md5(this.Modalform.oldPwd),
                token:sessionStorage.getItem('cookieaccess_token')
            }
            if(!this.Modalform.oldPwd){
                this.$Message.error('请输入原密码')
            }else if(!this.Modalform.newPwd){
                this.$Message.error('请输入新密码')
            }else if(!this.Modalform.surePwd){
                this.$Message.error('请输入确认密码')
            }else{
                if(this.Modalform.newPwd==this.Modalform.surePwd){
                 this.$post(this.GLOBAL.API_RESETPWD,params).then(res=>{
                    if(res.data.success){
                        this.modalflag=false;
                        sessionStorage.removeItem('cookieaccess_token')
                        this.$router.push({
                            name: name
                        });
                    }
                 })    
                }
                 
            }
                    

        },
        Close(){
            this.modalflag=false;
        },
    },
    created(){
    }
  }
