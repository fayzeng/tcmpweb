<style lang="less" scoped>
    @import "index.less";
</style>
<template>
    <div>
        <Card  :bordered="false">
            <Row>
               <!-- <Col span="3" push="19">
                    <Input size="small"  icon="ios-search" placeholder="请输入角色名称"></Input>
               </Col> -->
            </Row>
            <itable attribute='role'></itable>
        </Card>
    </div>
</template>
<script src="./index.js"></script>
