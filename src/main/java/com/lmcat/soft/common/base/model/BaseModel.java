package com.lmcat.soft.common.base.model;

import org.nutz.dao.entity.annotation.Column;
import org.nutz.dao.entity.annotation.EL;
import org.nutz.dao.entity.annotation.Name;
import org.nutz.dao.entity.annotation.Prev;

import java.io.Serializable;
import java.sql.Timestamp;

public class BaseModel implements Serializable {
    private static final long serialVersionUID = 1L;

    @Name
    @Prev(els=@EL("uuid(32)"))
    private String id;

    @Column("create_at")
    private Timestamp createAt;

    @Column("update_at")
    private Timestamp updateAt;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Timestamp getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Timestamp createAt) {
        this.createAt = createAt;
    }

    public Timestamp getUpdateAt() {
        return updateAt;
    }

    public void setUpdateAt(Timestamp updateAt) {
        this.updateAt = updateAt;
    }
}
