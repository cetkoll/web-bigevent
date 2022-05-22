$(function () {
  const layer = layui.layer;
  const form = layui.form;
  //!请求获取后台数据
  const initArtCateList = () => {
    $.ajax({
      type: "GET",
      url: "/my/article/cates",
      success: (res) => {
        if (res.status !== 0) return layer.msg("获取信息失败");
        layer.msg("获取信息成功");
        const htmlStr = template("tpl-table", res);
        $("tbody").html(htmlStr);
      },
    });
  };
  initArtCateList();
  let indexAdd = null;
  //!弹出添加的选框
  $("#btnAddCate").click(() => {
    indexAdd = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "添加文章分类",
      content: $("#dialog-add").html(),
    });
  });
  //!监听提交事件 进行数据提交
  $("body").on("submit", "#form-add", function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/article/addcates",
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg("添加分类失败");
        layer.msg("添加分类成功");
        initArtCateList();
        //!提交后隐藏选框
        layer.close(indexAdd);
      },
    });
  });
  //!弹出修改类别弹窗
  let indexEdit = null;
  $("tbody").on("click", ".btn-edit", function (e) {
    indexEdit = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "修改文章分类",
      content: $("#dialog-edit").html(),
    });
    $.ajax({
      type: "GET",
      url: "/my/article/cates/" + $(this).attr("data-Id"),
      success: function (res) {
        if (res.status !== 0) return layer.msg("获取分类信息失败");
        layer.msg("获取分类信息成功");
        form.val("form-edit", res.data);
      },
    });
  });
  $("body").on("submit", "#form-edit", function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/article/updatecate",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) return layer.msg("更新分类信息失败");
        layer.msg("更新分类信息成功");
        layer.close(indexEdit);
        initArtCateList();
      },
    });
  });
  $("tbody").on("click", ".btn-delete", function (e) {
      const id =$(this).attr("data-id")
    layer.confirm("确定删除吗？", { icon: 3, title: "提示" }, function (index) {
      $.ajax({
        type: "GET",
        url: "/my/article/deletecate/" + id,
        success: (res) => {
          if (res.status !== 0) return layer.msg("删除分类失败");
          layer.msg("删除分类成功");
          $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: (res) => {
              if (res.status !== 0) return layer.msg("获取信息失败");
              const htmlStr = template("tpl-table", res);
              $("tbody").html(htmlStr);
            },
          });
        },
      });
    });
  });
});
