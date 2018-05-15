package com.lmcat.soft.controller.manager;

import com.lmcat.soft.common.utils.*;
import com.lmcat.soft.module.CooperationComment;
import com.lmcat.soft.module.DataCooperation;
import com.lmcat.soft.service.IDataCooperationService;
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
 * 数据合作api
 */
@RestController
@RequestMapping(value = "data_cooperation")
public class DataCooperationController {

    @Autowired
    private IDataCooperationService cooperationService;


    @RequestMapping(value = "index")
    public ModelAndView index() {
        return new ModelAndView("/cooperation/data_cooperation_list");
    }

    @RequestMapping(value = "form")
    public ModelAndView form() {
        return new ModelAndView("/cooperation/data_cooperation_edit");
    }


    /**
     * 保存
     *
     * @return
     */
    @RequestMapping(value = "save")
    public Result save(DataCooperation coo) {
        try {
            checkParams(coo);
            if (Strings.isBlank(coo.getId())) {
                coo.setPublisher("company");//发布方为公司
                coo.setCreateAt(DateUtil.getTimestamp());
                coo.setComment(new CooperationComment(0,0,0,0));
                cooperationService.insertWith(coo,"comment");
            } else {
                DataCooperation localCoo = cooperationService.fetch(coo.getId());
                if (localCoo == null) return Result.error("数据异常");
                BeanUtil.copyPropertiesIgroreNull(coo, localCoo);
                localCoo.setUpdateAt(DateUtil.getTimestamp());
                cooperationService.update(localCoo);
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
     *
     * @param cooId
     * @return
     */
    @RequestMapping(value = "/{cooId}/delete")
    public Result delete(@PathVariable String cooId) {
        if (Strings.isBlank(cooId)) return Result.error("请选择对象");
        try {
            DataCooperation cooperation = cooperationService.fetch(cooId);
            if(cooperation == null) return Result.error("数据不存在");
            cooperationService.delete(cooId);
            if(Strings.isNotBlank(cooperation.getMainImageUrl()) && FileUtil.checkFileIsExist(cooperation.getMainImageUrl())){
                FileUtil.qiniuDelete(cooperation.getMainImageUrl());
            }
            if(Strings.isNotBlank(cooperation.getSampleUrl()) && FileUtil.checkFileIsExist(cooperation.getSampleUrl())){
                FileUtil.qiniuDelete(cooperation.getSampleUrl());
            }
        } catch (Exception e) {
            return Result.error();
        }
        return Result.success();
    }


    /**
     * 修改展示状态
     * @param cooId     数据id
     * @param status    状态  checked  unchecked
     * @return
     */
    @RequestMapping(value = "/modify/{cooId}/{status}")
    public Result modifyStatus(@PathVariable String cooId, @PathVariable String status){
        if(Strings.isBlank(cooId) || Strings.isBlank(status)) return Result.error("数据异常");
        try {
            DataCooperation cooperation = cooperationService.fetch(cooId);
            if(cooperation == null) return Result.error("数据不存在");
            cooperation.setShowStatus(status);
            cooperation.setUpdateAt(DateUtil.getTimestamp());
            cooperationService.update(cooperation);
        } catch (Exception e) {
            return Result.error();
        }
        return Result.success();
    }
    /**
     * 加载列表
     *
     * @param title 标题模糊查询
     * @param page
     * @param limit
     * @return
     */
    @RequestMapping(value = "load_list")
    public LayuiParams loadList(@RequestParam(required = false) String title,
                                @RequestParam(value = "page", required = false) int page,
                                @RequestParam(value = "limit", required = false) int limit) {
        QueryResult result = null;
        try {
            Pager pager = PagerUtil.conPager(page, limit);
            Cnd cnd = Cnd.NEW();
            if (Strings.isNotBlank(title)) cnd.and("title", "LIKE", "%" + title + "%");
            cnd.and("publisher","=","company").desc("createAt");
            result = cooperationService.queryPager(pager, cnd);
        } catch (Exception e) {
            return LayuiParams.error();
        }
        return LayuiParams.success(result.getPager().getRecordCount(), result.getList());
    }

    private void checkParams(DataCooperation coo) {
        ParamUtil.checkParam(coo.getTitle(), "请输入标题");
        ParamUtil.checkParam(coo.getDescribtion(), "请输入描述");
        ParamUtil.checkParam(coo.getPrice(), "请选择或输入价格");
        ParamUtil.checkParam(coo.getDataCategory(), "请选择数据类型");
        ParamUtil.checkParam(coo.getCompleteAt(), "请选择完成时间");
        ParamUtil.checkParam(coo.getDataAmount(), "请输入数据量");
        //ParamUtil.checkParam(coo.getDataStandard(), "请输入数据规范");
        ParamUtil.checkParam(coo.getDataField(), "请输入数据字段");
        ParamUtil.checkParam(coo.getCommendFlag(), "请选择是否推荐");
        ParamUtil.checkParam(coo.getShowStatus(), "请选择是否展示");
        ParamUtil.checkParam(coo.getHotFlag(), "请选择是否热门");

    }
}
