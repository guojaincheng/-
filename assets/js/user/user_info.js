$(function () {
  let form = layui.form;
  let layer = layui.layer;
  form.verify({
    nickname: function (value) {
      if (value.lenth > 6) {
        return "昵称长度必须1-6个字符之间";
      }
    },
  });
  initUserInfo();
  // 获取用户信息
  function initUserInfo() {
    $.ajax({
      url: "http://big-event-api-t.itheima.net/my/userinfo",
      method: "GET",
      success: function (res) {
        if (res.status !== 0) {
          layer.msg("获取用户信息失败");
        }
        form.val("formUserInfo", res.data);
      },
    });
  }

  $('#btnRest').on('click', function(e){
    // 阻止表单默认提交事件
    e.preventDefault()
    initUserInfo()
  })

  // 监听表单提交
  $('.layui-form').on('submit',function(e){
    e.preventDefault();
    $.ajax({
      url: 'http://big-event-api-t.itheima.net/my/userinfo',
      method: "POST",
      data:$(this).serialize(),
      success: function (res) {
        if (res.status!== 0) {
          layer.msg('更新用户信息失败');
        }
        layer.msg('更新用户信息成功');
        // 调用父页面的方法
        window.parent.getUserInfo()
      }
          
    })
  })
});
