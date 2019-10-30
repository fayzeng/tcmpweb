import formlabels from './commonlabel.js'
export default {
    data(){
        return{
            formlabel:formlabels,
            loglist:[],
            labelList:[],
            formItem:{},
        }
    },
    methods:{
        goback(){
            window.history.go(-1)
        }
    },
    created(){
        this.labelList=this.formlabel.formlabels[this.$route.query.parameter].formitem;
        this.$get(this.formlabel.formlabels[this.$route.query.parameter].Interface,{[this.$route.query.parameterName]:this.$route.query.id}).then(res=>{
            if(res.data.success){
                this.formItem=res.data.data;
                this.loglist=eval("("+this.formItem.log_message+")");
            }
        })
    }
}