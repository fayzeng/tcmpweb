import newaddModal from './components/newaddModal.vue'
import deleteModal from '@/components/componentsModal/deleteModal/deleteModal.vue'
import DocumentTypeManage from './components/DocumentTypeManage/DocumentTypeManage.vue'
import itable from '@/components/Table/index.vue'
export default {
    name:'Fileinfomanage',
    components:{
        newaddModal,
        deleteModal,
        DocumentTypeManage,
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
        newAdd(){
         this.$refs.newaddModal.getnewaddModal('新增');
        },
        modify(){
         this.$refs.newaddModal.getnewaddModal('修改');
        },
        fileFun(){
         this.$refs.newaddModal.getnewaddModal('文件归档');
        },
        deleteFun(){
         this.$refs.deleteModal.getdeleteModal();
        },
        DocumentTypeManageFun(){
         this.$refs.DocumentTypeManage.getDocumentTypeManage();
        },
    },
    created(){

    }
  }
