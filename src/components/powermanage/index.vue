<template>
    <div>
        <Card>
            <Tabs value="项目权限" @on-click='changeTab'>
                <TabPane label="项目权限" name="项目权限">
                      <mergeTbaledata v-if="flag==3" attribute='userprojectmanage' ref="tablelist" :paramsobj='paramsobj3' :permissions_type='permissions_type'></mergeTbaledata>
                    <!-- <Table border ref="selection" :columns="columns1" @on-select='selectRow' @on-select-all='selectAll' @on-select-all-cancel='selectcancelAll' @on-select-cancel='selectcancel' :data="data1"></Table>
                     <div style="overflow: hidden;background:#f8f8f9;">
                        <div style="float: left;margin: 10px;" >
                            <p>共有<a>{{total}}</a>条数据，当前第<a>{{nowpage}}</a>页</p>
                        </div>
                        <div style="float: right;margin: 10px;">
                            <Page :total="total" :current="currentPage" :page-size='10' @on-change="changePage"  show-elevator ></Page>
                        </div>
                    </div> -->
                </TabPane>
                <TabPane label="机构权限" name="机构权限">
                      <mergeTbaledata v-if="flag==1" attribute='groupmanage' ref="tablelist" :paramsobj='paramsobj1'  :permissions_type='permissions_type'></mergeTbaledata>
                </TabPane>
                <TabPane label="工作流权限" name="工作流权限">
                        <mergeTbaledata v-if="flag==2" attribute='processmanage' ref="tablelist" :paramsobj='paramsobj2'  :permissions_type='permissions_type'></mergeTbaledata>
                </TabPane>
            </Tabs>
        </Card>
    </div>
</template>
<script src='./index.js'></script>