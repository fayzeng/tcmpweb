<style lang="less" scoped>
    @import "./index";
</style>
<template>
    <div v-if="modalflag">
        <Modal v-model="modalflag" width="360">
            <p slot="header" style="color:blue;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>上传工作流</span>
            </p>
            <Form :model="formItem" :label-width="100" :rules="rules" ref="formItem">
                <Col span="24" >
                    <FormItem label="工作流分类:" prop='type'>
                        <!-- <Select v-model="formItem.type"  size="small">
                            <Option  v-for="item in typearr " :key="item.key" :value="item.key" >{{item.name}}</Option>
                        </Select> -->
                         <Cascader v-model="values" :data="typearr" change-on-select @on-change='changevalue' size="small"></Cascader>
                    </FormItem>
                </Col>
                <Col span="24" >
                    <FormItem label="入口:" prop='sys_act_type'>
                        <Select v-model="formItem.sys_act_type" multiple  size="small">
                            <Option  v-for="item in acttypearr " :key="item.key" :value="item.key" >{{item.name}}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="24"  >
                  <FormItem label="上传工作流:">
                      <Upload
                       :action="url"
                       :format="['zip']"
                       :on-success="handleSuccess"
                       :on-format-error="handleFormatError"
                       :show-upload-list=false
                       :data={category:formItem.type,sys_act_type:formItem.sys_act_type}>
                        <Button :disabled="!formItem.type"   icon="ios-cloud-upload-outline">选择文件</Button>
                      </Upload>
                  </FormItem>
                </Col>
                <p><span style="color:red">注：</span><span>只支持zip压缩包,选择分类后可选择文件</span></p>
            </Form>
            <div slot="footer">
                <!-- <Button type="primary" size="small"  @click="confirm('formItem')" >确认</Button> -->
                <!-- <Button type="error" size="small" @click="modalflag = false">关闭</Button> -->
            </div>
        </Modal>
    </div>
</template>
<script src='./index.js'></script>
