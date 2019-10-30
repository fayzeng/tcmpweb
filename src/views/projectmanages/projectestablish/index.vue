<template>
    <div>
      <Card :bordered='false'>
        <itable attribute='projectestablish'></itable>
      </Card>
    </div>
</template>
<script>
import itable from '@/components/Table/index.vue'
export default {
    name:'projectestablish',
    data(){
        return{

        }
    },
     components:{
        itable
    },
}
</script>