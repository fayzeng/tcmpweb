<template>
    <div>
        <Card :bordered="false">
            <itable attribute='pledge' ></itable>
        </Card>
    </div>
</template>
<script>
import itable from '@/components/Table/index.vue'

export default {
    name:'pledge',
    components:{
        itable,
    },
    data(){
        return {
        }
    },
    methods:{
    },
    created(){

    }

}
</script>
