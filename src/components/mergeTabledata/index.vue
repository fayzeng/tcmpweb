<template>
        <div v-if="modalflag">
                  <Card style="margin-bottom:10px" v-if="querylist.length">
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
                                         <Cascader  v-else-if="item.type=='cascader'" :data="cascaderdata" v-model="param[item.name]" @on-change='changevalue($event,item.name)' size="small" change-on-select></Cascader>
                                        <DatePicker  v-else-if="item.type=='date'" size="small" type="date" v-model="param[item.name]" placement="bottom-end" style="width: 100%"></DatePicker>
                                    </FormItem>
                                </Col>
                            </template>
                            <Col v-if="querylist.length>0" span="6">
                                <FormItem  :label-width="50" >
                                    <Button size="small"  @click="changePage(1)"  type="success" icon='ios-search' >查询</Button>
                                    <Button size="small"  @click="reset"  type="warning" icon='refresh' style="margin-left:10px;" >重置</Button>
                                </FormItem>
                                </Col>

                            </Col>
                        </Form>
                    </Row>
                </Card>
                <Table  border stripe class='table_com'  ref="table" @on-row-click="rowClick" @on-select='selectRow' @on-select-cancel='selectcancel' @on-select-all='selectAll' @on-select-all-cancel='selectcancelAll' :data='tableData' :columns="tableColumns" ></Table>
                <div style="margin: 10px;overflow: hidden">
                    <div style="float: right;">
                        <Page :total="total" :current="currentPage" :page-size='10' @on-change="changePage"></Page>
                    </div>
                </div>
        </div>
</template>
<script src='./index.js'></script>
