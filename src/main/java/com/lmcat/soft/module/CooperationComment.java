package com.lmcat.soft.module;

import com.lmcat.soft.common.base.model.BaseModel;
import com.lmcat.soft.common.utils.DateUtil;
import org.nutz.dao.entity.annotation.Column;
import org.nutz.dao.entity.annotation.Table;

/**
 * 数据合作评价
 */
@Table("cooperation_comment")
public class CooperationComment extends BaseModel {

    /**
     * 钱太少
     */
    @Column("question_money")
    private  Integer questionMoney;

    /**
     * 时间赶
     */
    @Column("question_time")
    private Integer  questionTime;

    /**
     * 不靠谱
     */
    @Column("question_ensure")
    private Integer  questionEnsure;

    /**
     * 做不完
     */
    @Column("question_work")
    private Integer  questionWork;

    public CooperationComment(int questionMoney,int questionTime,int questionEnsure,int questionWork){
        this.questionMoney = questionMoney;
        this.questionTime = questionTime;
        this.questionEnsure = questionEnsure;
        this.questionWork = questionWork;
        super.setCreateAt(DateUtil.getTimestamp());
    }

    public CooperationComment(){}

    public Integer getQuestionMoney() {
        return questionMoney;
    }

    public void setQuestionMoney(Integer questionMoney) {
        this.questionMoney = questionMoney;
    }

    public Integer getQuestionTime() {
        return questionTime;
    }

    public void setQuestionTime(Integer questionTime) {
        this.questionTime = questionTime;
    }

    public Integer getQuestionEnsure() {
        return questionEnsure;
    }

    public void setQuestionEnsure(Integer questionEnsure) {
        this.questionEnsure = questionEnsure;
    }

    public Integer getQuestionWork() {
        return questionWork;
    }

    public void setQuestionWork(Integer questionWork) {
        this.questionWork = questionWork;
    }
}
