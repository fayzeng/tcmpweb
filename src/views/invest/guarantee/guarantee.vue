<template>
    <div>
        <Card :bordered="false">
            <itable attribute='guarantee' ></itable>
        </Card>
    </div>
</template>
<script>
import itable from '@/components/Table/index.vue'

export default {
    name:'guarantee',
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
