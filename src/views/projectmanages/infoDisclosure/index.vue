<style lang="less">
   @import "index.less";
</style>
<template>
    <div>
      <Card>
        <Form ref="queryForm" :model="queryForm" :rules="ruleCustom" :label-width="80" inline>
            <FormItem label="项目阶段" prop="passwd">
                <Select v-model="queryForm.city"  style="width:200px">
                    <Option value="beijing">New York</Option>
                    <Option value="shanghai">London</Option>
                    <Option value="shenzhen">Sydney</Option>
                </Select>
            </FormItem>
            <FormItem label="模板名称" prop="passwd">
                <Input v-model="queryForm.input3" style="width:200px"/>
            </FormItem>
            <FormItem>
                <Button type="primary">查询</Button>
                <Button type="primary">新增</Button>
            </FormItem>
        </Form>
        <div class="tableList">
            <p v-for="(item,ind) in tableList" :key="ind"><a >{{item.title}}</a><span>{{item.time}}</span></p>
        </div>
      </Card>
    </div>
</template>
<script src="./index.js"></script>
