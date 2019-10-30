import itable from '@/components/Table/index.vue'
export default {
    name:'bankaccount',
    components:{
        itable
    },
    data () {
        return {
            list:[{type:1,val:['1','2']}],
            codelist:[
                {
                    key:'1',
                    name:'ame'
                },
                {
                    key:'2',
                    name:"bane"
                }
            ]
        }
    },
    methods: {
        checkAllGroupChange(data){
            console.log(data)
        }
    },
    created(){

    }
};
