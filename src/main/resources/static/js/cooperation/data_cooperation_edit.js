layui.config({
    base: "/js/"
}).use(['form', 'layer', 'jquery', 'layedit','upload', 'laydate', 'common'], function() {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        laypage = layui.laypage,
        layedit = layui.layedit,
        laydate = layui.laydate,
        upload = layui.upload,
        common = layui.common,
        $ = layui.jquery;

    var base = $("#base").val();
    //选择时间
    laydate.render({
        elem: '.completeAt' //指定元素
    });
    var uploadInst = upload.render({
        elem: '#upLoadImg'
        , url: base + '/file_upload'
        , before: function (obj) {
            obj.preview(function (index, file, result) {
                $(".upLoadImgName").text(file.name)
            });
        }
        , done: function (res) {
            if (res.code == 1) {
                $("#mainImageUrl").val(res.obj)
                $(".showimg").attr("src",res.obj)
            } else {
                return layer.msg('上传失败');
            }
        }
    });

    var uploadInst1 = upload.render({
        elem: '#samp'
        , exts: 'zip|rar|JPG|PNG|GIF|WORD|EXCEL|CVS'
        , url: base + '/file_upload'
        , size: 100000
        , before: function (obj) {
            obj.preview(function (index, file, result) {
                $(".upLoadRarName").text(file.name)
            });
        }
        , done: function (res) {
            if (res.code == 1) {
                $("#sampleUrl").val(res.obj);
            } else {
                return layer.msg('上传失败');
            }
        }
    });
    form.on('radio(price_radio)', function (data) {
        $(".price_input").val("");
    })
    $(".price_input").on("focus", function () {
        $(".price_radio").removeAttr("checked");
        form.render('radio');
    })

    form.on('submit(editSub)', function (data) {
        var index = top.layer.msg('数据提交中，请稍候', {
            icon: 16,
            time: false,
            shade: 0.8
        });
        $.ajax({
            type: "POST",
            url: base + "/data_cooperation/save",
            data: data.field,
            dataType: "json",
            async: false,
            success: function (res) {
                if (res.code == 1) {
                    common.cmsLaySucMsg("保存成功");
                    var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                    parent.layer.close(index); //再执行关闭                        //刷新父页面
                    parent.location.reload();
                } else {
                    top.layer.close(index);
                    common.cmsLayErrorMsg(res.msg);
                }
            },
            error: function (res) {
                parent.layer.close(index); //再执行关闭
            }
        });
    })
})