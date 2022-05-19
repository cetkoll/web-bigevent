//!点击切换登录注册页面
$('#link_reg').click(() => {
    $('.login-box').hide();
    $('.reg-box').show();
})
$('#link_login').click(() => {
    $('.login-box').show();
    $('.reg-box').hide();
})
//!定义校验密码的规则
const form = layui.form;
form.verify({
    pwd:[/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repwd:(val) => {
        const pwd = $('.reg-box [name=password]').val();
        if(val !== pwd) return "两次密码不一致"
    }
})
//!监听注册表单提交 发送注册请求
// const baseUrl = 'http://www.liulongbin.top:3007'
//!导入 layui 中弹窗组件 layer
const layer = layui.layer
$('#form_reg').submit(function (e) {
    //!阻止表单的默认提交行为
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: '/api/reguser',
        data:{
            username:$('#form_reg [name=username]').val(),
            password:$('#form_reg [name=password]').val(),
        },
        success: (res) => {
            if(res.status !==0 ) return layer.msg('注册失败')
            layer.msg('注册成功');
            $('#link_login').click()
        }
    })
})
//!监听登录表单提交 发送登录请求
$('#form_login').submit(function(e) {
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: '/api/login',
        data:$(this).serialize(),
        success:(res) => {
            console.log(res);
            if(res.status !== 0) return layer.msg('登录失败')
            layer.msg('登录成功')
            //!将token值存储到本地内存中
            localStorage.setItem('token',res.token)
            //!跳转到个人首页
            location.href='/index.html'
        }
    })
})