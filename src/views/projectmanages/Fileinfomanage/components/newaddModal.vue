<style lang="less">
</style>
<template>
    <Modal
        v-model="modalflag"
        align='center'
        width="800px"
        :title="title"
        okText="确认"
        cancelText="关闭"
        @on-ok="confirm"
        @on-cancel="Close">
       <Form ref="queryForm" :model="queryForm" :rules="ruleCustom" :label-width="80" inline>
            <FormItem v-show="formflag" label="项目编码" prop="passwd">
                <Input v-model="queryForm.input3" style="width:200px"/>
            </FormItem>
             <FormItem v-show="formflag" label="项目名称" prop="passwd">
                <Input v-model="queryForm.input3" style="width:200px"/>
            </FormItem>
            <FormItem v-show="formflag" label="项目类别" prop="passwdCheck">
                <Select v-model="queryForm.city" style="width:200px">
                    <Option value="beijing">New York</Option>
                    <Option value="shanghai">London</Option>
                    <Option value="shenzhen">Sydney</Option>
                </Select>
            </FormItem>
            <FormItem v-show="formflag" label="项目状态" prop="age">
            <Select v-model="queryForm.city"  style="width:200px">
                    <Option value="beijing">New York</Option>
                    <Option value="shanghai">London</Option>
                    <Option value="shenzhen">Sydney</Option>
                </Select>
            </FormItem>
             <FormItem label="文档说明" prop="passwd">
                 <Input v-model="queryForm.value5" type="textarea"  style="width:500px"/>
            </FormItem>
            <FormItem v-show="formflag" label="文档类型" prop="passwd">
                 <Button type="primary">上传</Button>
            </FormItem>
      </Form>

    </Modal>
</template>
<script>
export default {
    data(){
        return{
          title:'',
          modalflag:false,
          formflag:true,
          queryForm:{},
          ruleCustom:{}
        }
    },
    methods:{
        getnewaddModal(status){
            this.modalflag=true;
            if(status=='新增'||status=='修改'){
                this.title='文档上传';
                this.formflag=true;
            }else if(status=='文件归档'){
                this.formflag=false;
            }
        },
        confirm(){
        },
        Close(){},
    }
}

</script>