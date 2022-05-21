$(function () {
  getUserInfo();
  const layer = layui.layer
  //!退出登录功能
  $('#btnLogout').click(() => {
    layer.confirm(
      "确定退出登录？",
      { icon: 3, title: "" },
      function (index) {
          localStorage.removeItem('token');
          location.href='/login.html'
      }
  );
  })
});
const layer = layui.layer;
//!获取用户信息 
function getUserInfo() {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    // headers: {
    //   Authorization: localStorage.getItem("token"),
    // },
    success: (res) => {
      if (res.status !== 0) return layer.msg("获取用户信息失败");
      layer.msg("获取用户信息成功");
      console.log(res);
      renderAvatar(res.data)
    },
    //!不论成功还是失败，最终都会调用 complete 回调函数
    // complete: (res) => {
    //   console.log(res);
    //   //!当获取用户信息失败时  自动清空token值 并跳转到登录页
    //   if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
    //     localStorage.removeItem('token');
    //     location.href = '/login.html'
    //   }
    // }
  });
}
//!判断用户是否上传头像 从而显示头像或者昵称/用户名的首字母
const renderAvatar = (user) => {
    console.log(user);
    const name = user.nickname || user.username;
    console.log(name);
    $('#welcome').html(`欢迎${name}`)
    if(user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    }else{
        $('.layui-nav-img').hide()
        const firstName = name[0].toUpperCase()
        $('.text-avatar').html(firstName).show()
    }
}
