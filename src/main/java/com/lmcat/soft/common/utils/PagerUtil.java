package com.lmcat.soft.common.utils;

import org.nutz.dao.QueryResult;
import org.nutz.dao.pager.Pager;

/**
 * 页面分页工具类
 */
public class PagerUtil {

	/**
	 * 页面最大条数
	 */
	public static final int MAX_PAGER_SIZE = 30;
	/**
	 * 默认页数
	 */
	public static final int DEFAULT_PAGER_SIZE = 10;

	/**
	 * 统一把查询结果转换成页面使用分页对象
	 * @param q
	 * @return
	 */
	public static UIPager con(QueryResult q){
		UIPager pager = new UIPager();
		if(q != null){
			Pager p = q.getPager();
			if(p!= null){
				pager.setTotal(p.getRecordCount());
				pager.setPageNumber(p.getPageNumber());
				pager.setPageSize(p.getPageSize());
			}
			if(q.getList()!= null){
				pager.setRows(q.getList());
			}
		}
		return pager;
	}

	/**
	 * 统一把页面请求参数封装为Pager对象
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public static Pager conPager(int pageNumber, int pageSize) {
		Pager pager = new Pager();
		if (pageSize != 0) {
			if (pageSize > MAX_PAGER_SIZE) {
				pager.setPageSize(MAX_PAGER_SIZE);
			} else {
				pager.setPageSize(pageSize);
			}
		} else {
			pager.setPageSize(DEFAULT_PAGER_SIZE);
		}
		if (pageNumber == 0) {
			pager.setPageNumber(1);
		} else {
			pager.setPageNumber(pageNumber);
		}
		return pager;
	}
}
