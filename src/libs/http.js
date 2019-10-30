import axios from 'axios';
import _API from './config'
import Vue from 'vue'
import {Message} from 'iview'
import {router} from '../router/index'
import moment from 'moment'

if(process.env.NODE_ENV === 'production'|| process.env.NODE_ENV === 'beta'){
  axios.get('serverconfig.json').then(res=>{
    if(res.data.baseUrl){
      axios.defaults.baseURL = res.data.baseUrl
      Vue.prototype.baseURL = res.data.baseUrl
      Vue.prototype.fileURL = res.data.baseUrl + _API.API_UPLOAD_FIEL  //文件上传地址+文件下载地址
    }
  })
}else{
//axios.defaults.baseURL = 'http://192.168.1.67:8080/'
 axios.defaults.baseURL = 'http://www.damo.xyz:7107/'
  Vue.prototype.baseURL = 'http://192.168.1.67:8080/'
  Vue.prototype.fileURL = axios.defaults.baseURL + _API.API_UPLOAD_FIEL  //文件上传地址+文件下载地址
}
// http request 拦截器
axios.interceptors.request.use(config => {
    if (config.a) return config;
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    if(config.url != _API.API_LOGIN){
        let  symbol  = (config.url.split("?")[0]== _API.API_ACCOUNT_QUERYPAGE) ? '&'  : '?'
        config.url = config.url +  symbol + "ran=" + Math.random()  + '&sys_tokenId=' +  sessionStorage.getItem('cookieaccess_token');
    }
    return config;
},error => {
    return Promise.reject(error);
    }
);
// http response 拦截器
let num = 0
axios.interceptors.response.use(
    response => {
        if(response.data.success == false){
            if(response.data.errorType == 401){
                num ++
                sessionStorage.removeItem('cookieaccess_token');
                sessionStorage.removeItem('user');
                if(num===1){
                  Message.warning('登录已超时,三秒后将退出系统....')
                  setTimeout(() => {
                      Message.error('退出系统')
                      router.push({
                          name: 'login'
                      });
                      num =0
                  }, 3000);
                }
            }else {
              Message.error(response.data.message)
            }
        }
        return response;
    },error =>{
        console.log(error)
        Message.error('请求异常 请联系管理员')
    }
);

export function post (url, data = {}) {
    let ret = ''
    if (Object.prototype.toString.call(data) === "[object Object]") {
        for (let it in data) {
            if(data[it] instanceof Date){
                data[it] = moment(data[it]).format('YYYYMMDD')
            }
            if(data[it]===null){
                data[it] =''
            }
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        for(let it in data){
            if(Object.prototype.toString.call(data[it])==='[object Array]'){
                for (let i = 0; i < data[it].length; i++) {
                    for (let item in data[it][i]) {
                        if(data[it][i][item]===null){
                            data[it][i][item] =''
                        }
                       ret += 'param'+ '[' + [i] + ']' +'.' + encodeURIComponent(item) + '=' + encodeURIComponent(data[it][i][item]) + '&'
                    }
                   }
            }
        }
   }else if(Object.prototype.toString.call(data)==='[object Array]'){
       for (let i = 0; i < data.length; i++) {
        for (let it in data[i]) {
            if(data[i][it]===null){
                data[i][it] =''
            }
            ret += 'param'+ '[' + [i] + ']' +'.' + encodeURIComponent(it) + '=' + encodeURIComponent(data[i][it]) + '&'
        }
       }
   }
    return axios.post(url, ret)
}

export function get (url, data = {}) {
    for (let it in data) {
            if(data[it] instanceof Date){
                data[it] = moment(data[it]).format('YYYY-MM-DD')
            }
        }
    return axios.get(url,{params:data})

}
