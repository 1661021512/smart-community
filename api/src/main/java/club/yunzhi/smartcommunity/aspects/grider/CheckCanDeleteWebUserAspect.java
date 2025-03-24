package club.yunzhi.smartcommunity.aspects.grider;

import club.yunzhi.smartcommunity.repository.GriderRepository;
import com.mengyunzhi.core.exception.ValidationException;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

/**
 * @author panjie 3792535@qq.com
 * @date 2022/2/12
 * @blog https://segmentfault.com/u/myskies
 * @description 在删除Web用户之前判断该Web用户是否为网格员
 */
@Component
@Aspect
public class CheckCanDeleteWebUserAspect {
  private final GriderRepository griderRepository;

  public CheckCanDeleteWebUserAspect(GriderRepository griderRepository) {
    this.griderRepository = griderRepository;
  }

  @Before(value = "execution(* club.yunzhi.smartcommunity.service.WebUserService.delete(..))  && args(webUserId))")
  public void beforeDeleteWebUser(Long webUserId) {
    if (this.griderRepository.existsByWebUserIdAndDeletedIsFalse(webUserId)) {
      throw new ValidationException("请先删除该用户对应的网格员");
    }
  }
}
