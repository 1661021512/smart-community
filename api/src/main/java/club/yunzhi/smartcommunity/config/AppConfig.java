package club.yunzhi.smartcommunity.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * 使用bean方式引入相关配置
 */
@Configuration
public class AppConfig {
  /**
   * DTO 转换器
   */
  @Bean
  public ModelMapper modelMapper() {
    return new ModelMapper();
  }
}
