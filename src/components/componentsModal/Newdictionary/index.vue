<template>
   <div v-if="modalflag">
       <Modal
          v-model="modalflag"
          width='700'
           @on-ok="confirm"
          @on-cancel="Close"
          :title="title">
          <div slot="footer" class="buttoncenter">
            <Button    class="cancelbutton" @click="Close">取消</Button>
            <Button type="warning"  class="resetbutton" @click="reset">重置</Button>
            <Button type="success"  class="savebutton" :loading='loading' @click="confirm">保存</Button>
          </div>
          <Form :model="param" :label-width="80" :rules="ruleValidate" ref="formValidate">
            <Row>
              <Col span='12'>
                <FormItem label="字典类型" prop="codetype">
                    <Input v-model="param.codetype"/>
                </FormItem>
              </Col>
              <Col span='12' >
                <FormItem label="字典描述" prop="description">
                    <Input v-model="param.description"/>
                </FormItem>
              </Col>
            </Row>
            <Row v-for='(item,index) in param.dicinfo' :key='index'>
              <Col span='7'>
                <FormItem label="字典key" prop="dicKey">
                    <Input v-model="item.dicKey"/>
                </FormItem>
              </Col>
              <Col span='7'>
                <FormItem label="字典value" prop="dicValue">
                    <Input v-model="item.dicValue"/>
                </FormItem>
              </Col>
              <Col span='7'>
                <FormItem label="字典排序" prop="orders">
                    <Input v-model="item.orders"/>
                </FormItem>
              </Col>
              <Col span='1' push='1' v-if='index == param.dicinfo.length-1'>
                <Icon type="md-add"  @click.native='addinfo' size='20'/>
              </Col>
            </Row>
        </Form>
      </Modal>
   </div>
</template>
<script src='./index.js'></script>
