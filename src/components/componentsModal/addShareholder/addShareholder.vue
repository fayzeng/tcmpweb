<template>
    <div v-if='isShow'>
      <Modal :title="title" v-model="isShow"  width='700px' >
          <div slot="footer" class="buttoncenter">
              <Button   size='small' @click="cancel">取消</Button>
              <Button type="warning" size='small' @click="reset">重置</Button>
              <Button type="primary" size='small' @click="ok">保存</Button>
          </div>
          <Form  ref="formValidate" :model="param" :label-width="80" :rules="ruleValidate">
              <Row>
                <Col span="12">
                  <FormItem label="股东名称" prop="holder_name">
                     <Input style="width: 200px" v-model="param.holder_name" />
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="股东类别" prop="stocker_type">
                     <Select style="width: 200px" v-model="param.stocker_type" @on-change="changeType" >
                         <Option value="1" >个人</Option>
                         <Option value="2" >金融机构</Option>
                         <Option value="3" >非金融机构</Option>
                     </Select>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="证件类型" prop="cert_type">
                     <Select style="width: 200px" v-model="param.cert_type"  @on-change="changeCert_type" label-in-value >
                         <Option v-for="item in options" :value="item.value"  :key="item.value">{{item.label}}</Option>
                     </Select>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="证件号码" prop="cert_no">
                     <Input style="width: 200px" v-model="param.cert_no" />
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="持股方式" prop="holder_type">
                     <Select style="width: 200px" v-model="param.holder_type" >
                         <Option value="0">相对控股</Option>
                         <Option value="1">绝对控股</Option>
                     </Select>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="持股比例" prop="stock_rate">
                     <InputNumber  style="width: 200px" v-model="param.stock_rate" />%
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="股东状态" prop="status">
                     <Select style="width: 200px" v-model="param.status" >
                         <Option value="1">有效</Option>
                     </Select>
                  </FormItem>
                </Col>
              </Row>
          </Form>
      </Modal>
    </div>
