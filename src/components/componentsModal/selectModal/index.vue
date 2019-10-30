<template>
      <div v-if="modalflag">
          <Modal v-model="modalflag" width="1000" title="选择">
              <Card v-if="querylist.length">
              <Row >
                  <Form :model="param" class="searchrow">
                      <template v-for="(item,index) in querylist"  >
                          <template v-if="item.type=='daterange'">
                              <Col   span="6">
                                  <FormItem  :label="item.label+'开始时间'" :label-width="110" label-position="left" >
                                      <DatePicker  size="small" type="date" v-model="param[item.name+'_start']" placement="bottom-end" style="width: 100%"></DatePicker>
                                  </FormItem>
                              </Col>
                              <Col   span="6">
                                  <FormItem  :label="item.label+'结束时间'" :label-width="110" label-position="left" >
                                      <DatePicker  size="small" type="date" v-model="param[item.name+'_end']" placement="bottom-end" style="width: 100%"></DatePicker>
                                  </FormItem>
                              </Col>
                          </template>
                          <Col  v-else  span="6">

                              <FormItem  :label="item.label" :label-width="110" label-position="left" >
                                  <Input  v-if="item.type=='input'" size="small"  v-model="param[item.name]" ></Input>
                                  <Select   v-else-if="item.type=='select'" size="small" v-model="param[item.name]" >
                                      <Option v-for="ele in optionMap[item.name]" :value="ele.value" :key="ele.value">{{ele.label}}</Option>
                                  </Select>

                                  <DatePicker  v-else-if="item.type=='date'" size="small" type="date" v-model="param[item.name]" placement="bottom-end" style="width: 100%"></DatePicker>
                              </FormItem>
                          </Col>
                      </template>
                      <Col v-if="querylist.length>0" span="6">
                          <FormItem  :label-width="60" >
                              <Button size="small"  @click="search"  type="primary"  >查询</Button>
                              <Button size="small"  @click="reset"  type="primary" style="margin-left:10px;"  >重置</Button>
                          </FormItem>
                          </Col>

                      </Col>
                  </Form>
              </Row>
              </Card>
              <Table  border stripe class='table_com'  :data='tableData' :columns="tableColumns" @on-selection-change='selectRow' ></Table>
              <div v-if="isPage" style="margin: 10px;overflow: hidden">
                  <div style="float: right;">
                      <Page :total="total" :current="currentPage" :page-size='10' @on-change="changePage" @on-select='selectRow' ></Page>
                  </div>
              </div>
              <div slot="footer">
                  <Button   @click="Close">取消</Button>
                  <Button type="primary" @click="confirm('Modalform')">选择</Button>
              </div>
          </Modal>
      </div>
</template>
<script src='./index.js'></script>
