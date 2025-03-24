package club.yunzhi.smartcommunity.filter;

import club.yunzhi.smartcommunity.wrapper.CustomHttpServletRequestWrapper;
import club.yunzhi.smartcommunity.wrapper.HttpServletResponseCopier;
import club.yunzhi.smartcommunity.entity.SlowQuery;
import club.yunzhi.smartcommunity.repository.SlowQueryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.sql.Timestamp;

/**
 * 请求大于1.5秒的过滤器
 */
//@WebFilter
public class RequestTimeFilter extends HttpFilter {
  private final static Logger logger = LoggerFactory.getLogger(RequestTimeFilter.class);
  private final SlowQueryRepository slowQueryRepository;
  private final SetSlowQueryAsync setSlowQueryAsync;

  public RequestTimeFilter(SlowQueryRepository slowQueryRepository,
                           SetSlowQueryAsync setSlowQueryAsync) {
    this.slowQueryRepository = slowQueryRepository;
    this.setSlowQueryAsync = setSlowQueryAsync;
  }

  @Override
  protected void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException, IOException, ServletException {
    logger.info("在控制器被调用之前和之后执行,计算请求时间");
    Long beginTime = System.currentTimeMillis();

    // 复制一下Request和Response
    CustomHttpServletRequestWrapper servletRequestWrapper = new CustomHttpServletRequestWrapper(request);
    HttpServletResponseCopier responseCopier = new HttpServletResponseCopier((HttpServletResponse) response);

    // 新建一个慢查询实体
    SlowQuery slowQuery = new SlowQuery();

    chain.doFilter(servletRequestWrapper, responseCopier);

    // 获取请求结束时间和时间差
    Long endTime = System.currentTimeMillis();
    Long requestTime = endTime - beginTime;

    System.out.println("Execute method1 asynchronously - "
        + Thread.currentThread().getId());

    if (requestTime >= 1500) {
      logger.debug("时间差大于1.5s");
      logger.debug("设置请求时间和响应时间");
      slowQuery.setRequestTime(new Timestamp(beginTime));
      slowQuery.setResponseTime(new Timestamp(endTime));
      logger.debug("调用异步方法设置其他值");
      try {
        setSlowQueryAsync.setSlowQuery(slowQuery, servletRequestWrapper);
      } catch (Exception e) {
        System.out.println(e.getMessage());
      }
    }
  }
}
