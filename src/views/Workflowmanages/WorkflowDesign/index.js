
import deleteModal from '@/components/componentsModal/deleteModal/deleteModal.vue'
import itable from '@/components/Table/index.vue'
export default {
    components:{
        deleteModal,
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
  