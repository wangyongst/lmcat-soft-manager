package com.lmcat.soft.common.utils;

import java.util.List;

/**
 * 页面使用通用对象
 */
public class UIPager {
	/**总行数*/
	private int total;
	
	/**每页条数*/
	private int pageSize;
	
	/**当前页*/
	private int pageNumber;
	
	/**数据列表*/
	private List<?> rows;
	
	/**最后一页数据，用作统计*/
	private List<?> footer;

	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getPageNumber() {
		return pageNumber;
	}

	public void setPageNumber(int pageNumber) {
		this.pageNumber = pageNumber;
	}

	public List<?> getRows() {
		return rows;
	}

	public void setRows(List<?> rows) {
		this.rows = rows;
	}

	public List<?> getFooter() {
		return footer;
	}

	public void setFooter(List<?> footer) {
		this.footer = footer;
	}
	
}
