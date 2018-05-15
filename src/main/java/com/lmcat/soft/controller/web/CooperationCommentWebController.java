package com.lmcat.soft.controller.web;

import com.lmcat.soft.common.utils.BeanUtil;
import com.lmcat.soft.common.utils.DateUtil;
import com.lmcat.soft.common.utils.Result;
import com.lmcat.soft.module.CooperationComment;
import com.lmcat.soft.service.ICooperationCommentService;
import org.nutz.lang.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 数据合作项目评价
 */
@CrossOrigin("*")
@RestController
@RequestMapping(value = "web/cooperation_comment")
public class CooperationCommentWebController {

    @Autowired
    private ICooperationCommentService commentService;

    /**
     * 评价
     * @param comment
     */
    @RequestMapping(value = "save")
    public Result save(CooperationComment comment){
        if(Strings.isBlank(comment.getId())) return Result.error("异常访问");
        try {
            CooperationComment localComment = commentService.fetch(comment.getId());
            if(localComment == null) return Result.error("数据异常");
            BeanUtil.copyPropertiesIgroreNull(comment,localComment);
            localComment.setUpdateAt(DateUtil.getTimestamp());
            commentService.update(localComment);
        } catch (Exception e) {
            return Result.error();
        }
        return Result.success();
    }
}
