$.ajaxPrefilter((options) => {
    options.url = 'http://www.liulongbin.top:3007' + options.url
    //!给有权限的带my的接口 设置headers中的token值
    if(options.url.includes('/my/')) {
        options.headers = {
            Authorization:localStorage.getItem('token')
        }
    }
    options.complete= (res) => {
        console.log(res);
        //!当获取用户信息失败时  自动清空token值 并跳转到登录页
        if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
          localStorage.removeItem('token');
          location.href = '/login.html'
        }
      }
})