<style lang="less">
   @import "index.less";
</style>
<template>
    <div>
      <Card style="padding-bottom:30px;">
        <Row>
           <Col span="6" style="border-right:1px solid #ccc;min-height:340px">
              <Tree :data="treedata" @on-select-change='selecttree'></Tree>
           </Col>
           <Col span="18">
              <!-- <h3 class="h3_title">系统菜单信息</h3> -->
              <Row>
                  <Col span="8">
                      <h3 class="h3_title">系统菜单信息</h3>
                  </Col>
                  <Col span="15">
                      <h3 class="h3_title">按钮权限信息</h3>
                  </Col>
              </Row>
              <Row>
                 <Col span="8" push='2'>
                  <Button type="primary" @click="editFun">修改节点</Button>
                  <Button type="primary" @click="newaddFun">新增子节点</Button>
                  <Button type="primary" @click="deleteFun">删除</Button>
                 </Col>
                   <Col span="15" push='1'>
                   <Button type="primary" @click="addType">新增</Button>
                   <Button type="primary" @click="editType">修改</Button>
                   <Button type="primary" @click="deleteType">删除</Button>
                 </Col>
              </Row>
              <Row>
                <Col class="menuinfo"   v-if="id!='0' && id" span="8" push='2'  > 
                  <p><b>名称:</b>{{menuinfo.menuName}}</p>
                  <p><b>url:</b>{{menuinfo.menuUrl}}</p>
                  <p><b>排序:</b>{{menuinfo.orders}}</p>
                  </Col>  
                  <Col span="15" push="1" class="mt12" v-if="id!='0' && id">
                    <Table @on-selection-change='selectRow' border :columns="tableColumns" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"></Table>
                    <Page style="position:absolute;right:10px;bottom:-40px;" :total="total" :current="currentPage" :page-size='pagesize' @on-change="changePage"></Page>
                  </Col>
              </Row>
           </Col>
        </Row>
      </Card>
      <deleteModal @updatedelete="updatedelete"  ref="deleteModal"></deleteModal>
      <newaddModal  @updateaddtree='updateaddtree' @updatedittree='updatedittree' ref="newaddModal"></newaddModal>
      <addType @updateList='updateList' ref="addType"></addType>
    </div>
</template>
<script src="./index.js"></script>
