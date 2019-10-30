<style scoped>
  .infotitle{
    text-align: center;
    color: red;
  }
  .infocontent{
    margin-top:20px;
  }
  .input_man_name{
    float: right;
    padding-right: 100px;
    margin-top:60px
  }
  .input_time{
      float: right;
      padding-right: 30px;
      margin-top:20px
  }
</style>
<template>
    <Card>
          <Row class="infotitle"><h2>{{info.title}}</h2></Row>
          <Row class="infocontent">
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{info.content}}</div>
          </Row>
          <Row>
              <div class="input_man_name">{{info.input_man_name}}</div>
          </Row>
          <Row>
              <div class="input_time">{{info.input_time}}</div>
          </Row>
    </Card>
</template>
<script>
  export default {
      data(){
        return{
          info:{title:'',content:'',input_time:'',input_man_name:''}
        }
      },
      methods:{
          getnoticeinfo(){
            this.$post(this.GLOBAL.API_NOTICE_FINDBYID,{sn_id:this.$route.query.id}).then(res=>{
                if(res.data.success){
                    this.info = res.data.data
                }
            })
          }
      },
      created(){
          this.getnoticeinfo()
      }
  }
</script>

<style lang="css" scoped>
</style>
