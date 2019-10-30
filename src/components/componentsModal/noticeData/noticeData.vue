<template>
  <div v-if="isShow">
    <Modal :title="title" v-model="isShow"  width="730" >
        <div slot="footer" class="buttoncenter">
            <Button  size='small' @click="cancel">取消</Button>
            <Button type="warning"  class="resetbutton" @click="reset">重置</Button>
            <Button type="primary" size='small' @click="ok">保存</Button>
        </div>
        <Form  ref="formValidate" :model="param" :label-width="100" :rules="ruleValidate">
            <FormItem label="标题" prop="title">
               <Input style="width: 500px" v-model="param.title" />
            </FormItem>
            <FormItem label="内容" prop="content">
               <!--<Input style="width: 500px" type="textarea" :autosize="{minRows: 2,maxRows: 10}" v-model="param.content" />-->
               <quill-editor v-model="param.content"
                ref="myQuillEditor">
  							</quill-editor>
               
            </FormItem>
            <FormItem label="是否启用" prop="valid">
                <RadioGroup v-model="param.valid">
                    <Radio label="1">启用</Radio>
                    <Radio label="0">不启用</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="有效日期" prop="valid_date">
                <DatePicker type="date" placeholder="请选择日期" v-model="param.valid_date" :options="optionDate"></DatePicker>
            </FormItem>
            <FormItem label="附件" >
                <Upload :action="`${fileURL}?ran=${Math.random()}&sys_tokenId=${session}`"    :on-success="handleUpload">
                    <Button   icon="ios-cloud-upload-outline">选择文件</Button>
                </Upload>
            </FormItem>0
        </Form>
    </Modal>
  </div>
</template>
<script>
import moment from 'moment'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
 
import { quillEditor } from 'vue-quill-editor'
export default {
		components: {
    	quillEditor
 		},
    data(){
        return {
            isShow:false,
            param:{
                title:'',
                content:'',
                valid:'',
                valid_date:'',
                file_id:''
            },
            ruleValidate:{
                title:[{required: true, message: ' ' , trigger: 'blur'}],
                content:[{required: true, message: ' ', trigger: 'blur'}],
                valid:[{required: true, message: ' ', trigger: 'blur'}],
                valid_date:[{required: true,type:'date', message: ' ', trigger: 'change'}],
            },
            title:'新增公告',
            loading:true,
            roleId:'',
            type:'',   //type==1时为修改，为空时为新增
            session:'', //sessionid
            optionDate: {   //有效期date框options
                disabledDate (date) {
                    return date && date.valueOf() < Date.now() - 86400000;
                }
            },
        }
    },
    methods:{
        reset(){
            this.param={
                title:'',
                content:'',
                valid:'',
                valid_date:'',
                file_id:''
            }
        },
        showModal(type){
			this.session = sessionStorage.getItem('cookieaccess_token');
			console.log('aaaaaaaaaa'+ this.session)
            if (type) { //修改
                this.title = '修改公告信息'
                this.type = 1
                if (!this.$store.state.tableselect.selectdata || !this.$store.state.tableselect.selectdata[0]) {
                    this.$Message.error('请选择一项')
                    return
                }
                if (this.$store.state.tableselect.selectdata.length>1) {
                    this.$Message.error('仅能选择一项')
                    return
                }

                let notice = JSON.parse(JSON.stringify(this.$store.state.tableselect.selectdata[0]));
                this.isShow = true

                this.getData(notice.sn_id)
            } else {
				console.log('新增');
                this.isShow = true

                this.title = '新增公告'
                this.type = ''
                this.param={
                    title:'',
                    content:'',
                    valid:'',
                    valid_date:'',
                    file_id:''
                }
            }

        },
        getData(id){
            //查询公告 按id获取
            const url = this.GLOBAL.API_NOTICE_FINDBYID
            this.$post(url,{sn_id:id}).then(res=>{
                if(res.status == 200){
                    const ret = res.data
                    if (ret.success) {
                        const notice = ret.data
                        this.param = notice
                        console.log(this.param)
                    } else {
                    }
                }
            })

        },
        ok(){
            if(!this.param.title){
                this.$Message.error('请输入标题')
            }else if(!this.param.content){
                this.$Message.error('请输入内容')
            }else if(!this.param.valid){
                this.$Message.error('请选择是否启用')
            }else if(!this.param.valid_date){
                this.$Message.error('请选择有效时间')
            }else{
              this.postdata()
            }
        },
        postdata(){
            const url = !this.type ? this.GLOBAL.API_NOTICE_ADD : this.GLOBAL.API_NOTICE_UPDATE;
			console.log('param' + JSON.stringify(this.param));
            const param = JSON.parse(JSON.stringify(this.param))
            // if (!this.type) {
                param.valid_date = moment(param.valid_date).format('YYYY-MM-DD')
            // }
            this.$post(url,param).then(res=>{
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
		handleUpload (file) {
              console.log('file' + JSON.stringify(file));
			  this.param.file_id = file.data;
                // this.file = file;
                // return false;
        },
    },
  //   mounted(){
		// console.log('2222');
  //       this.session = sessionStorage.getItem('cookieaccess_token');
		// console.log('aaaaaaaaaa'+ this.session)
  //   }

}
</script>
