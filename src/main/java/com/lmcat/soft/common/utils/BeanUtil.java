package com.lmcat.soft.common.utils;


import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;

import java.util.HashSet;
import java.util.Set;

/**
 * 重写部分对象拷贝方法
 * @Author guojxx
 * @Date Created in 14:08 2018/01/25
 */
public class BeanUtil {

    public static String[] getNullPropertyNames (Object source) {
        final BeanWrapper src = new BeanWrapperImpl(source);
        java.beans.PropertyDescriptor[] pds = src.getPropertyDescriptors();

        Set<String> emptyNames = new HashSet<String>();
        for(java.beans.PropertyDescriptor pd : pds) {
            Object srcValue = src.getPropertyValue(pd.getName());
            if (srcValue == null) emptyNames.add(pd.getName());
        }
        String[] result = new String[emptyNames.size()];
        return emptyNames.toArray(result);
    }

    /**
     * source对象参数拷贝到target中，并忽略source中的null值
     * @param source
     * @param target
     */
    public static void copyPropertiesIgroreNull(Object source,Object target){
            BeanUtils.copyProperties(source,target,getNullPropertyNames(source));
    }
}


