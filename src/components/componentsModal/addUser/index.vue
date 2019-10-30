<style lang="less" >
 .demo-upload-list{
      display: inline-block;
      width: 60px;
      height: 60px;
      text-align: center;
      line-height: 60px;
      border: 1px solid transparent;
      border-radius: 4px;
      overflow: hidden;
      background: #fff;
      position: relative;
      box-shadow: 0 1px 1px rgba(0,0,0,.2);
      margin-right: 4px;
  }
  .demo-upload-list img{
      width: 100%;
      height: 100%;
  }
  .demo-upload-list-cover{
      display: none;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0,0,0,.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover{
      display: block;
  }
  .demo-upload-list-cover i{
      color: #fff;
      font-size: 20px;
      cursor: pointer;
      margin: 0 2px;
  }
</style>
<template>
  <div v-if="modalflag">
    <Modal v-model="modalflag" width="1100" :title="modaltitle">
        <Form :model="Modalform" label-position="right"  :inline="true" :label-width="100" ref="Modalform" :rules="ModalRule">
          <Row>
            <Col :span="8">
              <FormItem label="用户姓名:" prop="name">
                <Input v-model="Modalform.name"  style="width: 180px"/>
              </FormItem>
            </Col>
            <Col :span="8">
              <FormItem label="员工工号:" prop='name'>
                <Input v-model="Modalform.userName" :disabled='modaltitle == "修改员工信息"'   style="width: 180px"/>
              </FormItem>
            </Col>
            <Col :span="8">
              <FormItem label="身份证号:" prop="name">
                <Input v-model="Modalform.idNumber" style="width: 180px"/>
              </FormItem>
            </Col>
            <!-- <Col :span="8">
              <FormItem label="所属部门" prop="groupId">
                     <Select v-model="Modalform.groupId" style="width:180px">
                  <Option v-for="(item,ind) in groupList" :key="ind" :label="item.groupName" :value="item.groupId"></Option>
                </Select>
              </FormItem>
            </Col>
            <Col :span="8">
              <FormItem label="所属岗位" prop="gradeId">
                     <Select v-model="Modalform.gradeId" style="width:180px">
                  <Option v-for="(item,ind) in postList" :key="ind" :label="item.gradeName" :value="item.gradeId"></Option>
                </Select>
              </FormItem>
            </Col> -->
            <Col :span="8">
              <FormItem label="员工状态:">
                <Select v-model="Modalform.status" style="width:180px">
                  <Option v-for="item in userStatus" :value="item.value" :key="item.value">{{item.label}}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col :span="8">
              <FormItem label="固定电话:">
                <Input v-model="Modalform.phone" style="width: 180px"/>
              </FormItem>
            </Col>
            <Col :span="8">
              <FormItem label="手机电话:" prop="name">
                <Input v-model="Modalform.telPhone" style="width: 180px"/>
              </FormItem>
            </Col>

            <Col :span="8">
              <FormItem label="账号有效期:">
                  <DatePicker type="date" v-model="Modalform.effectiveDate" placeholder="请选择日期" style="width: 180px" :options="optionDate"></DatePicker>
              </FormItem>
            </Col>
            <!-- <Col :span="8">
              <FormItem label="锁屏时间">
                    <InputNumber style="width: 180px"   :max="60"  :min="0" v-model="Modalform.lockScreenTime" :formatter="value => `${value}min`" :parser="value => value.replace('min', '')"></InputNumber>
              </FormItem>
            </Col> -->
            <Col :span="8">
              <FormItem label="传真号码:">
                    <Input v-model="Modalform.fax" style="width: 180px"/>
              </FormItem>
            </Col>
            <Col :span="8">
              <FormItem label="资格证书:">
                <Input v-model="Modalform.qualification" style="width: 180px"/>
              </FormItem>
            </Col>
            <Col :span="8">
              <FormItem label="证书名称:">
                <Input v-model="Modalform.certLevelName" style="width: 180px"/>
              </FormItem>
            </Col>
            <Col :span="8">
              <FormItem label="证书编号:">
                <Input v-model="Modalform.certLevelNo" style="width: 180px"/>
              </FormItem>
            </Col>
            <Col :span="8">
              <FormItem label="所属部门:" prop="name">
                <Input v-model="groupName" readonly icon='ios-search' @click.native="search(1)" style="width: 180px"/>
              </FormItem>
            </Col>
            <Col :span="8">
              <FormItem label="是否高管:">
                  <Select v-model="Modalform.isLeader" style="width:180px">
                    <Option v-for="item in istatusarr" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
              </FormItem>
            </Col>
             <Col :span="8">
              <FormItem label="是否董事:">
                <Select v-model="Modalform.isDirector" style="width:180px">
                  <Option v-for="item in istatusarr" :value="item.value" :key="item.value">{{item.label}}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span='8'>
              <FormItem label="上传签名:">
                <div class="demo-upload-list" v-for="(item,index) in uploadList">
                    <template >
                        <img :src="item.url">
                        <div class="demo-upload-list-cover">
                            <!-- <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon> -->
                            <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
                        </div>
                    </template>
                    <!-- <template v-else>
                        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                    </template> -->
                </div>
                <Upload
                    v-if='uploadList.length == 0'
                    ref="upload"
                    :show-upload-list="false"
                    :on-success="handleSuccess"
                    :on-error='handleError'
                    :format="['jpg','jpeg','png']"
                    :max-size="2048"
                    :on-format-error="handleFormatError"
                    :before-upload="handleBeforeUpload"
                    :data='imgparam'
                    type="drag"
                    :action="url"
                    style="display: inline-block;width:58px;">
                    <div style="width: 58px;height:58px;line-height: 58px;">
                        <Icon type="ios-camera" size="20"></Icon>
                    </div>
                </Upload>
              </FormItem>
            </Col>
            <!-- <Col :span="8">
              <FormItem label="岗位">
                <Input v-model="gradeName" style="width: 180px"/>
                <Icon type="ios-search" size="18" @click="search(9)"></Icon>
              </FormItem>
            </Col> -->
          </Row>
        </Form>
            <div slot="footer" class="buttoncenter">
                <Button    class="cancelbutton" @click="Close">取消</Button>
                <Button type="warning"  class="resetbutton" @click="reset">重置</Button>
                <Button type="success"  class="savebutton" :loading="loading" @click="confirm('Modalform')">保存</Button>
            </div>
    </Modal>
    <tableModal ref="tableModal" @updatedata='updatedata' :attribute='propname'></tableModal>
    </div>
</template>
<script src='./index.js'></script>
