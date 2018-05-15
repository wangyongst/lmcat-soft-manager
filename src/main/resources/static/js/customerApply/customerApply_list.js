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
        elem: '#customerApplyList',
        url: base + '/customer_apply/getList',
        method: "POST",
        cellMinWidth: 95,
        page: true,
        height: "full",
        limit: 30,
        id: "customerApplyListTable",
        cols: [[
            {type: "checkbox", fixed: "left", width: 50},
            {field: 'id', width: '0%', minWidth: '0%', type: 'space', style: 'display: none'}, // id隐藏
            {field: 'personName', title: '名称', width: 120, align: "center"},
            {field: 'personPhone', title: '手机', width: 120, align: "center"},
            {field: 'personOccu', title: '职业', width: 140, align: "center"},
            {field: 'personAge', title: '年龄', width: 60, align: "center"},
            {field: 'purCarHourse', title: '购车/房', width: 120, align: "center"},
            {field: 'personDebt', title: '负债情况', width: 120, align: "center"},
            {field: 'needMoney', title: '需要金额(元)', width: 160, align: "center"},
            {
                field: 'status', title: '状态', align: 'center', width: 80, templet: function (d) {
                    return (d.status != null && d.status == 1) ? "启用" : "禁用";
                }
            },
            {field: 'createTime', title: '申请时间', width: 180, align: "center"},
            {title: '操作', width: 170, templet: '#customerApplyListBar', fixed: "right", align: "center"}
        ]]
    });
    //监听工具条
    table.on('tool(customerApplyList)', function (obj) {
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值

        if (obj.event === 'detail') { //查看操作

            layer.msg('ID：' + data.id + ' 的查看操作');

        } else if (obj.event === 'del') { //删除操作
            layer.confirm('确定删除选中的标签？', function (index) {
                $.ajax({
                    url: base + "/customer_apply/" + data.id + "/del",
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
        } else if (obj.event === 'edit') {
            editTag(data);
        }
    });

    $("#addApply").click(function(){
        editTag();
    });
    // 条件查询
    $("#selBtn").on("click", function () {
        table.reload("customerApplyListTable", {
            page: {
                curr: 1 // 从第一页开始
            },
            where: {
                status: $("#select_status").val()
            }
        })
    });

    // 编辑页面
    function editTag(edit) {
        var index = layui.layer.open({
            title: "编辑",
            type: 2,
            content: base + "/customer_apply/form",
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index); //获取页面body
                if (edit) {
                    body.find(".id").val(edit.id);
                    body.find(".personName").val(edit.personName);
                    body.find(".personPhone").val(edit.personPhone);
                    body.find(".personOccu").val(edit.personOccu);
                    body.find(".personAge").val(edit.personAge);
                    body.find(".purCarHourse").val(edit.purCarHourse);
                    body.find(".personDebt").val(edit.personDebt);
                    body.find(".needMoney").val(edit.needMoney);
                    body.find(".status input[name='status'][value='"+edit.status+"']").prop("checked", "true");
                    form.render(); // 更新渲染
                }
                setTimeout(function () {
                    layui.layer.tips('点击此处返回列表', '.layui-layer-setwin .layui-layer-close', {
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