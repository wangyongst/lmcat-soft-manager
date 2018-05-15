package com.lmcat.soft.service.impl;

import com.lmcat.soft.common.base.BaseServiceImpl;
import com.lmcat.soft.module.CustomerCooperation;
import com.lmcat.soft.service.ICustomerCooperationService;
import org.nutz.dao.Dao;
import org.springframework.stereotype.Service;

@Service
public class CustomerCooperationServiceImpl extends BaseServiceImpl<CustomerCooperation> implements ICustomerCooperationService {
    public CustomerCooperationServiceImpl(Dao dao){
        super(dao);
    }
}
