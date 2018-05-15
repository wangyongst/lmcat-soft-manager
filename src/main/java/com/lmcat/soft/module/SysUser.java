package com.lmcat.soft.module;

import com.lmcat.soft.common.base.model.BaseModel;
import org.nutz.dao.entity.annotation.Column;
import org.nutz.dao.entity.annotation.Table;

/**
 * 系统用户
 */
@Table("sys_user")
public class SysUser  extends BaseModel{

    @Column("user_name")
    private String userName;

    @Column
    private String password;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
