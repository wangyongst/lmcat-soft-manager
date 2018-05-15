package com.lmcat.soft.common.utils;

import org.nutz.lang.Strings;

/**
 * layui返回对象
 *
 * @Author guojxx
 * @Date Created in 13:34 2018/1/9
 */
public class LayuiParams {
    private Integer code;
    private String msg;
    private Integer count;
    private Object data;

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
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

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }


    public LayuiParams(Integer code, String msg, Integer count, Object data) {
        if (code == null) {
            this.code = 0;
        } else {
            this.code = code;
        }
        if (Strings.isBlank(msg)) {
            this.msg = "";
        } else {
            this.msg = msg;
        }
        this.count = count;
        this.data = data;
    }
    public static LayuiParams success(Integer count, Object data) {
        return new LayuiParams(0, "", count, data);
    }
    public static LayuiParams error() {
        return new LayuiParams(1, "error", null, null);
    }
}
