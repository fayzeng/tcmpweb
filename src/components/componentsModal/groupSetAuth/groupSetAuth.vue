<template>
    <div v-if="isShow">
      <Modal title="群组权限分配" v-model="isShow"   >
          <div slot="footer" class="buttoncenter">
              <Button   size='small' @click="cancel">取消</Button>
              <Button type="warning"  class="resetbutton" @click="reset">重置</Button>
              <Button type="success" size='small' :loading='loading' @click="ok">保存</Button>
          </div>
          <Form :model="param" :label-width="80">
              <FormItem label="群组用途">
                 <Select style="width: 300px" v-model="param.useType" >
                     <Option v-for="item in purpose" :value="item.key" :key="item.key">{{ item.name }}</Option>
                 </Select>
              </FormItem>
              <FormItem label="流程信息">
                 <Select style="width: 300px" v-model="param.flowInfo" >
                     <Option v-for="item in deps" :value="item.value" :key="item.value">{{ item.label }}</Option>
                 </Select>
              </FormItem>
          </Form>
      </Modal>
    </div>
</template>
<script>
export default {
    data(){
        return {
            isShow:false,
            loading:false,
            purpose:[],
            deps:[{value:1,label:'l1'}],
            param:{
                useType:'',
                flowInfo:''
            },
            teamCode:''
        }
    },
    methods:{
        showModal(type){
            if (!this.$store.state.tableselect.selectdata || !this.$store.state.tableselect.selectdata[0]) {
                this.$Message.error('请选择一个群组')
                return
            }
            if (this.$store.state.tableselect.selectdata.length>1) {
                this.$Message.error('仅能选择一个群组')
                return
            }
            this.teamCode = this.$store.state.tableselect.selectdata[0].teamCode
            this.isShow = true;
            this.getpurpose()
        },
        getpurpose(){
                this.$post(this.GLOBAL.API_DIC_GETBYCODE,{codetype:'TEAM_USAGE'}).then(res=>{
                    if(res.data.success){
                        this.purpose=res.data.data;
                    }
                })
        },
        reset(){
            this.param ={useType:'',flowInfo:''}
        },
        ok(){
            const url = ''
            return;
            const param = {teamCode:this.teamCode}
            this.loading=true;
            this.$post(url,param).then(res=>{
                this.loading=false;
                if(res.status == 200){
                    const ret = res.data
                    if (ret.success) {
                        this.isShow = false
                        this.$Message.info('分配成功');
                        this.$emit('changpage')
                    } else {
                    }
                }
            }).catch(()=>{ this.loading=false })
        },
        cancel(){
            this.isShow = false
        }
    },
    created(){

    }

}
</script>
