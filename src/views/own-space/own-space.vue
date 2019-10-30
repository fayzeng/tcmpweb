<style lang="less" scoped>
    @import './own-space.less';
</style>
<template>
    <div>
        <Card>
            <p slot="title" style="color:red;">
                <Icon type="ios-person" size='26' />
                个人信息
            </p>
              <Row  v-for="(item,index) in  userInfoField " :key='index' :class="index%2 ==0 ? 'fieldinfo' : 'fieldinfoback'" >
                  <Col  span='4'>
                      <span class="labels">
                        {{item.label}}
                      </span>
                  </Col>
                  <Col span='6'>
                    <span class="values">
                        {{Modalform[item.key]}}
                    </span>
                  </Col>
                  <Col span='4' v-if='index == 2 || index == 4 ||  index == 5 || index ==7 || index ==8 || index ==9'>
                      <a @click='editchange(index)'>修改</a>
                  </Col>
              </Row>
          </Card>
          <Modal
              v-model="flag"
              width='300'
              class='modal'
              title="修改个人信息">
              <Input v-model="Modalform1.idNumber"  v-if='indexflag==2' />
              <Input v-model="Modalform1.phone"  v-if='indexflag==4' />
              <Input v-model="Modalform1.telPhone"  v-if='indexflag==5' />
              <Input v-model="Modalform1.fax"  v-if='indexflag==7' />
              <Input v-model="Modalform1.certLevelName"  v-if='indexflag==8' />
              <Input v-model="Modalform1.certLevelNo"  v-if='indexflag==9' />
              <div class="buttoncenter" slot="footer">
                  <Button   size="small" @click="flag = false">关闭</Button>
                  <Button type="success" size="small"  @click="confirm" >确认</Button>
              </div>
          </Modal>
    </div>
</template>
<script>
export default {
    // name: 'ownspace_index',
    data () {
        return{
          indexflag:'',
          flag:false,
          Modalform: {
            name: '', userName: '', idNumber: '', isLeader: '0', status: '', phone: '', telPhone: '', qualification: '', effectiveDate: '',
            fax:'',certLevelName:'',certLevelNo:'',groupName:'',isDirector:'0'
          },
          Modalform1: {
            name: '', userName: '', idNumber: '', isLeader: '0', status: '', phone: '', telPhone: '', qualification: '', effectiveDate: '',
            fax:'',certLevelName:'',certLevelNo:'',groupName:'',isDirector:'0'
          },
          userStatus:[],
          userInfoField:[
              {key:'name',label:'姓名：'},
              {key:'userName',label:'工号：'},
              {key:'idNumber',label:'身份证号：'},
              {key:'status',label:'状态：'},
              {key:'phone',label:'固定电话：'},
              {key:'telPhone',label:'手机电话：'},
              {key:'effectiveDate',label:'账号有效期：'},
              {key:'fax',label:'传真号码：'},
              {key:'certLevelName',label:'证书名称：'},
              {key:'certLevelNo',label:'证书名称编号：'},
              {key:'groupName',label:'所属部门：'},
          ]
        }
    },
    methods:{
      confirm(){//保存
        let params = {}
        switch (this.indexflag){
            case 2:
                params.idNumber = this.Modalform1.idNumber
                break;
            case 4:
                params.phone = this.Modalform1.phone
      　　　　   break;
            case 5:
                params.telPhone = this.Modalform1.telPhone
          　　　　break;
            case 7:
                params.fax = this.Modalform1.fax
    　　　　     break;
            case 8:
                 params.certLevelName = this.Modalform1.certLevelName
          　　　　break;
            case 9:
               params.certLevelNo = this.Modalform1.certLevelNo
　　　　        break;
        }
        console.log(params);
        params.userId = sessionStorage.getItem('userid')
        this.$post(this.GLOBAL.API_EDITUSER,params).then(res=>{
            if(res.data.success){
                this.getuserInfo()
                this.$Message.success('修改成功')
                this.flag = false
            }
        })
      },
      editchange(index){
          this.indexflag = index
          this.flag = true

      },
      reset(){
        this.Modalform ={
          name: '', userName: '', idNumber: '', isLeader: '0', status: '', phone: '', telPhone: '', qualification: '', effectiveDate: '',
          fax:'',certLevelName:'',certLevelNo:'',groupName:'',isDirector:'0'
        }
        this.Modalform1 ={
          name: '', userName: '', idNumber: '', isLeader: '0', status: '', phone: '', telPhone: '', qualification: '', effectiveDate: '',
          fax:'',certLevelName:'',certLevelNo:'',groupName:'',isDirector:'0'
        }
      },
      getUserStatus(){
          this.$post(this.GLOBAL.API_DIC_GETBYCODE,{codetype:'USER_STATUS'}).then(res=>{
            if(res.status == 200){
                const ret = res.data
                if (ret.success) {
                    this.userStatus = ret.data   //状态
                }
            }
        })
      },
      getuserInfo(){
          this.getUserStatus()
          let params = {
            userId: sessionStorage.getItem('userid')
          }
          this.$post(this.GLOBAL.API_TOALTER,params).then( async res => {
            if (res.data.success) {
                  this.reset()
                  this.userStatus.forEach(ele=>{
                    if(res.data.data.status == ele.key){
                      res.data.data.status = ele.name
                    }
                  })
                  this.Modalform = JSON.parse(JSON.stringify(res.data.data))
                  this.Modalform1 = JSON.parse(JSON.stringify(res.data.data))
            }
          })
      }
    },
    created(){
      this.getuserInfo()
    }
};
</script>
