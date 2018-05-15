package com.lmcat.soft.common.utils;

import org.apache.commons.lang.time.DateFormatUtils;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @Author GjuiX
 * @Date Created in 9:28 2017/11/16
 */
public class DateUtil {

    private static final Locale DEFAULT_LOCALE = Locale.CHINA;
    private static final String pattern1 = "yyyy-MM-dd HH:mm:ss";
    private static final String pattern = "yyyy-MM-dd";

    /**
     *  获取系统时间戳， 格式为YYYY-MM-DD HH:MM:SS:SSS
     * @return
     */
    public static Timestamp getTimestamp() {
        Timestamp time = new Timestamp(new Date().getTime());
        return time;
    }

    /**
     * 获取系统当前时间， 以字符串的形式返回
     * @return
     */
    public static String getDateTime() {
        return DateFormatUtils.format(new Date(), pattern1, DEFAULT_LOCALE);
    }

    /**
     * 获取当前时间
     * @return
     */
    public static String getNowTimeFormat(){
        SimpleDateFormat format = new SimpleDateFormat("yyyyMMddHHmmss");
        Date date = new Date();
        return format.format(date);
    }

    /**
     * 验证日期字符串是否是YYYY-MM-DD格式
     * @param str
     * @return
     */
    public static boolean isDataFormat(String str) {
        boolean flag = false;
        //String regxStr="[1-9][0-9]{3}-[0-1][0-2]-((0[1-9])|([12][0-9])|(3[01]))";
        String regxStr = "^((\\d{2}(([02468][048])|([13579][26]))[\\-\\/\\s]?((((0?[13578])|(1[02]))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])))))|(\\d{2}(([02468][1235679])|([13579][01345789]))[\\-\\/\\s]?((((0?[13578])|(1[02]))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\\-\\/\\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))(\\s(((0?[0-9])|([1-2][0-3]))\\:([0-5]?[0-9])((\\s)|(\\:([0-5]?[0-9])))))?$";
        Pattern pattern1 = Pattern.compile(regxStr);
        Matcher isNo = pattern1.matcher(str);
        if (isNo.matches()) {
            flag = true;
        }
        return flag;
    }

    /**
     * 格式化日期
     * @param date
     * @return
     */
    public static String formatDateTime(Date date) {
        if (null == date) return "";
        return DateFormatUtils.format(date, pattern, DEFAULT_LOCALE);
    }

    /**
     * 格式化时间
     * @param date
     * @return
     */
    public static Date formatStrDate(String date) {
        SimpleDateFormat sdf = new SimpleDateFormat(pattern);
        Date date1 = null;
        try {
            date1 = sdf.parse(date);
        } catch (ParseException e) {
            throw new BizException(EorMsg.ERROR_CODE, "日期格式错误");
        }
        return date1;
    }

    /**
     * 获取系统当前时间，需指定格式
     * @param pattern
     * @return
     */
    public static String getDate(String pattern) {
        if (null == pattern) {
            return DateFormatUtils.format(new Date(), pattern1, DEFAULT_LOCALE);
        } else {
            return DateFormatUtils.format(new Date(), pattern, DEFAULT_LOCALE);
        }
    }

    /**
     * 获取系统当前时间，格式为YYYMMDD
     * @return
     */
    public static String getDateByYMD() {
        return getDate("yyyyMMdd");
    }

    /**
     * 创建一条比较timestamp时间类型的语句
     * @param name
     * @param queryStartTime
     * @param queryEndTime
     * @return
     */
    public static String getQueryStrByTime(String name, String queryStartTime, String queryEndTime) {
        return " AND " + name + " BETWEEN '" + queryStartTime + "' AND '" + queryEndTime + "'";
    }

    /**
     * 返回当前系统的毫秒值
     * @return
     */
    public static long getCurrentTime() {
        return System.currentTimeMillis();
    }

    /**
     * 获取当前服务器的开始比较时间
     *
     * @return
     */
    public static String getQueryTimeByStart() {
        return getDate() + " 00:00:00";
    }

    /**
     * 获取当前服务器的结束比较时间
     *
     * @return
     */
    public static String getQueryTimeByEnd() {
        return getDate() + " 23:59:59";
    }


    /**
     * 获取输入日期的开始比较时间
     *
     * @return
     */
    public static String getQueryTimeByStart(String queryTime) {
       /* if (isDataFormat(queryTime)) {
            throw new BizException(EorMsg.ERROR_CODE, "查询格式不正确");
        }*/
        return queryTime + " 00:00:00";
    }


    /**
     * 获取输入日期的结束比较时间
     *
     * @return
     */
    public static String getQueryTimeByEnd(String queryTime) {
       /* if (isDataFormat(queryTime)) {
            throw new BizException(EorMsg.ERROR_CODE, "查询格式不正确");
        }*/
        return queryTime + " 23:59:59";
    }

    /**
     * 获取特定格式的当前时间
     *
     * @return
     */
    public static String getDate() {
        return getDate("yyyy-MM-dd");
    }

