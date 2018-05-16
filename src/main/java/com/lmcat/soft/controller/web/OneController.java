package com.lmcat.soft.controller.web;

import com.lmcat.soft.common.utils.*;
import com.lmcat.soft.module.FreePlans;
import com.lmcat.soft.service.IFreePlansService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "web/one")
public class OneController {

    @Autowired
    private IFreePlansService freePlansService;

    /**
     * 客户提交表单
     * @param freePlans
     * @return
     */
    @PostMapping(value = "save_form")
    public Result saveForm(@ModelAttribute FreePlans freePlans){
        try {
            checkParams(freePlans);
            freePlans.setCreateAt(DateUtil.getTimestamp());
            freePlansService.insertWith(freePlans,"freePlans");
        } catch (BizException e) {
            return ExceptionBulider.handleException(e);
        }catch (Exception e1) {
            return Result.error();
        }
        return Result.success();
    }

    private void checkParams(FreePlans freePlans){
        ParamUtil.checkParam(freePlans.getCustomerName(), "请输入您的姓名");
        ParamUtil.checkParam(freePlans.getCustomerAddress(), "请输入公司地址");
        ParamUtil.checkParam(freePlans.getCustomerEmail(), "请输入电子邮箱");
        ParamUtil.checkParam(freePlans.getCustomerNeed(), "请输入需求");
        ParamUtil.checkParam(freePlans.getCustomerPhone(), "请输入联系电话");
        ParamUtil.checkParam(freePlans.getCustomerUnitName(), "请输入公司名称");
    }

}
