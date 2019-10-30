<style lang="less" scoped>
    @import "./index.less";
</style>
<template>
    <div>
        <!-- <group-data-modal ref="groupDataModal" :type="type" /> -->
        <Card :bordered="false">
            <!-- <Row>
               <Col span="8">
                  <Button class="list-btn" type="primary"  size="small" @click="showGroupDataModal" >新增</Button>
                  <Button class="list-btn" type="primary"  size="small" @click="showUpdateModal" >修改</Button>
               </Col>
            </Row> -->
            <itable attribute='group'></itable>
        </Card>
    </div>
</template>
<script src='./index.js'></script>
