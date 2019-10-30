<template>
    <div>
        <Card>
         <Form class="lebelweight" :model="formItem" :label-width="100" ref="formItem">
                <Row>
                    <Col v-if="item.key!='log_message'" v-for="(item,ind) in labelList" :key="item.key" span="8">
                        <FormItem  :label="item.label+':'">
                           {{formItem[item.key]}}
                        </FormItem>
                    </Col>
                    <Col style="line-height:40px" v-else push="2" span="24" v-for="(temp,index) in loglist" :key="index">
                    <span style="display:inlin-block;width:100px;text-align:right;position:absolute;left:-8.3333%;font-weight:bold" v-if="index==0">日志内容：</span>
                      {{temp.src+' 从 '+temp.old+' 变更为 '+temp.new}}
                      <!-- {{temp}} -->
                    </Col>
                </Row>
         </Form>
           <Button type="primary" style="position:fixed;bottom:25px;left:50%;margin-top:14px;" @click="goback">返回</Button>
        </Card>
    </div>
</template>
<script src='./index.js'></script>
<style>
.lebelweight.ivu-form .ivu-form-item-label{
    font-weight: bold;
}
</style>
