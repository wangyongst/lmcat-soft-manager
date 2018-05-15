layui.config({
    base: "/js/"
}).use(['form', 'layer', 'jquery', 'layedit', 'laydate', 'common'], function() {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        laypage = layui.laypage,
        layedit = layui.layedit,
        laydate = layui.laydate,
        common = layui.common,
        $ = layui.jquery;

    var base = $("#base").val();
    //表单数据校验
    form.verify({
        content: function(val) {
            if(val == '') {
                return "请输入展示内容";
            }
        },
        status: function(val) {
            if(val == '') {
                return "请选择展示状态";
            }
        }
    })
    // 表单提交
    form.on("submit(editSub)", function(data) {
        var index = top.layer.msg('数据提交中，请稍候', {
            icon: 16,
            time: false,
            shade: 0.8
        });
        $.ajax({
            url: base + '/apply_success/edit',
            data: data.field,
            type: 'POST',
            dataType: "json",
            async: false,
            success: function(data) {
                if(data.code == 1) {
                    common.cmsLaySucMsg("保存成功");
                    var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                    parent.layer.close(index); //再执行关闭                        //刷新父页面
                    parent.location.reload();
                } else {
                    top.layer.close(index);
                    common.cmsLayErrorMsg(data.msg);
                }
            },
            error: function(data) {
                parent.layer.close(index); //再执行关闭
            }
        })

    })

    //取消
    $("#cancle").click(function() {
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        parent.layer.close(index); //再执行关闭
    });

})