<template>
    <div v-if='isShow'>
      <Modal :title="modaltitle" v-model="isShow"  >
          <div slot="footer" class="buttoncenter">
              <Button   size='small' @click="cancel">取消</Button>
              <Button type="success" size='small' @click="ok">确定</Button>
          </div>
          <div>
              <Row class='modal-row'>
                  <Col span="3"><div class="modal-label">将{{modaltitle=='角色权限复制'?'角色':'用户'}}:</div></Col>
                  <Col span="9">
                  <Select v-if="modaltitle=='角色权限复制'" filterable :loading='loading' v-model="role1" style="width:100%">
                      <Option v-for="item in roles" :value="item.roleId" :key="item.roleId">{{ item.roleName}}</Option>
                  </Select>
                   <Select v-if="modaltitle=='用户权限复制'" filterable :loading='loading' v-model="user1" style="width:100%">
                      <Option  v-for="item in users" :value="item.userId" :key="item.userId">{{ item.name }}</Option>
                  </Select>
                  </Col>
                  <Col span="3"><div class="modal-text" >复制给</div></Col>
              </Row>
              <Row class='modal-row'>
                  <Col span="3"><div class="modal-label">{{modaltitle=='角色权限复制'?'角色':'用户'}}:</div></Col>
                  <Col span="9">
                  <Select v-if="modaltitle=='角色权限复制'" filterable :loading='loading' v-model="role2" style="width:100%">
                      <Option v-for="item in roles" :value="item.roleId" :key="item.roleId">{{ item.roleName }}</Option>
                  </Select>
                    <Select v-if="modaltitle=='用户权限复制'" filterable :loading='loading' v-model="user2" style="width:100%">
                      <Option v-for="item in users" :value="item.userId" :key="item.userId">{{ item.name }}</Option>
                  </Select>
                  </Col>
              </Row>
              <Row class='modal-row'>
                  <Col span="3"><div class="modal-label">覆盖模式:</div></Col>
                  <Col span="9">
                  <div class="modal-text">
                  <RadioGroup v-model="copyType">
                      <Radio label="0">
                          <span>覆盖</span>
                      </Radio>
                      <Radio label="1">
                          <span>合并</span>
                      </Radio>
                  </RadioGroup>
                  </div>
                  </Col>
              </Row>
              <Row class='modal-row'>
                  <Col span="3"><div class="modal-label">复制内容:</div></Col>
                  <Col span="16">
                  <div class="modal-text">
                   <CheckboxGroup v-model="content">
                      <Checkbox label="0">
                          <span>用户独立权限</span>
                      </Checkbox>
                      <Checkbox label="1">
                          <span>岗位信息</span>
                      </Checkbox>
                      <Checkbox label="2">
                          <span>员工信息</span>
                      </Checkbox>
                      <Checkbox label="3">
                          <span>用户群组信息</span>
                      </Checkbox>
                      <Checkbox label="4">
                          <span>组织信息</span>
                      </Checkbox>
                      <Checkbox label="5">
                          <span>项目权限</span>
                      </Checkbox>
                  </CheckboxGroup>
                  </div>
                  </Col>
              </Row>
          </div>
      </Modal>
    </div>
</template>
<script>
export default {
    data(){
        return {
            isShow:false,
            loading:true,
            role1:'',
            role2:'',
            user1:'',
            user2:'',
            // roles:[{label:'角色1',value:1},{label:'角色2',value:2}],
            content:[],
            copyType:'0',
            roles:[],
            users:[],
            modaltitle:''
        }
    },
    methods:{
        async showModal(title){
            this.isShow = true;
            this.modaltitle=title;
            await this.getRoles()
            this.role1=''
            this.role2=''
            this.user1='',
            this.user2='',
            this.copyType='0'
            this.content = []
        },
        renderItem(item) {
            return item.label;
        },
        handleChange (newTargetKeys) {
            this.targetKeys = newTargetKeys;
        },
        async getRoles(){  //获取角色下拉框
        let url=''
        let res=''
        let pageSize=10000000
        if(this.modaltitle=='角色权限复制'){
             url = this.GLOBAL.API_ROLE_QUERY
             res = await this.$post(url,{pageSize:10000000})
            if (res.status==200) {
                const ret = res.data
                if (ret.success) {
                    this.roles = ret.data;
                    this.loading=false
                } else {
                }
            }
        }else{
          url=this.GLOBAL.API_USERLIST;
           res = await this.$post(url,{pageSize:10000000})
            if (res.status==200) {
                const ret = res.data
                if (ret.success) {
                    this.users = ret.data.result
                    this.loading=false
                } else {
                }
            }
        }

        },
        cancel(){
            this.isShow=false
        },
        async ok(){   //确认 复制操作
            const param = {
                srcRoleId:this.role1,
                srcUserId:this.user1,
                tarRoleId:this.role2,
                tarUserId:this.user2,
                copyType:this.copyType,
                copyContent:this.content.join`,`,
            }
            const url = this.GLOBAL.API_ROLE_COPY
            let res = await this.$post(url, param)
            if (res.status==200) {
                const ret = res.data
                if (ret.success) {
                    this.$Message.success('复制成功')
                    this.isShow = false
                } else {
                }
            }

        }
    }

}
</script>
