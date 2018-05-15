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
        elem: '#cooList',
        url: base + '/data_cooperation/load_list',
        method: "POST",
        cellMinWidth: 95,
        page: true,
        height: "full",
        limit: 30,
        id: "cooListTable",
        cols: [[
            {title: '序号', width: 60, align: "center",type: 'numbers',templet:function (d) {
                    return d.LAY_TABLE_INDEX+1;
                }},
            {field: 'title', title: '标题', width: 400, align: "center"},
            {field: 'price', title: '价格', width: 120, align: "center"},
            {field: 'dataAmount', title: '数据量', width: 120, align: "center"},
            {field: 'dataField', title: '数据字段', width: 300, align: "center"},
            {field: 'demand', title: '需求度', width: 80, align: "center"},
            {field: 'status', title: '状态', width: 80, align: "center"},
            {field: 'showStatus', title: '是否上架', width: 120, align: "center",templet: '#showTpl', unresize: true},
            {field: 'completeAt', title: '提交时间', width: 120, align: "center",templet:function (d) {
                    return (d.completeAt !=  null) ? d.completeAt.substring(0,10): "-";
                }},
            {title: '操作', width: 170, templet: '#cooListBar', fixed: "right", align: "center"}
        ]]
    });

    //监听上架操作
    form.on('checkbox(showEvent)', function(obj){
       // var index = layer.msg('修改中，请稍候',{icon: 16,time:false,shade:0.8});
        var status_val = obj.elem.checked  ? "checked" : "unchecked";
        var cooId = this.value;
        $.ajax({
            url : base+"/data_cooperation/modify/"+cooId+"/"+status_val+"",
            type: "GET",
            datType: "json",
            success: function (data) {
                if(data.code == "1"){
                    common.cmsLaySucMsg("修改成功");
                } else {
                    common.cmsLayErrorMsg(data.msg);
                }
            }
        })
    });

    //监听工具条
    table.on('tool(cooList)', function (obj) {
        var data = obj.data; //获得当前行数据
        if (obj.event === 'look') { //查看操作
            editFunc(data,"look");
        } else if (obj.event === 'del') { //删除操作
            layer.confirm('确定删除选中的标签？', function (index) {
                $.ajax({
                    url: base + "/data_cooperation/" + data.id + "/delete",
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
            editFunc(data,"edit");
        }
    });

    $("#addCoo").click(function () {
        editFunc(1);
    });
    // 条件查询
    $("#selBtn").on("click", function () {
        table.reload("cooListTable", {
            page: {
                curr: 1 // 从第一页开始
            },
            where: {
                title: $("#title_val").val()
            }
        })
    });

    // 编辑页面
    function editFunc(edit,open) {
        var index = layui.layer.open({
            title: "预览编辑",
            type: 2,
            area: ['893px', '600px'],
            content: base + "/data_cooperation/form",
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index); //获取页面body
                body.find(".id").val(edit.id);
                body.find(".title").val(edit.title);
                body.find(".describtion").val(edit.describtion);
                body.find(".price").val(edit.price);
                body.find(".mainImageUrl").val(edit.mainImageUrl);
                body.find(".showimg").attr("src",edit.mainImageUrl)
                body.find(".completeAt").val(edit.completeAt);
                body.find(".dataAmount").val(edit.dataAmount);
                body.find(".dataStandard").val(edit.dataStandard);
                body.find(".dataField").val(edit.dataField);
                body.find(".sampleUrl").val(edit.sampleUrl);
                if (edit.sampleUrl!="") {
                	body.find(".upLoadRarName").html('<a href='+edit.sampleUrl+'>点此下载附件</a>');
                }else{
                	body.find(".upLoadRarName").html('暂未上传文件');
                }
                body.find(".demand").val(edit.demand);
                body.find(".demand input[name='demand'][value='" + edit.demand + "']").prop("checked", "true");
                body.find(".dataCategory").val(edit.dataCategory)
                
                body.find(".status input[name='status'][value='" + edit.status + "']").prop("checked", "true");
                body.find(".commendFlag input[name='commendFlag'][value='" + edit.commendFlag + "']").prop("checked", "true");
                body.find(".hotFlag input[name='hotFlag'][value='" + edit.hotFlag + "']").prop("checked", "true");
                body.find(".showStatus input[name='showStatus'][value='" + edit.showStatus + "']").prop("checked", "true");
                form.render(); // 更新渲染
                if (open=="look") {
                	// 预览隐藏按钮
                    body.find(".saveBtn").attr("style","display:none;");
                    body.find("input").css("border","none");
                    body.find("textarea").css("border","none");
                    body.find("select").css("border","none");
                    body.find("#upLoadImg").css("display","none");
                    body.find("#samp").css("display","none");
                    body.find(".upLoadRarName").next("span").hide();
                    body.find("input").attr("disabled","disabled");
                    body.find("textarea").attr("disabled","disabled");
                    body.find("select").attr("disabled","disabled");
                    form.render(); // 更新渲染
                } else {
                    
                    
                }
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