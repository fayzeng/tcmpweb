export default {
    data(){
        return{
            modalflag:false,
            loading:false,
            modaltitle:'',
            editid:'',
            typenameList:[],
            Modalform:{columnen:'', columncn:'', default_Value:'',type_Name:'',organisation:'', platIdentity:'',regularverification:'', },
            ModalRule:{},

        }
    },
    methods:{
        showModal(id){
            this.gettypenamelist()
            this.modalflag=true;
            this.editid=id;
            if(id){
                this.$post(this.GLOBAL.API_QUERYID_PARAM,{table_Id:id}).then(res => {
                    if (res.data.success) {
                        this.Modalform=res.data.data;
                    }
              })
                
            }else{
                this.modaltitle='新增参数'
            }
        },
        gettypenamelist(){
            this.$post(this.GLOBAL.API_CODETYPE,{codetype:'TypeName'}).then(res=>{
                if(res.data.success){
                    this.typenameList=res.data.data;
                }
             })
        },
        Reset(){
            this.Modalform={columnen:'', columncn:'', default_Value:'',type_Name:'',organisation:'', platIdentity:'',regularverification:'', }
        },
        confirm(){
            let params={columnen:this.Modalform.columnen, columncn:this.Modalform.columncn, default_Value:this.Modalform.default_Value,type_Name:this.Modalform.type_Name,organisation:this.Modalform.organisation, platIdentity:this.Modalform.platIdentity,regularverification:this.Modalform.regularverification, }
            if(this.editid){
                params.table_Id=this.Modalform.table_Id;
            }
            this.$post(this.GLOBAL.API_ADD_PARAM,params).then(res => {
                    if (res.data.success) {
                        this.modalflag=false;
                        this.$Message.success('保存成功');
                        this.$emit('changpage')
                    }
              })
        }
    },
    created(){

    }
}
