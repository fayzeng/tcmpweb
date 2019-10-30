<style lang="less">
@import "index.less";
</style>
<template>
  <div class="tableLists">
     <div class="tableList" v-for="(item,ind) in dataList" :key="ind">
        <div class="left">
         <div class="one">
         <Checkbox v-model="single"></Checkbox>
         <span class="span1">F165</span>
         <span class="span2">{{item.title}}</span>
         <span class="span3" v-for="(temp,index) in item.btnList" :key="index">{{temp.title}}</span>
         </div>
         <div class="ttbox">
         <div class="two">
            <p>项目简介或者其他附加信息</p>
         </div>
         <div class="three">
            <p>
               <span></span>
               2015-06-09
            </p>
            <p>
               <span></span>
               2015-06-09
            </p>
            <p>
               <span></span>
               CNY 1.5亿
            </p>
         </div>
         </div>
      </div>
      <div class="right">
         <div class="one">
         <p class="p1">项目经理</p>
         <p class="p2">张小虎</p>
         </div>
         <div class="one">
         <p class="p1">部门</p>
         <p class="p2">信托业务一部</p>
         </div>
         <div class="three" @click="projectnav">项目导航</div>
      </div>
     </div>
   
  </div>
</template>
<script src="./index.js"></script>
