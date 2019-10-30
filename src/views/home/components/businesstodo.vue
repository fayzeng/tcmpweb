<style lang="less" scoped>
    .rowstyle{
        margin-bottom: 14px
    }
</style>
<template>
    <div>
        <Card>
            <h3 slot="title">业务待办</h3>
            <Row :gutter="16" v-for="(item,index)  in businesstodoList" :key="index" class="rowstyle">
                <Col span="10" style="color:rgb(71,178,244);">
                    {{item.name}}
                </Col>
                <Col span="4">
                    {{item.name1}}
                </Col>
                <Col span="8">
                   {{item.name2}}
                </Col>
                <Col span="2" >
                    <Button type="text">立即审批</Button>
                </Col>
            </Row>
        </Card>
    </div>
</template>
<script>
export default {
    data(){
        return{
            businesstodoList:[
                {
                    name:'0998876665 《长盈1号集合资金信托计划（第1期）》立项审议审批',
                    name1:'上一审批人：李申一',
                    name2:'当前审批节点：王佳爱',
                    name3:'立即审批'
                },
                {
                    name:'0998876665 《中合供销二期(上海)股权投资项目(有限合伙)》立项审议审批',
                    name1:'上一审批人：李申一',
                    name2:'当前审批节点：王佳爱',
                    name3:'立即审批'
                },
                {
                    name:'0998876665 《黄金二号集合资金信托计划》专项审批',
                    name1:'上一审批人：李申一',
                    name2:'当前审批节点：王佳爱',
                    name3:'立即审批'
                },
                {
                    name:'0998876665 《国际非遗博览园项目集合资金信托计划》第三方中介外聘审批',
                    name1:'上一审批人：李申一',
                    name2:'当前审批节点：王佳爱',
                    name3:'立即审批'
                },
                {
                    name:'0998876665 《无锡凤盛电子数码城项目集合资金信托计划》第三方中介外聘审批',
                    name1:'上一审批人：李申一',
                    name2:'当前审批节点：王佳爱',
                    name3:'立即审批'
                },
                {
                    name:'0998876665 《安盈•商业物业投资I期集合资金信托计划》立项审议',
                    name1:'上一审批人：李申一',
                    name2:'当前审批节点：王佳爱',
                    name3:'立即审批'
                },
                {
                    name:'0998876665 《寿安新城特定资产收益权投资 集合资金信托计划》立项审议',
                    name1:'上一审批人：李申一',
                    name2:'当前审批节点：王佳爱',
                    name3:'立即审批'
                },
                {
                    name:'0998876665 《盈合3号集合资金信托计划》项目清算审批',
                    name1:'上一审批人：李申一',
                    name2:'当前审批节点：王佳爱',
                    name3:'立即审批'
                },
                {
                    name:'0998876665 《盈和1号集合资金信托计划》项目清算审批',
                    name1:'上一审批人：李申一',
                    name2:'当前审批节点：王佳爱',
                    name3:'立即审批'
                },
                {
                    name:'0998876665 《增益9号集合资金信托计划（B级）》信息披露审批',
                    name1:'上一审批人：李申一',
                    name2:'当前审批节点：王佳爱',
                    name3:'立即审批'
                }
            ]
        
        }
    }
}
</script>

