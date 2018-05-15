package com.lmcat.soft.service.impl;

import com.lmcat.soft.common.base.BaseServiceImpl;
import com.lmcat.soft.module.DataCooperation;
import com.lmcat.soft.service.IDataCooperationService;
import org.nutz.dao.Dao;
import org.springframework.stereotype.Service;

@Service
public class DataCooperationServiceImpl extends BaseServiceImpl<DataCooperation> implements IDataCooperationService {
    public  DataCooperationServiceImpl(Dao dao){
        super(dao);
    }
}
