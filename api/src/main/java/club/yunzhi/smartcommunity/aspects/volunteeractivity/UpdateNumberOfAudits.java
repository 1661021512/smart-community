package club.yunzhi.smartcommunity.aspects.volunteeractivity;

import club.yunzhi.smartcommunity.entity.VolunteerActivitySignUp;
import club.yunzhi.smartcommunity.service.VolunteerActivityService;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * 更新已审核的报名数量
 */
@Aspect
@Component
public class UpdateNumberOfAudits {
  private final Logger logger = LoggerFactory.getLogger(this.getClass());

  private final VolunteerActivityService volunteerActivityService;

  public UpdateNumberOfAudits(VolunteerActivityService volunteerActivityService) {
    this.volunteerActivityService = volunteerActivityService;
  }

  @AfterReturning(value = "execution(* club.yunzhi.smartcommunity.service.VolunteerActivitySignUpServiceImpl.approvedById(..))",
      returning = "signUp")
  public void afterReturnPage(VolunteerActivitySignUp signUp) {
    this.logger.debug("执行切面");
    this.volunteerActivityService.updateNumberOfAudits(signUp.getVolunteerActivity().getId());
  }
}
