package club.yunzhi.smartcommunity.util;

import com.aliyuncs.utils.StringUtils;

import java.util.Random;
import java.util.regex.Pattern;
/**
 * 校验手机号是否合规的工具类，内置获取一个随机合法手机号，用于单元测试
 *
 * @Author xiaqiang
 * @Blog https://blog.csdn.net/weixin_45877686/article/details/105217905
 */
public class SMSUtils {
    //校验手机是否合规 2020年最全的国内手机号格式
    private static final String REGEX_MOBILE = "((\\+86|0086)?\\s*)((134[0-8]\\d{7})|(((13([0-3]|[5-9]))|(14[5-9])|15" +
            "([0-3]|[5-9])|(16(2|[5-7]))|17([0-3]|[5-8])|18[0-9]|19(1|[8-9]))\\d{8})|(14(0|1|4)0\\d{7})|(1740([0-5]" +
            "|[6-9]|[10-12])\\d{7}))";

    /**
     * 获取一个合法随机手机号码
     * @return 合法手机号
     */
    public static String getRandomPhone() {
        String[] telFirst="134,135,136,137,138,139,150,151,152,157,158,159,130,131,132,155,156,133,153".split(",");
        String first=telFirst[new Random().nextInt(telFirst.length - 1)];
        String second=String.valueOf(new Random().nextInt(888)+10000).substring(1);
        String third=String.valueOf(new Random().nextInt(9100)+10000).substring(1);
        return first+second+third;
    }

    /**
     * 校验手机号
     *
     * @param phone 手机号
     * @return boolean true:是  false:否
     */
    public static boolean isMobile(String phone) {
        if (StringUtils.isEmpty(phone)) {
            return false;
        }
        return Pattern.matches(REGEX_MOBILE, phone);
    }

}
