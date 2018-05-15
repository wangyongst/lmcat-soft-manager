package com.lmcat.soft.controller.web;

import com.lmcat.soft.common.utils.FileUtil;
import com.lmcat.soft.common.utils.Result;
import org.nutz.lang.Strings;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "web")
public class IndexWebController {


    @RequestMapping("/")
    public ModelAndView index(){
        return new ModelAndView("index.html");
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
