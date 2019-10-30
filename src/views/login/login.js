import md5 from 'js-md5';
import { stringify } from 'querystring';

export default {
  name: 'login',
  data(){
    return {
      msg: "业务综合管理系统",
      arr: [],
      formItem: {
        userName: "",
        password: "",
        code: "",
        urlcodeimg: "",
        token: '',
        client: null
      },
      modal1: false,
      rules: {
        userName: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],
        aaa: ''
      },
      loading2: false,
      clear1: ''
    };
  },
  beforeDestroy(){
    clearTimeout(this.clear1)
  },
  methods: {
    checkinput( e ){
      this.formItem.code = e.replace(/[^0-9-]+/, '')
    },
    // 登录
    handleSubmit(){
      let url = this.GLOBAL.API_LOGIN;
      let md5_password = md5(this.formItem.password);
      let params = {
        userName: this.formItem.userName,
        password: md5_password//md5_password
      };
      if (!params.userName) {
        this.$Message.error("请填写用户名称")
        this.$refs.userName.focus()
      } else if (!this.formItem.password) {

        this.$refs.pass.focus()
      } else {
        this.loading2 = true
        this.$post(url,params).then(res=>{
            if(res.data.success){
                sessionStorage.setItem('cookieaccess_token', res.data.data.token);
                sessionStorage.setItem('menus',JSON.stringify(res.data.data.menus.children))
                sessionStorage.setItem('user',this.formItem.userName)
                sessionStorage.setItem('userid',res.data.data.userid)
                sessionStorage.setItem('name',res.data.data.name)
                sessionStorage.setItem('isFirst',res.data.data.isFirst)
                this.$store.commit('clearAllTags');
                this.$router.push({name:'home_index'})
                this.loading2 = false
            }else{
              this.loading2 = false
            }
        }).catch(err=>{
          this.loading2 = false
        }
        )
      }
    },
    //忘记密码
    passwordrecovery(){
      this.$router.push({
        name: "passwordrecovery"
      })
    }
  }
}
