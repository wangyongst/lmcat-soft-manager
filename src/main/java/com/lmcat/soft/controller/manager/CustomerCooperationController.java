package com.lmcat.soft.controller.manager;

import com.lmcat.soft.common.utils.*;
import com.lmcat.soft.module.CustomerCooperation;
import com.lmcat.soft.module.DataCooperation;
import com.lmcat.soft.service.ICustomerCooperationService;
import org.nutz.dao.Cnd;
import org.nutz.dao.QueryResult;
import org.nutz.dao.pager.Pager;
import org.nutz.lang.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

/**
 * 客户数据api
 */
@RestController
@RequestMapping(value = "customer_cooperation")
public class CustomerCooperationController {

    @Autowired
    private ICustomerCooperationService customerCooperationService;

    @RequestMapping(value = "index")
    public ModelAndView  index(){
        return new  ModelAndView("/cooperation/customer_cooperation_list");
    }

    @RequestMapping(value = "form")
    public ModelAndView  form(){
        return new  ModelAndView("/cooperation/customer_cooperation_edit");
    }


    /**
     * 保存
     *
     * @return
     */
    @RequestMapping(value = "save")
    public Result save(CustomerCooperation coo) {
       // checkParams(coo);
        try {
            if (Strings.isBlank(coo.getId())) {
                coo.setCreateAt(DateUtil.getTimestamp());
                customerCooperationService.insert(coo);
            } else {
                CustomerCooperation localCoo = customerCooperationService.fetch(coo.getId());
                if (localCoo == null) return Result.error("数据异常");
                BeanUtil.copyPropertiesIgroreNull(coo, localCoo);
                localCoo.setUpdateAt(DateUtil.getTimestamp());
                customerCooperationService.update(localCoo);
            }
        } catch (BizException e) {
            return ExceptionBulider.handleException(e);
        } catch (Exception e1) {
            return Result.error();
        }
        return Result.success();
    }


    /**
     * 删除操作
     * @param cooId
     * @return
     */
    @RequestMapping(value = "/{cooId}/delete")
    public Result delete(@PathVariable String cooId) {
        if (Strings.isBlank(cooId)) return Result.error("请选择对象");
        try {
            CustomerCooperation customerCooperation = customerCooperationService.fetchLinks(customerCooperationService.fetch(cooId),null);
            if(customerCooperation== null || customerCooperation.getCooperation() == null) return Result.error("数据不存在");
            //删除文件
            DataCooperation cooperation = customerCooperation.getCooperation();
            if(Strings.isNotBlank(cooperation.getMainImageUrl()) && FileUtil.checkFileIsExist(cooperation.getMainImageUrl())){
                FileUtil.qiniuDelete(cooperation.getMainImageUrl());
            }
            if(Strings.isNotBlank(cooperation.getSampleUrl()) && FileUtil.checkFileIsExist(cooperation.getSampleUrl())){
                FileUtil.qiniuDelete(cooperation.getSampleUrl());
            }
            customerCooperationService.deleteWith(customerCooperationService.fetch(cooId),"cooperation");
        } catch (Exception e) {
            return Result.error();
        }
        return Result.success();
    }

    /**
     * 加载列表
     * @param customerName  客户名称模糊查询
     * @param page
     * @param limit
     * @return
     */
    @RequestMapping(value = "load_list")
    public LayuiParams loadList(@RequestParam(required = false) String customerName,
                                @RequestParam(value = "page", required = false) int page,
                                @RequestParam(value = "limit", required = false) int limit) {
        QueryResult result = null;
        try {
            Pager pager = PagerUtil.conPager(page, limit);
            Cnd cnd = Cnd.NEW();
            if (Strings.isNotBlank(customerName)) cnd.and("customerName", "LIKE", "%" + customerName + "%");
            cnd.desc("createAt");
            result = customerCooperationService.queryPager(pager, "cooperation",cnd);
        } catch (Exception e) {
            return LayuiParams.error();
        }
        return LayuiParams.success(result.getPager().getRecordCount(), result.getList());
    }
}
