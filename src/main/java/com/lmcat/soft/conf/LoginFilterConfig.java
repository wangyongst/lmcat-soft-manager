package com.lmcat.soft.conf;

import com.lmcat.soft.common.utils.SessionUtil;
import com.lmcat.soft.module.SysUser;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

public class LoginFilterConfig implements Filter {

    /**
     * 不需要登录验证url
     */
    protected Set<String> noLoginPrefixs = new HashSet<String>();


    @Override
    public void init(FilterConfig conf) throws ServletException {
        String baseUrl = conf.getServletContext().getContextPath();
        noLoginPrefixs.add(baseUrl + "/login");
        noLoginPrefixs.add(baseUrl + "/web");
        noLoginPrefixs.add(baseUrl + "/ajaxLogin");
        noLoginPrefixs.add(baseUrl + "/ajaxLogout");
        noLoginPrefixs.add(baseUrl + "/static/css");
        noLoginPrefixs.add(baseUrl + "/css");
        noLoginPrefixs.add(baseUrl + "/js");
        noLoginPrefixs.add(baseUrl + "/img");
        noLoginPrefixs.add(baseUrl + "/images");
        noLoginPrefixs.add(baseUrl + "/plugin");
        noLoginPrefixs.add(baseUrl + "/video");
        noLoginPrefixs.add(baseUrl + "/druid/");
        noLoginPrefixs.add(baseUrl + "/configuration");
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) req;
        HttpServletResponse httpResponse = (HttpServletResponse) resp;
        String uri = httpRequest.getRequestURI();
        // 过来不验证登录url
        for (String noLoginUrl : noLoginPrefixs) {
            if (uri.startsWith(noLoginUrl)) {
                chain.doFilter(httpRequest, httpResponse);
                return;
            }
        }
        SysUser user = (SysUser) httpRequest.getSession().getAttribute(SessionUtil.LOGIN_KEY);
        // 未登录 重定向
        if (user == null || user.getId() == null) {
            httpResponse.sendRedirect(httpRequest.getContextPath() + "/login");
        } else {
            httpRequest.setAttribute(SessionUtil.LOGIN_KEY, user);
        }
        chain.doFilter(httpRequest, httpResponse);
    }

    @Override
    public void destroy() {

    }
}
