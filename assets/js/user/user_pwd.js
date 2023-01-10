$(function () {
  let form = layui.form;
  let layer = layui.layer;

  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    samePwd: function (value) {
      if (value === $('[ name="oldPwd"]').val()) {
        return "新旧密码不能一致";
      }
    },
    rePwd: function (value) {
      if (value !== $('[ name="newPwd"]').val()) {
        return "俩次密码不一致";
      }
    },
  });

  $('.layui-form').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      url: "http://big-event-api-t.itheima.net/my/updatepwd",
      method: "POST",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
            console.log(res);
          return layui.layer.msg("更新密码失败");
        }
        layui.layer.msg("更新密码成功");
        $('.layui-form')[0].reset() 
      },
    });
  });
});
