$(function () {
  // 获取文章分类
  let layer = layui.layer;
  let form = layui.form;
  initArtCateList();
  function initArtCateList() {
    $.ajax({
      method: "GET",
      url: "http://big-event-api-t.itheima.net/my/article/cates",
      success: function (res) {
        let htmlStr = template("tpl-table", res);
        $("tbody").html(htmlStr);
      },
    });
  }

  let indexAdd = null;
  //   为添加按钮设置点击事件
  $("#btnAddCate").on("click", function () {
    indexAdd = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "添加文章分类",
      content: $("#dialog-add").html(),
    });
  });

  // 通过代理得形式 设置点击事件
  $("body").on("submit", "#form-add", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "http://big-event-api-t.itheima.net/my/article/addcates",
      data: $(this).serialize(),
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg("添加分类失败");
        }

        initArtCateList();
        layer.msg("添加分类成功");
        layer.close(indexAdd);
      },
    });
  });
  // 通过代理得方式进行绑定事件
  let indexEdit = null;
  $("tbody").on("click", ".btn-edit", function () {
    indexEdit = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "修改文章分类",
      content: $("#dialog-edit").html(),
    });
    let id = $(this).attr("data-id");
    $.ajax({
      method: "GET",
      url: "http://big-event-api-t.itheima.net/my/article/cates/" + id,
      success: function (res) {
        form.val("form-edit", res.data);
      },
    });
  });
  //通过代理得方法 进行代理注册
  $("body").on("submit", "#form-edit", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "http://big-event-api-t.itheima.net/my/article/updatecate",
      data: $(this).serialize(),
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg("更新分类数据成功");
        }
        layer.msg("更新分类数据成功");
        layer.close(indexEdit);
        initArtCateList();
      },
    });
  });
  // 通过代理进行注册事件
  $("tbody").on("click", ".btn-delete", function (e) {
    let id = $(this).attr("data-id");
    console.log(id);
    // 提示用户是否删除
    layer.confirm("确认删除？", { icon: 3, title: "提示" }, function (index) {
      $.ajax({
        method: 'GET',
        url: 'http://big-event-api-t.itheima.net/my/article/deletecate/' + id,
        // URL一定要小写
        // URL:'http://big-event-api-t.itheima.net/my/article/deletecate/' + id,
        success: function(res) {
            if (res.status !== 0) {
              return layer.msg('删除分类失败！')
            }
            layer.msg('删除分类成功！')
            layer.close(index)
            initArtCateList()
          }
      });
    });
  });
});
