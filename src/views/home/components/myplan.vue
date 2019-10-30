<style scoped>
.myplan{
    height: 360px;
    margin-bottom: 12px;
    margin-right: 13px;
}
.el-card__header{
    border-bottom: 0px solid #EBEEF5!important;
}
.titlesty{
     font-weight:bold;
     font-size:18px;
     color:cornflowerblue
}
.plan{
     height: 40px;
}
.planinfo{
    height: 32px;
    border-radius: 16px;
    background:rgb(213,232,250);
}
.plantitle{
  height: 32px;
  border-radius: 4px;
  background:#C0C0C0;
}
.item {
  margin-top: 10px;
  margin-right: 40px;
}
.spanfont{
    margin-left: 40px;
    line-height:32px;
}
.panlan{
  color: #666;
  font-size: 14px;
}
</style>
<template>
    <div>
        <Card class="myplan"  >
            <div slot="title" >
                <svg t="1563505760795" class="icon"  style="height:18px;width:20px;"  viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10353" width="200" height="200"><path d="M108.032 864.256l166.912-78.336 433.152 59.392-146.432 86.016z" fill="#0F76BC" p-id="10354"></path><path d="M307.2 709.632l159.744-71.168-0.512 76.8-158.72 75.776z" fill="#891212" p-id="10355"></path><path d="M97.792 131.584l172.544-35.84 4.608 690.176-166.912 78.336z" fill="#0C5F8E" p-id="10356"></path><path d="M307.2 709.632l0.512 81.408-132.096-17.92-0.512-80.384z" fill="#F44336" p-id="10357"></path><path d="M175.104 692.736l164.864-69.12 126.976 14.848L307.2 709.632z" fill="#C42320" p-id="10358"></path><path d="M561.664 931.328l146.432-86.016-1.024 83.968-145.92 91.136z" fill="#0C5F8E" p-id="10359"></path><path d="M506.88 719.36l150.528-72.704-1.536 117.76L506.368 844.8z" fill="#266826" p-id="10360"></path><path d="M392.192 705.024l155.648-71.68 109.568 13.312L506.88 719.36z" fill="#2F7F2F" p-id="10361"></path><path d="M506.88 719.36l-0.512 125.44-114.176-15.872v-123.904z" fill="#4CAF50" p-id="10362"></path><path d="M687.616 742.4l-1.536 127.488-118.272-16.384 0.512-125.952z" fill="#FFC107" p-id="10363"></path><path d="M687.616 742.4l141.312-75.776-2.048 119.808-140.8 83.456z" fill="#8E6200" p-id="10364"></path><path d="M568.32 727.552l147.968-74.24 112.64 13.312-141.312 75.776z" fill="#C98F00" p-id="10365"></path><path d="M623.104 518.144l-0.512 84.48-449.024-51.2-1.024-80.384z" fill="#FFC107" p-id="10366"></path><path d="M623.104 518.144l146.432-61.952-1.024 79.36-145.92 67.072z" fill="#8E6200" p-id="10367"></path><path d="M172.544 471.04l166.912-56.32 430.08 41.472-146.432 61.952z" fill="#C98F00" p-id="10368"></path><path d="M625.152 283.136l147.456-47.104-1.024 81.92L624.64 370.688z" fill="#266826" p-id="10369"></path><path d="M169.984 246.272l168.448-43.008 434.176 32.768-147.456 47.104z" fill="#389638" p-id="10370"></path><path d="M625.152 283.136l-0.512 87.552-453.632-40.448-1.024-83.968z" fill="#4CAF50" p-id="10371"></path><path d="M875.008 766.464l132.096-78.848-3.072 121.856-131.584 86.528z" fill="#891212" p-id="10372"></path><path d="M751.616 750.592l138.24-76.8 117.248 13.824-132.096 78.848z" fill="#C42320" p-id="10373"></path><path d="M875.008 766.464l-2.56 129.536-122.88-17.408 2.048-128z" fill="#F44336" p-id="10374"></path><path d="M792.064 80.896L931.84 45.568l-10.24 486.4-137.728 68.096z" fill="#0F76BC" p-id="10375"></path><path d="M792.064 80.896l-8.192 519.168-91.136-10.24 5.12-416.768-600.064-41.472 10.24 732.672 453.632 67.072-0.512 89.088L32.768 937.472 17.408 35.328z" fill="#2196F3" p-id="10376"></path><path d="M17.408 35.328L194.048 5.12 931.84 45.568l-139.776 35.328z" fill="#77C4F7" p-id="10377"></path></svg>
                <span class="titlesty">流程待办</span>
                <a><Icon type="md-refresh" size='40px' style="float: right; padding: 0 0" @click.native='getplandata'></Icon></a>
            </div>
            <div style='height:360px;overflow-y:auto'>
              <Row class="plantitle" style="margin-bottom:12px">
                <Col span='8'>
                      <span class="spanfont">流程类型</span>
                  </Col>
                  <Col span='8'>
                      <span class="spanfont">流程标题</span>
                  </Col>
                  <Col span='8'>
                      <span class="spanfont">流程发起人</span>
                  </Col>
                </Row>
                <div slot="content" v-for="(ele,index) in plandata" :key="index" class="plan">
                    <div class="planinfo" @click="planclick(ele)">
                        <a class="panlan">
                          <Row>
                            <Col span='8'>
                                <span class="spanfont">{{ele.name}}</span>
                            </Col>
                          <Col span='8'>
                              <span class="spanfont">{{ele.tittle}}</span>
                          </Col>
                          <Col span='8'>
                              <span class="spanfont">{{ele.createassignee}}</span>
                          </Col>
                        </Row>
                       </a>
                    </div>
                </div>
            </div>
        </Card>
    </div>
</template>
<script>
export default {
    data(){
        return{
            value1:'',
            plandata:[]
        }
    },
    methods:{
        planclick(ele){
          this.$router.push(
            {
               name: 'handleflow',
               query: {
                 id: ele.taskId,
                  processid: ele.processid
                }
              }
            )
        },
        getplandata(){
            let params={
              pageSize: 1000,
              pageNo: 1
            }
            this.$get(this.GLOBAL.API_TASK_TODOLIST,params).then(res=>{
                if(res.data.success){
                  this.plandata =res.data.data.result
                }
            })
          }
    },
    created(){
      this.getplandata()
    }
}
</script>
