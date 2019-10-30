<style lang="less" scoped>
    @import "./index.less";
</style>
<template>
    <div>
        <Row :gutter='12'>
            <Col :span="fieldinfo.field_type=='3' ? 15 :(fieldinfo.field_type?17: 24)">
                <Card>
                  <Button style="margin-bottom:6px;" type="primary" @click='addfield' >新增</Button>
                    <Collapse v-model="value">
                        <Panel name="1">
                                字段及布局
                            <Row slot="content">
                                <Col span="8" v-for="(item,index) in fieldarr" :key="index" class="mart">
                                    <Button :class="id ==item.field_id ? 'class-a' : 'class-b' " @click="fieldset(item.field_id)"   >{{item.field_name + item.sort}}</Button>
                                </Col>
                            </Row>
                        </Panel>
                    </Collapse>
                </Card>
            </Col>
            <Col :span="fieldinfo.field_type=='3' ? 8 : 6" style="position:fixed;top:110px;right:20px;" class="finfo" v-if="fieldinfo.field_type">
              <Col :span="fieldinfo.field_type=='3' ? 12 : 24">
                  <Card class="cardhei"  >
                      <b class="shrink1" @click="retract" ><a>收起 >></a></b>
                      <Form ref="formCustom" v-model="fieldinfo"  :label-width="110" >
                          <p v-if="fieldinfo.field_type=='1'"><span class="typeTip">(单行文本)</span>适用于填写简短的文字，如名字</p>
                          <p v-if="fieldinfo.field_type=='2'"><span class="typeTip">(多行文本)</span>适用于填写简短的文字，如“备注”、“建议”</p>
                          <p v-if="fieldinfo.field_type=='3'"><span class="typeTip">(单选)</span>适用于在几个选项里选一个，如投票、“男/女”</p>
                          <p v-if="fieldinfo.field_type=='4'"><span class="typeTip">(多选)</span>适用于几个选项里选多个，如投票</p>
                          <p v-if="fieldinfo.field_type=='5'"><span class="typeTip">(多级联动)</span>用于选择多层级信息, 如国民经济行业分类等</p>
                          <p v-if="fieldinfo.field_type=='6'"><span class="typeTip">(整数)</span>适用于填写数字，如年龄、订购数量</p>
                          <p v-if="fieldinfo.field_type=='7'"><span class="typeTip">(小数)</span>适用于填写数字，如度量单位、折扣信息</p>
                          <p v-if="fieldinfo.field_type=='8'"><span class="typeTip">(金额)</span>适用于填写数字，带千分位</p>
                          <p v-if="fieldinfo.field_type=='9'"><span class="typeTip">(日期)</span>适用于选择特定日期</p>
                          <p v-if="fieldinfo.field_type=='10'"><span class="typeTip">(图片)</span>图片类型适用于作为信息的一个补充，如合同附件等</p>
                          <p v-if="fieldinfo.field_type=='11'"><span class="typeTip">(附件)</span>附件类型适用于上传文件, 最多上传10个附件</p>
                          <p v-if="fieldinfo.field_type=='12'"><span class="typeTip">(分割线)</span>分割线可以将多个字段归为一个信息分组，方便用户预览和填写，每个分割线下边的字段为一个信息分组。</p>
                          <p v-if="fieldinfo.field_type=='13'"><span class="typeTip">(电话)</span>用于输入电话号码</p>
                          <p v-if="fieldinfo.field_type=='14'"><span class="typeTip">(邮件)</span>用于输入邮件地址</p>
                          <p v-if="fieldinfo.field_type=='15'"><span class="typeTip">(自动编号)</span>系统按照规则自动生成，不可修改</p>
                          <p v-if="fieldinfo.field_type=='16'"><span class="typeTip">(计算字段)</span>由数值型字段通过 ”+”、”-”、”*”、”/” 计算出结果，允许输入数字或括号进行混合运算，如 (字段A-字段B)*20</p>
                          <p v-if="fieldinfo.field_type=='17'"><span class="typeTip">(放大镜选择框)</span>选择岗位，项目，部门，用户 方便于查看基本信息</p>
                         <FormItem label="ID" >
                              <Input v-model="fieldinfo.field_id" :disabled='true' size="small"></Input>
                          </FormItem>
                          <FormItem label="字段名称" >
                              <Input v-model="fieldinfo.field_name" size="small"></Input>
                          </FormItem>
                          <FormItem  label="字段code" >
                              <Input v-model="fieldinfo.field_code" size="small"></Input>
                          </FormItem>
                          <FormItem  label="字段排序" >
                              <Input v-model="fieldinfo.sort" size="small"></Input>
                          </FormItem>
                          <FormItem  label="字段提示语" >
                              <Input v-model="fieldinfo.field_prompt" size="small"></Input>
                          </FormItem>
                          <FormItem label="字段描述" >
                              <Input v-model="fieldinfo.remark" type="textarea" style="font-size:10px" :autosize="{minRows: 2,maxRows: 5}"></Input>
                          </FormItem>
                          <FormItem label="字段类型">
                              <Select v-model="fieldinfo.field_type" size="small" @on-change="typeselect">
                                  <Option v-for="item in fieldtypearr"  :key="item.key" :value="item.key">{{item.value}}</Option>
                              </Select>
                          </FormItem>
                          <FormItem label="是否必填">
                              <RadioGroup v-model="fieldinfo.enabled" size="small">
                                  <Radio label="1">是</Radio>
                                  <Radio label="0">否</Radio>
                              </RadioGroup>
                          </FormItem>
                          <FormItem label="是否只读">
                              <RadioGroup v-model="fieldinfo.disable_flag" size="small">
                                  <Radio label="1">是</Radio>
                                  <Radio label="0">否</Radio>
                              </RadioGroup>
                          </FormItem>
                          <FormItem label="是否可见">
                              <RadioGroup v-model="fieldinfo.conceal" size="small">
                                  <Radio label="1">是</Radio>
                                  <Radio label="0">否</Radio>
                              </RadioGroup>
                          </FormItem>
                          <FormItem label="默认值" v-if="fieldinfo.field_type=='1' || fieldinfo.field_type=='2' || fieldinfo.field_type=='6'  || fieldinfo.field_type=='7' || fieldinfo.field_type=='8'  || fieldinfo.field_type=='9' ||  fieldinfo.field_type=='13' || fieldinfo.field_type=='14' || fieldinfo.field_type=='17' ||fieldinfo.field_type=='18'">
                              <Input v-model="fieldinfo.default_value" size="small"></Input>
                          </FormItem>
                          <FormItem  v-if="fieldinfo.field_type=='3' || fieldinfo.field_type=='4' ||  fieldinfo.field_type=='17' || fieldinfo.field_type=='19' || fieldinfo.field_type=='20'||fieldinfo.field_type=='21'||fieldinfo.field_type=='5'  "  :label=" fieldinfo.field_type=='17' || fieldinfo.field_type=='20'? '列表code' : '字典Code'" >
                              <Input v-model="fieldinfo.library_code" size="small"></Input>
                          </FormItem>
                          <FormItem  v-if="fieldinfo.field_type=='5'" label="级联父级ID" >
                               <Select v-model="fieldinfo.parent_id" filterable  size="small" f >
                                  <Option v-for="item in fieldarr" :value="item.field_id" :key="item.field_id">{{ item.field_name }}</Option>
                               </Select>
                          </FormItem>
                           <FormItem label="COPY_ID" >
                               <Select v-model="fieldinfo.copy_id" size="small" >
                                  <Option v-for="item in fieldarr" :value="item.field_id" :key="item.field_id">{{ item.field_name }}</Option>
                              </Select>
                          </FormItem>
                           <FormItem v-if="fieldinfo.field_type=='1'"  label="长度限制" >
                              <Input v-model="fieldinfo.field_length" number size="small"></Input>
                           </FormItem>
                          <FormItem  label="单位" >
                              <Input v-model="fieldinfo.units" size="small"></Input>
                          </FormItem>
                          <Row type="flex" justify="end" class="savebtn">
                              <Button type="primary" size="small" style="margin-right:10px;"  @click="deletefield" >删除</Button>
                              <Button type="primary" size="small"  @click="savefield" >保存</Button>
                          </Row>
                          </Form>
                  </Card>
                  </Col>
                  <Col span="12" v-if="fieldinfo.field_type=='3'">
                    <Card >
                        <Form  v-model="fieldinfo"  :label-width="60" >
                          <Col style="border:0.5px solid #ccc;padding:10px 5px;margin-bottom:10px;" v-for="(item,index) in fieldinfo.library_list" :key="index">
                               <FormItem  v-show="false" label="ID" >
                                      <Input v-model="fieldinfo.field_id" size="small"></Input>
                                  </FormItem>
                               <FormItem  label="对应字典">
                                 <Select v-model="item.library_value" size="small" >
                                     <Option v-for="item in codelist" :value="item.key" :key="item.key">{{ item.name }}</Option>
                                 </Select>
                               </FormItem>
                              <FormItem label="子级ID" >
                                <Select v-model="item.operation_id" multiple size="small" >
                                  <Option v-for="item in fieldarr" :value="item.field_id" :key="item.field_id">{{ item.field_name }}</Option>
                                 </Select>
                              </FormItem>
                              <FormItem  label="是否展示" >
                                  <RadioGroup v-model="item.conceal_flag" size="small">
                                      <Radio label="1">是</Radio>
                                      <Radio label="0">否</Radio>
                                  </RadioGroup>
                              </FormItem>
                               <a class="marl"><Icon type="md-add" @click.native="addselectarr(index)" size='18'/></a>
                               <a class="marl"><Icon type="md-close" @click.native="deletearr(item.list_id,index)" size='18'></Icon></a>
                          </Col>
                                <Row type="flex" justify="end" class="savebtn">
                                  <Button type="primary" size="small"  @click="savefieldlibrary" >保存</Button>
                              </Row>
                          </Form>
                    </Card>

                  </COl>
            </Col>

        </Row>
    </div>
</template>
<script src='./index.js'></script>
