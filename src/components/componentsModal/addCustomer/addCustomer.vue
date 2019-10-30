<template>
    <div v-if='isShow '>
        <Modal :title="title" v-model="isShow" width="1200" :styles="{top: '20px'}">
            <div slot="footer">
                <Button   size='small' @click="cancel">取消</Button>
                <Button type="primary" size='small' @click="ok">保存</Button>
            </div>
            <Tabs value="name1">
            <TabPane label="基础信息" name="name1">
        
            <Form v-if="freshValidate" ref="formValidate" :model="param" :label-width="150" :rules="ruleValidate">
                <Row>
                    <Col v-if="showObj.short_name" span="8">
                        <FormItem label="对手简称" prop="short_name">
                        <Input style="width: 200px" v-model="param.short_name" />
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.cust_name" span="8">
                        <FormItem label="对手全称" prop="cust_name">
                        <Input style="width: 200px" v-model="param.cust_name" />
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.cust_type" span="8">
                        <FormItem label="对手类别" prop="cust_type">
                        <Select style="width: 200px" v-model="param.cust_type" @on-change="change_cust_type" >
                            <Option v-for="item in optionMap['cust_type']" :value="item.key" :key="item.key+item.name" >{{item.name}}</Option>
                        </Select>
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.jsfl" span="8">
                        <FormItem label="角色分类" prop="jsfl">
                        <Select style="width: 200px" v-model="param.jsfl"  @on-change="change_jsfl">
                            <Option v-for="item in optionMap['jsfl']" :value="item.key" :key="item.key+item.name" >{{item.name}}</Option>
                        </Select>
                        </FormItem>
                    </Col>
                    
                    <Col v-if="showObj.org_code" span="8">
                        <FormItem label="组织机构代码" prop="org_code">
                        <Input style="width: 200px" v-model="param.org_code" />
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.jrjgdm" span="8">
                        <FormItem label="金融机构代码" prop="jrjgdm">
                        <Input style="width: 200px" v-model="param.jrjgdm" />
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.zzm" span="8">
                        <FormItem label="中征码" prop="zzm">
                        <Input style="width: 200px" v-model="param.zzm" />
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.qytz" span="8">
                        <FormItem label="企业特征" prop="qytz">
                        <Select style="width: 200px" v-model="param.qytz" >
                            <Option v-for="item in optionMap['qytz']" :value="item.key" :key="item.key+item.name" >{{item.name}}</Option>
                        </Select>
                        </FormItem>
                    </Col> 
                    <Col v-if="showObj.qyxz" span="8">
                        <FormItem label="企业性质" prop="qyxz">
                        <Select style="width: 200px" v-model="param.qyxz" >
                            <Option v-for="item in optionMap['qyxz']" :value="item.key" :key="item.key+item.name" >{{item.name}}</Option>
                        </Select>
                        </FormItem>
                    </Col> 
                    <Col v-if="showObj.hyfl" span="8">
                        <FormItem label="行业分类" prop="hyfl">
                        <Select style="width: 200px" v-model="param.hyfl" >
                            <Option v-for="item in optionMap['hyfl']" :value="item.key" :key="item.key+item.name" >{{item.name}}</Option>
                        </Select>
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.hyflmx" span="8">
                        <FormItem label="明细分类" prop="hyflmx">
                        <Select style="width: 200px" v-model="param.hyflmx" >
                            <Option v-for="item in optionMap['hyflmx']" :value="item.key" :key="item.key+item.name" >{{item.name}}</Option>
                        </Select>
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.jjlx" span="8">
                        <FormItem label="经济类型" prop="jjlx">
                        <Select style="width: 200px" v-model="param.jjlx" >
                            <Option v-for="item in optionMap['jjlx']" :value="item.key" :key="item.key+item.name" >{{item.name}}</Option>
                        </Select>
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.gslx" span="8">
                        <FormItem label="公司类型" prop="gslx">
                        <Select style="width: 200px" v-model="param.gslx" >
                            <Option v-for="item in optionMap['gslx']" :value="item.key" :key="item.key+item.name" >{{item.name}}</Option>
                        </Select>
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.jgxf" span="8">
                        <FormItem label="机构细分" prop="jgxf">
                        <Select style="width: 200px" v-model="param.jgxf" >
                            <Option v-for="item in optionMap['jgxf']" :value="item.key" :key="item.key+item.name" >{{item.name}}</Option>
                        </Select>
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.jclx" span="8">
                        <FormItem label="注册类型" prop="jclx">
                        <Select style="width: 200px" v-model="param.jclx" >
                            <Option v-for="item in optionMap['jclx']" :value="item.key" :key="item.key+item.name" >{{item.name}}</Option>
                        </Select>
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.tyshxydm" span="8">
                        <FormItem label="统一社会信用代码" prop="tyshxydm">
                        <Input style="width: 200px" v-model="param.tyshxydm" />
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.zczb" span="8">
                        <FormItem label="注册资本" prop="zczb">
                        <Input style="width: 200px" v-model="param.zczb" />
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.frdbxm" span="8">
                        <FormItem label="企业法人" prop="frdbxm">
                        <Input style="width: 200px" v-model="param.frdbxm" />
                        </FormItem>
                    </Col>


                    
                    <Col v-if="showObj.sex" span="8">
                        <FormItem label="对手性别" prop="sex">
                        <Select style="width: 200px" v-model="param.sex" >
                            <Option value="1" >男</Option>
                            <Option value="0" >女</Option>
                        </Select>
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.csrq" span="8">
                        <FormItem label="出生日期" prop="csrq">
                        <DatePicker type="date" placeholder="选择日期" style="width: 200px" v-model="param.csrq" />
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.jg_cert_type" span="8">
                        <FormItem label="证件类型" prop="jg_cert_type">
                        <Select style="width: 200px" v-model="param.jg_cert_type" >
                            <Option v-for="item in optionMap['jg_cert_type']" :value="item.key" :key="item.key+item.name" >{{item.name}}</Option>
                        </Select>
                        </FormItem>
                    </Col>   
                    <Col v-if="showObj.jg_cert_no" span="8">
                        <FormItem label="证件号码" prop="jg_cert_no">
                        <Input style="width: 200px" v-model="param.jg_cert_no" />
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.voc_type" span="8">
                        <FormItem label="职业分类" prop="voc_type">
                        <Select style="width: 200px" v-model="param.voc_type" >
                            <Option v-for="item in optionMap['voc_type']" :value="item.key" :key="item.key+item.name" >{{item.name}}</Option>
                        </Select>
                        </FormItem>
                    </Col>  
                    <Col v-if="showObj.jzgj" span="8">
                        <FormItem label="居住国家" prop="jzgj">
                        <Select style="width: 200px" v-model="param.jzgj" >
                            <Option v-for="item in optionMap['jzgj']" :value="item.key" :key="item.key+item.name" >{{item.name}}</Option>
                        </Select>
                        </FormItem>
                    </Col> 
                    <Col v-if="showObj.jjcf" span="8">
                        <FormItem label="经济成分" prop="jjcf">
                        <Select style="width: 200px" v-model="param.jjcf" >
                            <Option v-for="item in optionMap['jjcf']" :value="item.key" :key="item.key+item.name" >{{item.name}}</Option>
                        </Select>
                        </FormItem>
                    </Col> 
                    
                    <Col v-if="showObj.jzs" span="8">
                        <FormItem label="居住省" prop="jzs">
                        <Select style="width: 200px" v-model="param.jzs" @on-change="change_jzs" >
                            <Option v-for="item in optionMap['jzs']" :value="item.key" :key="item.key+item.name" >{{item.name}}</Option>
                        </Select>
                        </FormItem>
                    </Col> 
                    <Col v-if="showObj.jzcs" span="8">
                        <FormItem label="居住城市" prop="jzcs">
                        <Select style="width: 200px" v-model="param.jzcs" >
                            <Option v-for="item in optionMap['jzcs']" :value="item.key" :key="item.key+item.name" >{{item.name}}</Option>
                        </Select>
                        </FormItem>
                    </Col> 

                    <Col v-if="showObj.qyclrq" span="8">
                        <FormItem label="企业成立日期" prop="qyclrq">
                        <DatePicker type="date" placeholder="选择日期" style="width: 200px" v-model="param.qyclrq" />
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.djksrq" span="8">
                        <FormItem label="登记开始日期" prop="djksrq">
                        <DatePicker type="date" placeholder="选择日期" style="width: 200px" v-model="param.djksrq" />
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.djdqrq" span="8">
                        <FormItem label="登记到期日期" prop="djdqrq">
                        <DatePicker type="date" placeholder="选择日期" style="width: 200px" v-model="param.djdqrq" />
                        </FormItem>
                    </Col>

                    <!-- zcdz1 -->
                    <Col v-if="showObj.zcdz1" span="8">
                        <FormItem label="注册地址省" prop="zcdz1">
                        <Select style="width: 200px" v-model="param.zcdz1" >
                            <Option v-for="item in optionMap['jzs']" :value="item.key" :key="item.key+item.name" >{{item.name}}</Option>
                        </Select>
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.zcdz2" span="8">
                        <FormItem label="注册地址市" prop="zcdz2">
                        <Select style="width: 200px" v-model="param.zcdz2" >
                            <Option v-for="item in optionMap['jzcs']" :value="item.key" :key="item.key+item.name" >{{item.name}}</Option>
                        </Select>
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.zcdz3" span="8">
                        <FormItem label="注册地址区" prop="zcdz3">
                        <Select style="width: 200px" v-model="param.zcdz3" >
                            <Option v-for="item in optionMap['jzcs']" :value="item.key" :key="item.key+item.name" >{{item.name}}</Option>
                        </Select>
                        </FormItem>
                    </Col>


                    <Col v-if="showObj.jgxydm" span="8">
                        <FormItem label="机构信用代码" prop="jgxydm">
                        <Input style="width: 200px" v-model="param.jgxydm" />
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.gsdjzh" span="8">
                        <FormItem label="国税登记证号" prop="gsdjzh">
                        <Input style="width: 200px" v-model="param.gsdjzh" />
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.dsdjzh" span="8">
                        <FormItem label="地税登记证号" prop="dsdjzh">
                        <Input style="width: 200px" v-model="param.dsdjzh" />
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.qyzzc" span="8">
                        <FormItem label="企业总资产" prop="qyzzc">
                        <Input style="width: 200px" v-model="param.qyzzc" />
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.qyzfz" span="8">
                        <FormItem label="企业总负债" prop="qyzfz">
                        <Input style="width: 200px" v-model="param.qyzfz" />
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.sfss" span="8">
                        <FormItem label="是否上市" prop="sfss">
                        <Select style="width: 200px" v-model="param.sfss" >
                            <Option value="1" >是</Option>
                            <Option value="0" >否</Option>
                        </Select>
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.sfjt" span="8">
                        <FormItem label="是否集团" prop="sfjt">
                        <Select style="width: 200px" v-model="param.sfjt" >
                            <Option value="1" >是</Option>
                            <Option value="0" >否</Option>
                        </Select>
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.jylx" span="8">
                        <FormItem label="经营类型" prop="jylx">
                        <Select style="width: 200px" v-model="param.jylx" >
                            <Option v-for="item in optionMap['jylx']" :value="item.key" :key="item.key+item.name" >{{item.name}}</Option>
                        </Select>
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.hzlx" span="8">
                        <FormItem label="合作类型" prop="hzlx">
                        <Select style="width: 200px" v-model="param.hzlx" >
                            <Option v-for="item in optionMap['hzlx']" :value="item.key" :key="item.key+item.name" >{{item.name}}</Option>
                        </Select>
                        </FormItem>
                    </Col>
                    
                    
                    
                    <Col v-if="showObj.grnsr" span="8">
                        <FormItem label="个人年收入" prop="grnsr">
                        <Input style="width: 200px" v-model="param.grnsr" />
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.jtnsr" span="8">
                        <FormItem label="家庭年收入" prop="jtnsr">
                        <Input style="width: 200px" v-model="param.jtnsr" />
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.gllx" span="8">
                        <FormItem label="关联类型" prop="gllx">
                        <Select style="width: 200px" v-model="param.gllx" >
                            <Option v-for="item in optionMap['gllx']" :value="item.key" :key="item.key+item.name" >{{item.name}}</Option>
                        </Select>
                        </FormItem>
                    </Col> 
 
                    <Col v-if="showObj.jckqbz" span="8">
                        <FormItem label="进出口权标志" prop="jckqbz">
                        <Select style="width: 200px" v-model="param.jckqbz" >
                            <Option v-for="item in optionMap['jckqbz']" :value="item.key" :key="item.key+item.name" >{{item.name}}</Option>
                        </Select>
                        </FormItem>
                    </Col> 
                    <Col v-if="showObj.sfsnbs" span="8">
                        <FormItem label="是否三农标识" prop="sfsnbs">
                        <Select style="width: 200px" v-model="param.sfsnbs" >
                            <Option value="1" >是</Option>
                            <Option value="0" >否</Option>
                        </Select>
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.sfrzpt" span="8">
                        <FormItem label="是否融资平台" prop="sfrzpt">
                        <Select style="width: 200px" v-model="param.sfrzpt" >
                            <Option value="1" >是</Option>
                            <Option value="0" >否</Option>
                        </Select>
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.szzfjb" span="8">
                        <FormItem label="所在政府级别" prop="szzfjb">
                        <Select style="width: 200px" v-model="param.szzfjb" >
                            <Option v-for="item in optionMap['szzfjb']" :value="item.key" :key="item.key+item.name" >{{item.name}}</Option>
                        </Select>
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.szzfmc" span="8">
                        <FormItem label="所在政府名称" prop="szzfmc">
                        <Input style="width: 200px" v-model="param.szzfmc" />
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.zfkgfs" span="8">
                        <FormItem label="政府控股方式" prop="zfkgfs">
                        <Select style="width: 200px" v-model="param.zfkgfs" >
                            <Option v-for="item in optionMap['zfkgfs']" :value="item.key" :key="item.key+item.name" >{{item.name}}</Option>
                        </Select>
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.ssjt" span="8">
                        <FormItem label="所属集团" prop="ssjt">
                        <Select style="width: 200px" v-model="param.ssjt" >
                            <Option v-for="item in optionMap['ssjt']" :value="item.key" :key="item.key+item.name" >{{item.name}}</Option>
                        </Select>
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.jycdsyq" span="8">
                        <FormItem label="经营场地所有权" prop="jycdsyq">
                        <Select style="width: 200px" v-model="param.jycdsyq" >
                            <Option v-for="item in optionMap['jycdsyq']" :value="item.key" :key="item.key+item.name" >{{item.name}}</Option>
                        </Select>
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.jyfw" span="8">
                        <FormItem label="经营范围" prop="jyfw">
                        <Input style="width: 200px" v-model="param.jyfw" />
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.ybczyssr" span="8">
                        <FormItem label="一般财政预算收入" prop="ybczyssr">
                        <Input style="width: 200px" v-model="param.ybczyssr" />
                        </FormItem>
                    </Col>
                    

                    
                    
                    <Col v-if="showObj.jydsqk" span="8">
                        <FormItem label="交易对手方情况" prop="jydsqk">
                        <Select style="width: 200px" v-model="param.jydsqk" >
                            <Option v-for="item in optionMap['jydsqk']" :value="item.key" :key="item.key+item.name" >{{item.name}}</Option>
                        </Select>
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.jztczt" span="8">
                        <FormItem label="尽职调查状态" prop="jztczt">
                        <Select style="width: 200px" v-model="param.jztczt" >
                            <Option v-for="item in optionMap['jztczt']" :value="item.key" :key="item.key+item.name" >{{item.name}}</Option>
                        </Select>
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.jztcsj" span="8">
                        <FormItem label="尽职调查时间" prop="jztcsj">
                        <DatePicker type="date" placeholder="选择日期" style="width: 200px" v-model="param.jztcsj" />
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.address" span="8">
                        <FormItem label="通讯地址" prop="address">
                        <Input style="width: 200px" v-model="param.address" />
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.lxr" span="8">
                        <FormItem label="联系人" prop="lxr">
                        <Input style="width: 200px" v-model="param.lxr" />
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.phone" span="8">
                        <FormItem label="电话" prop="phone">
                        <Input style="width: 200px" v-model="param.phone" />
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.cz" span="8">
                        <FormItem label="传真" prop="cz">
                        <Input style="width: 200px" v-model="param.cz" />
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.zip_code" span="8">
                        <FormItem label="邮编" prop="zip_code">
                        <Input style="width: 200px" v-model="param.zip_code" />
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.mail" span="8">
                        <FormItem label="邮箱" prop="mail">
                        <Input style="width: 200px" v-model="param.mail" />
                        </FormItem>
                    </Col>
                    <Col v-if="showObj.mark" span="8">
                        <FormItem label="备注" prop="mark">
                           <Input style="width: 200px" v-model="param.mark" />
                        </FormItem>
                    </Col>
                    

                </Row>
            </Form>
            </TabPane>
            <TabPane v-if="this.param.cust_type!=='1'" label="股东信息" name="name2">标签二的内容</TabPane>
            <TabPane v-if="this.param.cust_type!=='1'" label="高管信息" name="name3">标签三的内容</TabPane>
            <TabPane v-if="this.param.cust_type!=='1'" label="关联企业" name="name4">标签4的内容</TabPane>
        </Tabs>
            <selectModal ref="selectModal" @updatedata='updatedata' :attribute='propname'></selectModal>
        </Modal>
    </div>
