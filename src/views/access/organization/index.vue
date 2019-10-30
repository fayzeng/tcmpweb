<style lang="less">@import "./index.less";</style>
<template>
    <div class="cont_right">
        <Card  :bordered="false">
            <Row>
               <Col span="5">
                  <!-- <Button type="primary"  size="small" >同步</Button> -->
                  <!-- <Button type="primary"  size="small" >导出</Button> -->
                  <!-- <Button type="primary"  size="small" @click="editFun" >修改</Button> -->
                  <!-- <Button type="primary"  size="small" @click="showAddOrgModal" >新增</Button>
                  <Button type="error"  size="small" @click="deleteFun" >删除</Button> -->
                  <!-- <Tree :data="treedata" @on-select-change='selecttree'></Tree> -->
                  <div class="lefttree">
                    <h4>组织树</h4> 
                    <Form>
                        <FormItem  label="名称" >
                        <Select @on-query-change="changeval" v-model="searchval" filterable size="small" style="width: 150px">
                           <Option v-for="item in treeList" :value="item.groupId" :key="item.groupId" >{{ item.title }}</Option>
                        </Select>
                        </FormItem>
                    </Form>
                    <Button type="primary" @click="opentreedata">展开</Button>
                    <Button type="primary" @click="shrink">收缩</Button>
                    <Button type="primary" @click="Refresh">刷新</Button>
                    <Tree :data="treedata" @on-select-change='selecttree'></Tree>
                 </div>
               </Col>
                <Col span="19" >
                     <!-- <Table border :columns="tableColumns" :data="tableData"></Table> -->
                     <itable attribute='organize' ref="tablelist" @updatedelete='updatedelete' @updatedittree='updatedittree' @updateaddtree='updateaddtree'></itable>
               </Col>
            </Row>
            <!-- <Row class="mt12" :gutter="22" >
               <Col span="6">
               </Col>
            </Row> -->
        </Card>
        <!-- <deleteModal @updatedelete="updatedelete" ref="deleteModal"></deleteModal>
        <addOrgModal @updateaddtree='updateaddtree' @updatedittree='updatedittree' ref="addOrgModal"></addOrgModal> -->
    </div>
</template>

<script src="./index.js"></script>




