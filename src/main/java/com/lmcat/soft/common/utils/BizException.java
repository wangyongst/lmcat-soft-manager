package com.lmcat.soft.common.utils;

/**
 * 自定义业务异常信息
 */
public class BizException extends RuntimeException {
	private static final long serialVersionUID = 1L;
	private String errorCode ;
	private String errorMsg ;
	
	public BizException(String message) {
		super(message);
	}
	public BizException(String errorCode,String errorMsg){
		this.errorCode = errorCode;
		this.errorMsg = errorMsg;
	}
	public String getErrorCode() {
		return errorCode;
	}
	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}
	public String getErrorMsg() {
		return errorMsg;
	}
	public void setErrorMsg(String errorMsg) {
		this.errorMsg = errorMsg;
	}
	
	
	
}
