<style lang="less">
</style>
<template>
    <div v-if='modalflag'>
        <Modal v-model="modalflag" width="360">
            <p slot="header" style="color:blue;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>发起流程</span>
            </p>
            <Form :model="formItem" :label-width="80" :rules="rules" ref="formItem">
                <Col span="22">
                    <FormItem label="标题:" prop='tittle'>
                        <Input v-model="formItem.tittle" size="small"></Input>
                    </FormItem>
                </Col>
                <!-- <Col span="22" v-if="accountflag">
                    <FormItem label="模板类型:" :prop='accountflag ? "model_type" :" " '>
                        <Select v-model="formItem.model_type"  size="small">
                            <Option  v-for="item in typearr " :key="item.label" :value="item.key" >{{item.label}}</Option>
                        </Select>
                    </FormItem>
                </Col> -->
                <Col span="22" >
                    <FormItem label="正文描述:" prop='text'>
                        <Input v-model="formItem.text"  type="textarea"></Input>
                    </FormItem>
                </Col>
            </Form>
            <div slot="footer">
                <Button type="primary" size="small" :loading='loading' @click="confirm('formItem')" >发起</Button>
                <Button   size="small" @click="modalflag = false">关闭</Button>
            </div>
        </Modal>
    </div>
</template>
<script src='./index.js'></script>
