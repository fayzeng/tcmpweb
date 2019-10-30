<style lang="less">
  //  @import "index.less";
</style>
<template>
    <div>
      <Card>
      
       <itable attribute='seeprocess'></itable>
      </Card>
    </div>
</template>
<script>
import itable from '@/components/Table/index.vue'
export default {
    components:{
        itable
    },
    data(){
      return {
        queryForm:{
            model1: '',
            model2: '',
            select:'',
        },
        ruleCustom:{},
      }
    },
    methods:{
    },
    created(){
  
    }
  
}
</script>
