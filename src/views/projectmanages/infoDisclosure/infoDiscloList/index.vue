<style lang="less">
   @import "index.less";
</style>
<template>
    <div>
      <Card>
        <Row type="flex" justify="center">
            <div v-html='content' style='text-align:center'>

            </div>
       </Row>
        <Button @click='getvalue'>123123</Button>
          <!-- <itable  attribute='infoDiscloList'></itable> -->
      </Card>
    </div>
</template>
<script src="./index.js"></script>
