<template>
    <div v-if="isShow">
      <Modal :title="type==='add'? '新增群组' :'修改群组信息'" width="600"  v-model="isShow"  >
          <Form ref="formValidate" :model="param" :label-width="80" :rules="ruleValidate">
            <Row>
              <Col :span="12">
                <FormItem label="群组编号" prop="teamCode">
                   <Input style="width: 200px" v-model="param.teamCode" :disabled="type==='add' ? false : true"/>
                </FormItem>
              </Col>
              <Col :span="12">
                <FormItem label="群组名称" prop="teamName">
                    <Input style="width: 200px" v-model="param.teamName"/>
                </FormItem>
              </Col>
              <Col :span="12">
                <FormItem label="群组类型" prop="teamType">
                    <Select style="width: 200px" v-model="param.teamType" >
                        <Option v-for="item in teamtype" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
              </Col>
              <Col :span="12">
                <FormItem label="群组用途" prop="teamUseType">
                    <Select style="width: 200px" v-model="param.teamUseType" >
                        <Option v-for="item in teamusage" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
              </Col>
              <Col :span="24">
                <FormItem label="备注">
                    <Input  v-model="param.description" type="textarea"/>
                </FormItem>
              </Col>
            </Row>
          </Form>
          <div slot="footer" class="buttoncenter">
            <Button    class="cancelbutton" @click="cancel">取消</Button>
            <Button type="warning"  class="resetbutton" @click="clearparam">重置</Button>
            <Button type="success"  class="savebutton" :loading='loading' @click="ok">保存</Button>
          </div>
      </Modal>
    </div>
</template>
<script>
export default {
    data(){
        return {
            isShow:false,
            loading:false,
            param:{
                teamCode:'',
                teamType:'',
                teamName:'',
                teamUseType:'',
                description:'',
            },
            ruleValidate:{
                teamCode:[{required: true, message: ' ', trigger: 'blur'}],
                teamType:[{required: true, message: ' ', trigger: 'blur'}],
                teamName:[{required: true, message: ' ', trigger: 'blur'}],
                teamUseType:[{required: true, message: ' ', trigger: 'blur'}],
            },
            deps:[{label:'list1',value:'1'},{label:'list2',value:'2'}],
            teamtype:[],
            teamusage:[],
            type:'add',
        }
    },
    methods:{
        clearparam(){
            this.param={
                teamCode:'',
                teamType:'',
                teamName:'',
                teamUseType:'',
                description:'',
            }
        },
        showModal(type){
            this.clearparam()
            if (type==='update') {
                if (!this.$store.state.tableselect.selectdata || !this.$store.state.tableselect.selectdata[0]) {
                    this.$Message.error('请选择一个群组')
                    return
                }
                if (this.$store.state.tableselect.selectdata.length>1) {
                    this.$Message.error('仅能选择一个群组')
                    return
                }
                const group = JSON.parse(JSON.stringify(this.$store.state.tableselect.selectdata[0]))
                this.param.teamCode = group.teamCode
                this.param.teamName = group.teamName
                this.param.teamType = group.teamType
                this.param.teamUseType = group.teamUseType
                this.param.description = group.description
            }
            this.getDic()
            this.type = type
            this.isShow = true

        },
        getDic(){
            const url = this.GLOBAL.API_DIC_GETBYCODE;
            const param = {codetype:'TEAM_TYPE'}  //群组类型
            this.$post(url,param).then(res=>{
                if(res.status == 200){
                    const ret = res.data
                    if (ret.success) {
                        const list = ret.data.map(item => ({label:item.name,value:item.key}))
                        this.teamtype = list
                    } else {
                    }
                }
            })
            param.codetype = 'TEAM_USAGE'  //群组用途
            this.$post(url,param).then(res=>{
                if(res.status == 200){
                    const ret = res.data
                    if (ret.success) {
                        const list = ret.data.map(item => ({label:item.name,value:item.key}))
                        this.teamusage = list
                    } else {
                    }
                }
            })
        },
        ok(){
          if(!this.param.teamCode){
              this.$Message.error('请输入群组编号')
          }else if(!this.param.teamName){
              this.$Message.error('请输入群组名称')
          }else if(!this.param.teamType){
             this.$Message.error('请选择群组类型')
          }else if(!this.param.teamType){
             this.$Message.error('请选择群组类型')
          }else if(!this.param.teamUseType){
             this.$Message.error('请选择群组用途')
          }else{
            this.postdata()
          }
        },
        postdata(){
            const url = this.type==='add' ? this.GLOBAL.API_GROUP_ADD : this.GLOBAL.API_GROUP_UPDATE
            const param = {...this.param}
            this.loading=true;
            this.$post(url,param).then(res=>{
                this.loading=false
                if(res.status == 200){
                    const ret = res.data
                    if (ret.success) {
                        this.isShow = false
                        this.$Message.info(this.type==='update' ? '修改成功' : '新增成功');
                        this.$emit('changpage')
                    } else {
                    }
                }
            }).catch(()=>{ this.loading=false });
        },
        cancel(){
            this.isShow = false
        }
    }

}
</script>
