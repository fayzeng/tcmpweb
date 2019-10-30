<style lang="less">
    .list-btn {
        margin: 0 8px 5px 0;
    }
</style>
<template>
    <div>
        <Card>
            <Tabs value="流程基本信息" @on-click='tabclick'>
                <TabPane label="流程基本信息" name="流程基本信息">
                    <div>
                      <Collapse v-model="Panelvalue" >
                              <div style="background:#fff;padding-top:10px;">
                                    <Form  :label-width="80"  :rules="rule">
                                        <Row>
                                            <Col span="8">
                                                <FormItem label="标题：" prop='title'>
                                                    <Input v-model="title" size="small" ></Input>
                                                </FormItem>
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>
                            <!-- <Panel name="1">
                               正文信息
                                <span slot="content">
                                    <Row>
                                        <Form  :label-width="80"  :rules="rule">
                                            <Row>
                                                <Col span="8">
                                                    <FormItem label="标题：" prop='title'>
                                                        <Input v-model="title" size="small" ></Input>
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Row>
                                </span>
                            </Panel> -->
                           <!-- <Panel name="2" >
                               文档管理
                                <span slot="content">
                                    <Row>
                                       <filemanage ref="filemanage" :paramobj='paramobj'></filemanage>
                                    </Row>
                                </span>
                            </Panel> -->
                            <!-- <Panel name="3" >
                               信息录入
                                <span slot="content">
                                    <Row>
                                      <Newedit v-if="neweditshow" ref="Newedit" :tempId='template_id'></Newedit>
                                    </Row>
                                </span>
                            </Panel> -->
                           <Panel name="3" >
                               信息录入
                                <span slot="content">
                                    <Row>
                                         <Tabs value="表单录入" @on-click='tabchange' >
                                            <TabPane  label="表单录入" name="表单录入">
                                                <div style="height:auto">
                                                    <Newedit v-if="neweditshow" ref="Newedit" :tempId='template_id'></Newedit>                                                    
                                                </div>
                                            </TabPane>
                                             <TabPane label="文档管理" name="文档管理">
                                                 <div v-if="tabflag =='文档管理'" >
                                                   <filemanage v-if="flag" ref="filemanage" :paramobj='paramobj'></filemanage>                                                      
                                                </div>                           
                                            </TabPane>
                                         </Tabs>
                                    </Row>
                                </span>
                            </Panel>
                            <Panel name="4">
                                处理信息
                                <span slot="content">
                                    <Form  :label-width="80">
                                    <Row>
                                            <FormItem label="处理意见：" prop='text'>
                                                <Input type="textarea" v-model="message"  size="small" ></Input>
                                            </FormItem>
                                    </Row>
                                     <Row>
                                        <FormItem>
                                             <Upload :action='url' :format="['ppt','xls','xlsx','docx']" :on-success="handleSuccess" :on-format-error="handleFormatError" :on-remove='handleremove' :on-error='handleError' :before-upload="handleBeforeUpload">
                                                <Button   icon="ios-cloud-upload-outline" >上传附件</Button>
                                            </Upload>
                                        </FormItem>
                                    </Row>
                                    <!-- <Row>
                                            <FormItem >
                                                <RadioGroup v-model="comeout">
                                                    <Radio v-for="(item,index) in buttonluch" :key="index"  :label="item">{{item}}</Radio>
                                                </RadioGroup>
                                            </FormItem>
                                    </Row> -->
                                    </Form>
                                </span>
                            </Panel>
                        </Collapse>
                     </div>
                </TabPane>
                <!-- <TabPane label="文档管理" name="文档管理">
                         <filemanage ref="filemanage" :paramobj='paramobj'></filemanage>
                </TabPane> -->
                <TabPane label="流程运行图" name="流程运行图">
                    <div v-if="tabbigflag=='流程运行图'" style="align:center;overflow:auto" >
                        <img :src="'data:image/png;base64,'  + image"  >

                    </div>
                </TabPane>
                
            </Tabs>
             <div v-show="tabbigflag=='流程基本信息'" style="position:fixed;bottom:25px;left:50%; transform: translate(-50%, 0);" >
                 <Button  type="primary" @click="back" class="list-btn" >返回</Button>
                 <Button v-for="(item,index) in buttonluch"  class="list-btn" :key="index" type="primary" @click='luch(item)'>{{item}}</Button>
                 <!-- <Button  type="primary" @click="luch" class="list-btn" >提交</Button> -->
            </div>
        </Card>
    </div>
</template>
<script src='./index.js'></script>
