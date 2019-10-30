import Calendar from 'vue-calendar-component';
import deleteModal from '@/components/componentsModal/deleteModal/deleteModal.vue'
export default {
    components:{
        deleteModal,
        Calendar,
    },
    data(){
      return {
          arr:[],
          arr2:[],
        affaircoreList:[
            {title:'我的待办',list:[{imgurl:'../../static/log1.jpg',describe:'流程待办32项'},{imgurl:'../../static/log1.jpg',describe:'流程待办32项'}]},
            {title:'我的发起',list:[{imgurl:'../../static/log1.jpg',describe:'流程待办32项'},{imgurl:'../../static/log1.jpg',describe:'流程待办32项'}]},
            {title:'我的任务',list:[{imgurl:'../../static/log1.jpg',describe:'流程待办32项'},{imgurl:'../../static/log1.jpg',describe:'流程待办32项'}]},
            {title:'我的委托任务',list:[{imgurl:'../../static/log1.jpg',describe:'流程待办32项'}]}
        ],
        datelist:[
            {title:'今天到期的项目',cont:'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'},
            {title:'今天到期的项目',cont:'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'},
            {title:'今天到期的项目',cont:'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'}],
        data1: [
          
                    {
                        title: 'parent 1-1',
                        expand: true,
                        children: [
                            {
                                title: 'leaf 1-1-1'
                            },
                            {
                                title: 'leaf 1-1-2'
                            }
                        ]
                    },
                    {
                        title: 'parent 1-2',
                        expand: true,
                        children: [
                            {
                                title: 'leaf 1-2-1'
                            },
                            {
                                title: 'leaf 1-2-1'
                            }
                        ]
                    }
                
        ]
      }
    },
    methods:{
        GetintoDetail(title){
            this.$router.push({
                name: 'detailpage',
                query: {
                    title: title
                  }
            });
        },
        clickDay(data){
            console.log(data)
        }
    },
    created(){
  
    }
  }
  