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
              <h3 class="h3_title">文档类型管理</h3>
              <Row>
                 <Col span="18" push='2'>
                  <Button type="primary" @click="editFun">修改节点</Button>
                  <Button type="primary" @click="newaddFun">新增子节点</Button>
                  <Button type="primary" @click="deleteFun">删除</Button>
                 </Col>
              </Row>
              <Row>
                <Col class="fileinfo"   v-if="id!='0' && id" span="8" push='2'  > 
                  <p><b>类型名称:</b>{{fileinfo.type_name}}</p>
                  <p><b>上级id:</b>{{fileinfo.pid}}</p>
                  <p><b>备注:</b>{{fileinfo.mark}}</p>
                  </Col>
              </Row>
           </Col>
        </Row>
      </Card>
      <deleteModal @updatedelete="updatedelete"  ref="deleteModal"></deleteModal>
      <newaddModal  @updateaddtree='updateaddtree' @updatedittree='updatedittree' ref="newaddModal"></newaddModal>
    </div>
</template>
<script src="./index.js"></script>
