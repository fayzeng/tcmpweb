<style lang="less">
    @import "index.less";
</style>
<template>
    <div class="cont_right">
        <Card  :bordered="false">
            <Row>
             <Col span="5">
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
             <Col span="19">
                <itable attribute='postsetting' ref="tablelist"></itable>
             </Col>
            </Row>
        </Card>
    </div>
</template>
<script src="./index.js"></script>