</template>
<script>
import {validatorIdCard} from '@/libs/validate'
const validateStock_rate = (rule, value, callback) =>{
    const v = Number(value)
    if (v<=100) {
        callback()
    } else {
        callback(new Error('持股比例不能大于100%'));
    }
}
export default {
    data(){
        return {
            isShow:false,
            param:{
                holder_name:'',
                stocker_type:'1',
                cert_type:'',
                cert_no:'',
                holder_type:'0',
                stock_rate: 0,
                status: '1',
            },
            ruleValidate:{
                holder_name:[{required: true, message: ' ', trigger: 'blur'}],
                stocker_type:[{required: true, message: ' '}],
                cert_type:[{required: true, message: ' '}],
                cert_no:[{required: true, message: ' ' , trigger: 'blur' }],
                holder_type:[{required: true, message: ' ',trigger: 'blur'  }],
                stock_rate:[
                    // { type:'number',validator: validateStock_rate},
                    {type:'number',required: true, message: ' ',trigger: 'blur' },

                ],
                status:[{required: true, message: ' ',trigger: 'blur' }],
            },
            title:'新增',
            loading:true,
            sw_id:'',
            userList:[],
            type:'',   //type==1时为修改，为空时为新增
            options1:[],    //个人下拉框
            options2:[],    //机构下拉框
            options:[],     //下拉框取值
        }
    },
    methods:{
        reset(){
          this.param={
              holder_name:'',
              stocker_type:'1',
              cert_type:'',
              cert_no:'',
              holder_type:'0',
              stock_rate: 0,
              status: '1',
          }
        },
        showModal(type,sch_id){   //只有当修改时，sch_id才需要传值

            if (type) { //修改
                this.title = '修改股东信息'
                this.type = 1
                this.isShow = true

                this.getData(sch_id)
            } else {
                this.isShow = true

                this.title = '新增股东'
                this.type = ''
                this.param = {
                    holder_name:'',
                    stocker_type:'1',
                    cert_type:'',
                    cert_no:'',
                    holder_type:'0',
                    stock_rate: null,
                    status: '1',
                }
                this.changeType(this.param.stocker_type)
            }

        },
        getData(sch_id){
            const url = this.GLOBAL.API_SHAREHOLDER_FINDBYID
            this.$post(url,{sch_id}).then(res=>{
                if(res.status == 200){
                    const ret = res.data
                    if (ret.success) {
                        const obj = ret.data
                        // this.param.sw_id = obj.sw_id
                        this.sch_id = obj.sch_id
                        this.param.holder_name = obj.holder_name
                        this.param.stocker_type = obj.stocker_type
                        this.param.cert_type = obj.cert_type
                        this.param.cert_no = obj.cert_no
                        this.param.holder_type = obj.holder_type
                        this.param.stock_rate = obj.stock_rate
                        this.param.status = obj.status
                        this.changeType(this.param.stocker_type)
                        this.changeCert_type(this.param.cert_no)
                    } else {
                    }
                }
            })

        },
        ok(){
            if(!this.param.holder_name){
                this.$Message.error('请输入股东名称');
            }else if(!this.param.stocker_type){
                this.$Message.error('请选择股东类别');
            }else if(!this.param.cert_type){
                this.$Message.error('请选择证件类型');
            }else if(!this.param.cert_no){
                this.$Message.error('请输入证件号码');
            }else if(!this.param.holder_type){
               this.$Message.error('请选择持股方式');
            }else if(!this.param.stock_rate){
               this.$Message.error('请输入持股比例');
            }else if(!this.param.status){
                this.$Message.error('请选择股东状态');
            }else {
                this.postdata()
            }
        },
        postdata(){
            const url = !this.type ? this.GLOBAL.API_SHAREHOLDER_ADD : this.GLOBAL.API_SHAREHOLDER_UPDATE
            const params = {
                ...this.param
            }
            if (this.type) {
                params.sch_id = this.sch_id
            }
            this.$post(url,params).then(res=>{
                if(res.status == 200){
                    const ret = res.data
                    if (ret.success) {
                        this.isShow = false
                        this.$Message.success(this.type ? '修改成功' : '新增成功');
                        this.$emit('changpage')
                    } else {
                    }
                }
            })
        },
        cancel(){
            this.isShow = false
        },
        getOption(){
             const url = this.GLOBAL.API_DIC_GETBYCODE;    //获取字典表数据 (下拉框使用)
            this.$post(url,{codetype:'Y1001'}).then(res=>{
                if(res.status == 200){
                    const ret = res.data
                    if (ret.success) {
                        const options = ret.data.map(item => ({label:item.name,value:item.key}))
                        this.options1 = options   //个人
                    } else {
                        // this.$Message.error(ret.message)
                    }
                }
            })
            this.$post(url,{codetype:'Y1002'}).then(res=>{
                if(res.status == 200){
                    const ret = res.data
                    if (ret.success) {
                        const options = ret.data.map(item => ({label:item.name,value:item.key}))
                        this.options2 = options    //机构
                    } else {
                        // this.$Message.error(ret.message)
                    }
                }
            })
        },
        changeType(val){
            if (val==1) {   //选中个人时
                this.options = JSON.parse(JSON.stringify(this.options1))
            } else {   //选中机构时
                this.options = JSON.parse(JSON.stringify(this.options2))
            }
        },
        changeCert_type(val) { //修改证件类型时
            // if (val && this.param.stocker_type==1 && this.param.cert_type==10) {  //个人 and 证件为 身份证(10)时，校验身份证号码是否正确
            //     this.ruleValidate.cert_no.push({validator:validatorIdCard})
            // } else {
            //     this.ruleValidate.cert_no = [{required: true, message: '证件号码不能为空' , trigger: 'blur' }]
            //     // this.ruleValidate = JSON.parse(JSON.stringify(this.ruleValidate))
            // }
        }

    },
    created(){
        this.getOption()
    }

}
</script>
