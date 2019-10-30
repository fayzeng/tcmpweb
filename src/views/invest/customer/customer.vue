<template>
    <div>
        <Card :bordered="false">
            <itable attribute='customer' ></itable>
        </Card>
    </div>
</template>
<script>
import itable from '@/components/Table/index.vue'

export default {
    name:'customer',
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
