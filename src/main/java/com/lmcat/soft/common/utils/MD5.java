package com.lmcat.soft.common.utils;

import java.security.MessageDigest;

/**
 * md5
 */
public class MD5 {

	
	/** 
     * MD5散列算法
     *  @param  input  任意长度字符串
     *  @return  MD5输出128bit，字符串通过16进制编码，返回32个字符
     */
    public static String encode(String input) {
        char[] num_chars = new char[]{'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'};
        char[] output = new char[32];
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] by = md.digest(input.getBytes());
            for (int i = 0; i < by.length; i++) {
                output[2 * i] = num_chars[(by[i] & 0xf0) >> 4];
                output[2 * i + 1] = num_chars[by[i] & 0xf];
            }
        } catch (Exception e) {
            return "0";
        }
        return new String(output).toLowerCase();
    }    

	/**
	 * 测试
	 * @param args
	 */
	public static void main(String[] args) {
        System.out.println(encode("0"));
	}
	
}
