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
        elem: '#loanApplyList',
        url: base + '/loan_apply/getList',
        method: "POST",
        cellMinWidth: 95,
        page: true,
        height: "full",
        limit: 30,
        id: "loanApplyListTable",
        cols: [[
            {type: "checkbox", fixed: "left", width: 50},
            {field: 'id', width: '0%', minWidth: '0%', type: 'space', style: 'display: none'}, // id隐藏
            {field: 'personName', title: '名称', width: 120, align: "center"},
            {field: 'personPhone', title: '手机', width: 120, align: "center"},
            {field: 'personSex', title: '性别', width: 60, align: "center"},
            {field: 'personOccu', title: '职业', width: 180, align: "center"},
            {field: 'personAge', title: '年龄', width: 60, align: "center"},
            {field: 'loanMoney', title: '申请金额(元)', width: 180, align: "center"},
            {field: 'personCity', title: '所在城市', width: 180, align: "center"},
            {field: 'createTime', title: '申请时间', width: 180, align: "center"},
            {title: '操作', width: 170, templet: '#loanApplyListBar', fixed: "right", align: "center"}
        ]]
    });
    //监听工具条
    table.on('tool(loanApplyList)', function (obj) {
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值

        if (obj.event === 'detail') { //查看操作

            layer.msg('ID：' + data.id + ' 的查看操作');

        } else if (obj.event === 'del') { //删除操作
            layer.confirm('确定删除选中的标签？', function (index) {
                $.ajax({
                    url: base + "/loan_apply/" + data.id + "/del",
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

    $("#addCategory").click(function(){
        editTag();
    });
    // 条件查询
    $("#selBtn").on("click", function () {
        table.reload("loanApplyListTable", {
            page: {
                curr: 1 // 从第一页开始
            },
            where: {
                personName: $("#select_name").val()
                ,personPhone: $("#select_phone").val() // 条件
            }
        })
    });

    // 编辑页面
    function editTag(edit) {
        var index = layui.layer.open({
            title: "编辑",
            type: 2,
            area: ['893px', '600px'],
            content: base + "/loan_apply/form",
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index); //获取页面body
                if (edit) {
                    body.find(".id").val(edit.id);
                    body.find(".categoryName").val(edit.categoryName);
                    body.find(".status input[name='categoryStatus'][value='"+edit.categoryStatus+"']").prop("checked", "true");
                    form.render(); // 更新渲染
                }
                setTimeout(function () {
                    layui.layer.tips('点击此处返回列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 500)
            }
        })
       /* layui.layer.full(index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize", function () {
            layui.layer.full(index);
        })*/
    }
})