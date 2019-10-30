<style lang="less" scoped>
    @import "index.less";
</style>
<template>
<div>
    <Row :gutter='16'>
        <Col span="18">
            <Card>
              <h4>事务中心</h4>
              <div class="affaircore">
                <div v-for="(item,ind) in affaircoreList" :key="ind" class="affaircore_div">
                    <p style="color:#ccc;">{{item.title}}</p>
                    <div class="dlList" style="display:flex;height:80px;line-height:80px;">
                        <dl class="dl" v-for="(temp,index) in item.list" :key="index">
                            <dt ><img :src="temp.imgurl" alt=""></dt>
                            <dd @click="GetintoDetail(item.title)">{{temp.describe}}</dd>
                        </dl>
                    </div>
                      <!-- <Row :gutter='16'> 
                          <Col span="12" v-for="(temp,index) in item.list" :key="index">
                            <dl>
                                <dt><img :src="temp.imgurl" alt=""></dt>
                                <dd @click="GetintoDetail(item.title)">{{temp.describe}}</dd>
                            </dl> 
                        </Col>
                      </Row> -->
                </div>
              </div>
            </Card>
            <Card class="mrtop">
                <h4>我的日历</h4>
                <Row :gutter='20'>
                    <Col span="12">
                     <Calendar
                        ref="Calendar"
                        v-on:choseDay="clickDay"
                        :markDateMore="arr"
                        :markDate="arr2"></Calendar>
                    </Col>
                    <Col span="12">
                      <div style="margin-top:15px" v-for="(item,ind) in datelist" :key="ind">
                          <p>{{item.title}}</p>
                          <p>{{item.cont}}</p>
                      </div>
                    </Col>
                </Row>
               
                
            </Card>
        </Col>
        <Col span="6">
            <Card class="cards">
            <h4>发起流程</h4>
              <Tree :data="data1"></Tree>
          </Card>
        </Col>
    </Row>

</div>
    <!-- <div style="display:flex;">
        <div style="width:60%">
            
            <Card>
            <h4>我的日历</h4>
            </Card>
        </div>
        <div style="width:40%">
          
        </div>
      
    </div> -->
</template>
<script src="./index.js"></script>
