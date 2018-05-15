package com.lmcat.soft.module;

import com.lmcat.soft.common.base.model.BaseModel;
import org.nutz.dao.entity.annotation.*;

/**
 * 数据合作bo
 */
@Table("data_cooperation")
public class DataCooperation extends BaseModel{

    /**
     * 标题
     */
    @Column
    private String  title;

    /**
     * 描述
     */
    @Column
    @ColDefine(type = ColType.TEXT)
    private String describtion;

    /**
     * 价格
     */
    @Column
    private String price;

    /**
     * 主图url
     */
    @Column("main_image_url")
    @ColDefine(width = 255)
    private String mainImageUrl;

    /**
     * 完成时间
     */
    @Column("complete_at")
    private String completeAt;

    /**
     * 数据数量
     */
    @Column("data_amount")
    private String dataAmount;

    /**
     * 数据类别
     */
    @Column("data_category")
    private String dataCategory;

    /**
     * 数据规范
     */
    @Column("data_standard")
    private String dataStandard;

    /**
     * 数据字段
     */
    @Column("data_field")
    private String dataField;

    /**
     * 样例url
     */
    @Column("sample_url")
    @ColDefine(width = 255)
    private String sampleUrl;

    /**
     * 需求度
     */
    @Column
    private String demand;

    /**
     * 状态
     */
    @Column
    private String status;

    /**
     * 是否推荐标志 YES NO
     */
    @Column("commend_flag")
    private String commendFlag;

    /**
     * 是否热门标志  YES NO
     */
    @Column("hot_flag")
    private String hotFlag;

    /**
     * 发布方   客户 customer  公司 company
     */
    @Column
    private String publisher;

    /**
     * 评价id
     */
    @Column("comment_id")
    private String  commentId;

    @One(field = "commentId")
    private CooperationComment comment;

    /**
     * 展示状态  checked  开启    unchecked 关闭
     */
    @Column("show_status")
    private String  showStatus;

    /**
     * 冗余字段   相差天数  页面使用
     */
    private String betweenDays;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescribtion() {
        return describtion;
    }

    public void setDescribtion(String describtion) {
        this.describtion = describtion;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getMainImageUrl() {
        return mainImageUrl;
    }

    public void setMainImageUrl(String mainImageUrl) {
        this.mainImageUrl = mainImageUrl;
    }

    public String getCompleteAt() {
        return completeAt;
    }

    public void setCompleteAt(String completeAt) {
        this.completeAt = completeAt;
    }

    public String getDataAmount() {
        return dataAmount;
    }

    public void setDataAmount(String dataAmount) {
        this.dataAmount = dataAmount;
    }

    public String getDataStandard() {
        return dataStandard;
    }

    public void setDataStandard(String dataStandard) {
        this.dataStandard = dataStandard;
    }

    public String getDataField() {
        return dataField;
    }

    public void setDataField(String dataField) {
        this.dataField = dataField;
    }

    public String getSampleUrl() {
        return sampleUrl;
    }

    public void setSampleUrl(String sampleUrl) {
        this.sampleUrl = sampleUrl;
    }

    public String getDemand() {
        return demand;
    }

    public void setDemand(String demand) {
        this.demand = demand;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDataCategory() {
        return dataCategory;
    }

    public void setDataCategory(String dataCategory) {
        this.dataCategory = dataCategory;
    }

    public String getCommendFlag() {
        return commendFlag;
    }

    public void setCommendFlag(String commendFlag) {
        this.commendFlag = commendFlag;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public String getHotFlag() {
        return hotFlag;
    }

    public void setHotFlag(String hotFlag) {
        this.hotFlag = hotFlag;
    }

    public String getBetweenDays() {
        return betweenDays;
    }

    public void setBetweenDays(String betweenDays) {
        this.betweenDays = betweenDays;
    }

    public String getCommentId() {
        return commentId;
    }

    public void setCommentId(String commentId) {
        this.commentId = commentId;
    }

    public CooperationComment getComment() {
        return comment;
    }

    public void setComment(CooperationComment comment) {
        this.comment = comment;
    }

    public String getShowStatus() {
        return showStatus;
    }

    public void setShowStatus(String showStatus) {
        this.showStatus = showStatus;
    }
}
