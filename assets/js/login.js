$(function() {
    var form = layui.form;
    var layer = layui.layer;
    $("#loginBtn,#regBtn").on("click", function() {
        $(this).parent().parent().parent().hide().siblings().show();

    })

    $("#regform").submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/api/reguser",
            data: $(this).serialize(),
            success: function(res) {
                console.log(res)
                layer.msg(res.message)
                if (res.status === 0) $("#regBtn").click();
            }
        });

    });
    $("#loginform").on("submit", function(e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/api/login",
            data: $(this).serialize(),
            success: function(res) {
                console.log(res)
                layer.msg(res.message)
                if (res.status === 0) {
                    localStorage.setItem("token", res.token);
                    location.href = "/index.html"
                    console.log(token)
                }
            }

        })

    })

    form.verify({
            //自定义一个校验规则
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            repwd: function(value) {

                if (value != $(".reg--box input[name=password]").val()) {
                    return '两次输入密码不一致'
                }

            }
        }

    )

})