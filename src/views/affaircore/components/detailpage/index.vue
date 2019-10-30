<style lang="less" scoped>
    .rowstyle{
        margin-bottom: 14px
    }
</style>
<template>
    <div>
      <Card>
        <h3 slot="title">{{this.$route.query.title}}</h3>
          <Form ref="queryForm" :model="queryForm" :rules="ruleCustom" :label-width="80" inline>
            <FormItem label="项目编码" prop="passwd">
                <Input v-model="queryForm.input3" style="width:200px"/>
            </FormItem>
             <FormItem label="项目名称" prop="passwd">
                <Input v-model="queryForm.input3" style="width:200px"/>
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
         <itable v-if="this.$route.query.title=='我的委托任务'" attribute='EntrustMonitor'></itable>
         <businesstodo v-else class="martop"></businesstodo>
        <!-- <Row v-else :gutter="16" v-for="(item,index)  in businesstodoList" :key="index" class="rowstyle">
            <Col span="10">
                {{item.name}}
            </Col>
            <Col span="4">
                {{item.name1}}
            </Col>
            <Col span="8">
                {{item.name2}}
            </Col>
            <Col span="2">
                <a>{{item.name3}}</a>    
            </Col>
          </Row> -->
       
      </Card>
    </div>
</template>
<script src="./index.js"></script>
