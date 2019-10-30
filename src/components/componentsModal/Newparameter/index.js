
export default {
    components:{
    },
    data(){
      return {
        modalflag:false,
        Modalform:{},
        ModalRule:{}
      }
    },
    methods:{
        getNewparameter(){
            this.modalflag=true;
        },
        confirm(){
            this.modalflag=false;
        },
        Close(){
            this.modalflag=false;
        },
    },
    created(){
    }
  }
  