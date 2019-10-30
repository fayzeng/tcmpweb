<style lang="less" scoped>@import "./index.less";</style>
<template>
    <div>
        <Card style="overflow: hidden" :bordered="false">
            <Row  type="flex" justify="end">
                <Button type="primary"  size="small" @click="add">新增</Button>
            </Row>
            <Row :gutter="22" class="mt12">
                <Col span="8" gutter="22px" v-for=" item in arr " :key="item.id">
                    <Card class="sharecard">
                        <Row>
                            <Col span="18">
                                <h2>{{item.holder_name}} <span class="spansize"> {{item.status==1 ?'有效':'无效'}}</span></h2>
                            </Col>
                            <Col span="2">
                                <a> <Icon type="md-brush" :size='18' @click.native='update(item.sch_id)'></Icon></a>
                            </Col>
                            <Col span="2">
                               <a><Icon type="ios-trash" :size='18' @click.native='del(item.sch_id)'></Icon></a>
                            </Col>
                        </Row>
                        <p>股东类型：{{item.stocker_type==1 ?'个人': item.stocker_type == 2 ? '金融机构' : '非金融机构'}}</p>
                        <!-- <p>股东类型：{{}}</p> -->
                        <p>证件类型名称：{{item.stocker_type_name}}</p>
                        <p>证件号码：{{item.cert_no}}</p>
                        <p>控股方式名称：{{item.holder_type_name }}</p>
                        <p>持股比例：{{item.stock_rate ? item.stock_rate+'%' : ''}}</p>
                    </Card>
                </Col>
            </Row>
            <div style="overflow: hidden;background:#f8f8f9;">
                <div style="float: left;margin: 10px;" >
                    <p>共有<a>{{total}}</a>条数据，当前第<a>{{currentPage}}</a>页</p>
                </div>
                <div style="float: right;margin: 10px;">
                    <Page :total="total" :current="currentPage" :page-size='6' @on-change="getData" ></Page>
                </div>
            </div>
        </Card>
         <addshareholder  @changpage='getData(1)' ref="addShareholder"/>
    </div>
</template>
<script src="./index.js"></script>
