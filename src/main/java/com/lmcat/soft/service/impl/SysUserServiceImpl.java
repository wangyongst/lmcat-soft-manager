package com.lmcat.soft.service.impl;

import com.lmcat.soft.common.base.BaseServiceImpl;
import com.lmcat.soft.module.SysUser;
import com.lmcat.soft.service.ISysUserService;
import org.nutz.dao.Dao;
import org.springframework.stereotype.Service;

@Service
public class SysUserServiceImpl  extends BaseServiceImpl<SysUser> implements ISysUserService {
    public SysUserServiceImpl(Dao dao){
        super(dao);
    }
}
