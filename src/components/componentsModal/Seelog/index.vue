<template>
    <div v-if="modalflag">
        <Modal title="查看日志" width='800' v-model="modalflag">
         <Form :model="Modalform" :inline="true" :label-width="100" ref="Modalform" >
          <Row>  
            <Col :span="12">
              <FormItem label="关联业务id：" prop="gradeName">
               {{Modalform.biz_id}}
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem label="关联业务名称：" prop="groupName">
                  {{Modalform.biz_name}}
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem label="日期：" >
                  {{Modalform.log_date}}
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem label="日志id：">
                   {{Modalform.log_id}}
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem label="ip地址：">
                   {{Modalform.log_ip}}
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem label="日志详情：">
                   {{Modalform.log_message}}
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem label="项目id：">
                   {{Modalform.project_id}}
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem label="项目名称：">
                   {{Modalform.project_name}}
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem label="操作人：">
                   {{Modalform.user_name}}
              </FormItem>
            </Col>
          </Row>
        </Form>
            <div slot="footer">
                    <Button   @click="Close">取消</Button>
                    <Button type="primary" @click="confirm('Modalform')">确定</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
export default {
    data(){
        return{
          modalflag:false,
          Modalform:{
              biz_id:'',biz_name:'',log_date:'',log_id:'',log_ip:'',log_message:'',project_id:'',project_name:'',user_name:''
          },
        }
    },
    methods:{
        showModal(){
            this.modalflag=true;
              this.$get(this.GLOBAL.API_LOG_QUERYID,{log_id:this.$store.state.tableselect.selectdata[0].log_id}).then(res=>{
                if(res.data.success){
                    this.Modalform=res.data.data;
                }
            })
        },
        confirm(){
            this.modalflag=false;
        },
        Close(){
            this.modalflag=false;
        }
    }
}
</script>
