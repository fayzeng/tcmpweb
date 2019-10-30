<template>
  <div v-if="isShow">
    <Modal :title="title" v-model="isShow"  width="1000" :styles="{top: '20px'}" >
        <div slot="footer">
            <Button type="ghost" size='small' @click="cancel">取消</Button>
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
                <FormItem label="标的名称" prop="asset_name">
                     <Input style="width: 200px" v-model="param.asset_name" />
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
                <Select style="width: 200px" v-model="param.asset_type" @on-change="change_asset_type" >
                   <Option v-for="item in optionMap['asset_type']" :value="item.key" :key="item.key+'_'+item.name" >{{item.name}}</Option>
                </Select>
                </FormItem>
            </Col>
            <Col v-if="param.asset_type!='2' && param.asset_type!='H' && param.asset_type!='I' && param.asset_type!='G'" span="8">
                <FormItem label="明细类别" prop="asset_type_detail">
                <Select style="width: 200px" v-model="param.asset_type_detail" >
                   <Option v-for="item in optionMap['asset_type_detail']" :value="item.key" :key="item.key+item.name" >{{item.name}}</Option>
                </Select>
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem :label="param.asset_type=='G'||param.asset_type=='H'||param.asset_type=='I' ? '发行方': '出让方'" prop="cust_id_name">
					<Input style="width: 200px" :disabled="true" v-model="custName" />
					<Icon type="ios-search" size="18" @click="search(2)"></Icon>
                <!-- <Input style="width: 200px" v-model="param.cust_id_name" /> -->
                </FormItem>
            </Col>
            <Col v-if="param.asset_type_detail == '1' || param.asset_type_detail == '0'"  span="8">
                <FormItem label="市场类别" prop="sclb">
                <Select style="width: 200px" v-model="param.sclb" >
                   <Option v-for="item in optionMap['sclb']" :value="item.key" :key="item.key+item.name" >{{item.name}}</Option>
                </Select>
                </FormItem>
            </Col>
            <Col  v-if="param.asset_type_detail == '1' || param.asset_type_detail == '0'"  span="8">
                <FormItem label="证券代码" prop="zqdm">
                <Input style="width: 200px" v-model="param.zqdm" />
                </FormItem>
            </Col>
            <Col  v-if="param.asset_type_detail == '1'"  span="8">
                <FormItem label="解禁日期" prop="jjrq">
                <DatePicker type="date" placeholder="选择日期" style="width: 200px" v-model="param.jjrq" />
                </FormItem>
            </Col>
            <Col  v-if="param.asset_type_detail == '2'" span="8">
                <FormItem label="企业名称" prop="qymc">
                <Input style="width: 200px" v-model="param.qymc" />
                </FormItem>
            </Col>
            <Col v-if="param.asset_type_detail=='3'" span="8">
                <FormItem label="房产类型" prop="land_type">
                <Select style="width: 200px" v-model="param.land_type" >
                   <Option v-for="item in optionMap['land_type']" :value="item.key" :key="item.key+item.name" >{{item.name}}</Option>
                </Select>
                </FormItem>
            </Col>
            <Col v-if="param.asset_type_detail=='3'" span="8">
                <FormItem label="建筑面积" prop="build_area">
                <Input style="width: 200px" v-model="param.build_area" placeholder="单位:平方米" />
                </FormItem>
            </Col>
            <Col v-if="param.asset_type_detail=='3' || param.asset_type_detail=='4'" span="8">
                <FormItem label="土地面积" prop="land_area">
                <Input style="width: 200px" v-model="param.land_area" placeholder="单位:平方米" />
                </FormItem>
            </Col>
            <Col v-if="param.asset_type_detail=='3' || param.asset_type_detail=='4'" span="8">
                <FormItem label="坐落位置" prop="city">
                <Input style="width: 200px" v-model="param.city" />
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem label="入库数量" prop="asset_count">
                <Input style="width: 140px" v-model="param.asset_count" />
                <Select style="width: 60px" v-model="param.count_unit" >
                   <Option v-for="item in optionMap['count_unit']" :value="item.key" :key="item.key+item.name" >{{item.name}}</Option>
                </Select>
                </FormItem>
            </Col>

            <Col span="8">
                <FormItem label="期初价值" prop="qcjz">
                <Input style="width: 200px" v-model="param.qcjz" />
                </FormItem>
            </Col>
            <Col v-if="isPgShow" span="8">
                <FormItem label="评估日期" prop="pgrq">
                <DatePicker type="date" placeholder="选择日期" style="width: 200px" v-model="param.pgrq" />
                </FormItem>
            </Col>
            <Col  v-if="isPgShow" span="8">
                <FormItem label="评估价格" prop="asset_price">
                <Input style="width: 200px" v-model="param.asset_price" />
                </FormItem>
            </Col>
            <Col  v-if="isPgShow" span="8">
                <FormItem label="评估价值" prop="asset_money">
                <Input style="width: 200px" v-model="param.asset_money" />
                </FormItem>
            </Col>
            <Col  v-if="isPgShow" span="8">
                <FormItem label="评估币种" prop="pgbz">
                <Select style="width: 200px" v-model="param.pgbz" >
                   <Option v-for="item in optionMap['pgbz']" :value="item.key" :key="item.key+item.name" >{{item.name}}</Option>
                </Select>
                </FormItem>
            </Col>
            <Col  v-if="isPgShow" span="8">
                <FormItem label="评估说明" prop="pgsm">
                <Input style="width: 200px" v-model="param.pgsm" />
                </FormItem>
            </Col>
            <Col  v-if="isPgShow" span="8">
                <FormItem label="评估方法" prop="pgff">
                <Select style="width: 200px" v-model="param.pgff" >
                   <Option v-for="item in optionMap['pgff']" :value="item.key" :key="item.key+'-'+item.name" >{{item.name}}</Option>
                </Select>
                </FormItem>
            </Col>
            <Col  v-if="isPgShow" span="8">
                <FormItem label="评估机构" prop="pgjg">
                <Input style="width: 200px" v-model="param.pgjg" />
                </FormItem>
            </Col>
            <Col v-if="isBxShow"  span="8">
                <FormItem label="是否入保" prop="sfrb">
                <Select style="width: 200px" v-model="param.sfrb" >
                   <Option value="1" >是</Option>
                   <Option value="0" >否</Option>
                </Select>
                </FormItem>
            </Col>
            <Col v-if="isBxShow" span="8">
                <FormItem label="保险期限" prop="bxqx">
                <DatePicker type="date" placeholder="选择日期" style="width: 200px" v-model="param.bxqx" />
                </FormItem>
            </Col>
            <Col v-if="isBxShow" span="8">
                <FormItem label="保险公司" prop="bxgs">
                <Input style="width: 200px" v-model="param.bxgs" />
                </FormItem>
            </Col>
            <Col v-if="isBxShow" span="8">
                <FormItem label="保单编号" prop="bdbh">
                <Input style="width: 200px" v-model="param.bdbh" />
                </FormItem>
            </Col>
            <Col v-if="isBxShow" span="8">
                <FormItem label="保险金额" prop="bxje">
                <Input style="width: 200px" v-model="param.bxje" />
                </FormItem>
            </Col>
            <Col v-if="isBxShow" span="8">
                <FormItem label="保险情况" prop="bxqk">
                <Input style="width: 200px" v-model="param.bxqk" />
                </FormItem>
            </Col>

            <Col v-if="isSyShow"  span="8">
                <FormItem label="收益类别" prop="sylb">
                <Select style="width: 200px" v-model="param.sylb" >
                   <Option v-for="item in optionMap['sylb']" :value="item.key" :key="item.key+'-'+item.name" >{{item.name}}</Option>
                </Select>
                </FormItem>
            </Col>
            <Col v-if="param.asset_type_detail=='H'||param.asset_type_detail=='I'"   span="8">
                <FormItem :label="param.asset_type_detail=='H'?'理财类型':'资管类型'" prop="zglx">
                <Select style="width: 200px" v-model="param.zglx" >
                   <Option v-for="item in optionMap['zglx']" :value="item.key" :key="item.key+'-'+item.name" >{{item.name}}</Option>
                </Select>
                </FormItem>
            </Col>
            <Col v-if="isSyShow"  span="8">
                <FormItem label="标的物属性" prop="bdwsx">
                <Select style="width: 200px" v-model="param.bdwsx" >
                   <Option v-for="item in optionMap['bdwsx']" :value="item.key" :key="item.key+'-'+item.name" >{{item.name}}</Option>
                </Select>
                </FormItem>
            </Col>
            <Col v-if="isSyShow"  span="8">
                <FormItem label="收益类型" prop="sylx">
                <Select style="width: 200px" v-model="param.sylx" >
                   <Option v-for="item in optionMap['sylx']" :value="item.key" :key="item.key+'-'+item.name" >{{item.name}}</Option>
                </Select>
                </FormItem>
            </Col>
            <Col v-if="isSyShow"  span="8">
                <FormItem label="标的开始日期" prop="bdksrq">
                <DatePicker type="date" placeholder="选择日期" style="width: 200px" v-model="param.bdksrq" />
                </FormItem>
            </Col>
            <Col v-if="isSyShow"  span="8">
                <FormItem label="标的结束日期" prop="bdjsrq">
                <DatePicker type="date" placeholder="选择日期" style="width: 200px" v-model="param.bdjsrq" />
                </FormItem>
            </Col>
            <Col v-if="isSyShow"  span="8">
                <FormItem label="收益率" prop="sxl">
                <Input style="width: 200px" v-model="param.sxl" />
                </FormItem>
            </Col>


            <Col span="8">
                <FormItem label="备注信息" prop="mark">
                <Input style="width: 200px" v-model="param.mark" />
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
                product_id:'', tdc_no:'', asset_name:'', sign_date:'', start_date:'', end_date:'',
                asset_prop:'3', asset_type:'1', asset_type_detail:'', cust_id_name:'', land_type:'', build_area:'',
                land_area:'', city:'', rkrq:'', asset_count:'', count_unit:'',  qcjz:'', pgrq:'',
                asset_price:'', asset_money:'',  pgbz:'', pgsm:'', pgff:'', pgjg:'', sfrb:'1',
                bxqx:'', bxgs:'', bdbh:'', bxje:'', bxqk:'',  zqdm:'', sclb:'',jjrq:'',qymc:'',mark:'',sylb:'',
                bdwsx:'',sylx:'',bdksrq:'',bdjsrq:'',sxl:'',zglx:''
            },
            ruleValidate:{
                product_id:[],
				cust_id_name:[],
                // tdc_no:[{required: true, message: '合同号不能为空', trigger: 'blur'}],
                asset_name:[{required: true, message: '标的名称不能为空', trigger: 'blur'}],
                sign_date:[{type:'date',required: true, message: '签约日期不能为空', trigger: 'blur'}],
                start_date:[{type:'date',required: true, message: '开始日期不能为空', trigger: 'blur'}],
                end_date:[{type:'date',required: true, message: '到期日期不能为空', trigger: 'blur'}],
                asset_prop:[{required: true, message: '资产性质不能为空', trigger: 'change'}],
                asset_type:[{required: true, message: '资产类型不能为空', trigger: 'blur'}],
                asset_type_detail:[{required: true, message: '明细类别不能为空', trigger: 'blur'}],
                // cust_id_name:[{required: true, message: '出让人不能为空', trigger: 'blur'}],
                land_type:[{required: true, message: '房产类型不能为空', trigger: 'blur'}],
                build_area:[{required: true, message: '建筑面积不能为空', trigger: 'blur'}],
                asset_count:[{required: true, message: '入库数量不能为空', trigger: 'blur'}],
                bxqx:[{type:'date',required: true, message: '保险期限不能为空', trigger: 'blur'}],
                bxgs:[{required: true, message: '保险公司不能为空', trigger: 'blur'}],
                bdbh:[{required: true, message: '保单编号不能为空', trigger: 'blur'}],
                bxje:[{required: true, message: '保险金额不能为空', trigger: 'blur'}],
                pgff:[{required: true, message: '评估方法不能为空', trigger: 'blur'}],
                pgbz:[{required: true, message: '评估币种不能为空', trigger: 'blur'}],
                asset_money:[{required: true, message: '评估价值不能为空', trigger: 'blur'}],
                asset_price:[{required: true, message: '评估价格不能为空', trigger: 'blur'}],
                qcjz:[{required: true, message: '期初价值不能为空', trigger: 'blur'}],
                sylb:[{required: true, message: '收益类别不能为空', trigger: 'blur'}],
                sylx:[{required: true, message: '收益类型不能为空', trigger: 'blur'}],
                bdwsx:[{required: true, message: '标的物属性不能为空', trigger: 'blur'}],
                zglx:[{required: true, message: '资管类型(理财类型)不能为空', trigger: 'blur'}],

                sfrb:[{required: true, message: '是否入保不能为空', trigger: 'blur'}],
                bdksrq:[{required: true, message: '标的开始时间不能为空', trigger: 'blur'}],
                bdjsrq:[{required: true, message: '标的结束时间不能为空', trigger: 'blur'}],
                sxl:[{required: true, message: '收益率不能为空', trigger: 'blur'}],
                land_area:[],
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
    watch:{
        'param.asset_type_detail':function(val){
            if ( this.param.asset_type=='4' &&  this.param.asset_type_detail=='4'){
                this.$refs['formValidate'].rules.land_area=[{required: true, message: '土地面积不能为空', trigger: 'blur'}]
            } else if (this.param.asset_type=='4' && this.param.asset_type_detail=='3') {
                this.$refs['formValidate'].rules.land_area=[{required: false}]
            }

        }
    },
    computed:   {
        isBxShow:function(){    //保险信息是否展示
            if (this.param.asset_type == 'G' || this.param.asset_type == 'H' || this.param.asset_type == 'I') {
                return false;
            } else {
                return true
            }
        },
        isPgShow:function(){    //评估信息是否展示
            if (this.param.asset_type_detail == '2' || this.param.asset_type == '2' || this.param.asset_type == '3' || this.param.asset_type == '4' ) {
                return true;
            } else {
                return false
            }
        },
        isSyShow:function(){    //收益信息是否展示
            if (this.param.asset_type_detail == 'H' || this.param.asset_type == 'G' || this.param.asset_type == 'I'  ) {
                return true;
            } else {
                return false
            }
        }
    },
    methods:{
        showModal(type){
            this.getOptions()

            if (type) { //修改
                this.title = '修改标的物信息'
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
                this.param = {
                    product_id:'', tdc_no:'', asset_name:'', sign_date:'', start_date:'', end_date:'',
                    asset_prop:'3', asset_type:'1', asset_type_detail:'', cust_id_name:'', land_type:'', build_area:'',
                    land_area:'', city:'', rkrq:'', asset_count:'', count_unit:'0',  qcjz:'', pgrq:'',
                    asset_price:'', asset_money:'',  pgbz:'', pgsm:'', pgff:'', pgjg:'', sfrb:'1',
                    bxqx:'', bxgs:'', bdbh:'', bxje:'', bxqk:'',  zqdm:'', sclb:'',jjrq:'',qymc:'',mark:'',sylb:'',
                    bdwsx:'',sylx:'',bdksrq:'',bdjsrq:'',sxl:'',zglx:''
                }

                this.getData(obj.tmi_id)
            } else {
                this.isShow = true

                this.title = '新增标的物'
                this.type = ''
                this.param = {
                    product_id:'', tdc_no:'', asset_name:'', sign_date:'', start_date:'', end_date:'',
                    asset_prop:'3', asset_type:'1', asset_type_detail:'', cust_id_name:'', land_type:'', build_area:'',
                    land_area:'', city:'', rkrq:'', asset_count:'', count_unit:'0',  qcjz:'', pgrq:'',
                    asset_price:'', asset_money:'',  pgbz:'', pgsm:'', pgff:'', pgjg:'', sfrb:'1',
                    bxqx:'', bxgs:'', bdbh:'', bxje:'', bxqk:'',  zqdm:'', sclb:'',jjrq:'',qymc:'',mark:'',sylb:'',
                    bdwsx:'',sylx:'',bdksrq:'',bdjsrq:'',sxl:'',zglx:''
                }
                this.change_asset_type('1')
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
                        this.change_asset_type(obj.asset_type,1)   //根据资产类型 获取明细下拉框
                        this.param = {
                            ...obj,
                            sign_date: obj.sign_date ? moment(obj.sign_date.toString(),'YYYYMMDD').format('YYYY-MM-DD') :'',
                            start_date: obj.start_date ? moment(obj.start_date.toString(),'YYYYMMDD').format('YYYY-MM-DD') :'',
                            end_date: obj.end_date ? moment(obj.end_date.toString(),'YYYYMMDD').format('YYYY-MM-DD') :'',
                            bxqx: obj.bxqx ? moment(obj.bxqx.toString(),'YYYYMMDD').format('YYYY-MM-DD') :'',
                            cust_id_name: obj.cust_id_name ? obj.cust_id_name.toString() :'',
                            dzyl: obj.dzyl ? obj.dzyl.toString() :'',
                            cdcb: obj.cdcb ? obj.cdcb.toString() :'',
                            asset_count: obj.asset_count ? obj.asset_count.toString() :'',
                            qcjz: obj.qcjz ? obj.qcjz.toString() :'',
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
                djrq: this.param.djrq ? moment(this.param.djrq).format('YYYYMMDD') :'',
                yxqx: this.param.yxqx ? moment(this.param.yxqx).format('YYYYMMDD') :'',
                pgrq: this.param.pgrq ? moment(this.param.pgrq).format('YYYYMMDD') :'',
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
                {name:'asset_prop',codetype:'X2030',onlyKeys:'3'},
                {name:'asset_type',codetype:'X2031',onlyKeys:'1,2,3,4,G,H,I'},
                {name:'count_unit',codetype:'X2039'},
                {name:'land_type',codetype:'X2037'},
                {name:'qcsx',codetype:'X2040'},         //清偿顺序
                {name:'pgbz',codetype:'COM_CURRENCY'},      //评估币种
                {name:'pgff',codetype:'X2041'}, //评估方法
                {name:'sclb',codetype:'X2026'}, //市场类别
                {name:'bdwsx',codetype:'X2033'}, //标的物属性
                {name:'sylb',codetype:'X2034'}, //收益类别
                {name:'sylx',codetype:'X2032'}, //收益类型
                {name:'zglx',codetype:'X2035'}, //资管类型理财类型


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
        change_asset_type(e,type){
            //明细类别：字典 X2038 (当资产类型为4不动产时 字典只取3房产，其它资产类型的取 3以外的字典)，3房产 a船舶 b车辆 c设备 d 飞机 z其他
            let param = {codetype:'X2038'}   //明细类别
            if (e=='1'){        //股权时
                param.onlyKeys = '0,1,2'
            } else if(e=='2' || e=='H' || e=='I' || e=='G') { //债券时  return
                this.optionMap = {...this.optionMap, asset_type_detail: []}
                return
            } else if (e=='3') {    //动产
                param.ignoreKeys = '3,0,1,2,4'
            } else if (e=='4') { //不动产
                 param.onlyKeys = '3,4,z'
            }
            if (e != '4'){ //不是不动产时
                this.param.land_type = ''
                this.param.build_area = ''
                this.param.land_area = ''
                this.param.city = ''
            }
            const url = this.GLOBAL.API_DIC_GETBYCODE;    //获取字典表数据 (下拉框使用)
            this.$post(url,param).then(res=>{
                if(res.status == 200){
                    const ret = res.data
                    if (ret.success) {
                        this.optionMap = {...this.optionMap, asset_type_detail: ret.data}
                        if (!type) {
                            this.param.asset_type_detail = ''
                        }
                        // if (e=='2' || e=='H' || e=='I' || e=='G') {
                        //     this.param.asset_type_detail = ''
                        // } else if (e=='4') {
                        //     this.param.asset_type_detail = '3'
                        // } else if (e=='3') {
                        //     this.param.asset_type_detail = 'a'
                        // } else if (e=='1') {
                        // }
                    }
                }
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
