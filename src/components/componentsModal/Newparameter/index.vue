<template>
  <div v-if='modalflag'>
    <Modal
       v-model="modalflag"
        @on-ok="confirm"
       @on-cancel="Close"
       title="新增参数">
       <Form :model="Modalform" :label-width="100" :rules="ModalRule">
           <FormItem label="参数编号" prop="name">
               <Input v-model="Modalform.name"/>
           </FormItem>
           <FormItem label="参数名称">
               <Input v-model="Modalform.name"/>
           </FormItem>
            <FormItem label="参数值">
               <Input v-model="Modalform.name"/>
           </FormItem>
           <FormItem label="参数类别">
               <Input v-model="Modalform.name"/>
           </FormItem>
            <FormItem label="说明">
               <Input v-model="Modalform.name"/>
           </FormItem>
     </Form>
   </Modal>
  </div>
</template>
<script src='./index.js'></script>
