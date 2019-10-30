
export default {
    components:{
    },
    data(){
      return {
        modalflag:false,
        single:false,
        Modalform:{},
        ModalRule:{}
      }
    },
    methods:{
        getNewannouncement(){
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
  