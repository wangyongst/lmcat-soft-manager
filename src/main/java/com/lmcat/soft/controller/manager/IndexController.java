package com.lmcat.soft.controller.manager;

import com.lmcat.soft.common.utils.FileUtil;
import com.lmcat.soft.common.utils.MD5;
import com.lmcat.soft.common.utils.Result;
import com.lmcat.soft.common.utils.SessionUtil;
import com.lmcat.soft.module.SysUser;
import com.lmcat.soft.service.ISysUserService;
import org.nutz.dao.Cnd;
import org.nutz.lang.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;

@RestController
public class IndexController {

    @Autowired(required = false)
    private ISysUserService iSysUserService;


    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public ModelAndView login() {
        return new ModelAndView("login");
    }

    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public ModelAndView index() {
        return new ModelAndView("index");
    }


    @RequestMapping(value = "/main", method = RequestMethod.GET)
    public ModelAndView main() {
        return new ModelAndView("main");
    }

    @RequestMapping(value = "ajaxLogin", method = RequestMethod.POST)
    public Result ajaxLogin(@RequestParam(value = "userName") String userName,
                            @RequestParam(value = "password") String password,
                            HttpSession session) {
        if (Strings.isBlank(userName)) {
            return Result.error("请输入用户名");
        }
        if (Strings.isBlank(password)) {
            return Result.error("请输入密码");
        }
        SysUser user = null;
        try {
            user = iSysUserService.getField("^(id|userName)$", Cnd.where("userName", "=", userName).and("password", "=", MD5.encode(password)));
            if (user == null) {
                return Result.error("用户名或密码错误");
            }
            session.setAttribute(SessionUtil.LOGIN_KEY, user);
            session.setMaxInactiveInterval(-1);
        } catch (Exception e) {
            return Result.error();
        }
        return Result.success(user);
    }

    @RequestMapping(value = "ajaxLogout", method = RequestMethod.GET)
    public ModelAndView ajaxLogout(HttpSession session) {
        if (session != null) session.invalidate();
        return new ModelAndView("login");
    }

    /**
     * 文件上传接口
     *
     * @param file
     * @return
     */
    @RequestMapping(value = "file_upload")
    public Result uploadFile(@RequestParam(value = "file") MultipartFile file) {
        if (file == null) return Result.error("请选择文件上传");
        String url = null;
        try {
            url = FileUtil.qiniuUpload(file);
        } catch (Exception e) {
            return Result.error();
        }
        return Result.success(url);
    }

    /**
     * 删除图片
     * @param fileUrl
     * @return
     */
    @RequestMapping(value = "file_delete")
    public Result deleteFile(@RequestParam String fileUrl){
        if(Strings.isBlank(fileUrl)) return Result.error("请选择文件");
        try {
            FileUtil.qiniuDelete(fileUrl);
        } catch (Exception e) {
            return Result.error();
        }
        return  Result.success();
    }
}
