package club.yunzhi.smartcommunity.filter;

import club.yunzhi.smartcommunity.entity.WechatUser;
import club.yunzhi.smartcommunity.repository.WechatUserRepository;
import cn.binarywang.wx.miniapp.api.WxMaService;
import cn.binarywang.wx.miniapp.bean.WxMaJscode2SessionResult;
import com.mengyunzhi.core.exception.ValidationException;
import me.chanjar.weixin.common.error.WxErrorException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

/**
 * @author panjie 3792535@qq.com
 * @date 2021/8/20
 * @blog https://segmentfault.com/u/myskies
 * @description 微信认证过滤器
 */
@Component
public class WechatAuthFilter extends OncePerRequestFilter {
  private final Logger logger = LoggerFactory.getLogger(this.getClass());
  /**
   * 微信第一次认证需要的code信息
   */
  public static final String codeKey = "wechat-code";
  private final WxMaService wxMaService;
  private final WechatUserRepository wechatUserRepository;

  public WechatAuthFilter(WxMaService wxMaService, WechatUserRepository wechatUserRepository) {
    this.wxMaService = wxMaService;
    this.wechatUserRepository = wechatUserRepository;
  }

  /**
   * 使用微信小程序给的code来换取openId，并根据openId来返回登录用户
   * <p>
   * 老用户：直接返回数据库中的记录
   * 新用户：新建记录后返回
   * </p>
   *
   * @param request 请求
   * @param response 响应
   * @param filterChain 过滤链
   * @throws ServletException
   * @throws IOException
   */
  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    final boolean debug = this.logger.isDebugEnabled();

    String code = request.getHeader(this.codeKey);
    if (code != null) {
      try {
        if (debug) {
          this.logger.debug("获取到了code，执行微信认证拦截器");
        }
        WxMaJscode2SessionResult wxMaJscode2SessionResult = wxMaService.getUserService().getSessionInfo(code);
        String openid = wxMaJscode2SessionResult.getOpenid();
        WechatUser wechatUser;
        Optional<WechatUser> optionalUser = wechatUserRepository.findById(openid);
        if (optionalUser.isPresent()) {
          this.logger.info(code + "对应老用户，登录成功");
          wechatUser = optionalUser.get();
        } else {
          wechatUser = new WechatUser();
          wechatUser.setOpenid(openid);
          wechatUser = this.wechatUserRepository.save(wechatUser);
          this.logger.info(code + "是新用户，登录成功");
        }

        this.logger.debug("缓存sessionKey");
        wechatUser.setSessionKey(wxMaJscode2SessionResult.getSessionKey());
        // 设置认证用户：微信用户、安全令牌设置为openid、认证权限为空(后期可变更为正确的微信权限名称)
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken;
        usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
            wechatUser,
            openid,
            wechatUser.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
      } catch (WxErrorException exception) {
        this.logger.error("登录失败：虽然接收到了code" + code + "，但是没有通过code换取有效的微信数据: " + exception.getMessage());
        exception.printStackTrace();
        response.setStatus(HttpStatus.BAD_REQUEST.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getOutputStream().flush();
        throw new ValidationException("与微信交互时发生了错误，请检查服务器及微信小程序的相关配置是否统一");
      }
    }

    filterChain.doFilter(request, response);
  }
}
