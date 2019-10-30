<template>
  <div>
        <Form :model="formItem" :label-width="100" ref="formItem" :rules="formRule">
          <Row>
           <Col v-if="!paramobj" :span="12">
              <FormItem label="所属项目" prop="projectName">
                <Input v-model="formItem.projectName"  :readonly='true' icon="ios-search"  @click.native="search(3)" style="width: 200px"/>
              </FormItem>
            </Col>
            <Col  :span="12">
              <FormItem label="文件类型" prop="filetype">
                <Select v-model="formItem.filetype"  style="width:200px">
                  <Option v-for="item in filetypeList"  :value="item.sft_id" :key="item.sft_id">{{item.title}}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem label="文档秘级" prop="classification">
                <Select v-model="formItem.classification"   style="width:200px">
                  <Option v-for="item in classificationList" :value="item.key" :key="item.key">{{item.name}}</Option>
                </Select>
              </FormItem>
            </Col>

            <Col v-if="!paramobj" :span="12">
              <FormItem label="所属部门" prop='department'>
                 <Input v-model="formItem.department"  :readonly='true' icon="ios-search"  @click.native="search(4)" style="width: 200px"/>
              </FormItem>
            </Col>
            <Col v-if="!paramobj" :span="12">
              <FormItem label="所属流程" prop='proc_Inst_Id'>
                <Input  v-model="formItem.proc_Inst_Id"  style="width: 200px"/>
              </FormItem>
            </Col>
            <Col :span="24">
              <FormItem label="文档说明">
                <Input type="textarea" v-model="formItem.description" />
              </FormItem>
            </Col>
            <Col :span="24">
              <FormItem label="文档内容">
                <Input type="textarea" v-model="formItem.documentcontent" />
              </FormItem>
            </Col>
            <Col :span="24">
                    <FormItem v-if="paramobj">
                        <Upload :action='url' :format="['pdf','xls','xlsx','docx']" :on-success="handleSuccess" :on-format-error="handleFormatError" :on-remove='handleremove' :on-error='handleError' :before-upload="handleBeforeUpload" :data={projectName:projectName,projectId:projectID?projectID:paramobj.projectId,filetype:formItem.filetype,departmentid:paramobj.departmentid}>
                            <Button :disabled="!formItem.filetype " icon="ios-cloud-upload-outline">上传文件</Button>
                        </Upload>
                    </FormItem>
                    <FormItem v-else>
                        <Upload :action='url' :format="['pdf','xls','xlsx','docx']" :on-success="handleSuccess" :on-format-error="handleFormatError" :on-remove='handleremove' :on-error='handleError' :before-upload="handleBeforeUpload" :data={projectName:formItem.projectName,projectId:projectId,filetype:formItem.filetype,departmentid:formItem.departmentid}>
                            <Button :disabled="!formItem.projectName || !formItem.filetype || !formItem.department" icon="ios-cloud-upload-outline">上传文件</Button>
                        </Upload>
                    </FormItem>
                     <FormItem> <span style="color:red">*注：</span>只能上传pdf、Excel、word格式的文件</FormItem>
                       
            </Col>
            <Col :span="24">
             <FormItem v-if="formItem.fileName"> <a>{{formItem.fileName}}</a> <a @click="deletefilelist" style="margin-left:20px"><Icon type="md-close" /></a></FormItem>
            </Col>
          </Row>
        </Form>
        <tableModal ref="tableModal" @updatedata="updatedata" :attribute='propname'></tableModal>
  </div>
</template>
<script src='./index.js'></script>
