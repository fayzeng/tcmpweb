<template>
    <div v-if='isShow'>
      <Modal :title="title" v-model="isShow"  width="1000" :styles="{top: '20px'}" >
          <div slot="footer">
              <Button   size='small' @click="cancel">取消</Button>
              <Button type="primary" size='small' @click="ok">保存</Button>
          </div>
          <Form  ref="formValidate" :model="param" :label-width="100" :rules="ruleValidate" >
              <Row>
              <Col span="8">
                  <FormItem label="产品代码" prop="product_id">
                  <Input style="width: 200px" :disabled="true" v-model="productName" />
                  <Icon type="ios-search" size="18" @click="search(1)"></Icon>
                  </FormItem>
              </Col>
              <Col span="8">
                  <FormItem label="担保合同号" prop="tdc_no">
                  <Input style="width: 200px" v-model="param.tdc_no" />
                  </FormItem>
              </Col>
              <Col span="8">
                  <FormItem label="签约日期" prop="sign_date">
                  <DatePicker type="date" placeholder="选择日期" style="width: 200px" v-model="param.sign_date" />
                  </FormItem>
              </Col>
              <Col span="8">
                  <FormItem label="开始日期" prop="start_date">
                  <DatePicker type="date" placeholder="选择日期" style="width: 200px" v-model="param.start_date" />
                  </FormItem>
              </Col>
              <Col span="8">
                  <FormItem label="到期日期" prop="end_date">
                  <DatePicker type="date" placeholder="选择日期" style="width: 200px" v-model="param.end_date" />
                  </FormItem>
              </Col>
              <Col span="8">
                  <FormItem label="资产性质" prop="asset_prop">
                  <Select style="width: 200px" v-model="param.asset_prop" >
                     <Option v-for="item in optionMap['asset_prop']" :value="item.key" :key="item.key+item.name" >{{item.name}}</Option>
                  </Select>
                  </FormItem>
              </Col>
              <Col span="8">
                  <FormItem label="资产类型" prop="asset_type">
                  <Select style="width: 200px" v-model="param.asset_type" >
                     <Option v-for="item in optionMap['asset_type']" :value="item.key" :key="item.key+'_'+item.name" >{{item.name}}</Option>
                  </Select>
                  </FormItem>
              </Col>
              <Col span="8">
                  <FormItem label="担保人" prop="cust_id_name">
					  <Input style="width: 200px" :disabled="true" v-model="custName" />
					  <Icon type="ios-search" size="18" @click="search(2)"></Icon>
                  <!-- <Input style="width: 200px" v-model="param.cust_id_name" /> -->
                  </FormItem>
              </Col>
              <Col span="8">
                  <FormItem label="担保形式" prop="dbxs">
                  <Select style="width: 200px" v-model="param.dbxs" >
                     <Option v-for="item in optionMap['dbxs']" :value="item.key" :key="item.key+item.name" >{{item.name}}</Option>
                  </Select>
                  </FormItem>
              </Col>
              <Col  span="8">
                  <FormItem label="担保类型" prop="dblx">
                  <Select style="width: 200px" v-model="param.dblx" >
                     <Option v-for="item in optionMap['dblx']" :value="item.key" :key="item.key+item.name" >{{item.name}}</Option>
                  </Select>
                  </FormItem>
              </Col>
               <Col  span="8">
                  <FormItem label="担保人类型" prop="dbrlx">
                  <Select style="width: 200px" v-model="param.dbrlx" >
                     <Option v-for="item in optionMap['dbrlx']" :value="item.key" :key="item.key+item.name" >{{item.name}}</Option>
                  </Select>
                  </FormItem>
              </Col>
              <Col span="8">
                  <FormItem label="是否关联方" prop="sfglf">
                  <Select style="width: 200px" v-model="param.sfglf" >
                     <Option value="1" >是</Option>
                     <Option value="0" >否</Option>
                  </Select>
                  </FormItem>
              </Col>
              <Col span="8">
                  <FormItem label="期初价值" prop="qcjz">
                  <Input style="width: 200px" v-model="param.qcjz" />
                  </FormItem>
              </Col>
              <Col span="8">
                  <FormItem label="担保价值" prop="dzyje">
                  <Input style="width: 200px" v-model="param.dzyje" />
                  </FormItem>
              </Col>
              <Col span="8">
                  <FormItem label="是否入保" prop="sfrb">
                  <Select style="width: 200px" v-model="param.sfrb" >
                     <Option value="1" >是</Option>
                     <Option value="0" >否</Option>
                  </Select>
                  </FormItem>
              </Col>

              <Col span="8">
                  <FormItem label="保险期限" prop="bxqx">
                  <DatePicker type="date" placeholder="选择日期" style="width: 200px" v-model="param.bxqx" />
                  </FormItem>
              </Col>
              <Col span="8">
                  <FormItem label="保险公司" prop="bxgs">
                  <Input style="width: 200px" v-model="param.bxgs" />
                  </FormItem>
              </Col>
              <Col span="8">
                  <FormItem label="保单编号" prop="bdbh">
                  <Input style="width: 200px" v-model="param.bdbh" />
                  </FormItem>
              </Col>
              <Col span="8">
                  <FormItem label="保险金额" prop="bxje">
                  <Input style="width: 200px" v-model="param.bxje" />
                  </FormItem>
              </Col>
              <Col span="8">
                  <FormItem label="保险情况" prop="bxqk">
                  <Input style="width: 200px" v-model="param.bxqk" />
                  </FormItem>
              </Col>
              <Col span="8">
                  <FormItem label="担保说明" prop="dysm">
                  <Input style="width: 200px" v-model="param.dysm" />
                  </FormItem>
              </Col>



              </Row>
          </Form>
          <selectModal ref="selectModal" @updatedata='updatedata' :attribute='propname'></selectModal>
      </Modal>
    </div>
