<style lang="less">
    @import "index.less";
</style>
<template>
    <div>
      <Card>
       <div class="operation"><a @click="newAdd">新增</a> <a @click="modify">修改</a>  <a @click="fileFun">文件归档</a> <a @click="deleteFun">删除</a> <a>作废</a> <a>查看历史</a> <a>批量下载</a> <a>同步文档</a> <a @click="DocumentTypeManageFun">文档类型管理</a></div>
       <Form ref="queryForm" :model="queryForm" :rules="ruleCustom" :label-width="80" inline>
            <FormItem label="项目编码" prop="passwd">
                <Input v-model="queryForm.input3" style="width:200px"/>
            </FormItem>
             <FormItem label="项目名称" prop="passwd">
                <Input v-model="queryForm.input3" style="width:200px"/>
            </FormItem>
             <FormItem label="文档名称" prop="passwd">
                <Input v-model="queryForm.input3" style="width:200px"/>
            </FormItem>
            <FormItem label="项目类别" prop="passwdCheck">
                <Select v-model="queryForm.city" style="width:200px">
                    <Option value="beijing">New York</Option>
                    <Option value="shanghai">London</Option>
                    <Option value="shenzhen">Sydney</Option>
                </Select>
            </FormItem>
            <FormItem label="项目状态" prop="age">
            <Select v-model="queryForm.city"  style="width:200px">
                    <Option value="beijing">New York</Option>
                    <Option value="shanghai">London</Option>
                    <Option value="shenzhen">Sydney</Option>
                </Select>
            </FormItem>
            <FormItem>
                <Button type="primary">查询</Button>
            </FormItem>
        </Form>
       <itable attribute='Fileinfomanage'></itable>
      </Card>
      <newaddModal ref="newaddModal"></newaddModal>
      <deleteModal ref="deleteModal"></deleteModal>
      <DocumentTypeManage ref="DocumentTypeManage"></DocumentTypeManage>
    </div>
</template>
<script src="./index.js"></script>
