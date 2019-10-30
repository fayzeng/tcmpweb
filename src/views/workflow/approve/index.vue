<style lang="less" scoped>
  @import "./index.less";
</style>
<template>
    <div>
        <Card >
          <div  class="dt" v-if="projectname"><span class="tit"> 所属项目：{{projectname}}</span></div>
              <Collapse style="margin-top:5px" v-model="value1" v-for="(item,index) in approvearr" :key="index">
                <Panel :name=" '1' + index " >
                    <span   class="spantitle">{{item.category}}</span>
                    <Row slot="content"  class="code-row-bg">
                         <Col  class="coltop" span="8" v-for=" (temp,index) in item.modelList " :key="index">
                          <a @click="lunch(temp)"><Icon type="star" color='red' size="1"></Icon>{{temp.deploymentname}}</a>
                         </Col>
                         <Col span="24">
                          <Collapse v-show="item.child" v-model="value2" v-for="(child,ind) in item.child" :key="child.category">
                            <Panel :name=" '1' + index + '-' + ind " >
                              <span   class="spantitle">{{child.category}}</span>
                              <Row slot="content"  class="code-row-bg">
                                <Col  class="coltop" span="8" v-for=" (childs,index) in child.modelList " :key="index">
                                  <a @click="lunch(childs)"><Icon type="star" color='red' size="1"></Icon>{{childs.deploymentname}}</a>
                                </Col>
                              </Row>
                          </Panel>
                        </Collapse>
                        </Col>
                   </Row>
                
                </Panel>
              </Collapse>
        </Card>
        <launchmodel ref="launchmodel"></launchmodel>
    </div>
</template>
<script src="./index.js"></script>
