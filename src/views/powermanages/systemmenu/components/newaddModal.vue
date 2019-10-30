<template>
  <div v-if="modalflag">
    <Modal v-model="modalflag" width="700" :title="title">
      <Form :model="Modalform" :label-width="100" ref="Modalform" :rules="ModalRule">
        <Row>
        <Col :span="12" style="height:42.85px">
        <FormItem label="名称" prop="menuName">
          <Input v-model="Modalform.menuName" style="width:200px"/>
        </FormItem>
        </Col>
       <Col :span="12">
        <FormItem label="url" prop="menuUrl">
          <Input v-model="Modalform.menuUrl" style="width:200px"/>
        </FormItem>
         </Col>
       <Col :span="12">
        <FormItem label="icon" prop="imageUrl">
          <Input v-model="Modalform.imageUrl" style="width:200px"/>
        </FormItem>
         </Col>
       <Col :span="12">
        <FormItem label="排序" prop="orders">
          <Input v-model="Modalform.orders" style="width:200px"/>
        </FormItem>
         </Col>
         </Row>
      </Form>
      <div class="buttoncenter" slot="footer">
        <Button   @click="Close">取消</Button>
        <Button type="warning" @click="Reset">重置</Button>
        <Button type="success" :loading='loading' @click="confirm">保存</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      typeList: [],
      modalflag: false,
      loading:false,
      Modalform: {
        menuName: "",
        menuUrl: "",
        imageUrl:'',
        orders:''
      },
      ModalRule: {
        menuName: [{ required: true, message: " ", trigger: "blur" }],
      },
      id: "",
      title:''
    };
  },
  methods: {
    getnewaddModal(title, data) {
      this.cleardata();
      this.modalflag = true;
      this.title = title;
      if (title == "修改") {
        this.Modalform = data;
        this.id = data.menuId;
      } else {
        this.id = data.menuId;
      }
      this.gettypedata();
    },
    cleardata() {
      this.Modalform = {
        menuName: "",
        menuUrl: "",
      };
    },
    gettypedata() {
      this.$get(this.GLOBAL.API_DIC_GETBYCODE, { codetype: "NODE_TYPE" }).then(
        res => {
          if (res.data.success) {
            this.typeList = res.data.data
          }
        }
      );
    },
    confirm() {
       if(!this.Modalform.menuName){
          this.$Message.error('请输入名称')
        }else {
          this.loading=true;
          if (this.title == "新增") {
              this.Modalform.parentId = this.id;
              this.$post(this.GLOBAL.API_ADD_MENU, this.Modalform).then(res => {
                this.loading=false
                if (res.data.success) {
                  this.modalflag = false
                  this.$Message.success("新增成功");
                  this.$emit("updateaddtree", this.id, res.data.data);
                }
              }).catch(()=>{ this.loading=false });
          } else {
            this.$post(this.GLOBAL.API_EDIT_MENU, this.Modalform).then(res => {
              this.loading=false
              if (res.data.success) {
                this.modalflag = false
                this.$Message.success("修改成功");
                this.$emit("updatedittree", this.id);
              }
            }).catch(()=>{ this.loading=false });
          }
        }
    },
    Close() {
      this.modalflag = false;
    },
    Reset(){
      this.Modalform={
              menuName: "",
              menuUrl: "",
              imageUrl:'',
              orders:''
            }
    }
  },
  created() {}
};
</script>
