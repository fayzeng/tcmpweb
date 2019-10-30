<style lang="less">
    @import "index.less";
</style>
<template>
    <div>
      <Card :bordered='false'>
            <itable attribute='infoReview'  state='0'></itable>
        <!-- <Form ref="queryForm" :model="queryForm" :rules="ruleCustom" :label-width="80" inline>
            <FormItem label="项目阶段" prop="passwd">
                <Select v-model="queryForm.city"  style="width:200px">
                    <Option value="beijing">New York</Option>
                    <Option value="shanghai">London</Option>
                    <Option value="shenzhen">Sydney</Option>
                </Select>
            </FormItem>
            <FormItem label="项目类别" prop="passwdCheck">
                <Select v-model="queryForm.city"  style="width:200px">
                    <Option value="beijing">New York</Option>
                    <Option value="shanghai">London</Option>
                    <Option value="shenzhen">Sydney</Option>
                </Select>
            </FormItem>
            <FormItem label="项目状态" prop="age">
            <Select v-model="queryForm.city" style="width:200px">
                    <Option value="beijing">New York</Option>
                    <Option value="shanghai">London</Option>
                    <Option value="shenzhen">Sydney</Option>
                </Select>
            </FormItem>
            <FormItem>
                <Button type="primary">查询</Button>
            </FormItem>
        </Form>
        <Table :data="tableData" :columns="tableColumns"></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="total" :current="currentPage" :page-size='20' @on-change="changePage" @on-select='selectRow'></Page>
            </div>
        </div> -->
      </Card>
    </div>
</template>
<script src="./index.js"></script>
