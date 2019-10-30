<template>
    <div v-if='isShow'>
      <Modal title="关于系统" v-model="isShow" :footer-hide="true" height="300">
          <div class="about-system">
              <div class="title">让金融变简单</div>
                  <div class="content">
                      <div>程序版本: <span >业务综合管理系统</span> <span class="vesionsize"> _V1.0</span></div>
                      <div>浏览器支持: <span >谷歌浏览器</span> <span >360浏览器</span> <span >ie10以上浏览器</span></div>
                      <div>服务邮箱: <span>sunmeng@bjitic.com</span></div>
                      <div>客服电话: <span>15011448888</span></div>
                  </div>
          </div>
      </Modal>
    </div>
</template>
<script>
export default {
    data(){
        return {
            isShow:false
        }
    },
    methods:{
        showModal(){
            this.isShow = true
        }
    }

}
</script>
