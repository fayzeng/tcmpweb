<template>
    <div v-if='modalflag'>
      <Modal title="员工岗位管理" width="760" v-model="modalflag">
          <div  >
              <Transfer
              :list-style="{ width:'300px',height:'500px'}"
              :data="userData"
              :titles="['未选员工','已选员工']"
              :target-keys="targetKeys"
              :render-format="renderItem"
              @on-change="handleChange"
              :filter-method="filterMethod"
              filterable
              ></Transfer>
          </div>
          <div slot="footer">
          </div>
      </Modal>
    </div>
</template>
<script src='./index.js'></script>
