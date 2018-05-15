package com.lmcat.soft.common.utils;

public class ParamUtil {

    /**
     * 校验是否为空
     * @param obj
     * @param msg
     */
    public static void checkParam(Object obj,String msg){
        if(obj == null){
            throw new BizException(EorMsg.ERROR_CODE,msg);
        }
    }

    public static void checkParamLength(String str, int min,int max){
        if(str.length() < min || str.length() > max){
            throw new BizException(EorMsg.ERROR_CODE,"字符串长度必须为"+min+"-"+max+"个");
        }
    }
}
