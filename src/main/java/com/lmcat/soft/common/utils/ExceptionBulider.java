package com.lmcat.soft.common.utils;

import org.nutz.log.Log;
import org.nutz.log.Logs;

import java.io.PrintWriter;
import java.io.StringWriter;


/**
 * 异常捕获封装类
 */
public class ExceptionBulider {
	private static final Log log = Logs.get();
	
	/**
	 * 捕获异常 统一封装为Result对象 供module层调用
	 * @author guojx
	 * @param e
	 * @return
	 * @since
	 * <p>
	 * 		date 2017年8月8日 <br>
	 * </p>
	 */
	public static Result handleException(Exception e){
		Result result = new Result();
		//log.error(getTrace(e));
		e.printStackTrace();
		if(e instanceof BizException){
			result.setCode(EorMsg.ERROR_CODE);
			result.setMsg(((BizException) e).getErrorMsg());
		} else {
			result.setCode(EorMsg.ERROR_CODE);
			result.setMsg(e.getMessage());
		}
		log.info("handleException method end : result=>"+result);
		return result;
	}
	
	public static String getTrace(Throwable t ){
		StringWriter stringWriter = new StringWriter();
		PrintWriter printWriter = new PrintWriter(stringWriter);
		t.printStackTrace(printWriter);
		StringBuffer buffer = stringWriter.getBuffer();
		return buffer.toString();
	}
}
