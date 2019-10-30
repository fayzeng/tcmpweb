
<style lang="less">
  .marginb{
    margin-bottom: 12px;
    margin-right: 13px;
    /* height: 600px; */
    .fc-center{
      margin-right: 12px;
    }
}
</style>

<template lang="html">
    <Card class="marginb">
        <lunar-full-calendar :events="events" :config="config" @event-drop='eventDrop' @event-selected="eventSelected"  @day-click="dayClick"></lunar-full-calendar>
        <addMemoevent  @update='update' @updateadd='updateadd' ref="addMemoevent"></addMemoevent>
    </Card>
</template>
<script>
import { LunarFullCalendar } from 'vue-lunar-full-calendar'
import addMemoevent from '@/components/componentsModal/addMemoevent/index.vue'
import moment from 'moment'

export default {
    components: {
     LunarFullCalendar,
     addMemoevent
    },
    data(){
      return{
        events: [
          // {
          //   id: 1,
          //   title: '数据1',
          //   allDay: true,
          //   start: new Date()
          // },
        ],
        config: {
          locale: 'zh-cn',
          lunarCalendar: true,   // 控制是否显示中国农历、显示的为true，隐藏为flase，默认为true(Control whether the Chinese calendar shows true, unrealistic flase, default true.)
          buttonText: {
              today: '今天',
              month: '月',
              week: '周',
              day: '日'
            },
          defaultView: 'month',
          header: {
            left: 'prev,next, today',
            center: 'title',
            right: 'hide, custom, " ","  "," "'
          },
        },
      }
     window.lunar(date)   // Date is the date.
   },
   methods:{
     updateadd(data){
       this.events.push(data);
       this.events=JSON.parse(JSON.stringify(this.events).replace(/warn_date/g,"start"))
     },

     update(data){
         this.getdateList()
     },
     eventDrop(date,dayDelta,revertFunc){
        console.log(date);
        console.log(dayDelta)
        //revertFunc()
     //  console.log(this.fun_date(date.input_time,dayDelta._days)) 
              let params={
              title:date.title,
              content:date.content,
              warn_date:this.fun_date(date.start._i,dayDelta._days),
              type:'0',
              warn_day_count:'3',
              receive_man:window.sessionStorage.getItem('userid'),
              sw_id:date.sw_id,
          }
         // console.log(params)
          this.$post(this.GLOBAL.API_EDITSAVE_CALENDER,params).then(res => {
                if (res.data.success) {
                    this.$Message.success('修改成功')
                    this.modalflag=false;
                    this.getdateList()
                }
            })
     },

      fun_date(newdate,days){
          var date1 = new Date(newdate),
          time1=date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();//time1表示当前时间
          var date2 = new Date(date1);
          date2.setDate(date1.getDate()+days);
          var time2 = date2.getFullYear()+"-"+(date2.getMonth()+1)+"-"+date2.getDate();
           return moment(time2).format('YYYY-MM-DD')
      },
     dayClick (date, jsEvent, view) { // 点击当天的事件
        console.log('农历数据：' + JSON.stringify(window.lunar(date._d).oDate))
        let datestr= JSON.stringify(window.lunar(date._d).oDate);
        let odate=datestr.substring(1,datestr.indexOf('T'));
        this.$refs.addMemoevent.showModal('',odate)
      },
      eventSelected (event, jsEvent, view) { // 选中事件
        console.log(event, jsEvent, 'eventSelected')
        this.$refs.addMemoevent.showModal(event.sw_id,event.start._i)
      },
      getdateList(){
         this.$get(this.GLOBAL.API_CALENDAR_LIST).then(res=>{
            this.events=JSON.parse(JSON.stringify(res.data.data.result).replace(/warn_date/g,"start"))
        })
      }
   },
   created(){
       this.getdateList()
   }
}
</script>
