package com.lmcat.soft.service.impl;

import com.lmcat.soft.common.base.BaseServiceImpl;
import com.lmcat.soft.module.CooperationComment;
import com.lmcat.soft.service.ICooperationCommentService;
import org.nutz.dao.Dao;
import org.springframework.stereotype.Service;

@Service
public class CooperationCommentServiceImpl extends BaseServiceImpl<CooperationComment> implements ICooperationCommentService {
    public CooperationCommentServiceImpl(Dao dao){
        super(dao);
    }
}
