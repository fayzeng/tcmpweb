<style lang="less">
</style>
<template>
    <Modal
        v-model="modalflag"
        align='center'
        width="500px"
        :title="title"
        okText="确认"
        cancelText="关闭"
        @on-ok="confirm"
        @on-cancel="Close">
       <Form  ref="queryForm" :model="queryForm" :rules="ruleCustom" :label-width="150" inline>
            <FormItem label="上级文档类型" prop="passwd">
                <Input v-model="queryForm.input3" style="width:200px"/>
            </FormItem>
             <FormItem label="文档类型名称" prop="passwd">
                <Input v-model="queryForm.input3" style="width:200px"/>
            </FormItem>
            <FormItem label="文档类型描述" prop="passwd">
                <Input v-model="queryForm.input3" style="width:200px"/>
            </FormItem>
            <FormItem label="文档密级" prop="passwdCheck">
                <Select v-model="queryForm.city"  style="width:200px">
                    <Option value="beijing">一级</Option>
                    <Option value="shanghai">二级</Option>
                </Select>
            </FormItem>
            <FormItem label="是否允许手工上传" prop="passwdCheck">
                <Select v-model="queryForm.city" style="width:200px">
                    <Option value="beijing">是</Option>
                    <Option value="shanghai">否</Option>
                </Select>
            </FormItem>
            <FormItem label="流程上传时的流程key" prop="age">
            <Select v-model="queryForm.city"  style="width:200px">
                    <Option value="beijing">New York</Option>
                    <Option value="shanghai">London</Option>
                    <Option value="shenzhen">Sydney</Option>
                </Select>
            </FormItem>
            <FormItem label="排序字段" prop="passwd">
                <Input v-model="queryForm.input3" style="width:200px"/>
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
          queryForm:{},
          ruleCustom:{}
        }
    },
    methods:{
        getnewaddModal(status){
            this.modalflag=true;
            if(status=='新增'||status=='修改'){
                this.title='新增项目文档类型';
            }else if(status=='新增'){}
        },
        confirm(){},
        Close(){},
    }
}

</script>