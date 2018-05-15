package com.lmcat.soft.common.utils;

import com.qiniu.common.QiniuException;
import com.qiniu.common.Zone;
import com.qiniu.storage.BucketManager;
import com.qiniu.storage.Configuration;
import com.qiniu.storage.UploadManager;
import com.qiniu.util.Auth;
import org.nutz.lang.random.R;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

public class FileUtil {

    private static String accessKey = "kkBgG14xx2RQyZ6CnfJ2hPFJgitAWXrnmSWmc05t";
    private static String secretKey = "n1NQS6K6F2IO2fSf9nWaUi5wC7rErHSkRy2Q4_Qj";
    private static String backetName = "newhuaduapp";
    private static String siteUrl = "http://p7eqke9tk.bkt.clouddn.com/";
    public static  String createUploadToken(){
        Auth auth = Auth.create(accessKey, secretKey);
        String uploadToken = auth.uploadToken(backetName);
        return uploadToken;
    }

    /**
     * 文件上传接口
     * @param file
     * @return
     */
    public static  String qiniuUpload(MultipartFile file) throws QiniuException {
        String fileName = file.getOriginalFilename();
        String newFileName = DateUtil.getCurrentTime()+fileName.substring(fileName.lastIndexOf("."));
        String path = DateUtil.getDateByYMD()+"/";
        File tempFile = multfileToFile(file);
        Configuration cfg = new Configuration(Zone.zone2());
        UploadManager uploadManager = new UploadManager(cfg);
        uploadManager.put(tempFile,path+newFileName,createUploadToken());
        deleteFile(tempFile);
        return siteUrl+path+newFileName;
    }


    /**
     * MultipartFile转file文件
     *          注意：此方法会产生临时文件，使用完毕请记得删除
     * @param multipartFile
     * @return
     * @throws IOException
     */
    public static File multfileToFile(MultipartFile multipartFile)  {
        String filename = multipartFile.getOriginalFilename();
        String prefix = filename.substring(filename.lastIndexOf("."));
        File file = null;
        try {
            file = File.createTempFile(R.UU16(), prefix);
            // MultipartFile to File
            multipartFile.transferTo(file);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return file;
    }

    /**
     * 删除磁盘文件
     * @param files
     */
    public static void deleteFile(File... files){
        for (File file :files){
            if(file.exists()) file.delete();
        }
    }


    /**
     * 获取bucketManager实例
     * @return
     */
    public static BucketManager createBucketManager(){
        Auth auth = Auth.create(accessKey, secretKey);
        Configuration cfg = new Configuration(Zone.zone2());
        BucketManager bucketManager = new BucketManager(auth, cfg);
        return bucketManager;
    }

    /**
     * 删除七牛云存储文件
     * @param fileUrl       文件路径
     * @throws QiniuException
     */
    public static void qiniuDelete(String fileUrl) throws QiniuException {
        String newUrl = fileUrl.replace(siteUrl, "");
        BucketManager manager = createBucketManager();
        manager.delete(backetName,newUrl);
    }

    /**
     * 根据路径检查文件是否存在
     * @param fileUrl
     * @return
     * @throws QiniuException
     */
    public static boolean  checkFileIsExist(String fileUrl)  {
        BucketManager bucketManager = createBucketManager();
        String newUrl = fileUrl.replace(siteUrl, "");
        try {
             bucketManager.stat(backetName, newUrl);
        } catch (QiniuException e) {
            return false;
        }
        return true;
    }

    public static void main(String[] args) throws QiniuException {
        System.out.println(checkFileIsExist("http://p7eqke9tk.bkt.clouddn.com/20180423/152445812551.png"));
    }
}
