layui.config({
    base: "js/"
}).use(['form', 'jquery', 'layer'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        $ = layui.jquery;
    var base = $("#base").val();
    //登录按钮事件
    form.on("submit(login)", function (data) {
        console.log("sss");
        var retData;
        //登陆验证
        $.ajax({
            url: base + '/ajaxLogin',
            type: 'POST',
            async: false,
            data: data.field,
            success: function (data) {
                retData = data;
            }

        });
        //登陆成功
        if (retData.code == "1") {
            window.location.href = base + "/index";
            return false;
        } else {
            layer.open({
                title: '提示',
                content: retData.msg
            });
            return false;
        }
    });
})
