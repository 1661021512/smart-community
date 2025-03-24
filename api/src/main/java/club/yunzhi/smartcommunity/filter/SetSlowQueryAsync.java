package club.yunzhi.smartcommunity.filter;

import club.yunzhi.smartcommunity.wrapper.CustomHttpServletRequestWrapper;
import club.yunzhi.smartcommunity.entity.SlowQuery;
import club.yunzhi.smartcommunity.repository.SlowQueryRepository;
import com.alibaba.fastjson.JSON;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;

/**
 * 异步方法不可调用同一个class的，所以新建
 */
//@Component
public class SetSlowQueryAsync {
  private final static Logger logger = LoggerFactory.getLogger(SetSlowQueryAsync.class);
  private final SlowQueryRepository slowQueryRepository;

  public SetSlowQueryAsync(SlowQueryRepository slowQueryRepository) {
    this.slowQueryRepository = slowQueryRepository;
  }

  @Async
  public void setSlowQuery(SlowQuery slowQuery, CustomHttpServletRequestWrapper servletRequestWrapper) throws InterruptedException {
    System.out.println("Execute method2 asynchronously - "
        + Thread.currentThread().getId());
    logger.debug("设置请求ip");
    slowQuery.setIp(servletRequestWrapper.getRemoteAddr());

    logger.debug("设置慢查询的url和method和param参数和body");
    slowQuery.setUrl(servletRequestWrapper.getRequestURI());
    slowQuery.setMethod(servletRequestWrapper.getMethod());
    if (isJson(servletRequestWrapper.getParameterMap().toString())) {
      slowQuery.setParams(JSON.toJSONString(servletRequestWrapper.getParameterMap()));
    } else {
      slowQuery.setParams(servletRequestWrapper.getParameterMap().toString());
    }
    slowQuery.setBody(servletRequestWrapper.getBody());

    logger.debug("保存实体");
    slowQueryRepository.save(slowQuery);
  }

  public boolean isJson(String str) {
    try {
      JSON.parse(str);
    } catch (Exception e) {
      return false;
    }
    return true;
  }
}
