<style lang="less">
</style>
<template>
    <div v-if='attribute'>
        <Button type="primary" @click="addList" v-if="!disabled">新增</Button>
        <Table  border stripe class='table_com'  ref="table" @on-row-click="rowClick" :data='this.$store.state.tableselect.tableData' :columns="tableColumns"  ></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="total" :current="currentPage" :page-size='10' @on-change="changePage" @on-select='selectRow'></Page>
            </div>
        </div>
    </div>
</template>
<script src='./index.js'></script>
