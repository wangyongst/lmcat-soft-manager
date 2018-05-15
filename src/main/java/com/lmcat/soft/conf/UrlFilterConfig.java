package com.lmcat.soft.conf;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UrlFilterConfig {

    /**
     * 重写需要过滤的url
     * @return
     */
    @Bean
    public FilterRegistrationBean filterRegist(){
        FilterRegistrationBean registBean = new FilterRegistrationBean();
        registBean.setFilter(new LoginFilterConfig());
        registBean.addUrlPatterns("/*"); // 指定为所有url
        return registBean;
    }
}