    /**
     * 获取指定日期
     *
     * @param n -1 昨天 0 今天 1 明天  以此类推
     * @return
     */
    public static String getDay(int n) {
        Calendar c = Calendar.getInstance();
        c.add(Calendar.DATE, n);
        return formatDateTime(c.getTime());
    }

    public  static int  getBetweenDays(String startDay,String endDay){
        Date startDate = formatStrDate(startDay);
        Date endDate = formatStrDate(endDay);
        return  (int) ((endDate.getTime() - startDate.getTime()) / (1000*3600*24));
    }
    /**
     * 获取周一日期
     *
     * @param n 1：下周 -1：上周   以此类推
     * @return
     */
    public static String getWeekMonday(int n) {
        Calendar c = Calendar.getInstance();
        c.add(Calendar.DATE, n * 7);
        c.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
        return formatDateTime(c.getTime());
    }

    /**
     * 获取周日日期
     *
     * @param n 1：下周 -1：上周   以此类推
     * @return
     */
    public static String getWeekSunday(int n) {
        Calendar c = Calendar.getInstance();
        //c.setTime(new Date());
        c.add(Calendar.DATE, n * 7);
        //判断要计算的日期是否是周日，如果是则减一天计算周六的，否则会出问题，计算到下一周去了
        int dayWeek = c.get(Calendar.DAY_OF_WEEK);//获得当前日期是一个星期的第几天
        if (1 == dayWeek) c.add(Calendar.DAY_OF_WEEK, -1);
        c.setFirstDayOfWeek(Calendar.MONDAY);//设置一个星期的第一天，按中国的习惯一个星期的第一天是星期一
        int day = c.get(Calendar.DAY_OF_WEEK);//获得当前日期是一个星期的第几天
        c.add(Calendar.DATE, c.getFirstDayOfWeek() - day + 6);//根据日历的规则，给当前日期减去星期几与一个星期第一天的差值
        return formatDateTime(c.getTime());
    }

    /**
     * 获取指定周一到周六的日期   周日不行
     *
     * @param n
     * @param days 例如周一 传入 Calendar.MONDAY
     * @return
     */
    public static String getWeekOfDay(int n, int days) {
        Calendar c = Calendar.getInstance();
        c.add(Calendar.DATE, n * 7);
        c.set(Calendar.DAY_OF_WEEK, days);
        return formatDateTime(c.getTime());
    }

    /**
     * 获取月份第一天
     *
     * @param n
     * @return
     */
    public static String getMonthFirstDay(int n) {
        Calendar c = Calendar.getInstance();
        c.add(Calendar.MONTH, n);
        c.set(Calendar.DAY_OF_MONTH, 1);
        return formatDateTime(c.getTime());
    }

    /**
     * 获取指定年的第一天
     *
     * @param n
     * @return
     */
    public static String getYearFirstDay(int n) {
        Calendar c = Calendar.getInstance();
        c.add(Calendar.YEAR, n);
        c.set(Calendar.DAY_OF_YEAR, 1);
        return formatDateTime(c.getTime());
    }

    /**
     * 获取指定年的第一天
     *
     * @param n
     * @return
     */
    public static String getYearLastDay(int n) {
        Calendar c = Calendar.getInstance();
        c.add(Calendar.YEAR, n);
        c.set(Calendar.DAY_OF_YEAR, c.getActualMaximum(Calendar.DAY_OF_YEAR));
        return formatDateTime(c.getTime());
    }


    /**
     * 获取月份最后一天
     *
     * @param n
     * @return
     */
    public static String getMonthLastDay(int n) {
        Calendar c = Calendar.getInstance();
        c.add(Calendar.MONTH, n);
        c.set(Calendar.DAY_OF_MONTH, c.getActualMaximum(Calendar.DAY_OF_MONTH));
        return formatDateTime(c.getTime());
    }

    /**
     * 获取季度第一天
     *
     * @param n
     * @return
     */
    public static String getQuarterFirstDay(int n) {
        Calendar c = Calendar.getInstance();
        c.add(Calendar.MONTH, 3 * n);
        int curMonth = c.get(Calendar.MONTH);
        if (curMonth >= Calendar.JANUARY && curMonth <= Calendar.MARCH) {
            c.set(Calendar.MONTH, Calendar.JANUARY);
        }
        if (curMonth >= Calendar.APRIL && curMonth <= Calendar.JUNE) {
            c.set(Calendar.MONTH, Calendar.APRIL);
        }
        if (curMonth >= Calendar.JULY && curMonth <= Calendar.AUGUST) {
            c.set(Calendar.MONTH, Calendar.JULY);
        }
        if (curMonth >= Calendar.OCTOBER && curMonth <= Calendar.DECEMBER) {
            c.set(Calendar.MONTH, Calendar.OCTOBER);
        }
        c.set(Calendar.DAY_OF_MONTH, c.getActualMinimum(Calendar.DAY_OF_MONTH));
        return formatDateTime(c.getTime());
    }

