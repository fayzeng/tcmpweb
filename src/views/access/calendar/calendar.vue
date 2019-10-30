<template>
    <div>
        <Card :bordered="false">
            <itable attribute='calendar' ></itable>
        </Card>
    </div>
</template>
<script>
import itable from '@/components/Table/index.vue'

export default {
    name:'calendar',
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
