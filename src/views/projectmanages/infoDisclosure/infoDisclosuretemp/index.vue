<style lang="less" scoped>
   @import "index.less";
</style>
<template>
    <div>
      <Card>
          <Row>
            <Col span="2">
               <Button type="primary" @click="typemanage">类型管理</Button>
            </Col>
          </Row>
          <Row  class='cloumn'>
             <Col span='5' push='1'>信息披露模板</Col>
             <Col span='3'>生成方式</Col>
             <Col span='2'>模板类型</Col>
             <Col span='2'>上传类型</Col>
             <Col span='3'>模板文档</Col>
             <Col span='2'>项目类型</Col>
             <Col span='2'>是否启用</Col>
             <Col span='2'>是否默认</Col>
             <Col span='2'>操作</Col>
          </Row>
          <Collapse >
              <Panel  v-for='(item,index) in inforarr' :key='index'>
                  {{item.typename}}
                  <a style="font-size:10px" @click='add(item)'>新增模板</a>
                  <p slot="content">
                      <Row v-for='(ele,eledex) in item.templates' :key='eledex'>
                         <Col span='5' push='1'>
                              {{ele.temp_name  ? ele.temp_name : '--'}}
                         </Col>
                         <Col span='3'>
                              {{ele.create_type  ? ele.create_type : '--'}}
                         </Col>
                         <Col span='2'>
                              {{ele.temp_type  ? ele.temp_type : '--'}}
                         </Col>
                         <Col span='2'>
                              {{ele.upload_type ? ele.upload_type : '--' }}
                         </Col>
                         <Col span='3'>
                              {{ele.temp_file  ? ele.temp_file : '--'}}
                         </Col>
                         <Col span='2'>
                              {{ele.project_type  ? ele.project_type : '--'}}
                         </Col>
                         <Col span='2'>
                              <Checkbox v-model="ele.isenable" @on-change='checkenable(ele,$event)'></Checkbox>
                         </Col>
                         <Col span='2'>
                              {{ele.isdeault  ? ele.isdeault : '--'}}
                         </Col>
                         <Col span='2'>
                            <a class='fontcol'><Icon type="md-brush" @click.native='edit(ele)' size='18' /></a>
                            <a  class='fontcol' style="margin-left:6px"><Icon type="ios-trash" @click.natice='deltemplate(ele)' size='18' /></a>
                         </Col>
                      </Row>
                  </p>
              </Panel>
          </Collapse>
      </Card>
      <deletemodal @updatedelete='updatedelete' ref="deletemodal"></deletemodal>
      <div v-if='modalflag'>
          <Modal title="类型管理" width="760" v-model="modalflag">
              <a  class='fontcol' style="margin-left:6px"><Icon type="ios-trash" @click.natice='deltype' size='18' /></a>
              <a  class='fontcol' style="margin-left:6px"><Icon type="md-add" @click.natice='addtype' size='18' /></a>
              <CheckboxGroup   v-model="checkAllGroup" style="margin-top:12px;" >
                  <Checkbox style='display:block;margin-top:8px;' :label='item.id'  v-for='(item,index) in inforarr' :key='index' >{{item.typename}}</Checkbox>
              </CheckboxGroup>
                <div class="buttoncenter" slot="footer">
                    <Button   @click="modalflag = false">取消</Button>
                    <Button type="success" @click="modalflag = false">完成</Button>
                </div>
          </Modal>
      </div>
      <div v-if='addtypeflag'>
          <Modal title="类型新增" width="460" v-model="addtypeflag">
              <Form   :label-width="100" >
                <Row >
                  <Col span="24">
                    <FormItem label="类型名称" prop="groupCode">
                      <Input   v-model="typename" />
                    </FormItem>
                  </Col>
                </Row>
              </Form>
                <div class="buttoncenter" slot="footer">
                    <Button   @click="addtypeflag = false">取消</Button>
                    <Button type="success" @click="confirmtype">保存</Button>
                </div>
          </Modal>
      </div>
      <div v-if='addttemplate'>
          <Modal title="模板新增" width="400" v-model="addttemplate">
              <Form   :label-width="100" :rules='rule' >
                <Row >
                  <Col span="24">
                    <FormItem label="模板名称" prop="name">
                        <Input   v-model="tempName" style="width:200px" />
                    </FormItem>
                  </Col>
                  <Col span="24">
                    <FormItem label="生成方式" prop="name">
                        <Select v-model="createType" style="width:200px">
                           <Option v-for="item in typelist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                       </Select>
                    </FormItem>
                  </Col>
                  <Col span="24">
                    <FormItem label="是否启用" prop="name">
                        <Select v-model="isenable" style="width:200px">
                           <Option v-for="item in isenablelist" :value="item.key" :key="item.key">{{ item.value }}</Option>
                       </Select>
                    </FormItem>
                  </Col>
                  <Col span="24">
                    <FormItem label="上传参数" prop="name">
                        <Upload :action="url" :on-format-error="contentError" :on-success="contentSuccess"  :show-upload-list='false'>
                            <Button icon="ios-cloud-upload-outline">选择文件</Button>
                        </Upload>
                    </FormItem>
                  </Col>
                  <Col span="24">
                    <FormItem label="上传内容" prop="name">
                        <Upload :action="url" :on-format-error="contentError" :on-success="contentSuccess" :show-upload-list='false'>
                            <Button icon="ios-cloud-upload-outline">选择文件</Button>
                        </Upload>
                    </FormItem>
                  </Col>
                </Row>
              </Form>
                <div class="buttoncenter" slot="footer">
                    <Button   @click="addttemplate = false">取消</Button>
                    <Button type="success" @click="addtemp">保存</Button>
                </div>
          </Modal>
      </div>
    </div>
</template>
<script src="./index.js"></script>
