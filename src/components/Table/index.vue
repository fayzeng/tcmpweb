<style lang="less" scoped>
    @import "index.less";
</style>
<template>
    <div>
         <Card v-if="querylist.length" >
            <Row >
            <Form :model="param" class="searchrow">
                <span v-for="(item,index) in querylist"  >
                    <span v-if="item.type=='daterange'">
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
                    </span>
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
                </span>
                <Col v-if="querylist.length>0" span="4" push='1'>
                    <!-- <FormItem  :label-width="50" > -->
                        <Button size="small"  @click="searchtable"  type="success" icon='ios-search' >查询</Button>
                        <Button size="small"  @click="reset"  type="warning" icon='refresh' style="margin-left:10px;"  >重置</Button>
                    <!-- </FormItem> -->
                    </Col>

                </Col>
            </Form>
          </Row>
         </Card>
         <Card class="table_com">
            <!-- <Row>
                 <span class="list-btn"  v-for="(item,index) in buttonarr"  :key="index" >
                    <Dropdown  v-if="item.code == 'status'" @on-click="setStatus" >
                        <Button type="primary">
                            状态
                            <Icon type="ios-arrow-down"></Icon>
                        </Button>
                        <DropdownMenu  slot="list">
                            <DropdownItem  v-for="(item,ind) in statusList" :key="ind" :name='item.flag'>{{item.name}}</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                <span>
            </Row> -->
            <Row >
                <span class="list-btn"  v-for="(item,index) in buttonarr1"  :key="index" >
                   <Dropdown  v-if=" item.code == 'status'|| item.code == 'userstatus'|| item.code=='processstatus'" @on-click="setStatus(item.code,$event)" >
                        <Button style="margin-top:5px" type="primary">
                            状态
                            <Icon type="ios-arrow-down"></Icon>
                        </Button>
                        <DropdownMenu v-if=" item.code == 'status'|| item.code == 'userstatus' || item.code=='processstatus'" slot="list">
                            <DropdownItem  v-for="(item,ind) in item.code == 'status'?statusList:(item.code == 'userstatus'?userstatusList:processstatusList)" :key="ind" :name='item.flag'>{{item.name}}</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                   <Button v-else :icon='item.icon' type="primary"  style="margin-top:5px"  size="small" @click="buttonClick(item.code)"  >{{item.name}}</Button>
                </span>
                <Dropdown class="list-btn"  v-if="buttonarr2.length" @on-click="button2click" >
                    <Button style="margin-top:5px" type="error">
                        更多
                        <Icon type="ios-arrow-down"></Icon>
                    </Button>
                    <DropdownMenu  slot="list">
                        <DropdownItem  v-for="(item,ind) in buttonarr2" :key="ind" :name='item.code'>{{item.name}}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>

            </Row>
            <Table class="table_com"  border ref="table"  :data='tableData' :columns="tableColumns"  @on-row-click="rowClick" @on-selection-change='selectRow' ></Table>
            <div style="overflow: hidden;background:#f8f8f9;">
                <div style="float: left;margin: 10px;" >
                    <p>共有<a>{{total}}</a>条数据，当前第<a>{{nowpage}}</a>页</p>
                </div>
                <div style="float: right;margin: 10px;">
                    <Page :total="total" :current="currentPage" :page-size='10' @on-change="changePage" @on-select='selectRow' show-elevator ></Page>
                </div>
            </div>
         </Card>
        <!-- <div id="flagmodel">

        </div> -->


        <deletemodal @changpage='changePage(1)' @updatedelete='updatedelete' ref="deletemodal"></deletemodal>
        <delDelegate @changpage='changePage(1)' @updatedelete='updatedelete' ref="delDelegate"></delDelegate>
        <Newannouncement  @changpage='changePage(1)' ref="Newannouncement"></Newannouncement>
        <set-staff-modal  @changpage='changePage(1)' ref="setStaffModal"/>
        <copy-auth-modal  @changpage='changePage(1)' ref="copyAuthModal"/>
        <set-auth-modal  @changpage='changePage(1)' ref="setAuthModal"/>
        <Addrole  @changpage='changePage(1)' ref="addrole"></Addrole>
        <addUser  @changpage='changePage(1)' ref="addUser"></addUser>
        <resetpassword  @changpage='changePage(1)' ref="resetpassword"></resetpassword>
        <setUser  @changpage='changePage(1)' ref="setUser"></setUser>
        <addtemplate  @changpage='changePage(1)' ref="addtemplate"></addtemplate>
        <set-group  @changpage='changePage(1)' ref="setGroup"></set-group>
        <group-set-staff  @changpage='changePage(1)' ref="groupSetStaff"></group-set-staff>
        <group-set-auth  @changpage='changePage(1)' ref="groupSetAuth"></group-set-auth>
        <addpost  @changpage='changePage(1)' ref="addpost"></addpost>
        <userManage  @changpage='changePage(1)' ref="userManage"></userManage>
        <setStatus  @changpage='changePage(1)' ref="setStatus"></setStatus>
        <newdic @changpage='changePage(1)' ref="newdic" ></newdic>
        <condeploy ref="condeploy"></condeploy>
        <addOrgModal  @updateaddtree='updateaddtree' @updatedittree='updatedittree' ref="addOrgModal"></addOrgModal>
        <seechart ref="seechart"></seechart>
        <noticedata @changpage='changePage(1)' ref="noticedata"></noticedata>
        <launchmodel ref="launchmodel"></launchmodel>
        <addcalendar @changpage='changePage(1)' ref="addCalendar"></addcalendar>
        <backfile @changpage='changePage(1)' ref="backfile"></backfile>
        <tipsModal @changpage='changePage(1)' ref="tipsModal"></tipsModal>
        <commonword @changpage='changePage(1)'  ref="commonword"></commonword>
         <addDelegate @changpage='changePage(1)' ref="addDelegate" ></addDelegate>     <!-- 点击授权页面 -->
        <addapprove @changpage='changePage(1)' ref="addapprove" ></addapprove>
        <addpledge @changpage='changePage(1)' ref="addpledge" ></addpledge>
        <addcustomer @changpage='changePage(1)' ref="addcustomer" ></addcustomer>
        <addguarantee @changpage='changePage(1)' ref="addguarantee" ></addguarantee>
        <addsubjectmatter @changpage='changePage(1)' ref="addsubjectmatter" ></addsubjectmatter>
        <Seelog ref="Seelog"></Seelog>
        <uploadapprove  @changpage='changePage(1)' ref="uploadapprove"></uploadapprove>
        <reviewModal @changpage='changePage(1)' ref="reviewModal"></reviewModal>
        <tableModal @changpage='changePage(1)' attribute='usersettings' ref="tableModal"></tableModal>
        <paramsetModal @changpage='changePage(1)' ref="paramsetModal"></paramsetModal>
        <filemanageModal  @changpage='changePage(1)' ref="filemanageModal"></filemanageModal>
        <withdrawModal  @changpage='changePage(1)' ref="withdrawModal"></withdrawModal>
        <StatechangeModal @changpage='changePage(1)' ref="StatechangeModal"></StatechangeModal>
        <projectestablish @changpage='changePage(1)' ref="projectestablish"></projectestablish>
    </div>
</template>
<script src='./index.js'></script>
