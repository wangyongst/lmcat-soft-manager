package com.lmcat.soft.module;

import com.lmcat.soft.common.base.model.BaseModel;
import org.nutz.dao.entity.annotation.*;

/**
 * 客户提交合作bo
 */
@Table("customer_cooperation")
public class CustomerCooperation extends BaseModel{

    /**
     * 客户名称
     */
    @Column("customer_name")
    private String customerName;

    /**
     * 客户电话
     */
    @Column("customer_phone")
    private String customerPhone;

    /**
     * 客户附言
     */
    @Column("customer_state")
    @ColDefine(type = ColType.TEXT)
    private String customerState;

    /**
     * 数据需求id
     */
    @Column("cooperation_id")
    private String cooperationId;

    @One(field = "cooperationId")
    private DataCooperation cooperation;

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerPhone() {
        return customerPhone;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }

    public String getCustomerState() {
        return customerState;
    }

    public void setCustomerState(String customerState) {
        this.customerState = customerState;
    }

    public String getCooperationId() {
        return cooperationId;
    }

    public void setCooperationId(String cooperationId) {
        this.cooperationId = cooperationId;
    }

    public DataCooperation getCooperation() {
        return cooperation;
    }

    public void setCooperation(DataCooperation cooperation) {
        this.cooperation = cooperation;
    }

}
