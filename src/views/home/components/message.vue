<style lang="less" scoped>
    .rowstyle{
        margin-bottom: 14px
    }
</style>
<template>
    <div>
        <Col span="12">
            <Card>
                <h3 slot="title">消息通知</h3>
                <span v-for="(item,index) in messageList" :key="index">
                    <h4 class="rowstyle">{{item.typename}}</h4>
                    <Row class="rowstyle" v-for="(ele,ind) in item.detail" :key="ind">
                        <Col span="18" push='2'>
                        {{ele.info}}
                        </Col>
                        <Col span="2" push='2'>
                            {{ele.date}}
                        </Col>
                    </Row>
                </span>
            </Card>
        </Col> 
    </div>
</template>
<script>
export default {
    data(){
        return{
            messageList:[
                {
                    typename:'系统通知：',
                    detail:[
                        {
                            info:'系统常规升级公告',
                            date:'2018/07/17'
                        },
                        {
                            info:'操作手册更新：《信托经理操作手册V2.0》',
                            date:'2018/07/10'
                        },
                        {
                            info:'《黄金二号集合资金信托计划》立项通知',
                            date:'2018/07/08'
                        },
                        {
                            info:'操作手册更新：《信托经理操作手册V1.0》',
                            date:'2018/06/14'
                        },
                        {
                            info:'系统临时维护公告',
                            date:'2018/06/12'
                        },
                        {
                            info:'系统常规升级公告',
                            date:'2018/04/10'
                        },
                    ]
                },
                {
                    typename:'业务通知：',
                    detail:[
                        {
                            info:'工作流变更公告',
                            date:'2018/07/17'
                        }
                    ]
                }
            ]
        }
    }
}
</script>
