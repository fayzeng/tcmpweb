import addshareholder from '@/components/componentsModal/addShareholder/addShareholder.vue';

export default {
  components: {
    addshareholder
  },
  data(){
    return {
      formItem:{
        input:'',
        select:''
      },
      cardmodel:false,
      title:'',
      param:{

      },
      arr:[
      ],
      currentPage:1,
      total:0
    }
  },
  methods:{
    add(){
      this.$refs.addShareholder.showModal()
    },
    update(sch_id){
      this.$refs.addShareholder.showModal(1,sch_id)
    },
    del(sch_id){
      const url = this.GLOBAL.API_SHAREHOLDER_DELETE
      this.$post(url, {sch_id}).then(res => {
        if (res.data.success) {
          this.$Message.success('删除成功')
          this.getData(1)
        } else {
        }
      })
    },
    getData(pageNo){
      const url = this.GLOBAL.API_SHAREHOLDER_LIST   //分页查询股东
      const params = {
        pageSize:6,
        pageNo,
        ...this.param
      }
      this.$get(url, params).then(res => {
        if (res.data.success) {
            this.arr = res.data.data.result
            this.total = res.data.data.totalCount
            this.currentPage = pageNo
            this.$store.state.tableselect.selectdata = []
        }
      })
    }
  },
  created(){
    this.getData(1)
  }
}
