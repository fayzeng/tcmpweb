<template>
  <div v-if="modalflag">
    <Modal v-model="modalflag"  width="700" :title="modaltitle">
      <Form :model="FormItem" :inline="true" :label-width="100">
        <Row>
           <Col span="12">
              <FormItem label="模板名称" prop="name">
                  <Input v-model="FormItem.template_name" style="width:200px" ></Input>
              </FormItem>
            </Col>
            <!-- <Col span="12">
              <FormItem label="业务类型" prop="name">
                <Select v-model="FormItem.business_type" style="width:200px">
                    <Option v-for="item in businessTypeList" :value="item.key" :key="item.key">{{ item.value }}</Option>
                </Select>
              </FormItem>
            </Col> -->
            <!-- <Col span="12">
              <FormItem label="模板代码" prop="name">
                <Select v-model="FormItem.model_code" style="width:200px">
                    <Option v-for="item in modelCodeList" :value="item.key" :key="item.key">{{ item.value }}</Option>
                </Select>
              </FormItem>
            </Col> -->
            <!-- <Col span="12">
              <FormItem label="是否默认" prop="name">
                <RadioGroup v-model="FormItem.default_flag">
                  <Radio label="1">
                      <span>是</span>
                  </Radio>
                  <Radio label="0">
                      <span>否</span>
                  </Radio>
                </RadioGroup>
              </FormItem>
            </Col> -->
              <!-- <Col span="12">
                <FormItem label="是否启用" prop="name">
                  <RadioGroup v-model="FormItem.inuse">
                    <Radio label="1">
                        <span>是</span>
                    </Radio>
                    <Radio label="0">
                        <span>否</span>
                    </Radio>
                  </RadioGroup>
                </FormItem>
              </Col> -->
            <Col span="12">
              <FormItem label="服务类标识" prop="name">
                <Input v-model="FormItem.service_code" style="width:200px" ></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="菜单代码" prop="name">
                <Select v-model="FormItem.template_code" style="width:200px">
                    <Option v-for="item in templateCodeList" :value="item.key" :key="item.key">{{ item.value }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="新增接口" prop="name">
                  <Input v-model="FormItem.create_interface" style="width:200px" ></Input>
              </FormItem>
            </Col>
                <Col span="12">
              <FormItem label="获取详情接口" prop="name">
                  <Input v-model="FormItem.update_interface" style="width:200px" ></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="修改主键" prop="name">
                  <Input v-model="FormItem.key_code" style="width:200px" ></Input>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="备注" prop="name" style="width:98%">
                <Input v-model="FormItem.remark" type="textarea" :rows="4" ></Input>
              </FormItem>
            </Col>
         </Row>
      </Form>
      <div class="buttoncenter" slot="footer">
        <Button   size='small' @click="modalflag = false">取消</Button>
        <Button type="warning" size='small' @click="modalflag = false">重置</Button>
        <Button type="success" size='small' :loading='loading' @click="savetemplate">保存</Button>
      </div>
    </Modal>
  </div>
</template>
<script src='./index.js'></script>
