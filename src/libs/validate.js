export const validatorIdCard = (rule, value, callback) =>{
        // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if(reg.test(value) === false)
    {
        callback(new Error('请输入正确的身份证号'));
        
    } else {
        callback()
    }
}

export const validatorMobilePhone = (rule, value, callback) =>{
    // 手机号码校验
    if(!(/^1[3456789]\d{9}$/.test(value)))
    {
        callback(new Error('请输入正确的手机号码'));

    } else {
        callback()
    }
}
