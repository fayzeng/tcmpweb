<template>
    <div>
        <Card :bordered="false">
            <itable attribute='subjectmatter' ></itable>
        </Card>
    </div>
</template>
<script>
import itable from '@/components/Table/index.vue'

export default {
    name:'subjectmatter',
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
