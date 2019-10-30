<style scoped>
.mynotice{
    height: 360px;
    margin-bottom: 12px;
    margin-right: 13px;
}
.titlesty{
     font-weight:bold;
     font-size:18px;
     color:cornflowerblue
}
.steps{
    height: 280px;
    overflow-y: auto;
    color:#666666!important;
}
.mynotice.steps.el-step__description.is-wait{
    color:black!important;
}
.noticeinfo{
  margin-bottom: 28px;
  height: 46px;
  overflow:hidden;
}
</style>
<template>
    <div>
        <Card class="mynotice" >
            <div slot="title" >
                <svg t="1563505420621" class="icon" viewBox="0 0 1024 1024"  style="height:18px;width:20px;" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9468" width="200" height="200"><path d="M922.0096 525.9264h-97.28c-5.5296 0-10.8544-2.2528-14.7456-6.144-3.8912-3.8912-6.144-9.216-6.144-14.7456v-13.9264c0-11.4688 9.216-20.8896 20.8896-20.8896h97.28c11.4688 0 20.8896 9.4208 20.8896 20.8896v13.9264c0 11.4688-9.4208 20.8896-20.8896 20.8896z m-76.8-214.4256c-4.7104 2.8672-10.4448 3.6864-15.9744 2.048-5.3248-1.4336-9.8304-5.12-12.4928-9.8304l-6.9632-12.288c-5.7344-10.24-2.4576-23.1424 7.5776-29.2864l84.3776-49.9712c4.7104-2.8672 10.4448-3.6864 15.9744-2.048 5.3248 1.4336 9.8304 5.12 12.4928 10.0352l6.9632 12.288c5.7344 10.24 2.4576 23.1424-7.5776 29.2864l-84.3776 49.7664z m-201.1136 561.9712h-13.9264c-3.2768 0-6.3488-0.8192-9.216-2.4576-0.8192 0-1.6384 0.2048-2.4576-0.2048L331.1616 706.56H150.528c-38.2976 0-69.4272-31.1296-69.4272-69.4272V386.8672c0-38.5024 31.1296-69.4272 69.4272-69.4272h180.6336L618.496 153.1904c0.6144-0.4096 1.6384-0.2048 2.4576-0.2048 2.8672-1.4336 5.9392-2.2528 9.216-2.4576h13.9264c11.4688 0 20.8896 9.4208 20.8896 20.8896v681.1648c0 11.4688-9.4208 20.8896-20.8896 20.8896z m-34.816-651.264l-74.1376 42.3936h-0.2048l-190.0544 108.544h-194.56c-7.5776 0-13.9264 6.144-13.9264 13.9264v250.2656c0 7.7824 6.144 13.9264 13.9264 13.9264h194.56l190.0544 108.544h0.2048l74.1376 42.3936V222.208z m207.4624 470.4256c2.6624-4.9152 7.168-8.3968 12.4928-10.0352 5.3248-1.4336 11.0592-0.6144 15.9744 2.048l84.3776 49.9712c10.0352 5.9392 13.312 19.0464 7.5776 29.2864l-6.9632 12.288c-2.6624 4.9152-7.168 8.3968-12.4928 10.0352-5.3248 1.4336-11.0592 0.6144-15.9744-2.048l-84.3776-49.9712c-10.0352-6.144-13.312-19.0464-7.5776-29.2864l6.9632-12.288z m0 0" fill="#03A9F4" p-id="9469"></path></svg>
                <span class="titlesty">公告通知</span>
                <a><Icon type="md-refresh" size='40px' style="float: right; padding: 0 0" @click.native='getnotice'></Icon></a>
            </div>
            <div class="steps">
                <!-- <Steps direction="vertical"  :space="200"  finish-status="success" > -->
                <a style="color:#666666;"  v-for="(item,index) in noticeList"  @click='seenotice(item.sn_id)'><div  class="noticeinfo" >
                    <h3 style="color:red">{{item.title}}</h3>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.content}}</p>
                </div></a>
                    <!-- <Step v-for="(item,index) in noticeList" :key="index"  :title=""  :content="item.content"></Step> -->
                <!-- </Steps> -->
            </div>
        </Card>
    </div>
</template>
<script>
export default {
    data(){
        return{
          noticeList:[]
        }
    },
    methods:{
       seenotice(id){
         this.$router.push({name: 'seenotice',query:{id:id}})
       },
       getnotice(){
           let params ={
              pageSize: 1000,
              pageNo: 1
           }
           this.$get(this.GLOBAL.API_NOTICE_LIST,params).then(res=>{
               if(res.data.success){
                 this.noticeList =res.data.data.result
               }
           })
       }
    },
    created(){
      this.getnotice()
    }
}
</script>