</template>
<script>
    import moment from 'moment'
    import selectModal from '@/components/componentsModal/selectModal/index.vue';

    export default {
        components: {
            selectModal
        },
        data() {
            const tt={
                    '1':{
                        short_name:[{ required: true, message: '对手简称不能为空', }],
                        cust_name:[{ required: true, message: '对手全称不能为空', }], 
                        cust_type:[{ required: true, message: '对手类型不能为空',  }], 
                        jsfl:[{ required: true, message: '角色分类不能为空',  }], 
                        sex:[{ required: true, message: '对手性别不能为空',  }], 
                        csrq:[{type:'date', required: true, message: '出生日期不能为空',}], 
                        jg_cert_type:[{ required: true, message: '证件类型不能为空',}], 
                        jg_cert_no:[{ required: true, message: '证件号码不能为空', }], 
                        voc_type:[{ required: true, message: '职业分类不能为空', }], 
                        jzgj:[{ required: true, message: '居住国家不能为空',  }], 
                        jzs:[{ required: true, message: '居住省不能为空',  }], 
                        jzcs:[{ required: true, message: '居住城市不能为空', }], 
                        gllx:[{ required: true, message: '关联类型不能为空',  }],
                    },
                    '2':{
                        short_name:[{ required: true, message: '对手简称不能为空', }],
                        cust_name:[{ required: true, message: '对手全称不能为空', }], 
                        cust_type:[{ required: true, message: '对手类型不能为空',  }], 
                        jsfl:[{ required: true, message: '角色分类不能为空',  }], 
                        org_code:[{ required: true, message: '组织机构代码不能为空',  }],
                        jrjgdm:[{ required: true, message: '金融机构代码不能为空',  }],
                        sex:[{ required: true, message: '对手性别不能为空',  }], 
                        csrq:[{type:'date', required: true, message: '出生日期不能为空',}], 
                        jg_cert_type:[{ required: true, message: '证件类型不能为空',}], 
                        jg_cert_no:[{ required: true, message: '证件号码不能为空', }], 
                        voc_type:[{ required: true, message: '职业分类不能为空', }], 
                        jzgj:[{ required: true, message: '居住国家不能为空',  }], 
                        jzs:[{ required: true, message: '居住省不能为空',  }], 
                        jzcs:[{ required: true, message: '居住城市不能为空', }], 
                        gllx:[{ required: true, message: '关联类型不能为空',  }],
                    },
                    
                }
            return {
                freshValidate:true,
                isShow: false,
                param: {
                },
                // k1:'1',
                ruleValidate: {},
                title: '新增',
                loading: true,
                cust_id_name: '',
                userList: [],
                type: '',   //type==1时为修改，为空时为新增
                optionMap: {},
                propname: '',
                productName: '',
                isShowObj:{  //1个人，2金融机构，3非金融机构
                    '1':{
                        short_name:1, cust_name:1, cust_type:1, jsfl:1, sex:1, csrq:1, jg_cert_type:1, jg_cert_no:1, voc_type:1, jzgj:1, jzs:1, jzcs:1, grnsr:1, jtnsr:1, gllx:1, jydsqk:1, jztczt:1,
                        jztcsj:1, address:1, lxr:1, phone:1, cz:1, zip_code:1, mail:1, mark:1,
                    },
                    '2':{
                        short_name:1, cust_name:1, cust_type:1, jsfl:1, org_code:1, jrjgdm:1, zzm:1, qytz:1, qyxz:1,
                        hyfl:1, hyflmx:1, jjlx:1, gslx:1, jzgj:1, jgxf:1, jclx:1, tyshxydm:1, zczb:1, frdbxm:1, gr_cert_no:1, 
                        gr_cert_type:1, qyclrq:1, djksrq:1, djdqrq:1, jgxydm:1, gsdjzh:1, dsdjzh:1, qyzzc:1, qyzfz:1,  sfss:1,
                        sfjt:1, jylx:1, hzlx:1, gllx:1, jckqbz:1, sfsnbs:1, sfrzpt:1, szzfjb:1, szzfmc:1, zfkgfs:1, ssjt:1, 
                        jycdsyq:1, jyfw:1, ybczyssr:1,jydsqk:1,  jztczt:1, jztcsj:1, address:1, lxr:1, phone:1, cz:1,
                        zip_code:1, mail:1, mark:1,zcdz1:1,zcdz2:1,zcdz3:1,
                    },
                    '3-1':{
                        short_name:1, cust_name:1, cust_type:1, jsfl:1, org_code:1,zzm:1, qytz:1, qyxz:1,hyfl:1, hyflmx:1, jjlx:1,
                        jzgj:1,jjcf:1,  gslx:1, jgxf:1,jclx:1, tyshxydm:1, zczb:1, frdbxm:1,gr_cert_no:1, 
                        gr_cert_type:1,qyclrq:1, djksrq:1, djdqrq:1,zcdz1:1,zcdz2:1,zcdz3:1, jgxydm:1,gsdjzh:1, dsdjzh:1, qyzzc:1, qyzfz:1,  sfss:1,
                        sfjt:1, jylx:1, hzlx:1, gllx:1, jckqbz:1, sfsnbs:1, sfrzpt:1, szzfjb:1, szzfmc:1, zfkgfs:1, ssjt:1, 
                        jycdsyq:1, jyfw:1, ybczyssr:1,jydsqk:1,  jztczt:1, jztcsj:1, address:1, lxr:1, phone:1, cz:1,zip_code:1, mail:1, mark:1,
                    },
                    '3-2':{
                        short_name:1, cust_name:1, cust_type:1, jsfl:1, org_code:1,zzm:1, qytz:1, qyxz:1,hyfl:1, hyflmx:1, jjlx:1,
                        jzgj:1,  gslx:1, jgxf:1,jclx:1, tyshxydm:1, zczb:1, frdbxm:1,gr_cert_no:1, 
                        gr_cert_type:1,qyclrq:1, djksrq:1, djdqrq:1,zcdz1:1,zcdz2:1,zcdz3:1, jgxydm:1,gsdjzh:1, dsdjzh:1, qyzzc:1, qyzfz:1,  sfss:1,
                        sfjt:1, jylx:1, hzlx:1, gllx:1, jckqbz:1, sfsnbs:1, sfrzpt:1, szzfjb:1, szzfmc:1, zfkgfs:1, ssjt:1, 
                        jycdsyq:1, jyfw:1, ybczyssr:1,jydsqk:1,  jztczt:1, jztcsj:1, address:1, lxr:1, phone:1, cz:1,zip_code:1, mail:1, mark:1,
                    },
                    '3-3':{
                        short_name:1, cust_name:1, cust_type:1, jsfl:1, org_code:1,zzm:1, qytz:1, qyxz:1,hyfl:1, hyflmx:1, jjlx:1,
                        jzgj:1,  gslx:1, jgxf:1,jclx:1, tyshxydm:1, zczb:1, frdbxm:1,gr_cert_no:1, 
                        gr_cert_type:1,qyclrq:1, djksrq:1, djdqrq:1,zcdz1:1,zcdz2:1,zcdz3:1, jgxydm:1,gsdjzh:1, dsdjzh:1, qyzzc:1, qyzfz:1,  sfss:1,
                        sfjt:1, jylx:1, hzlx:1, gllx:1, jckqbz:1, sfsnbs:1, sfrzpt:1, szzfjb:1, szzfmc:1, zfkgfs:1, ssjt:1, 
                        jycdsyq:1, jyfw:1, ybczyssr:1,jydsqk:1,  jztczt:1, jztcsj:1, address:1, lxr:1, phone:1, cz:1,zip_code:1, mail:1, mark:1,
                    },
                    '3-4':{
                        short_name:1, cust_name:1, cust_type:1, jsfl:1, org_code:1,zzm:1, qytz:1, qyxz:1,hyfl:1, hyflmx:1, jjlx:1,
                        jzgj:1,  gslx:1, jgxf:1,jclx:1, tyshxydm:1, zczb:1, frdbxm:1,gr_cert_no:1, 
                        gr_cert_type:1,qyclrq:1, djksrq:1, djdqrq:1,zcdz1:1,zcdz2:1,zcdz3:1, jgxydm:1,gsdjzh:1, dsdjzh:1, qyzzc:1, qyzfz:1,  sfss:1,
                        sfjt:1, jylx:1, hzlx:1, gllx:1, jckqbz:1, sfsnbs:1, sfrzpt:1, szzfjb:1, szzfmc:1, zfkgfs:1, ssjt:1, 
                        jycdsyq:1, jyfw:1, ybczyssr:1,jydsqk:1,  jztczt:1, jztcsj:1, address:1, lxr:1, phone:1, cz:1,zip_code:1, mail:1, mark:1,
                    },
                    '3-5':{
                        short_name:1, cust_name:1, cust_type:1, jsfl:1, org_code:1,zzm:1, qytz:1, qyxz:1,hyfl:1, hyflmx:1, jjlx:1,
                        jzgj:1,  gslx:1, jgxf:1,jclx:1, tyshxydm:1, zczb:1, frdbxm:1,gr_cert_no:1, 
                        gr_cert_type:1,qyclrq:1, djksrq:1, djdqrq:1,zcdz1:1,zcdz2:1,zcdz3:1, jgxydm:1,gsdjzh:1, dsdjzh:1, qyzzc:1, qyzfz:1,  sfss:1,
                        sfjt:1, jylx:1, hzlx:1, gllx:1, jckqbz:1, sfsnbs:1, sfrzpt:1, szzfjb:1, szzfmc:1, zfkgfs:1, ssjt:1, 
                        jycdsyq:1, jyfw:1, ybczyssr:1,jydsqk:1,  jztczt:1, jztcsj:1, address:1, lxr:1, phone:1, cz:1,zip_code:1, mail:1, mark:1,
                    },
                    '3-z':{
                        short_name:1, cust_name:1, cust_type:1, jsfl:1, org_code:1,zzm:1, qytz:1, qyxz:1,hyfl:1, hyflmx:1, jjlx:1,
                        jzgj:1,  gslx:1, jgxf:1,jclx:1, tyshxydm:1, zczb:1, frdbxm:1,gr_cert_no:1, 
                        gr_cert_type:1,qyclrq:1, djksrq:1, djdqrq:1,zcdz1:1,zcdz2:1,zcdz3:1, jgxydm:1,gsdjzh:1, dsdjzh:1, qyzzc:1, qyzfz:1,  sfss:1,
                        sfjt:1, jylx:1, hzlx:1, gllx:1, jckqbz:1, sfsnbs:1, sfrzpt:1, szzfjb:1, szzfmc:1, zfkgfs:1, ssjt:1, 
                        jycdsyq:1, jyfw:1, ybczyssr:1,jydsqk:1,  jztczt:1, jztcsj:1, address:1, lxr:1, phone:1, cz:1,zip_code:1, mail:1, mark:1,
                    },
                },
                showObj:{   //默认展示 个人 要素
                    short_name:1, cust_name:1, cust_type:1, jsfl:1, sex:1, csrq:1, jg_cert_type:1, jg_cert_no:1, voc_type:1, jzgj:1, jzs:1, jzcs:1, grnsr:1, jtnsr:1, gllx:1, jydsqk:1, jztczt:1,
                    jztcsj:1, address:1, lxr:1, phone:1, cz:1, zip_code:1, mail:1, mark:1,
                },
                key:'1',
                rules:{
                    '1':{
                        short_name:[{ required: true, message: '对手简称不能为空', }],
                        cust_name:[{ required: true, message: '对手全称不能为空', }], 
                        cust_type:[{ required: true, message: '对手类型不能为空',  }], 
                        jsfl:[{ required: true, message: '角色分类不能为空',  }], 
                        sex:[{ required: true, message: '对手性别不能为空',  }], 
                        csrq:[{type:'date', required: true, message: '出生日期不能为空',}], 
                        jg_cert_type:[{ required: true, message: '证件类型不能为空',}], 
                        jg_cert_no:[{ required: true, message: '证件号码不能为空', }], 
                        voc_type:[{ required: true, message: '职业分类不能为空', }], 
                        jzgj:[{ required: true, message: '居住国家不能为空',  }], 
                        jzs:[{ required: true, message: '居住省不能为空',  }], 
                        jzcs:[{ required: true, message: '居住城市不能为空', }], 
                        gllx:[{ required: true, message: '关联类型不能为空',  }],
                    },
                    '2':{
                        short_name:[{ required: true, message: '对手简称不能为空', }],
                        cust_name:[{ required: true, message: '对手全称不能为空', }], 
                        cust_type:[{ required: true, message: '对手类型不能为空',  }], 
                        jsfl:[{ required: true, message: '角色分类不能为空',  }], 
                        org_code:[{ required: true, message: '组织机构代码不能为空',  }],
                        jrjgdm:[{ required: true, message: '金融机构代码不能为空',  }],
                        sex:[{ required: true, message: '对手性别不能为空',  }], 
                        csrq:[{type:'date', required: true, message: '出生日期不能为空',}], 
                        jg_cert_type:[{ required: true, message: '证件类型不能为空',}], 
                        jg_cert_no:[{ required: true, message: '证件号码不能为空', }], 
                        voc_type:[{ required: true, message: '职业分类不能为空', }], 
                        jzgj:[{ required: true, message: '居住国家不能为空',  }], 
                        jzs:[{ required: true, message: '居住省不能为空',  }], 
                        jzcs:[{ required: true, message: '居住城市不能为空', }], 
                        gllx:[{ required: true, message: '关联类型不能为空',  }],
                    },
                    
                }
            }
        },
        methods: {
            showModal(type) {
                this.getOptions()

                if (type) { //修改
                    this.title = '修改对手方信息'
                    this.type = 1
                    if (!this.$store.state.tableselect.selectdata || !this.$store.state.tableselect.selectdata[0]) {
                        this.$Message.error('请选择一项')
                        return
                    }
                    if (this.$store.state.tableselect.selectdata.length > 1) {
                        this.$Message.error('仅能选择一项')
                        return
                    }

                    let obj = JSON.parse(JSON.stringify(this.$store.state.tableselect.selectdata[0]));
                    this.isShow = true

                    this.getData(obj.cust_id_name)
                } else {
                    this.isShow = true

                    this.title = '新增对手方'
                    this.type = ''
                    this.param = {
                        short_name:'', cust_name:'', cust_type:'1', jsfl:'', org_code:'',zzm:'', qytz:'', qyxz:'',hyfl:'', hyflmx:'', jjlx:'',jjcf:'',jrjgdm:'',
                        sex:'',csrq:'',voc_type:'',grnsr:'',jtnsr:'',
                        jzgj:'',  gslx:'', jgxf:'',jclx:'', tyshxydm:'', zczb:'', frdbxm:'',gr_cert_no:'', 
                        gr_cert_type:'',qyclrq:'', djksrq:'', djdqrq:'',zcdz1:'',zcdz2:'',zcdz3:'', jgxydm:'',gsdjzh:'', dsdjzh:'', qyzzc:'', qyzfz:'',  sfss:'',
                        sfjt:'', jylx:'', hzlx:'', gllx:'', jckqbz:'', sfsnbs:'', sfrzpt:'', szzfjb:'', szzfmc:'', zfkgfs:'', ssjt:'', 
                        jycdsyq:'', jyfw:'', ybczyssr:'',jydsqk:'',  jztczt:'', jztcsj:'', address:'', lxr:'', phone:'', cz:'',zip_code:'', mail:'', mark:'',
                    }
                    this.ruleValidate =  JSON.parse(JSON.stringify(this.rules['1']))
                    this.freshValidate = false
                    
                    setTimeout(()=>this.freshValidate = true, 0 )
                }

            },
            getData(cust_id_name) {
                const url = this.GLOBAL.API_INVEST_FINDCUSTBYID
                this.$get(url, { cust_id_name }).then(res => {
                    if (res.status == 200) {
                        const ret = res.data
                        if (ret.success) {
                            const obj = ret.data
                            delete (obj.input_time)
                            delete (obj.input_man)
                            delete (obj.update_time)
                            delete (obj.update_time)
                            this.cust_id_name = obj.cust_id_name
                            this.param = {
                                ...obj,
                                csrq: obj.csrq ? moment(obj.csrq.toString(), 'YYYYMMDD').format('YYYY-MM-DD') : '',
                                jztcsj: obj.jztcsj ? moment(obj.jztcsj.toString(), 'YYYYMMDD').format('YYYY-MM-DD') : '',
                                qyclrq: obj.qyclrq ? moment(obj.qyclrq.toString(), 'YYYYMMDD').format('YYYY-MM-DD') : '',
                                djksrq: obj.djksrq ? moment(obj.djksrq.toString(), 'YYYYMMDD').format('YYYY-MM-DD') : '',
                                djdqrq: obj.djdqrq ? moment(obj.djdqrq.toString(), 'YYYYMMDD').format('YYYY-MM-DD') : '',
                            }
                            this.change_cust_type(obj.cust_type)   //对手类型
                            this.change_jsfl(obj.jsfl)   //角色分类
                            if (obj.jzs) {
                                this.change_jzs(obj.jzs)
                            }

                        } else {
                        }
                    }
                })

            },
            ok() {
                this.$refs['formValidate'].validate((valid) => {
                    if (valid) {
                        this.postdata()
                    } else {
                    }
                })
            },
            postdata() {
                const url = !this.type ? this.GLOBAL.API_INVEST_CUSTADD : this.GLOBAL.API_INVEST_CUSTUPDATE
                const params = {
                    ...this.param,
                    csrq: this.param.csrq ? moment(this.param.csrq).format('YYYYMMDD') : '',
                    jztcsj: this.param.jztcsj ? moment(this.param.jztcsj).format('YYYYMMDD') : '',
                    qyclrq: this.param.qyclrq ? moment(this.param.qyclrq).format('YYYYMMDD') : '',
                    djksrq: this.param.djksrq ? moment(this.param.djksrq).format('YYYYMMDD') : '',
                    djdqrq: this.param.djdqrq ? moment(this.param.djdqrq).format('YYYYMMDD') : '',
                }
                if (this.type) {
                    params.cust_id_name = this.cust_id_name
                }
                this.$post(url, params).then(res => {
                    if (res.status == 200) {
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
            cancel() {
                this.isShow = false
            },
            getOptions() {
                const url = this.GLOBAL.API_DIC_GETBYCODE;    //获取字典表数据 (下拉框使用)
                const list = [
                    { name: 'cust_type', codetype: 'X2045' },
                    { name: 'jsfl', codetype: 'A1015' },   //角色分类
                    { name:'jg_cert_type',codetype:'X2006'},  //证件类型
                    { name: 'voc_type', codetype: 'X2003' }, //职业分类
                    { name: 'jzgj', codetype: 'X2046' },    //国家
                    // { name: 'jzcs', codetype: 'COM_AREA' },         //城市
                    { name: 'jzs', codetype: 'COM_AREA' },          //省
                    { name: 'gllx', codetype: 'X2060' },      //关联类型
                    { name: 'jydsqk', codetype: 'X2066' }, //交易对手方情况
                    { name: 'jztczt', codetype: 'X2065' }, //尽职调查状态
                    { name: 'qytz', codetype: 'X2051' }, //企业特征
                    { name: 'qyxz', codetype: 'X2052' }, //企业性质
                    { name: 'hyfl', codetype: 'X1002' }, //行业分类
                    { name: 'hyflmx', codetype: 'X2100' }, //行业明细分类
                    { name: 'jjlx', codetype: 'X2053' }, //经济类型
                    { name: 'gslx', codetype: 'X2054' }, //公司类型
                    { name: 'jgxf', codetype: 'X2055' }, //机构细分
                    { name: 'jclx', codetype: 'X2056' }, //注册类型
                    { name: 'jylx', codetype: 'X2058' }, //经营类型
                    { name: 'hzlx', codetype: 'X2059' }, //合作类型
                    { name: 'szzfjb', codetype: 'A1007' }, //所在政府级别
                    { name: 'zfkgfs', codetype: 'X2062' }, //政府控股方式
                    { name: 'ssjt', codetype: 'X2063' }, //所属集团
                    { name: 'jycdsyq', codetype: 'X2064' }, //经营场地所有权
                    { name: 'jjcf', codetype: 'A1016' }, //经济成分 
                    // { name: 'qyxz', codetype: 'X2052' }, //企业性质
                    // { name: 'qyxz', codetype: 'X2052' }, //企业性质
                    // { name: 'qyxz', codetype: 'X2052' }, //企业性质
                    
                ]
                list.map(item => {
                    this.$post(url, item).then(res => {
                        if (res.status == 200) {
                            const ret = res.data
                            if (ret.success) {
                                this.optionMap = { ...this.optionMap, [item.name]: ret.data }
                            }
                        }
                    })
                })
            },
            change_cust_type(e) {
                console.log(this.isShowObj[e])
                if (e=='3') {
                    this.param.jsfl = '1'
                    this.change_jsfl('1')
                    return;
                }
                this.ruleValidate = JSON.parse(JSON.stringify(this.rules[e]))
                this.showObj = JSON.parse(JSON.stringify(this.isShowObj[e]))
                this.key = e
                this.freshValidate = false
                setTimeout(()=>this.freshValidate = true, 0 )

                // this.freshValidate = true
                console.log(this.$refs['formValidate'])
            },
            change_jsfl(e) {
                if (this.param.cust_type == '3') {
                    this.ruleValidate = JSON.parse(JSON.stringify(this.rules[`3-${e}`]))
                    this.showObj = JSON.parse(JSON.stringify(this.isShowObj[`3-${e}`]))
                    this.key = `3-${e}`
                    this.freshValidate = false
                    setTimeout(()=>this.freshValidate = true, 0 )

                    console.log('change to 3-'+e)
                }
            },
            change_jzs(e) {
                const url = this.GLOBAL.API_DIC_GETBYCODE;    //获取字典表数据 (下拉框使用)
                this.$post(url, {codetype:'COM_AREA',pid:e}).then(res => {
                        if (res.status == 200) {
                            const ret = res.data
                            if (ret.success) {
                                this.optionMap = { ...this.optionMap, ['jzcs']: ret.data }
                            }
                        }
                    })
            },
            search(type) {
                const param = {}
                let isPage = true;    //选择modal中 table是否分页
                if (type == '1') { //产品
                    this.propname = 'product_modal'
                    isPage = false
                }
                this.$refs.selectModal.showModal(param, isPage);
            },
            updatedata(obj, propname) {
                if (propname == 'product_modal') { //产品选择
                    this.Modalform.product_id = obj.product_id;
                    this.productName = obj.product_name;
                }
            },
        },
        created() {

        }

    }
</script>
