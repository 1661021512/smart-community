package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.config.AppMonitorConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * @author panjie
 * 项目配置
 */
@Component
public class ConfigServiceImpl implements ConfigService {
    /**
     * 静态配置，用于非spring管理的BEAN获取该配置项。注意：spring未启动前，该值为null
     * 适用场景：某此BEAN的代码在spring成功启动以前便执行了
     * 示例代码：LoggerMonitorFilter
     */
    public static AppMonitorConfig appMonitorConfig;
    public static String active;

    @Autowired
    public ConfigServiceImpl(AppMonitorConfig appMonitorConfig) {
        ConfigServiceImpl.appMonitorConfig = appMonitorConfig;
    }

    @Value("${spring.profiles.active}")
    public void setActive(String active) {
        ConfigServiceImpl.active = active;
    }
}
