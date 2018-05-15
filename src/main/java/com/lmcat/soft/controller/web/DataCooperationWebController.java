package com.lmcat.soft.controller.web;

import com.lmcat.soft.common.utils.DateUtil;
import com.lmcat.soft.common.utils.PagerUtil;
import com.lmcat.soft.common.utils.Result;
import com.lmcat.soft.module.DataCooperation;
import com.lmcat.soft.service.IDataCooperationService;
import org.nutz.dao.Cnd;
import org.nutz.dao.QueryResult;
import org.nutz.dao.pager.Pager;
import org.nutz.lang.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 数据合作
 */
@CrossOrigin("*")
@RestController
@RequestMapping(value = "web/data_cooperation")
public class DataCooperationWebController {

    @Autowired
    private IDataCooperationService cooperationService;

    /**
     * 加载数据合作列表
     *
     * @param commendFlag  是否推荐标志   0 是 1 否
     * @param dataCategory 数据类别
     * @param sortField    排序字段  例如 price  createAt
     * @param sortMode     排序方式（升降）  asc  desc
     * @param page
     * @param limit
     * @return
     */
    @RequestMapping(value = "load_list")
    public Result loadList(@RequestParam(required = false) String commendFlag,
                           @RequestParam(required = false) String dataCategory,
                           @RequestParam(required = false) String sortField,
                           @RequestParam(required = false) String sortMode,
                           @RequestParam(required = false) Integer page,
                           @RequestParam(required = false) Integer limit) {
        QueryResult result = null;
        try {
            Pager p = PagerUtil.conPager(page, limit);
            Cnd cnd = Cnd.NEW();
            if (Strings.isNotBlank(commendFlag)) cnd.and("commendFlag", "=", commendFlag);
            if (Strings.isNotBlank(dataCategory)) cnd.and("dataCategory", "=", dataCategory);
            cnd.and("publisher", "=", "company").and("showStatus","=","checked"); // 只展示公司的数据
            cnd.getOrderBy().orderBy("ABS("+sortField+")", sortMode);
            result = cooperationService.queryPager(p, cnd,
                    "^(id|title|price|mainImageUrl|createAt|dataAmount|demand|status|describtion|completeAt)$");
            // 求当前时间和完成时间的天数间隔，页面展示使用
            if (result != null && result.getList() != null && result.getList().size() >= 0) {
                List<DataCooperation> cooperationList = (List<DataCooperation>) result.getList();
                for (DataCooperation cooperation : cooperationList) {
                    if (Strings.isNotBlank(cooperation.getCompleteAt())) {
                        int days = DateUtil.getBetweenDays(DateUtil.getDate(), cooperation.getCompleteAt());
                        if (days > 0) {
                            cooperation.setBetweenDays("需要" + String.valueOf(days) + "天完成");
                        } else {
                            cooperation.setBetweenDays("已完成");
                        }
                    } else {
                        cooperation.setBetweenDays("长期");
                    }
                }
            }

        } catch (Exception e) {
            return Result.error();
        }
        return Result.success(result.getPager().getRecordCount(), result.getList());
    }

    /**
     * 获取首页推荐列表
     *
     * @param page
     * @param limit
     * @return
     */
    @RequestMapping(value = "load_commend_list")
    public Result loadCommendList(@RequestParam(required = false) Integer page,
                                  @RequestParam(required = false) Integer limit) {

        QueryResult result = null;
        try {
            Pager p = PagerUtil.conPager(page, limit);
            result = cooperationService.queryPager(p, Cnd.where("commendFlag", "=", "YES").and("publisher","=","company").and("showStatus","=","checked").desc("createAt"),
                    "^(id|title|price|mainImageUrl|dataAmount)$");
        } catch (Exception e) {
            return Result.error();
        }
        return Result.success(result.getPager().getRecordCount(), result.getList());
    }

    /**
     * 获取个性化列表
     *
     * @param page
     * @param limit
     * @return
     */
    @RequestMapping(value = "load_perty_list")
    public Result loadPertyList(@RequestParam(required = false) Integer page,
                                @RequestParam(required = false) Integer limit) {
        // 热门数据 只展示公司提交数据
        QueryResult result = null;
        try {
            Pager p = PagerUtil.conPager(page, limit);
            result = cooperationService.queryPager(p, Cnd.where("hotFlag", "=", "YES").and("showStatus","=","checked").and("publisher", "=", "company").desc("createAt")
                    , "^(id|title)$");
        } catch (Exception e) {
            return Result.error();
        }
        return Result.success(result.getPager().getRecordCount(), result.getList());
    }

    /**
     * 获取详情
     *
     * @param cooId 合作数据id
     * @return
     */
    @RequestMapping(value = "load_detail")
    public Result loadCooperationDetail(@RequestParam String cooId) {
        if (Strings.isBlank(cooId)) return Result.error("访问异常");
        DataCooperation cooperation = null;
        try {
            cooperation = cooperationService.fetchLinks(cooperationService.fetch(cooId),"^(comment)$");
        } catch (Exception e) {
            return Result.error();
        }
        return Result.success(cooperation);
    }
}
