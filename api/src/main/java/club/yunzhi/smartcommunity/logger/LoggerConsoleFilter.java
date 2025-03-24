package club.yunzhi.smartcommunity.logger;

import ch.qos.logback.core.filter.AbstractMatcherFilter;
import ch.qos.logback.core.spi.FilterReply;
import club.yunzhi.smartcommunity.service.ConfigServiceImpl;

/**
 * @author panjie
 * 日志过滤器
 */
public class LoggerConsoleFilter extends AbstractMatcherFilter {
  @Override
  public FilterReply decide(Object event) {
    String active = ConfigServiceImpl.active;

    // 机器人环境不输出任何日志
    if (active != null) {
      if (active.equals("ci")) {
        return FilterReply.DENY;
      }
    }
    return FilterReply.NEUTRAL;
  }
}
