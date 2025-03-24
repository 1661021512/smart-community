package club.yunzhi.smartcommunity.config;

import club.yunzhi.smartcommunity.entity.WebUser;
import club.yunzhi.smartcommunity.filter.WechatAuthFilter;
import club.yunzhi.smartcommunity.service.UserService;
import club.yunzhi.smartcommunity.service.OneTimePassword;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.session.ExpiringSession;
import org.springframework.session.MapSessionRepository;
import org.springframework.session.SessionRepository;
import org.springframework.session.config.annotation.web.http.EnableSpringHttpSession;
import org.springframework.session.web.http.HttpSessionStrategy;

@Configuration
@EnableWebSecurity
@EnableSpringHttpSession
public class MvcSecurityConfig extends WebSecurityConfigurerAdapter {

  private final BCryptPasswordEncoder passwordEncoder;
  private final WechatAuthFilter wechatAuthFilter;

  @Autowired
  UserService webUserService;

  public MvcSecurityConfig(OneTimePassword oneTimePassword, WechatAuthFilter wechatAuthFilter) {
    this.passwordEncoder = new MyBCryptPasswordEncoder(oneTimePassword);
    this.wechatAuthFilter = wechatAuthFilter;
    WebUser.setPasswordEncoder(this.passwordEncoder);
  }

  /**
   * https://spring.io/guides/gs/securing-web/
   *
   * @param http http安全
   * @throws Exception 异常
   */
  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
        .authorizeRequests()
        // 开放端口
        .antMatchers("/webUser/resetPasswordByUsernameAndCode").permitAll()
        .antMatchers("/webUser/sendVerificationCode", "/favicon.ico").permitAll()
        .antMatchers("/district/clearCache").permitAll()
        .anyRequest().authenticated()
        .and()
        // 添加微信认证过滤器
        .addFilterBefore(this.wechatAuthFilter, BasicAuthenticationFilter.class)
        .cors()
        .and().httpBasic()
        .and().csrf().disable();
    http.headers().frameOptions().disable();
  }

  /**
   * 使用header认证来替换默认的cookie认证
   */
  @Bean
  public HttpSessionStrategy httpSessionStrategy() {
    return new HeaderAndParamHttpSessionStrategy();
  }

  /**
   * 由于我们启用了@EnableSpringHttpSession后，而非RedisHttpSession.
   * 所以应该为SessionRepository提供一个实现。
   * 而Spring中默认给了一个SessionRepository的实现MapSessionRepository.
   *
   * @return session策略
   */
  @Bean
  public SessionRepository<ExpiringSession> sessionRepository() {
    return new MapSessionRepository();
  }

  @Bean
  PasswordEncoder passwordEncoder() {
    return this.passwordEncoder;
  }
}
