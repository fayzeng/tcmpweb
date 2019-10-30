<style lang="less" scoped>
    @import "./index.less";
</style>
<template>
	<div v-if="modalflag">
		<Modal v-model="modalflag" width="600">
			<p slot="header" style="color:#f60;text-align:center">
				<Icon type="ios-information-circle"></Icon>
				 <span>{{title}}</span>
			</p>
			<Form :model="formItem" :label-width="80 " :rules="rules" ref="formItem">
				<FormItem label="授权人" >
    				 <v-selectpage :data="allPeople"   v-model="formItem.extentName"  :tb-columns="formTitle.people" title="选择授权人" placeholder="请选择授权人" key-field="userId" >
    				 </v-selectpage>
        		</FormItem>
        		<FormItem label="被授权人" >
        			<v-selectpage :data="allPeople"   v-model="formItem.extentNamed"  :tb-columns="formTitle.peopled" title="选择被授权人" placeholder="请选择被授权人" key-field="userId" >
    				 </v-selectpage>
        		</FormItem>
        		<FormItem label="授权类型" prop="extentType" >
        			<v-selectpage :data="Type"  @values="chooseType"  v-model="formItem.extentType"  show-field="name" title="选择授权人" placeholder="请选择授劝类型" key-field="key" >
    				 </v-selectpage>
        		</FormItem>
        		<!--<FormItem label="事物名" prop="thingNameId" >
        			<v-selectpage :data="thingType"   v-model="formItem.thingNameId"   @values="getThing"  :disabled="dis.thingName"  :tb-columns="formTitle.thinfName"  show-field="tittle" title="选择事物名称" placeholder="请选择事物名称" key-field="processInstanceId" >
    				 </v-selectpage>
        		</FormItem>-->
        		<FormItem label="事物名" prop="thingNameId" >
        			<Select v-model="formItem.thingNameId"  :label-in-value="true" filterable @on-query-change="changeThing" @on-change="getThings" :disabled="dis.thingName">
                		<Option v-for="item in thingType" :value="item.processInstanceId" :key="item.title"  >{{ item.title }}</Option>
            		</Select>
        		</FormItem>
        		<FormItem label="流程名" prop="processId" >
        			<v-selectpage :data="processType"   v-model="formItem.processId"   @values="getProcess"  :disabled="dis.process" :tb-columns="formTitle.processName" show-field="processname" title="选择流程名称" placeholder="请选择流程名称" key-field="processid" >
    				 </v-selectpage>
        		</FormItem>
		        <FormItem label="授权时间段">
		            <Row>
		                <Col span="11">
		                    <FormItem prop="startDate">
		                        <DatePicker type="date" placeholder="选择开始日期" v-model="formItem.startDate"></DatePicker>
		                    </FormItem>
		                </Col>
		                <Col span="2" style="text-align: center">-</Col>
		                <Col span="11">
		                    <FormItem prop="endDate">
		                        <DatePicker type="date" placeholder="选择结束日期" v-model="formItem.endDate" ></DatePicker>
		                    </FormItem>
		               </Col>
		            </Row>
		        </FormItem>        		
        		
			</Form>
			<div slot="footer" class="buttoncenter">
				<Button type="ghost" size="small" @click="modalflag = false">关闭</Button>
    			<!--<Button type="warning" size="small" @click="handleReset('formItem')">重置</Button>-->
    			<Button type="success" size="small" @click="confirm('formItem')" >确认</Button>
			</div>
		</Modal>
	</div>
</template>
<script src='./index.js'></script>
