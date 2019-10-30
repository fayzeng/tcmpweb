<template>
  <div v-if="modalflag">
    <Modal v-model="modalflag" width="700" :title="modaltitle">
        <Form :model="Modalform" :label-width="100" ref="Modalform" :rules="ModalRule">
          <Row>
            <Col :span="12">
              <FormItem label="岗位名称" prop="gradeName">
                <Input v-model="Modalform.gradeName" style="width: 200px"/>
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem label="所属部门" prop="groupName">
                 <Input v-model="Modalform.groupName" :readonly='true' icon="ios-search"   @click.native="search(1)" style="width: 200px"/>
              </FormItem>
            </Col>

            <Col :span="12">
              <FormItem label="上级岗位" >
                 <Input v-model="Modalform.pName" :readonly="true" icon="ios-search"   @click.native="search(2)"  style="width: 200px"/>
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem label="岗位编号" prop='gradeCode'>
                <Input :disabled="modaltitle=='修改岗位信息'" v-model="Modalform.gradeCode" style="width: 200px"/>
              </FormItem>
            </Col>
            <Col :span="24">
              <FormItem label="备注">
                <Input type="textarea" v-model="Modalform.description" />
              </FormItem>
            </Col>

          </Row>
        </Form>
            <div class="buttoncenter" slot="footer">
                <Button   @click="Close">取消</Button>
                <Button type="warning" @click="Reset">重置</Button>
                <Button type="primary" :loading="loading" @click="confirm('Modalform')">保存</Button>
            </div>
    </Modal>
    <tableModal ref="tableModal" @updatedata='updatedata' :attribute='propname'></tableModal>
  </div>
</template>
<script src='./index.js'></script>
