<template>
    <div>
        <Card  :bordered="false">
            <itable attribute='notice'></itable>
        </Card>
    </div>
</template>
<script>
import itable from '@/components/Table/index.vue'
export default {
    name:'noticelist',
    components:{
        itable,
    },
    data () {
        return {
        }
    },
    methods: {
    },
    created(){
    }
};
</script>
