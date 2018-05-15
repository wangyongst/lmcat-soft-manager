package com.lmcat.soft.common.utils;


import org.nutz.lang.Strings;

/**
 * 返回页面消息类
 */
public class Result {
    /**
     * 返回页面code值
     * 成功：1
     * 失败：0
     * token error : 99
     */
    protected String code;

    /**
     * 返回页面提示信息
     */
    protected String msg;

    /**
     * 返回页面参数
     */
    protected Object obj;

    protected Integer count;

    private static final String SUCCESS_MSG = "stm.success";
    private static final String ERROR_MSG = "stm.error";

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }


    public Object getObj() {
        return obj;
    }

    public void setObj(Object obj) {
        this.obj = obj;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public static String getSuccessMsg() {
        return SUCCESS_MSG;
    }

    public static String getErrorMsg() {
        return ERROR_MSG;
    }

    public Result() {
        this.code = ResultMsg.SUCCESS_CODE;
        this.msg = ResultMsg.SUCCESS_MSG;
    }

    public Result(String code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public Result(String msg) {
        this.code = EorMsg.ERROR_CODE;
        this.msg = msg;
    }

    public Result(String code, String msg, Object obj) {
        this.code = code;
        if (Strings.isBlank(msg)) {
            this.msg = ResultMsg.SUCCESS_MSG;
        } else {
            this.msg = msg;
        }
        this.obj = obj;
    }

    public Result(String code, String msg, Object obj,Integer count) {
        this.code = code;
        if (Strings.isBlank(msg)) {
            this.msg = ResultMsg.SUCCESS_MSG;
        } else {
            this.msg = msg;
        }
        this.obj = obj;
        this.count = count;
    }


    public static Result success(Object obj) {
        return new Result("1", SUCCESS_MSG, obj);
    }
    public static Result success(Integer count,Object obj) {
        return new Result("1", SUCCESS_MSG, obj,count);
    }

    public static Result success() {
        return new Result("1", SUCCESS_MSG, null);
    }

    public static Result error() {
        return new Result("0", ERROR_MSG, null);
    }

    public static Result error(String msg) {
        return new Result("0", msg, null);
    }


}
