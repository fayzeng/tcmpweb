<style >
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
        <lunar-full-calendar :events="events" :config="config"  @day-click="dayClick"></lunar-full-calendar>
    </Card>
</template>
<script>
import { LunarFullCalendar } from 'vue-lunar-full-calendar'

export default {
    components: {
     LunarFullCalendar
    },
    data(){
      return{
        events: [
          {
            id: 1,
            title: '数据1',
            allDay: true,
            start: new Date()
          },
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
     dayClick (date, jsEvent, view) { // 点击当天的事件
        console.log('农历数据：' + JSON.stringify(window.lunar(date._d)))
      },
      eventSelected (event, jsEvent, view) { // 选中事件
        console.log(event, jsEvent, 'eventSelected')
      },
   }
}
</script>
