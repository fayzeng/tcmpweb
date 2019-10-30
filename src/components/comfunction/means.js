export default {
    comdify(n){   //金额加逗号
        //  console.log(typeof(n))
              n=String(n)
              let re = /\d{1,3}(?=(\d{3})+$)/g; 
              let n1 = n.replace(/^(\d+)((\.\d+)?)$/, function (s, s1, s2) { 
              return s1.replace(re, "$&,") + s2; 
              });
              return n1; 
        },
}