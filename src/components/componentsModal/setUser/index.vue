<template>
    <div v-if='modalflag'>
        <Modal title="员工角色管理" width="760" v-model="modalflag">
            <div>
                <Transfer
                :list-style="{ width:'300px',height:'500px'}"
                :titles="['未选角色','已选角色']"
                :data="userData"
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
