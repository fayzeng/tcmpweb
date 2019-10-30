<style lang="less" scoped>
    @import "./index";
</style>
<template>
    <div v-if="modalflag">
        <Modal v-model="modalflag" width="360">
            <p slot="header" style="color:blue;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>选择工作流分类</span>
            </p>
            <Form :model="formItem" :label-width="100" :rules="rules" ref="formItem">
                <Row>
                <Col span="22" >
                    <FormItem label="工作流分类:" prop='type'>
                        <!-- <Select v-model="formItem.type"  size="small">
                            <Option  v-for="item in typearr " :key="item.key" :value="item.key" >{{item.name}}</Option>
                        </Select> -->
                        <Cascader v-model="values" :data="typearr" change-on-select @on-change='changevalue' size="small"></Cascader>
                    </FormItem>
                    <FormItem label="入口:" prop='sys_act_type'>
                        <Select v-model="formItem.sys_act_type" multiple  size="small">
                            <Option  v-for="item in acttypearr " :key="item.key" :value="item.key" >{{item.name}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="键:" prop='key'>
                         <Input v-model="formItem.key" size="small" />
                    </FormItem>
                </Col>
                </Row>
            </Form>
            <div class="buttoncenter" slot="footer">
                <Button   size="small" @click="modalflag = false">关闭</Button>
                <Button type="warning" size="small" @click="Reset">重置</Button>
                <Button type="success" size="small"  @click="confirm('formItem')" >确认</Button>
            </div>
        </Modal>
    </div>
</template>
<script src='./index.js'></script>
