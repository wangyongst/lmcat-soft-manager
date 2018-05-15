layui.config({
    base: "/js/"
}).use(['form', 'table', 'layer', 'jquery', 'common'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        table = layui.table,
        common = layui.common,
        $ = layui.jquery;
    var base = $("#base").val();
    // 列表
    var tableIns = table.render({
        elem: '#cusCooList',
        url: base + '/customer_cooperation/load_list',
        method: "POST",
        cellMinWidth: 95,
        page: true,
        height: "full",
        limit: 30,
        id: "cusCooListTable",
        cols: [[
            {title: '序号', width: 60, align: "center",type: 'numbers',templet:function (d) {
                    return d.LAY_TABLE_INDEX+1;
                }},
            {field: 'title', title: '标题', width: 400, align: "center",templet:function (d) {
                    return (d.cooperation != null && d.cooperation.title != null) ? d.cooperation.title : '-';
                }},
            {field: 'customerName', title: '提交人', width: 180, align: "center"},
            {field: 'customerPhone', title: '手机', width: 180, align: "center"},
            {field: 'price', title: '价格', width: 180, align: "center",templet:function (d) {
                    return (d.cooperation != null && d.cooperation.price != null) ? d.cooperation.price : '-';
                }},
            {field: 'dataAmount', title: '数据量', width: 180, align: "center",templet:function (d) {
                    return (d.cooperation != null && d.cooperation.dataAmount != null) ? d.cooperation.dataAmount : '-';
                }},
            {field: 'createAt', title: '提交时间', width: 120, align: "center",templet:function (d) {
                    return (d.createAt !=  null) ? d.createAt.substring(0,10): "-";
                }},
            {title: '操作', width: 170, templet: '#cusCooListBar', fixed: "right", align: "center"}
        ]]
    });

    //监听工具条
    table.on('tool(cusCooList)', function (obj) {
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值
        if (obj.event === 'look') { //查看操作
            editCus(data);
        } else if (obj.event === 'del') { //删除操作
            layer.confirm('确定删除选中的数据？', function (index) {
                $.ajax({
                    url: base + "/customer_cooperation/" + data.id + "/delete",
                    type: "GET",
                    dataType: "json",
                    success: function (data) {
                        if (data.code == "1") {
                            common.cmsLaySucMsg("删除成功");
                        } else {
                            common.cmsLayErrorMsg(data.msg);
                        }
                    }
                })
                obj.del();
                layer.close(index);
            });
        }
    });

    // 条件查询
    $("#selBtn").on("click", function () {
        table.reload("cusCooListTable", {
            page: {
                curr: 1 // 从第一页开始
            },
            where: {
                customerName: $("#customer_val").val()
            }
        })
    });

    // 编辑页面
    function editCus(edit) {
        var index = layui.layer.open({
            title: "预览",
            type: 2,
            area: ['893px', '600px'],
            content: base + "/customer_cooperation/form",
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index); //获取页面body{
                body.find(".title").val(edit.cooperation.title);
                body.find(".describtion").val(edit.cooperation.describtion);
                body.find(".price").val(edit.cooperation.price);
                body.find(".showimg").attr("src",edit.cooperation.mainImageUrl)
                body.find(".completeAt").val(edit.cooperation.completeAt);
                body.find(".dataAmount").val(edit.cooperation.dataAmount);
                body.find(".dataStandard").val(edit.cooperation.dataStandard);
                body.find(".dataField").val(edit.cooperation.dataField);
                body.find(".customerName").val(edit.customerName);
                body.find(".customerPhone").val(edit.customerPhone);
                body.find(".customerState").val(edit.customerState);
                if (edit.cooperation.sampleUrl!="") {
                	body.find(".upLoadRarName").html('<a href='+edit.cooperation.sampleUrl+'>点此下载附件</a>');
                }else{
                	body.find(".upLoadRarName").html('暂未上传文件');
                }
                body.find(".dataCategory").val(edit.cooperation.dataCategory)
                body.find("input").css("border","none");
                body.find("textarea").css("border","none");
                body.find("select").css("border","none");
                body.find(".upLoadRarName").next("span").hide();
                body.find("input").attr("disabled","disabled");
                body.find("textarea").attr("disabled","disabled");
                body.find("select").attr("disabled","disabled");
                form.render(); // 更新渲染
                setTimeout(function () {
                    layui.layer.tips('点击此处返回需求列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 500)
            }
        })
        layui.layer.full(index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize", function () {
            layui.layer.full(index);
        })
    }
})