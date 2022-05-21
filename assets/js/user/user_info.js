$(function() {
    const form = layui.form
    const layer = layui.layer
    form.verify({
        nickname:(val) => {
            if(val.length > 7) return '昵称必须在1~7个字符之间'
        }
    })
    //!获取用户基本信息
    const initUserinfo = () => {
        $.ajax({
            type: 'GET',
            url:'/my/userinfo',
            success:(res) => {
                console.log(res);
                if(res.status !== 0) return layer.msg('获取用户信息失败');
                layer.msg('获取用户信息成功')
                form.val('formUserInfo',res.data)
            }
        })
    }
    //!实现重置功能
    initUserinfo();
    $('#btnReset').click((e) => {
        e.preventDefault();
        initUserinfo()
    })
    //!重置用户信息
    $('.layui-form').submit(function(e) {
        e.preventDefault();
        // console.log($(this).serialize());
        $.ajax({
            type:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success: (res) => {
                if(res.status !== 0 ) return layer.msg('更新用户信息失败')
                layer.msg('更新用户信息成功')
                //!调用index.html文件中getUserInfo方法 重新渲染头像
                window.parent.getUserInfo()
            }
        })
    })
})