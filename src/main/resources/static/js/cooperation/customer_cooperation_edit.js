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
})