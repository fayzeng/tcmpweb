<template>
<div v-if='modalflag'>
    <Modal v-model="modalflag" width="800" :title="modaltitle">
     <Form :model="Modalform"  :label-width="flag?170:100" :rules="ModalRule" ref="Modalform">
       <Row v-if="!flag">
         <Col span="12">
           <FormItem label="部门编号" prop="groupCode">
             <Input :disabled="modaltitle=='修改部门信息'"  v-model="Modalform.groupCode" style="width: 200px"/>
           </FormItem>
         </Col>
         <Col span="12">
           <FormItem label="部门名称" prop='groupName'>
             <Input v-model="Modalform.groupName" style="width: 200px"/>
           </FormItem>
         </Col>
         <Col span="12">
           <FormItem label="部门分类">
             <Select v-model="Modalform.type" style="width:200px">
                 <Option v-for="item in typeList" :value="item.key" :key="item.value">{{ item.name }}</Option>
             </Select>
           </FormItem>
         </Col>
          <Col span="12">
           <FormItem label="上级组织"  prop='groupName'>
             <Input v-model="Modalform.pName" :readonly="true" icon="ios-search" @click.native="search(1)" style="width: 200px"/>
           </FormItem>
         </Col>
         <Col span="12">
           <FormItem label="负责人">
             <Input v-model="headerName" icon="ios-search"  @click.native="search(3)" :readonly="true" style="width: 200px"/>
           </FormItem>
         </Col>
         <Col span="12">
           <FormItem label="分管领导">
             <Input v-model="leaderName"  icon="ios-search"  @click.native="search(4)" :readonly="true" style="width: 200px"/>
           </FormItem>
         </Col>
           <Col span="12">
           <FormItem label="协管领导">
             <Input v-model="assistLeaderName"  icon="ios-search"  @click.native="search(5)" :readonly="true" style="width: 200px"/>
           </FormItem>
         </Col>
          <Col span="12">
           <FormItem label="是否虚拟">
               <RadioGroup v-model="Modalform.isVirtual">
                 <Radio label="1">是</Radio>
                 <Radio label="0">否</Radio>
             </RadioGroup>
           </FormItem>
         </Col>
         <Col span="24">
           <FormItem label="备注">
             <Input type="textarea" v-model="Modalform.describe" />
           </FormItem>
         </Col>
       </Row>
        <Row v-if="flag">
         <Col :span="12">
           <FormItem label="信托公司名称" prop="com_name">
             <Input v-model="Modalform.com_name" :disabled="isEdit" style="width: 200px"/>
           </FormItem>
         </Col>
         <Col :span="12">
           <FormItem label="金融许可证号" prop='jrxkzh'>
             <Input v-model="Modalform.jrxkzh" :disabled="isEdit" style="width: 200px"/>
           </FormItem>
         </Col>
         <Col :span="12">
           <FormItem label="上月末净资产（万元）">
              <Input v-model="Modalform.symjzc" :disabled="isEdit" style="width: 200px"/>
           </FormItem>
         </Col>
         <Col :span="12">
           <FormItem label="上月末信托总资产（万元）">
               <Input v-model="Modalform.symxtzzc" :disabled="isEdit" style="width: 200px"/>
           </FormItem>
         </Col>
         <Col :span="12">
           <FormItem label="上季末净资本（万元）">
             <Input v-model="Modalform.sjmjzc" :disabled="isEdit" style="width: 200px"/>
           </FormItem>
         </Col>
         <Col :span="12">
           <FormItem label="上季末风险资本（万元）">
             <Input v-model="Modalform.sjmfxzb" :disabled="isEdit" style="width: 200px"/>
           </FormItem>
         </Col>
         <Col :span="12">
           <FormItem label="统一社会信用代码">
             <Input v-model="Modalform.shxydm" :disabled="isEdit" style="width: 200px"/>
           </FormItem>
         </Col>
         <Col :span="12">
           <FormItem label="注册资本（万元）">
             <Input v-model="Modalform.reg_capital" :disabled="isEdit" style="width: 200px"/>
           </FormItem>
         </Col>
           <Col :span="12">
           <FormItem label="注册地区">
             <Input v-model="Modalform.reg_area" :disabled="isEdit" style="width: 200px"/>
           </FormItem>
         </Col>
             <Col :span="12">
           <FormItem label="成立时间">
             <DatePicker type="date" placeholder="选择日期" :disabled="isEdit" style="width: 200px" v-model="Modalform.establish_date" />
           </FormItem>
         </Col>
             <Col :span="12">
           <FormItem label="营业状态">
             <Input v-model="Modalform.oper_state" :disabled="isEdit" style="width: 200px"/>
           </FormItem>
         </Col>
           <Col :span="12">
           <FormItem label="法人姓名">
             <Input v-model="Modalform.legal_name" :disabled="isEdit" style="width: 200px"/>
           </FormItem>
         </Col>
           <Col :span="12">
           <FormItem label="机构地址">
             <Input v-model="Modalform.address" :disabled="isEdit" style="width: 200px"/>
           </FormItem>
         </Col>
             <Col :span="12">
           <FormItem label="邮政编码">
             <Input v-model="Modalform.zipcode" :disabled="isEdit" style="width: 200px"/>
           </FormItem>
         </Col>
             <Col :span="12">
           <FormItem label="公司概述">
             <Input v-model="Modalform.describe" :disabled="isEdit" style="width: 200px"/>
           </FormItem>
         </Col>
       </Row>
     </Form>
         <div class="buttoncenter" slot="footer">
             <Button   @click="Close">取消</Button>
             <Button type="warning" @click="Reset">重置</Button>
             <Button type="success" :loading='loading' @click="confirm('Modalform')">保存</Button>
         </div>
   </Modal>
   <selectModal ref="selectModal" @updatedata='updatedata' :attribute='propname'></selectModal>
</div>

</template>
<script src='./index.js'></script>
