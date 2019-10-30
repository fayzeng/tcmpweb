<template>
    <div @click="showModal" class="message-con">
        <Tooltip :content="'关于系统'" placement="bottom">
            <Icon type="md-information-circle" :size="20"></Icon>
        </Tooltip>
        <about-system-modal ref="tipModal"  />

    </div>
</template>
<script>
import aboutSystemModal from '@/components/componentsModal/aboutSystem/aboutSystem.vue';

export default {
    components: {
        aboutSystemModal
    },
    data(){
        return {
            systemTipVisble:false
        }
    },
    methods:{
        showModal(){
            this.$refs.tipModal.showModal()
        },
        closeModal(){
            this.systemTipVisble = false
        }
    }
}
</script>
