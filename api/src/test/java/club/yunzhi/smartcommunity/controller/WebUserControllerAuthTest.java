package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.User;
import club.yunzhi.smartcommunity.entity.WebUser;
import club.yunzhi.smartcommunity.properties.AppProperties;
import cn.binarywang.wx.miniapp.api.WxMaService;
import org.json.JSONObject;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.client.AutoConfigureWebClient;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.io.UnsupportedEncodingException;
import java.util.Base64;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc(addFilters = false)
@AutoConfigureWebClient
@Transactional
public class WebUserControllerAuthTest {
  @LocalServerPort
  private int port;

  @MockBean
  protected WxMaService wxMaService;

  @Autowired
  RestTemplateBuilder restTemplateBuilder;

  @Autowired
  AppProperties appProperties;

  @Test
  void login() throws UnsupportedEncodingException {
    // 复制老项目的，用于添加注释

    // 构造请求url
    String url = "http://localhost:" + port + "/webUser/login";

    // 由于spring boot不提供自动配置的RestTemplate bean，他会提供一个restTemplateBuilder bean
    // 可用于在需要的时候创建RestTemplate实例。
    // restTemplate用于发起请求，其中exchange可以指定请求方法
    RestTemplate restTemplate = this.restTemplateBuilder.build();
    // 构造一个请求的headers
    HttpHeaders headers = this.getChromeHeaders();

    // 没有认证信息时401
    // 预言发起请求抛出的异常为HttpClientErrorException。
    Assertions.assertThrows(HttpClientErrorException.class, () -> restTemplate.getForObject(url, JSONObject.class));
    try {
      // HttpEntity包括请求头和请求主体
      HttpEntity entity = new HttpEntity(headers);
      // 调用exchange方法发起method为get，url为xxx，请求头和请求主体为entity，返回类型为User实体的
      restTemplate.exchange(url, HttpMethod.GET, entity, User.class);
    } catch (HttpClientErrorException e) {
      // 捕获异常为401，未认证
      Assertions.assertEquals(e.getStatusCode().value(), HttpStatus.UNAUTHORIZED.value());
    }

    // basic认证模式,构造前台传送信息，
    headers = this.getChromeHeaders();
    // 添加认证信息
    String auth = Base64.getEncoder().encodeToString(
            (appProperties.getUsername() + ":" + appProperties.getPassword()).getBytes("utf-8"));
    headers.add("Authorization", "Basic " + auth);

    // 构造一个请求信息，请求头为headers内容
    HttpEntity entity = new HttpEntity(headers);

    // 获取响应实体，通过get请求
    ResponseEntity<WebUser> result = restTemplate.exchange(url, HttpMethod.GET, entity, WebUser.class);
    // 从响应头中获取参数x-auth-token，并断言非空（后台响应之后返回了token）
    String xAuthToken = result.getHeaders().get("x-auth-token").get(0);
    Assertions.assertNotNull(xAuthToken);
    // 获取响应主体，断言它的用户名等于xxx
    WebUser body = result.getBody();
    Assertions.assertEquals(appProperties.getUsername(), body.getUsername());

    // x-auth-token认证
    // 第一次请求分配了一个token，第二次请求直接使用分配的token
    headers = this.getChromeHeaders();
    headers.add("x-auth-token", xAuthToken);
    // 获取完判断获得的user是之前的user。
    WebUser webUser = restTemplate.exchange(url, HttpMethod.GET, entity, WebUser.class).getBody();
    Assertions.assertEquals(appProperties.getUsername(), webUser.getUsername());
  }

  private HttpHeaders getChromeHeaders() {
    // 构造Chrome浏览器的headers，添加各种属性和值
    HttpHeaders headers = new HttpHeaders();
    headers.add("Proxy-Connection", "keep-alive");
    headers.add("Pragma", "no-cache");
    headers.add("Cache-Control", "no-cache");
    headers.add("Accept", "application/json, text/plain, */*");
    headers.add("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.192 Safari/537.36");
    headers.add("Origin", "http://localhost:4200");
    headers.add("Referer", "http://localhost:4200/");
    headers.add("Accept-Encoding", "gzip, deflate");
    headers.add("Accept-Language", "en-GB,en;q=0.9,zh-CN;q=0.8,zh;q=0.7");
    return headers;
  }
}
