package com.lmcat.soft.controller.web;

import com.lmcat.soft.common.utils.*;
import com.lmcat.soft.module.CustomerCooperation;
import com.lmcat.soft.module.DataCooperation;
import com.lmcat.soft.service.ICustomerCooperationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 客户数据提交
 */
@CrossOrigin("*")
@RestController
@RequestMapping(value = "web/customer_cooperation")
public class CustomerCooperationWebController {

    @Autowired
    private ICustomerCooperationService customerCooperationService;

    /**
     * 客户提交表单
     * @param coo
     * @return
     */
    @RequestMapping(value = "save_form")
    public Result saveForm(CustomerCooperation coo){
        try {
            checkParams(coo);
            DataCooperation cooperation = coo.getCooperation();
            cooperation.setPublisher("customer");// 发布为客户
            cooperation.setCreateAt(DateUtil.getTimestamp());
            coo.setCreateAt(DateUtil.getTimestamp());
            coo.setCooperation(cooperation);
            customerCooperationService.insertWith(coo,"cooperation");
        } catch (BizException e) {
            return ExceptionBulider.handleException(e);
        }catch (Exception e1) {
            return Result.error();
        }
        return Result.success();
    }

    private void checkParams(CustomerCooperation coo){
        ParamUtil.checkParam(coo.getCooperation(), "请输入表单数据");
        ParamUtil.checkParam(coo.getCooperation().getTitle(), "请输入标题");
        ParamUtil.checkParamLength(coo.getCooperation().getTitle(),6,50);
        ParamUtil.checkParam(coo.getCooperation().getDescribtion(), "请输入描述");
        ParamUtil.checkParamLength(coo.getCooperation().getDescribtion(),0,1850);
        ParamUtil.checkParam(coo.getCooperation().getPrice(), "请选择或输入价格");
        ParamUtil.checkParam(coo.getCooperation().getDataCategory(), "请选择数据类型");
        ParamUtil.checkParam(coo.getCooperation().getDataAmount(), "请输入数据量");
        ParamUtil.checkParam(coo.getCooperation().getDataStandard(), "请输入数据规范");
    }

}
