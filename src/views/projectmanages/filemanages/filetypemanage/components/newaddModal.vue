<template>
  <div v-if="modalflag">
    <Modal v-model="modalflag" width="700" :title="title">
      <Form :model="Modalform" :label-width="100" ref="Modalform" :rules="ModalRule">
        <Row>
        <Col :span="12" style="height:42.85px">
        <FormItem label="类型名称" prop="type_name">
          <Input v-model="Modalform.type_name" style="width:200px"/>
        </FormItem>
        </Col>
       <Col :span="12">
        <FormItem label="上级id" prop="pid">
          <Input v-model="Modalform.pid" :disabled='true' style="width:200px"/>
        </FormItem>
        </Col>
       <Col :span="12">
        <FormItem label="备注" prop="mark">
          <Input v-model="Modalform.mark" style="width:200px"/>
        </FormItem>
         </Col>
         </Row>
      </Form>
      <div class="buttoncenter" slot="footer">
        <Button @click="Close">取消</Button>
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
        type_name: "",
        pid: "",
        mark:'',
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
        this.id = data.sft_id;
      } else {
        this.id = data.sft_id;
        this.Modalform.pid=data.type_name;
      }
     // this.gettypedata();
    },
    cleardata() {
      this.Modalform = {
        type_name: "",
        pid: "",
        mark:'',
      };
    },
    // gettypedata() {
    //   this.$get(this.GLOBAL.API_DIC_GETBYCODE, { codetype: "NODE_TYPE" }).then(
    //     res => {
    //       if (res.data.success) {
    //         this.typeList = res.data.data
    //       }
    //     }
    //   );
    // },
    confirm() {
          this.loading=true;
          if (this.title == "新增") {
              this.Modalform.pId = this.id;
              this.$post(this.GLOBAL.API_ADD_TREE, this.Modalform).then(res => {
                this.loading=false
                if (res.data.success) {
                  this.modalflag = false
                  this.$Message.success("新增成功");
                  this.$emit("updateaddtree", this.id, res.data.data.sft_id);
                }
              }).catch(()=>{ this.loading=false });
          } else {
            let params={
             mark:this.Modalform.mark,
             pId:this.Modalform.pid,
             sft_id:this.Modalform.sft_id,
             type_name:this.Modalform.type_name,
           }
            this.$post(this.GLOBAL.API_EDITSAVE_TREE, params).then(res => {
              this.loading=false
              if (res.data.success) {
                this.modalflag = false
                this.$Message.success("修改成功");
                this.$emit("updatedittree", this.id);
              }
            }).catch(()=>{ this.loading=false });
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
