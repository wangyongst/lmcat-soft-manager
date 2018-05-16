package com.lmcat.soft.service.impl;

import com.lmcat.soft.common.base.BaseServiceImpl;
import com.lmcat.soft.module.FreePlans;
import com.lmcat.soft.service.IFreePlansService;
import org.nutz.dao.Dao;
import org.springframework.stereotype.Service;

@Service
public class FreePlansServiceImpl extends BaseServiceImpl<FreePlans> implements IFreePlansService {
    public FreePlansServiceImpl(Dao dao) {
        super(dao);
    }
}
