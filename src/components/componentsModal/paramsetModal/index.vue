<template>
  <div v-if="modalflag">
    <Modal v-model="modalflag" width="700" :title="modaltitle">
        <Form :model="Modalform" :label-width="100" ref="Modalform" :rules="ModalRule">
          <Row>
            <Col :span="12">
              <FormItem label="字段英文" prop="columnen">
                <Input v-model="Modalform.columnen" style="width: 200px"/>
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem label="字段中文" prop="columncn">
                 <Input v-model="Modalform.columncn"  style="width: 200px"/>
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem label="参数值" >
                 <Input v-model="Modalform.default_Value"  style="width: 200px"/>
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem label="类别名称" prop='type_Name'>
                <!-- <Input v-model="Modalform.type_Name" style="width: 200px"/> -->
                <Select v-model="Modalform.type_Name"  style="width:200px">
                    <Option v-for="item in typenameList" :value="item.key" :key="item.value">{{ item.name }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col :span="12">
               <FormItem label="所属组织" prop='organisation '>
                <Input v-model="Modalform.organisation " style="width: 200px"/>
              </FormItem>
            </Col>
           <Col :span="12">
               <FormItem label="平台标识" prop='platIdentity '>
                <Input v-model="Modalform.platIdentity " style="width: 200px"/>
              </FormItem>
            </Col>    
           <Col :span="12">
               <FormItem label="参数验证正则" prop='regularverification '>
                <Input v-model="Modalform.regularverification " style="width: 200px"/>
              </FormItem>
            </Col>
          </Row>
        </Form>
            <div class="buttoncenter" slot="footer">
                <Button   @click="modalflag=false">取消</Button>
                <Button type="warning" @click="Reset">重置</Button>
                <Button type="primary" :loading="loading" @click="confirm('Modalform')">保存</Button>
            </div>
    </Modal>
  </div>
</template>
<script src='./index.js'></script>
