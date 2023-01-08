$(function(){
  // 点击“去注册账号”的链接
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });

  // 点击“去登录”的链接
  $("#link_login").on("click", function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });
  // 从layui中获取form
  let form =layui.form
  form.verify({
    // 自定义一个规则 验证密码
    pwd:[/^[\S]{6,12}$/,'密码必须6-12位 ，且不能有空格'],
    // 自定义一个规则 验证表单俩次密码是否一致
    repwd:function(value){
      // 通过形参 拿到确认密码的内容
      // 在拿到密码框中的内容
      // 进行判断 是否相等
      // 判断失败 返回俩次密码不一致
      let pwd =$(".reg-box [name=password]").val()
      if (pwd !== value) {
        return '俩次密码不一致'
      }
    }

  })
  // 监听注册表单的提交事件
  $('#form_reg').on('submit',function(e){
    e.preventDefault()
    let data = {
      username: $("#form_reg [name=username]").val(),
      password: $("#form_reg [name=password]").val(),
    };
    $.post("/api/reguser", data, function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message);
      }
      layer.msg("注册成功，请登录！");
      // 模拟人的点击行为
      $("#link_login").click();
    });

  })
  $("#form_login").submit(function (e) {
    // 阻止默认提交行为
    e.preventDefault();
    $.ajax({
      url: "/api/login",
      method: "POST",
      // 快速获取表单中的数据
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("登录失败！");
        }
        layer.msg("登录成功！");
        // 将登录成功得到的 token 字符串，保存到 localStorage 中
        localStorage.setItem("token", res.token);
        // 跳转到后台主页
        location.href = "/index.html";
      },
    });
  });
})