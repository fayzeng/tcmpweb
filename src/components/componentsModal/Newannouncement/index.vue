<template>
    <div v-if="modalflag">
      <Modal
         v-model="modalflag"
          @on-ok="confirm"
          width='730'
         @on-cancel="Close"
         title="新增公告">
         <Form :model="Modalform" :inline='true' :label-width="100" :rules="ModalRule">
             <FormItem label="标题" prop="name">
                 <Input v-model="Modalform.name" style="width: 513px"/>
             </FormItem>
             <FormItem label="有效日期">
                 <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker>
             </FormItem>
              <FormItem label="发布人">
                 <Input v-model="Modalform.name" style="width: 200px"/>
             </FormItem>
             <FormItem label="是否启用">
                  <Radio v-model="single">是</Radio><Radio v-model="single">否</Radio>
             </FormItem>
              <FormItem label="内容">
                 <Input v-model="Modalform.name" type="textarea" :rows="4" style="width: 510px;"/>
             </FormItem>
       </Form>
     </Modal>
    </div>
</template>
<script src='./index.js'></script>
