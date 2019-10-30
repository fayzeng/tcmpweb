<template>
    <div v-if="modalflag">
      <Modal v-model="modalflag" width="700" :title="modaltitle">
          <Form :model="Modalform" :inline="true" :label-width="100" ref="Modalform" :rules="ModalRule">
            <Row>
              <Col :span="12">
                <FormItem label="类型" prop="actionType">
                   <Select v-model="Modalform.actionType" style="width:200px">
                       <Option label="权限" value="3"></Option>
                       <Option label="按钮" value="2"></Option>
                  </Select>
                </FormItem>
              </Col>
              <Col :span="12">
                <FormItem label="名称" prop="actionName">
                  <Input v-model="Modalform.actionName" style="width: 200px"/>
                </FormItem>
              </Col>
              <Col :span="12">
                <FormItem label="url" prop='actionPath'>
                  <Input v-model="Modalform.actionPath" style="width: 200px"/>
                </FormItem>
              </Col>
              <Col :span="12">
                  <FormItem label="code" v-if="Modalform.actionType=='2'">
                    <Input v-model="Modalform.actionCode" style="width: 200px"/>
                  </FormItem>
              </Col>
              <Col :span="12">
                <FormItem label="排序" v-if="Modalform.actionType=='2'">
                  <Input v-model="Modalform.orders" style="width: 200px"/>
                </FormItem>
              </Col>
            </Row>
          </Form>
              <div class="buttoncenter" slot="footer">
                  <Button   @click="Close">取消</Button>
                  <Button type="warning" @click="Reset">重置</Button>
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
            modaltitle:'',
            loading:false,
            menuId:'',
            rowdata:'',
            Modalform:{actionType:'',actionName:'',actionPath:'',actionCode:'',orders:'1'},
            ModalRule:{
                  actionType: [
                        { required: true, message: ' ', trigger: 'blur' }
                   ],
                    actionName: [
                        { required: true, message: ' ', trigger: 'blur' }
                   ],
                   actionPath: [
                        { required: true, message: ' ', trigger: 'blur' }
                   ],
                       actionCode: [
                        { required: true, message: ' ', trigger: 'blur' }
                   ],
            }
        }
    },
    methods:{
        showModal(title,id,row){
            this.modaltitle=title;
            this.rowdata=row?row[0]:'';
            this.menuId=id;
            this.modalflag=true;
            if(title=='修改'){
                let params={
                    actionId:row[0].actionId,
                }
              this.$post(this.GLOBAL.API_QUERYID_POWER,params).then(res => {
                if (res.data.success) {
                    this.Modalform = res.data.data;
                }
              })
            }else{
                this.Modalform={
                    actionType:'',actionName:'',actionPath:'',actionCode:'',orders:'1'
                }
            }
        },
        confirm(name){
          if(!this.Modalform.actionType){
             this.$Message.error('请选择类型')
          }else if(!this.Modalform.actionName){
             this.$Message.error('请输入名称')
          }else if(!this.Modalform.actionPath){
             this.$Message.error('请输入url')
          }else{
             let url='';
             this.Modalform.menuId = this.menuId;
             this.loading=true;
            if(this.modaltitle=='新增'){
                url=this.GLOBAL.API_ADD_POWER
            }else if(this.modaltitle=='修改'){
                 url=this.GLOBAL.API_EDIT_POWER;
            }
            this.$post(url,this.Modalform).then(res => {
              this.loading=false
                if (res.data.success) {
                     this.modalflag=false;
                    this.$Message.success(res.data.message);
                    this.$emit('updateList',this.menuId);
                }
             }).catch(()=>{ this.loading=false });
          }
            
        },
        Close(){
            this.modalflag=false;
        },
        Reset(){
            this.Modalform={actionType:'',actionName:'',actionPath:'',actionCode:'',orders:'1'}
        }
    }
}
</script>
