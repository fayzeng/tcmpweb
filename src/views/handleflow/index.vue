<style lang="less" scoped>
    @import './index.less';
</style>
<template>
    <div class="handle-flow">
        <Card >
      <Tabs value="流程基本信息" @on-click='tabclick'>
        <TabPane label="流程基本信息" name="流程基本信息">
         <div>
          <Collapse v-model="showPanel">
            <Panel name="1">
                基本信息
                <div slot="content">
                  <Row class="font-center"><h2 class="red-font">北京国际信托有限公司  {{info.tittle}}</h2> </Row>
                  <Row>标题: {{info.tittle}}</Row>
                  <Row class="margin-top">正文描述: {{info.text}}</Row>
                  <Row  class="margin-top" >当前处理人: {{info.assignee}}</Row>
                </div>
            </Panel>
            <!-- <Panel name="2" >
                信息录入
                    <span slot="content">
                        <Row>
                            <Newedit v-if="neweditshow && showfag" ref="Newedit" :tempId='temlpates' :keyid='info.businessKey'></Newedit>
                        </Row>
                    </span>
            </Panel> -->
             <Panel name="2" >
                    信息录入
                    <span slot="content">
                        <Row>
                            <Tabs value="表单录入" @on-click='tabchange'>
                                <TabPane label="表单录入" name="表单录入">
                                    <div>
                                       <Newedit v-if="neweditshow && showfag" ref="Newedit" :tempId='temlpates' :keyid='info.businessKey'></Newedit>                                               
                                    </div>
                                </TabPane>
                                <TabPane label="文档管理" name="文档管理">
                                     <div v-if="tabflag=='文档管理'">
                                       <filemanage ref="filemanage" :paramobj='paramobj'></filemanage>                                                  
                                    </div>
                                </TabPane>
                            </Tabs>
                        </Row>
                    </span>
             </Panel>
             <!-- <Panel name="3" >
                 查看流程图
                     <span slot="content">
                         <img :src="image"  >
                     </span>
             </Panel> -->
             <!-- <Panel name="3" >
                 查看审批单
                     <span slot="content">
                         <div v-html="html"></div>
                         <p v-if="!flag">
                              <Checkbox v-model="single1" @on-change='chnagesingle'>业务信息</Checkbox>
                              <Checkbox v-model="single2" @on-change='chnagesingle'>审批意见（全部）</Checkbox>
                              <Checkbox v-model="single3" @on-change='chnagesingle'>审批意见（最后一次）</Checkbox>
                         </p>


                     </span>
             </Panel> -->
            <Panel name="4">
                审批操作
                <div slot="content">
                    <Form :model="param"  :label-width="100"  label-position="left" >
                        <Row>
                            <FormItem label="审批意见" >
                                  <Dropdown v-if="!flag" trigger="click" @on-click="handleClickDropdown">
                                    <a href="javascript:void(0)">
                                        常用语
                                        <Icon type="arrow-down-b"></Icon>
                                    </a>
                                    <DropdownMenu slot="list">
                                        <DropdownItem v-for="(item,ind) in DropdownList" :key="ind" :name='item.content'>{{item.content}}</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                <Input type="textarea" :disabled="flag" v-model="param.message" />
                            </FormItem>
                        </Row>
                         <Row v-if="!flag">
                            <FormItem>
                                <Upload :action='url'  :format="['ppt','xls','xlsx','docx']" :on-format-error="handleFormatError" :on-success="handleSuccess" :on-remove='handleremove' :on-error='handleError' >
                                    <Button   icon="ios-cloud-upload-outline" >上传附件</Button>
                                </Upload>
                            </FormItem>
                        </Row>
                          <Row v-if="multiInstanceFlag&&!flag">
                            <FormItem label="会签类型">
                                 <Select v-model="muti_instance_type" style="width:200px">
                                        <Option v-for="(item,ind) in selectlist" :key="ind" :label="item.name" :value="item.key"></Option>
                                 </Select>
                            </FormItem>
                        </Row>
                        <!-- <Row v-if="!flag">
                            <FormItem>
                                <Button  v-for="(item,index) in nodes" :key="index" @click="confirm(item)">{{item}}</Button>
                            </FormItem>
                        </Row> -->
                        <!-- <Row v-if="nodes.length>1&&!flag">
                            <FormItem >
                                <RadioGroup v-model="param.comeout" @on-change="GETCOUNTERSIGN">
                                    <Radio v-for="(item,index) in nodes" :key="index"  :label="item">{{item}}</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Row>
                        <Row v-if="!flag">
                            <FormItem >
                                <Button @click="confirm">提交</Button>
                            </FormItem>
                        </Row> -->
                    </Form>
                </div>
            </Panel>
            <!-- <Panel name="5">
                审批记录
                <div slot="content">
                    <Table  style="margin-top:20px" border :columns="columns" :data="history.slice((currentPage-1)*pagesize,currentPage*pagesize)"></Table>
                    <div style="overflow: hidden;background:#f8f8f9;">
                        <div style="float: left;margin: 10px;" >
                            <p>共有<a>{{total}}</a>条数据，当前第<a>{{nowpage}}</a>页</p>
                        </div>
                        <div style="float: right;margin: 10px;">
                            <Page :total="history.length" :current="currentPage" :page-size='10' @on-change="changePage" ></Page>
                        </div>
                    </div>
                </div>
            </Panel> -->
        </Collapse>
        </div>
        </TabPane>
         <TabPane label="审批单" name="审批单">
             <div >
                   <div v-html="html"></div>
                    <p v-if="!flag">
                        <Checkbox v-model="single1" @on-change='chnagesingle'>业务信息</Checkbox>
                        <Checkbox v-model="single2" @on-change='chnagesingle'>审批意见（全部）</Checkbox>
                        <Checkbox v-model="single3" @on-change='chnagesingle'>审批意见（最后一次）</Checkbox>
                    </p>
             </div>
          
        </TabPane>
        <TabPane label="审批记录" name="审批记录">
            <div >
            <Table  style="margin-top:20px" border :columns="columns" :data="history.slice((currentPage-1)*pagesize,currentPage*pagesize)"></Table>
            <div style="overflow: hidden;background:#f8f8f9;">
                <div style="float: left;margin: 10px;" >
                    <p>共有<a>{{total}}</a>条数据，当前第<a>{{nowpage}}</a>页</p>
                </div>
                <div style="float: right;margin: 10px;">
                    <Page :total="history.length" :current="currentPage" :page-size='10' @on-change="changePage" ></Page>
                </div>
            </div>
            </div>
        </TabPane>
        <TabPane label="流程运行图" name="流程运行图">
            <div v-if="tabbigflag=='流程运行图'" style="align:center;overflow:auto" >
                 <img :src="'data:image/png;base64,' + image"  >
            </div>
        </TabPane>
        </Tabs>
            <p  v-show="tabbigflag=='流程基本信息'" style="position:fixed;bottom:25px;left:50%; transform: translate(-50%, 0);" >
                <Button   @click="goback">返回</Button>
               <Button v-if="!flag" type="primary" style="margin:0 5px" v-for="(item,index) in nodes" :key="index" @click="confirm(item)">{{item}}</Button>
            </p>
          <selectModal ref="selectModal" @updatedata='updatedata' attribute='countersign'></selectModal>
        </Card>
    </div>
</template>
<script src="./index.js"></script>
