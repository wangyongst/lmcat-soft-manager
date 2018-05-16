package com.lmcat.soft.module;

import com.lmcat.soft.common.base.model.BaseModel;
import org.nutz.dao.entity.annotation.*;

/**
 * 免费试用
 */
@Table("free_plans")
public class FreePlans extends BaseModel{

    /**
     * 客户姓名
     */
    @Column("customer_name")
    private String customerName;

    /**
     * 单位名称
     */
    @Column("customer_unit_name")
    private String customerUnitName;

    /**
     * 地址
     */
    @Column("customer_address")
    private String customerAddress;

    /**
     * 客户电话
     */
    @Column("customer_phone")
    private String customerPhone;


    /**
     * 邮箱
     */
    @Column("customer_email")
    private String customerEmail;
    /**
     * 客户需求
     */
    @Column("customer_need")
    @ColDefine(type = ColType.TEXT)
    private String customerNeed;

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

    public String getCustomerNeed() {
        return customerNeed;
    }

    public void setCustomerNeed(String customerNeed) {
        this.customerNeed = customerNeed;
    }

    public String getCustomerUnitName() {
        return customerUnitName;
    }

    public void setCustomerUnitName(String customerUnitName) {
        this.customerUnitName = customerUnitName;
    }

    public String getCustomerAddress() {
        return customerAddress;
    }

    public void setCustomerAddress(String customerAddress) {
        this.customerAddress = customerAddress;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }
}
