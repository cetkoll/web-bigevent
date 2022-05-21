$(function () {
  const layer = layui.layer;
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $("#image");
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: ".img-preview",
  };

  // 1.3 创建裁剪区域
  $image.cropper(options);

  //!模拟点击文件上传功能
  $("#btnChooseImage").click(() => {
    $("#file").click();
  });
  //!设置图片
  $("#file").change((e) => {
    const fileList = e.target.files.length;
    if (fileList === 0) return layer.msg("请选择文件后再上传");
    const file = e.target.files[0];
    var imgURL = URL.createObjectURL(file);
    // 3. 重新初始化裁剪区域
    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", imgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });
  $("#btnUpload").click(() => {
    // 1、拿到用户裁切之后的头像
    // 直接复制代码即可
    const dataURL = $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
      })
      .toDataURL("image/png");
    // 2、发送 ajax 请求，发送到服务器
    $.ajax({
        type: "POST",
        url:'/my/update/avatar',
        data:{
            avatar:dataURL
        }, 
        success:(res) => {
            if(res.status !== 0) return layer.msg('上传头像失败');
            layer.msg('上传头像成功');
            window.parent.getUserInfo();
        }
    })
  });
});
