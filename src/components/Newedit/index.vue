<style lang="less" scoped>
    @import './index.less';
</style>
<template>
    <div class='table_com'>
           <Form  :label-width="240"  :rules="rule">
              <Tabs  v-model="isActive">
                  <TabPane v-for="(ele,index) in fieldData" :key='index' :label="ele.field_name" :name='`tab_${ele.field_id}`'>
                      <Row v-if='isActive == `tab_${ele.field_id}`'>
                          <Col :xs="24" :sm="24" :md="24" :lg="12" :xl='12' :xxl='8' :class="{'activeheigth':item.conceal==1 }"  v-for="(item,num) in ele.fieldarr" :key='num' v-if='item.field_type != 2 && item.field_type != 20 && item.field_type != 21  && item.field_type != 22 '>
                                <addcompoent :item='item'></addcompoent>
                          </Col>
                          <Col span='24'  v-else-if="item.field_type == 20 ">
                               <temptable  :disabled='item.disable_flag==1' ref="searchtable" :attribute='item.library_code' :editid="editid"></temptable>
                          </Col>
                          <Col span='24' v-else-if='item.field_type == 2 || item.field_type == 21 || item.field_type == 22'>
                                <FormItem v-if="item.conceal==1" :label="item.field_name"  :prop="item.enabled==1 ? 'mustInput' : ' '">
                                    <Input v-if='item.field_type == 2'  v-model.lazy="item.field_value" type="textarea" :rows="3" :disabled='item.disable_flag==1'  style="width:94%"></Input>
                                    <CheckboxGroup v-if='item.field_type == 21'  v-model="item.field_value"  >
                                          <Checkbox :disabled='item.disable_flag==1' v-for="(checkItem,checkInd) in item.codelist" :key="checkInd" :label="checkItem.key" >{{checkItem.name}}</Checkbox>
                                   </CheckboxGroup>
                                   <span  v-if='item.field_type == 22'>
                                     <Checkbox   v-model.trim="item.field_value" :disabled='item.disable_flag==1'>{{item.field_name}}</Checkbox>
                                       <Input v-model.trim="inputval" type="textarea" :rows="1" :disabled='item.disable_flag==1'  style="width:80%"></Input>
                                    </span>
                                </FormItem>
                          </Col>
                      </Row>
                  </TabPane>
              </Tabs>
            </Form>
            <div v-if="!tempId"  style="position:fixed;bottom:25px;left:50%;margin-top:14px;">
                <!-- <Button  type="primary" @click="storage">暂存</Button> -->
                <Button  type="primary" @click="goback">返回</Button>
                <Button  type="primary" @click="addsave">提交</Button>
            </div>
        </Layout>
    </Layout>
  </div>
</template>
<script src="./index.js"></script>
<style>
.active .ivu-row{
  z-index: -99;
}
</style>
