<template>
    <div v-if="modalflag">
   <Modal v-model="modalflag" width="800" :title="modaltitle">
        <Form :model="Modalform" :label-width="100" ref="Modalform" :rules="ModalRule">
          <Row>
             <Col :span="24">
              <FormItem label="标题" prop="title">
                <Input v-model="Modalform.title" style="width:100%"/>
              </FormItem>
            </Col>
            <Col :span="24">
              <FormItem label="正文" prop="content">
                <Input type="textarea" v-model="Modalform.content" :rows='5' style="width:100%"/>
              </FormItem>
            </Col>
          </Row>
        </Form>
         <div class="buttoncenter" slot="footer">
             <Button   @click="modalflag=false">取消</Button>
             <Button type="warning" @click="Reset">重置</Button>
             <Button v-show="editid" type="error" @click="deleteFun">删除</Button>
             <Button type="success" :loading='loading' @click="confirm('Modalform')">保存</Button>
         </div>
   </Modal>
    </div>
</template>
<script>
export default {
    data(){
        return{
            modalflag:false,
            loading:false,
            modaltitle:'',
            Modalform:{title:'',content:'',},
            ModalRule:{},
            todate:'',
            editid:'',
            
        }
    },
    methods:{
        showModal(id,odate){
            this.editid=id;
            this.todate=odate;
            this.modalflag=true;
            if(id){
                this.modaltitle='修改备忘录事件';
                this.$post(this.GLOBAL.API_QUERYID_CALENDER,{sw_id:id}).then(res => {
                    if (res.data.success) {
                        this.Modalform=res.data.data;
                    }
                })
            }else{
                this.modaltitle='新增备忘录事件'
                this.Modalform={
                    title:'',content:'',
                }
            }
        },
       confirm(){
          let params={
              title:this.Modalform.title,
              content:this.Modalform.content,
              warn_date:this.todate,
              type:'0',
              warn_day_count:'3',
              receive_man:window.sessionStorage.getItem('userid'),
          }
          if(this.editid){
              params.sw_id=this.editid;
            this.$post(this.GLOBAL.API_EDITSAVE_CALENDER,params).then(res => {
                if (res.data.success) {
                    this.$Message.success('修改成功')
                    this.modalflag=false;
                    this.$emit('update',res.data.data);
                }
            })
         }else{
           this.$post(this.GLOBAL.API_ADD_CALENDER,params).then(res => {
                if (res.data.success) {
                    this.$Message.success('新增成功')
                    this.modalflag=false;
                    this.$emit('updateadd',res.data.data)
                }
            })
          }   
       },
       deleteFun(){
        if(this.editid){
            this.$post(this.GLOBAL.API_DELETE_CALENDER,{sw_id:this.editid}).then(res => {
                if (res.data.success) {
                    this.$Message.success('删除成功')
                    this.modalflag=false;
                    this.$emit('update')
                }
            })
         }
       },
       Reset(){
         this.Modalform={title:'',content:'',}
       },
    }
}
</script>