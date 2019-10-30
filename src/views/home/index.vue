<style lang="less">
  @import "index.less";
</style>
<template>
    <div>
      <myheard></myheard>
      <Row :gutter='18'>
        <Col span="12">
            <myplan></myplan>
        </Col>
        <Col span='12'>
            <mynotice></mynotice>
        </Col>
      </Row>
      <!-- <Row :gutter='18'>
        <Col span='12'>
            <calendar></calendar>
        </Col>
      </Row> -->

        <!-- <Card :bordered='false'> -->
            <!-- <processtodo></processtodo>
            <businesstodo class="martop"></businesstodo>
            <Row :gutter='18'>
                <notice class="martop"></notice>
                <message class="martop"></message>
            </Row> -->
        <!-- </Card> -->
    </div>
</template>
<script src='./index.js'></script>