</template>
<script>
import moment from 'moment'
import selectModal from '@/components/componentsModal/selectModal/index.vue';

export default {
    components:{
      selectModal
    },
    data(){
        return {
            isShow:false,
            param:{
                product_id:'', tdc_no:'',  sign_date:'', start_date:'', end_date:'',
                asset_prop:'', asset_type:'', cust_id_name:'',dbxs:'',dblx:'',dbrlx:'',sfglf:'',
                qcjz:'',  dzyje:'', sfrb:'1', bxqx:'', bxgs:'', bdbh:'', bxje:'', bxqk:'', dysm:'',
            },
            ruleValidate:{
                product_id:[],
				cust_id_name:[],
                tdc_no:[{required: true, message: '合同号不能为空', trigger: 'blur'}],
                sign_date:[{type:'date',required: true, message: '签约日期不能为空', trigger: 'blur'}],
                start_date:[{type:'date',required: true, message: '开始日期不能为空', trigger: 'blur'}],
                end_date:[{type:'date',required: true, message: '到期日期不能为空', trigger: 'blur'}],
                asset_prop:[{required: true, message: '资产性质不能为空', trigger: 'blur'}],
                asset_type:[{required: true, message: '资产类型不能为空', trigger: 'blur'}],
                // cust_id_name:[{required: true, message: '抵押人不能为空', trigger: 'blur'}],
                dblx:[{required: true, message: '担保类型不能为空', trigger: 'blur'}],
                dbrlx:[{required: true, message: '担保人类型不能为空', trigger: 'blur'}],
                sfglf:[{required: true, message: '是否关联方不能为空', trigger: 'blur'}],
                qcjz:[{required: true, message: '期初价值不能为空', trigger: 'blur'}],
                dzyje:[{required: true, message: '担保价值不能为空', trigger: 'blur'}],
                sfrb:[{required: true, message: '是否入保不能为空', trigger: 'blur'}],
                bxqx:[{type:'date',required: true, message: '保险期限不能为空', trigger: 'blur'}],
                bxgs:[{required: true, message: '保险公司不能为空', trigger: 'blur'}],
                bdbh:[{required: true, message: '保单编号不能为空', trigger: 'blur'}],
                bxje:[{required: true, message: '保险金额不能为空', trigger: 'blur'}],
            },
            title:'新增',
            loading:true,
            tmi_id:'',
            userList:[],
            type:'',   //type==1时为修改，为空时为新增
            optionMap:{},
            propname:'',
            productName:'',
			custName: ''
        }
    },
    methods:{
        showModal(type){
            this.getOptions()
            

            if (type) { //修改
                this.title = '修改担保物信息'
                this.type = 1
                if (!this.$store.state.tableselect.selectdata || !this.$store.state.tableselect.selectdata[0]) {
                    this.$Message.error('请选择一项')
                    return
                }
                if (this.$store.state.tableselect.selectdata.length>1) {
                    this.$Message.error('仅能选择一项')
                    return
                }

                let obj = JSON.parse(JSON.stringify(this.$store.state.tableselect.selectdata[0]));
                this.isShow = true
                this.param ={
                    product_id:'', tdc_no:'',  sign_date:'', start_date:'', end_date:'',
                    asset_prop:'', asset_type:'', cust_id_name:'',dbxs:'',dblx:'',dbrlx:'',sfglf:'',
                    qcjz:'',  dzyje:'', sfrb:'1', bxqx:'', bxgs:'', bdbh:'', bxje:'', bxqk:'', dysm:'',
                }
                 
                this.getData(obj.tmi_id)
            } else {
                this.isShow = true
                 
                this.title = '新增担保物'
                this.type = ''
                this.param ={
                    product_id:'', tdc_no:'',  sign_date:'', start_date:'', end_date:'',
                    asset_prop:'', asset_type:'', cust_id_name:'',dbxs:'',dblx:'',dbrlx:'',sfglf:'',
                    qcjz:'',  dzyje:'', sfrb:'1', bxqx:'', bxgs:'', bdbh:'', bxje:'', bxqk:'', dysm:'',
                }
            }
        },
        getData(tmi_id){
            const url = this.GLOBAL.API_INVEST_FINDBYID
            this.$get(url,{tmi_id}).then(res=>{
                if(res.status == 200){
                    const ret = res.data
                    if (ret.success) {
                        const obj = ret.data
                        delete(obj.input_time)
                        delete(obj.input_man)
                        delete(obj.update_time)
                        delete(obj.update_time)
                        this.tmi_id = obj.tmi_id
                        this.param = {
                            ...obj,
                            sign_date: obj.sign_date ? moment(obj.sign_date.toString(),'YYYYMMDD').format('YYYY-MM-DD') :'',
                            start_date: obj.start_date ? moment(obj.start_date.toString(),'YYYYMMDD').format('YYYY-MM-DD') :'',
                            end_date: obj.end_date ? moment(obj.end_date.toString(),'YYYYMMDD').format('YYYY-MM-DD') :'',
                            bxqx: obj.bxqx ? moment(obj.bxqx.toString(),'YYYYMMDD').format('YYYY-MM-DD') :'',
                            cust_id_name: obj.cust_id_name ? obj.cust_id_name.toString() :'',
                            qcjz: obj.qcjz ? obj.qcjz.toString() :'',
                            dzyje: obj.dzyje ? obj.dzyje.toString() :'',
                            bxje: obj.bxje ? obj.bxje.toString() :'',
                            
                            
                        }

                    } else {
                    }
                }
            })

        },
        ok(){
            this.$refs['formValidate'].validate((valid) => {
                if (valid) {
                    this.postdata()
                } else {
                }
            })
        },
        postdata(){
            const url = !this.type ? this.GLOBAL.API_INVEST_ADD : this.GLOBAL.API_INVEST_UPDATE
            const params = {
                ...this.param,
                sign_date: this.param.sign_date ? moment(this.param.sign_date).format('YYYYMMDD') :'',
                start_date: this.param.start_date ? moment(this.param.start_date).format('YYYYMMDD') :'',
                end_date: this.param.end_date ? moment(this.param.end_date).format('YYYYMMDD') :'',
                bxqx: this.param.bxqx ? moment(this.param.bxqx).format('YYYYMMDD') :'',
            }
            if (this.type) {
                params.tmi_id = this.tmi_id
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
        getOptions(){
            const url = this.GLOBAL.API_DIC_GETBYCODE;    //获取字典表数据 (下拉框使用)
            const list = [
                {name:'asset_prop',codetype:'X2030',onlyKeys:'2'},
                {name:'asset_type',codetype:'X2031',onlyKeys:'3,4,9'},
                {name:'count_unit',codetype:'X2039'},
                {name:'dbxs',codetype:'X2042'},         //担保形式
                {name:'dblx',codetype:'X2043'},         //担保类型
                {name:'dbrlx',codetype:'X2044'},         //担保人类型

            ]
            list.map(item => {
                this.$post(url,item).then(res=>{
                    if(res.status == 200){
                        const ret = res.data
                        if (ret.success) {
                            this.optionMap = {...this.optionMap, [item.name]: ret.data}
                        }
                    }
                })
            })
        },
        search(type){
          const param = {}
          let isPage = true;    //选择modal中 table是否分页
          if (type=='1') { //产品
            this.propname = 'product_modal'
            isPage = false
          }else if (type == '2'){
				this.propname = 'customer'
		  }
          this.$refs.selectModal.showModal(param, isPage);
        },
        updatedata(obj, propname){
            if (propname=='product_modal'){ //产品选择
                this.param.product_id = obj.product_id;
                this.productName = obj.product_name;
            }else if (propname=='customer'){
				this.param.cust_id_name = obj.cust_id_name;
				this.custName = obj.short_name;
			}
        },
    },
    created(){

    }

}
</script>