    /**
     * 获取季度最后一天
     *
     * @param n
     * @return
     */
    public static String getQuarterLastDay(int n) {
        Calendar c = Calendar.getInstance();
        c.add(Calendar.MONTH, 3 * n);
        int curMonth = c.get(Calendar.MONTH);
        if (curMonth >= Calendar.JANUARY && curMonth <= Calendar.MARCH) {
            c.set(Calendar.MONTH, Calendar.MARCH);
        }
        if (curMonth >= Calendar.APRIL && curMonth <= Calendar.JUNE) {
            c.set(Calendar.MONTH, Calendar.JUNE);
        }
        if (curMonth >= Calendar.JULY && curMonth <= Calendar.AUGUST) {
            c.set(Calendar.MONTH, Calendar.AUGUST);
        }
        if (curMonth >= Calendar.OCTOBER && curMonth <= Calendar.DECEMBER) {
            c.set(Calendar.MONTH, Calendar.DECEMBER);
        }
        c.set(Calendar.DAY_OF_MONTH, c.getActualMaximum(Calendar.DAY_OF_MONTH));
        return formatDateTime(c.getTime());
    }

    /**
     * 输入两个周期时间  获取上个周期的两个时间
     * 例如 输入 2018-01-17   2018-01-19  输出 2018-01-14  2018-01-16
     *
     * @param startTime
     * @param endTime
     * @return
     */
    public static Map<String, String> getBetweenTwoDay(String startTime, String endTime) {
        Map<String, String> map = new HashMap<String, String>();
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        String lastStartTime = null;
        String lastEndTime = null;
        try {
            Date startDate = df.parse(startTime);
            Date endDate = df.parse(endTime);
            if (startDate.getTime() > endDate.getTime()) { // 获取昨天的日期
                lastEndTime = getDateBefore(endDate, 1);
            } else {
                lastEndTime = getDateBefore(startDate, 1);
            }
            lastStartTime = getDateBefore(df.parse(lastEndTime), getBetweenByDays(startDate, endDate));
        } catch (ParseException e) {
            throw new BizException(EorMsg.ERROR_CODE, "时间格式出错");
        }
        map.put("lastStartTime", lastStartTime);
        map.put("lastEndTime", lastEndTime);
        return map;
    }

    /**
     * 得到几天前的时间
     *
     * @param d
     * @param day
     * @return
     */
    public static String getDateBefore(Date d, int day) {
        Calendar now = Calendar.getInstance();
        now.setTime(d);
        now.set(Calendar.DATE, now.get(Calendar.DATE) - day);
        return formatDateTime(now.getTime());
    }

    /**
     * 得到几天后的时间
     *
     * @param d
     * @param day
     * @return
     */
    public static String getDateAfter(Date d, int day) {
        Calendar now = Calendar.getInstance();
        now.setTime(d);
        now.set(Calendar.DATE, now.get(Calendar.DATE) + day);
        return formatDateTime(now.getTime());
    }

    /**
     * 获取两个时间的相差天数
     *
     * @param startTime
     * @param endTime
     * @return
     */
    public static int getBetweenByDays(Date startTime, Date endTime) {
        Long betweenDays = 0L;
        if (startTime.getTime() > endTime.getTime()) {
            betweenDays = (startTime.getTime() - endTime.getTime()) / (1000 * 3600 * 24);
        } else {
            betweenDays = (endTime.getTime() - startTime.getTime()) / (1000 * 3600 * 24);
        }
        return betweenDays.intValue();
    }

    /**
     * 比较两个时间相差月数  不保证完全正确 问题未知- -
     *
     * @param startTime
     * @param endTime
     * @return
     */
    public static int getBetweenByMonths(Date startTime, Date endTime) {
        Calendar bef = Calendar.getInstance();
        Calendar aft = Calendar.getInstance();
        bef.setTime(startTime);
        aft.setTime(endTime);
        int result = aft.get(Calendar.MONTH) - bef.get(Calendar.MONTH);
        int month = (aft.get(Calendar.YEAR) - bef.get(Calendar.YEAR)) * 12;
        return Math.abs(month + result);
    }

    /**
     * 输入两个日期 查出这两个日期区间所有的日期
     * @param startTime
     * @param endTime
     * @return
     */
    public static List<String> getBetweenAllDays(Date startTime, Date endTime)  {
        List<String> result = new ArrayList<String>();
         Calendar tempStart = Calendar.getInstance();
            tempStart.setTime(startTime);
        while(startTime.getTime()<=endTime.getTime()){
            result.add(formatDateTime(tempStart.getTime()));
            tempStart.add(Calendar.DAY_OF_YEAR, 1);
            startTime = tempStart.getTime();
        }
        return result;
}

    public static void main(String[] args) throws ParseException {
        //System.out.println(getTimestamp());
        /*System.out.println(getDay(0));
        System.out.println(getWeekMonday(0));
        System.out.println(getWeekSunday(0));
        System.out.println(getMonthFirstDay(0));
        System.out.println(getMonthLastDay(0));
        System.out.println(getQuarterFirstDay(0));
        System.out.println(getQuarterFirstDay(0));
        System.out.println(getQuarterLastDay(0));*/
        System.out.println(getBetweenDays("2018-05-05","2018-05-03"));

    }
}
