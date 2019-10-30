<template>
<div>
    <div v-if="modalflag">
         <Modal
            v-model="modalflag"
            width='400'
            title="修改密码">
            <Form :model="Modalform" ref="Modalform" :inline='true' :label-width="80" :rules="ModalRule">
                <FormItem label="原密码:" prop="oldPwd">
                    <Input type="password" v-model="Modalform.oldPwd" style="width: 230px"/>
                </FormItem>
                <FormItem label="新密码:" prop='newPwd'>
                    <Input type="password" v-model="Modalform.newPwd" style="width: 230px"/>
                </FormItem>
                <FormItem label="确认密码:" prop='surePwd'>
                    <Input type="password" v-model="Modalform.surePwd" style="width: 230px"/>
                </FormItem>
        </Form>
        <div slot="footer" class="buttoncenter">
            <Button   @click="Close">取消</Button>
            <Button type="success" @click="confirm">保存</Button>
        </div>
        </Modal>
    </div>
</div>

</template>
<script src='./index.js'></script>
