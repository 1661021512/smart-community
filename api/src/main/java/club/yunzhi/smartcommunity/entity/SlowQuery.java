package club.yunzhi.smartcommunity.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Time;
import java.sql.Timestamp;

/**
 * 慢查询实体
 */
@Entity
public class SlowQuery {
  /**
   * id
   */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  protected Long id;

  /**
   * 请求方法
   */
  private String method;

  /**
   * 异常信息
   */
  private String exception;

  /**
   * 请求url
   */
  private String url;

  /**
   * 请求参数
   */
  private String params;

  /**
   * 请求body
   */
  private String body;

  /**
   * 请求时间
   */
  private Timestamp requestTime;

  /**
   * 响应时间
   */
  private Timestamp responseTime;

  /**
   * 请求的ip
   */
  private String ip;

  public String getUrl() {
    return url;
  }

  public void setUrl(String url) {
    this.url = url;
  }

  public String getException() {
    return exception;
  }

  public void setException(String exception) {
    this.exception = exception;
  }

  public String getBody() {
    return body;
  }

  public void setBody(String body) {
    this.body = body;
  }

  public String getParams() {
    return params;
  }

  public void setParams(String params) {
    this.params = params;
  }

  public String getMethod() {
    return method;
  }

  public void setMethod(String method) {
    this.method = method;
  }

  public Timestamp getRequestTime() {
    return requestTime;
  }

  public void setRequestTime(Timestamp requestTime) {
    this.requestTime = requestTime;
  }

  public Timestamp getResponseTime() {
    return responseTime;
  }

  public void setResponseTime(Timestamp responseTime) {
    this.responseTime = responseTime;
  }

  public String getIp() {
    return ip;
  }

  public void setIp(String ip) {
    this.ip = ip;
  }
}
