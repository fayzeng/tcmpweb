<style lang="less" scoped>
    @import './addcompoent.less';
</style>
<template>
  <div>
    <FormItem v-if="item.conceal==1" :label="item.field_name"  :prop="item.enabled==1 ? 'mustInput' : ' '">

        <Input v-if="item.field_type == 1 || item.field_type == 13 || item.field_type == 14"   v-model.lazy="item.field_value"  :disabled='item.disable_flag==1' style="width:80%"></Input>

        <Select v-else-if="item.field_type==3 || item.field_type==4"   :clearable='item.disable_flag!=1' :multiple='item.field_type==4'  filterable  v-model.lazy="item.field_value" :disabled='item.disable_flag==1' @on-change="selectbankname(item)"  style="width:80%" label-in-value>
            <Option  v-for='(selectItem,selectIndex) in item.codelist' :key=" selectIndex+ Math.random()" :value="selectItem.key" >{{selectItem.name}}</Option>
        </Select>

        <Select v-else-if="item.field_type==5"   :clearable='item.disable_flag!=1'   v-model.lazy="item.field_value"  :disabled='item.disable_flag==1' @on-change="linkage(item)"  style="width:80%" label-in-value>
            <Option  v-for='(selectItem,selectIndex) in item.codelist' :key=" selectIndex+ Math.random()" :value="selectItem.key" >{{selectItem.name}}</Option>
       </Select>

        <InputNumber v-else-if="item.field_type==6 || item.field_type==7" :min="1"     v-model.lazy="item.field_value" :step="item.field_type==6 ? 1 : 0.1" :disabled='item.disable_flag==1' style="width:80%" ></InputNumber>


        <Input v-else-if="item.field_type==8"  :min="1" v-model.lazy="item.field_value" :disabled='item.disable_flag==1' @on-blur="onfocus(item)"  style="width:80%" ></Input>

        <DatePicker v-else-if="item.field_type==9" type="date"  v-model.lazy="item.field_value"  :disabled='item.disable_flag==1' :readonly='item.disable_flag==1'   style="width:80%" ></DatePicker>

        <Input v-else-if="item.field_type==17"     v-model.lazy="item.field_value"  :disabled='item.disable_flag==1'  icon="ios-search"  style="width:80%" @click.native="searchtable(item.library_code,item.field_value)"></Input>

        <Checkbox v-else-if="item.field_type==18" v-model.lazy="item.field_value" :disabled='item.disable_flag==1'>{{item.field_name}}</Checkbox>

        <Select v-else-if="item.field_type==19" filterable  :clearable='item.disable_flag!=1'   v-model.lazy="item.field_value" :disabled='item.disable_flag==1' style="width:80%">
            <Option  v-for='(selectItem,selectIndex) in item.codelist' :key="selectIndex" :value="selectItem.userId" >{{selectItem.name}}</Option>
        </Select>
       {{item.units}}
          <a v-if='item.field_prompt' :title='item.field_prompt' style="color:black"><Icon type="ios-help-circle-outline"   size='16' /></a>
    </FormItem>
    <tableModal ref="tableModal" @updatedata="updatedata" :attribute='tabletype'></tableModal>
    <tabletreeModal ref="tabletreeModal" @updateopen="updateopen"></tabletreeModal>
  </div>
</template>
<script src="./addcompoent.js"></script>
