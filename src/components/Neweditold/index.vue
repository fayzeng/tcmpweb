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
                              <FormItem v-if="item.conceal==1" :label="item.field_name"  :prop="item.enabled==1 ? 'mustInput' : ' '">

                                  <Input v-if="item.field_type == 1 || item.field_type == 13 || item.field_type == 14"   v-model.lazy="item.field_value"  :disabled='item.disable_flag==1' style="width:80%"></Input>

                                  <Select v-else-if="item.field_type==3 || item.field_type==4"   :clearable='item.disable_flag!=1' :multiple='item.field_type==4'  filterable  v-model.lazy="item.field_value" :disabled='item.disable_flag==1' @on-change="selectbankname(item)"  style="width:80%" label-in-value>
                                      <Option  v-for='(selectItem,selectIndex) in item.codelist' :key=" selectIndex+ Math.random()" :value="selectItem.key" >{{selectItem.name}}</Option>
                                  </Select>

                                  <Select v-else-if="item.field_type==5"   :clearable='item.disable_flag!=1'   v-model.lazy="item.field_value"  :disabled='item.disable_flag==1' @on-change="linkage(item)"  style="width:80%" label-in-value>
                                      <Option  v-for='(selectItem,selectIndex) in item.codelist' :key=" selectIndex+ Math.random()" :value="selectItem.key" >{{selectItem.name}}</Option>
                                 </Select>

                                  <InputNumber v-else-if="item.field_type==6 || item.field_type==7" :min="1"     v-model.lazy="item.field_value" :step="item.field_type==6 ? 1 : 0.1" :disabled='item.disable_flag==1' style="width:80%" ></InputNumber>


                                  <Input v-else-if="item.field_type==8"  :min="1" v-model.lazy="item.field_value" :disabled='item.disable_flag==1' @on-blur="onfocus(item)"  style="width:80%" ></Input>

                                  <DatePicker v-else-if="item.field_type==9" type="date"  v-model.lazy="item.field_value"  :disabled='item.disable_flag==1' :readonly='item.disable_flag==1'   style="width:80%" ></DatePicker>

                                  <Input v-else-if="item.field_type==17"     v-model.lazy="item.field_value"  :disabled='item.disable_flag==1'  icon="ios-search"  style="width:80%" @click.native="searchtable(item.library_code,item.field_value)"></Input>

                                  <Checkbox v-else-if="item.field_type==18" v-model.lazy="item.field_value" :disabled='item.disable_flag==1'>{{item.field_name}}</Checkbox>

                                  <Select v-else-if="item.field_type==19" filterable  :clearable='item.disable_flag!=1'   v-model.lazy="item.field_value" :disabled='item.disable_flag==1' style="width:80%">
                                      <Option  v-for='(selectItem,selectIndex) in item.codelist' :key="selectIndex" :value="selectItem.userId" >{{selectItem.name}}</Option>
                                  </Select>
                                 {{item.units}}
                                    <a v-if='item.field_prompt' :title='item.field_prompt' style="color:black"><Icon type="ios-help-circle-outline"   size='16' /></a>
                              </FormItem>
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
                <Button  type="primary" @click="storage">暂存</Button>
                <Button  type="primary" @click="goback">返回</Button>
                <Button  type="primary" @click="addsave">提交</Button>
            </div>
        </Layout>
    </Layout>
    <tableModal ref="tableModal" @updatedata="updatedata" :attribute='tabletype'></tableModal>
    <tabletreeModal ref="tabletreeModal" @updateopen="updateopen"></tabletreeModal>
  </div>
</template>
<script src="./index.js"></script>
<style>
.active .ivu-row{
  z-index: -99;
}
</style>
