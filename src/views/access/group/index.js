import itable from '@/components/Table/index.vue'
// import groupDataModal from '@/components/componentsModal/groupData/groupData.vue';

export default {
    name:'group',
    components:{
        itable,
        // groupDataModal,
    },
    data(){
        return {
            type:'add',
        }
    },
    methods:{
        // showGroupDataModal(){
        //     this.type='add'
        //     this.$refs.groupDataModal.showModal()
        // },
        // showUpdateModal(){
        //     this.type='update'
        //     this.$refs.groupDataModal.showModal()
        //
        // }
    },
    created(){

    }
}
